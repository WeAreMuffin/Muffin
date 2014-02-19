<?php

/*
 * Copyright 2013 lambda2.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 *
 * This file is part of the moon framework.
 *
 * (c) 2013 Lambdaweb - www.lambdaweb.fr
 *
 *
 * @author lambda2
 */

class Login extends Controller
{

    public function index ($params = array ())
    {
        echo "Not allowed";
    }

    /**
     * Va update le pass de l'utilisateur en parametre de l'url.
     *
     * @return string -2 si non 42, -1 si déja enregistré, 0 si erreur, 1 si ok
     *
     * @PathInfo('login')
     * @Ajax
     */
    public function update ($params = array ())
    {
        // Si à true, alors aucun mail ne sera envoyé.
        $fakeMail = true;

        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam ('login');
        $type = "student";

        // On génère le mot de passe
        $pass = $this->generatePassPhrase ();

        // Le hash qui sera dans la bdd
        $shapass = sha1 (trim (strtolower ($pass)));

        // Liste des élèves inscrits avec le même login
        $loginsExists = new Entities ("c_user[login=\"{$login}\"]");

        $student = new Entities ("c_42_logins[login_eleve=\"{$login}\"]");

        if ($student->current() && $student->current()->type == "staff")
        {
            $type = "staff";
        }

        if ( count ($loginsExists) and Core::getBdd ()->update (
                        array ("pass" => $shapass), 'c_user', array ("login" => $login)) )
        {
            $mail = new MuffinMail($loginsExists->current());
            $mail->reSendMuffinPass($pass);
            echo "1";
        }
        else
            echo "-1";
    }

    /*
     * *************************************************************************
     *                  Nouvelle partie
     * *************************************************************************
     */

    /**
     * Va verifier que le code et le login dans post sont bien valides.
     * Si c'est le cas, une session va être enregistrée.
     * @Ajax
     */
    public function tryToLogIn ($params = array ())
    {
        // On récupère le login fourni dans l'url
        $code42 = $this->filterPost("pass42");
        $mpass = $this->filterPost("passphrase");
        $login = $this->filterPost('login');

        /* Connexion standard, avec les logins Muffin */
        if ($login != NULL and $mpass != NULL)
        {
            $shacode = sha1 (trim (strtolower($mpass)));
            $infos = new Entities ("c_user[login=\"{$login}\"][pass=\"{$shacode}\"]");

            if (count($infos) == 1)
            {
                $u = $infos->current();
                $this->createSession($login, $shacode, $u->id, $u->auths);
                echo "1";
            }
            else
                echo "-2";
        } /* Connexion avec les logins 42 */
        else if ($login and $code42 != NULL)
        {
            sleep(2); // On fait un petit slepp pour eviter le ldap-force
            /* On essaye de s'authentifier */
            $result = Auth42::authenticate($login, $code42);
            if ($result === true)
            {
                $this->registerNewUser($login, $code42);
            }
            else
                echo "-3";
        }
        else
            echo "0";
    }

    public function checkLogin ($params = array ())
    {
        $login = $this->filterPost('login');
        if ($login and strlen($login))
        {
            $infos = new Entities ("c_42_logins[login_eleve=\"{$login}\"]");
            echo ((count($infos) == 1) ? "1" : "0");
        }
        else
            echo "0";
    }

    /**
     * Va enregistrer l'utilisateur de 42 sur Muffin.
     */
    protected function registerNewUser ($login, $pass42)
    {
        $type = "student";

        // Liste des élèves 42 avec ce login
        $student = new Entities ("c_42_logins[login_eleve=\"{$login}\"]");

        // On génère le mot de passe
        $pass = $this->generatePassPhrase ();

        if ($student->current())
        {
            if ($student->current()->type == "staff")
            {
                $type = "staff";
            }
        }
        else
        {
            $auth = new Auth42();
            $info = $auth->search("uid=".$login, $login, $pass42);
            if ($info and $info['count'] == 1)
            {
                Core::getBdd ()->insert (array(
                                             "login_eleve" => $login,
                                             "nom" => $info[0]['last-name'][0],
                                             "prenom" => $info[0]['first-name'][0]),
                                        'c_42_logins');
            }
        }
        // Le hash qui sera dans la bdd
        $shapass = sha1 (trim (strtolower ($pass)));
        $loginsExists = new Entities ("c_user[login=\"{$login}\"]");

        if ($loginsExists->current())
        {
            $u = $loginsExists->current();
            $this->createSession($login, $u->pass, $u->id, $u->auths);
            echo "1";
        }
        else
        {
            if (Core::getBdd ()->insert(array ("login" => $login, "pass" => $shapass), 'c_user'))
            {
                $loginsExists = new Entities ("c_user[login=\"{$login}\"]");
                $mail = new MuffinMail($loginsExists->current());
                $mail->sendParralelMuffinPass($pass);
                $u = $loginsExists->current();
                $this->createSession($login, $u->pass, $u->id, $u->auths);
                echo "1";
            }
            else
                echo "-1";
        }
    }

    public function logout($params)
    {
        $_SESSION = array();
        if (ini_get("session.use_cookies"))
        {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
        header("location: .."); // osé... @XXX
        $this->render();
    }

    protected function createSession($login, $code, $id, $role)
    {
        $_SESSION['login'] = $login;
        $_SESSION['code'] = $code;
        $_SESSION['muffin_id'] = $id;
        $_SESSION['role'] = $role;
    }

    /*
     * *************************************************************************
     *                  Méthodes internes & utilitaires
     * *************************************************************************
     */


    /**
     * Va générer un pass "maison" ;)
     * @return string le mot de passe maison
     */
    protected function generatePassPhrase ()
    {
        $exclamations = array (
            "Woah!",
            "Oh my god!",
            "Please !",
            "No !",
            "What a surprise !",
            "Seriously ?",
            "Hahaha !",
            "Holy pineapple !",
            "Damn strawberry !"
        );

        $before = array (
            "I juste want to be a",
            "I am a",
            "I need a",
            "Please do not be a",
            "All right,",
            "Okay,",
            "Why did you this,",
            "In my dreams, I am a",
            "You are a",
            "Stop talking like a",
            "What a"
        );

        $adj = array (
            "dead",
            "living-dead",
            "spectacular",
            "fancy",
            "afraid",
            "agreeable",
            "amused",
            "ancient",
            "angry",
            "annoyed",
            "fantastic",
            "fast",
            "fat",
            "fierce",
            "filthy",
            "fine",
            "flaky",
            "flat",
            "fluffy",
            "foolish",
            "frail",
            "frantic",
            "fresh",
            "friendly",
            "frightened",
            "funny",
            "fuzzy",
            "gentle",
            "giant",
            "gigantic",
            "good",
            "gorgeous",
            "greasy",
            "great",
            "green",
            "grieving",
            "grubby",
            "grumpy",
            "handsome",
            "happy",
            "hard",
            "harsh",
            "healthy",
            "heavy",
            "helpful",
            "helpless",
            "high",
            "hilarious",
            "hissing",
            "hollow",
            "homeless",
            "horrible",
            "hot",
            "huge",
            "hungry",
            "hurt",
            "hushed",
            "husky",
            "icy",
            "ill",
            "immense",
            "itchy",
            "jealous",
            "jittery",
            "jolly",
            "juicy",
            "kind",
            "large",
            "late",
            "lazy",
            "light",
            "little",
            "lonely",
            "long",
            "loose",
            "loud",
            "lovely",
            "low",
            "lucky",
            "magnificent",
            "mammoth",
            "many",
            "massive",
            "melodic",
            "melted",
            "mighty",
            "miniature",
            "moaning",
            "modern",
            "mute",
            "mysterious",
            "narrow",
            "nasty",
            "naughty",
            "nervous",
            "nice",
            "nosy",
            "numerous",
            "nutty",
            "obedient",
            "obnoxious",
            "odd",
            "old",
            "orange",
            "ordinary",
            "outrageous",
            "panicky",
            "perfect",
            "petite",
            "plastic",
            "pleasant",
            "precious",
            "pretty",
            "prickly",
            "proud",
            "puny",
            "purple",
            "purring",
            "quaint",
            "quick",
            "quickest",
            "quiet",
            "rainy",
            "rapid",
            "rare",
            "raspy",
            "ratty",
            "repulsive",
            "resonant",
            "roasted",
            "robust",
            "rough",
            "round",
            "sad",
            "salty",
            "scattered",
            "scrawny",
            "screeching",
            "selfish",
            "shaggy",
            "shaky",
            "shallow",
            "sharp",
            "shivering"
        );

        $fruits = array (
            "Apple",
            "Apricot",
            "Avocado",
            "Banana",
            "Breadfruit",
            "Bilberry",
            "Blackberry",
            "Blackcurrant",
            "Blueberry",
            "Boysenberry",
            "Cantaloupe",
            "Currant",
            "Cherry",
            "Cherimoya",
            "Chili",
            "Cloudberry",
            "Coconut",
            "Damson",
            "Date",
            "Dragonfruit",
            "Durian",
            "Elderberry",
            "Feijoa",
            "Fig",
            "Gooseberry",
            "Grape",
            "Grapefruit",
            "Guava",
            "Huckleberry",
            "Honeydew",
            "Jackfruit",
            "Jambul",
            "Jujube",
            "Kiwi fruit",
            "Kumquat",
            "Legume",
            "Lemon",
            "Lime",
            "Loquat",
            "Lychee",
            "Mango",
            "Melon",
            "Canary melon",
            "Cantaloupe",
            "Honeydew",
            "Watermelon",
            "Rock melon",
            "Nectarine",
            "Nut",
            "Orange",
            "Clementine",
            "Mandarine",
            "Tangerine",
            "Papaya",
            "Passionfruit",
            "Peach",
            "Pepper",
            "Pear",
            "Persimmon",
            "Physalis",
            "Prune",
            "Pineapple"
        );

        $end = array (
            "?",
            "!",
            ".",
            "...",
            "?!"
        );

        $passPhrase = $exclamations[array_rand ($exclamations)]
                . ' ' . $before[array_rand ($before)]
                . ' ' . $adj[array_rand ($adj)]
                . ' ' . $fruits[array_rand ($fruits)]
                . $end[array_rand ($end)];
        return strtolower ($passPhrase);
    }

}
