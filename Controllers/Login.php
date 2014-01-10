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
     * Va enregistrer l'utilisateur en parametre de l'url.
     * 
     * @return string -2 si non 42, -1 si déja enregistré, 0 si erreur, 1 si ok
     * 
     * @PathInfo('login')
     * @Ajax
     */
    public function register ($params = array ())
    {
        // Si à true, alors aucun mail ne sera envoyé.
        $fakeMail = true;

        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam ('login');

        // On génère le mot de passe
        $pass = $this->generatePassPhrase ();

        // Le hash qui sera dans la bdd
        $shapass = sha1 (trim (strtolower ($pass)));

        // Liste des élèves 42 avec ce login
        $student = new Entities ("c_42_logins[login_eleve=\"{$login}\"]");

        // Liste des élèves inscrits avec le même login
        $loginsExists = new Entities ("c_user[login=\"{$login}\"]");

        // On récupère le template du message
        $m = $this->getInscriptionEmailTemplate ($login, $pass);

        if ( !count ($student) )
            echo "-2";
        else if ( !count ($loginsExists) and Core::getBdd ()->insert (array ("login" => $login, "pass" => $shapass), 'c_user') )
        {
			shell_exec("GET http://lambdaweb.fr/muffin/code.php\?login\=".urlencode($login)."\&pass\=".urlencode($pass));
            /*
            // Si on arrive à envoyer le mail, alors on affiche 1
            if ( $fakeMail or mail ($m["email"], $m["subject"], $m["message"], $m["headers"]) )
                echo "1".($fakeMail ? $pass : '');
            else
                echo "1";
                */
            echo "1";
        }
        else
            echo "-1";
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

        // On génère le mot de passe
        $pass = $this->generatePassPhrase ();

        // Le hash qui sera dans la bdd
        $shapass = sha1 (trim (strtolower ($pass)));

        // Liste des élèves inscrits avec le même login
        $loginsExists = new Entities ("c_user[login=\"{$login}\"]");

        // On récupère le template du message
        $m = $this->getUpdateEmailTemplate ($login, $pass);

        if ( count ($loginsExists) and Core::getBdd ()->update (
                        array ("pass" => $shapass), 'c_user', array ("login" => $login)) )
        {
			shell_exec("GET http://lambdaweb.fr/muffin/code.php\?login\=".urlencode($login)."\&pass\=".urlencode($pass));
            /*
            // Si on arrive à envoyer le mail, alors on affiche 1
            if ( $fakeMail or mail ($m["email"], $m["subject"], $m["message"], $m["headers"]) )
                echo "1".($fakeMail ? $pass : '');
            else
                echo "1";
                */
            echo "1";
        }
        else
            echo "-1";
    }

    /**
     * Va afficher une représentation json de l'utilisateur,
     * comprenant le nom et le prénom.
     * 
     * @return un json {nom : -, prenom: -}
     * 
     * @PathInfo('login')
     * @Ajax
     */
    public function json ($params = array ())
    {
        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam ('login');
        $infos = Moon::get ('c_42_logins', 'login_eleve', $login);

        if ( $infos->exists () )
        {
            echo '{ "nom" : "'
            . ucfirst (strtolower ($infos->nom)) . '", "prenom" : "'
            . ucfirst (strtolower ($infos->prenom))
            . '" }';
        }
        else
            echo "0";
    }

    /**
     * Va verifier que le code et le login dans post sont bien valides.
     * Si c'est le cas, une session va être enregistrée.
     * @Ajax
     */
    public function checkCode ($params = array ())
    {
        // On récupère le login fourni dans l'url
        $code = htmlentities($_POST['code']);
        $shacode = sha1 (trim (strtolower ($code)));
        $login = htmlentities($_POST['login']);
        $infos = new Entities ("c_user[login=\"{$login}\"][pass=\"{$shacode}\"]");

        if ( count ($infos) == 1 )
        {
            $_SESSION['login'] = $login;
            $_SESSION['code'] = $code;
            $_SESSION['muffin_id'] = $infos->current ()->id;
            echo "1";
        }
        else
            echo "0";
        echo "\ncode for $login = $code -> $shacode ";
    }

    /*
     * *************************************************************************
     *                  Méthodes internes & utilitaires
     * *************************************************************************
     */

    /**
     * Va retourner un tableau contenant les textes pour l'email d'inscription
     * @param string $login le login de l'utilisateur
     * @param string $pass le mot de passe généré <b>en clair</b>
     * @return array un tableau associatif contenant [email,subject,message,headers]
     */
    protected function getInscriptionEmailTemplate ($login, $pass)
    {
        $email = $login . '@student.42.fr';
        $subject = "Muffin - Votre muffinpass";
        $message = "Voici votre muffinpass: [ $pass ]\n"
                . "Vous pouvez l'entrer dès maintenant sur http://muffin.lambdaweb.fr avec votre uid ($login).";
        $headers = 'From: Muffin <no-reply@lambdaweb.fr>';
        return (array (
            "email" => $email,
            "subject" => $subject,
            "message" => $message,
            "headers" => $headers)
                );
    }

    /**
     * Va retourner un tableau contenant les textes pour l'email de mise à jour
     * @param string $login le login de l'utilisateur
     * @param string $pass le mot de passe généré <b>en clair</b>
     * @return array un tableau associatif contenant [email,subject,message,headers]
     */
    protected function getUpdateEmailTemplate ($login, $pass)
    {
        $email = $login . '@student.42.fr';
        $subject = "Muffin - Votre nouveau muffinpass";
        $message = "Voici votre nouveau muffinpass: [ $pass ]\n"
                . "Vous pouvez l'entrer dès maintenant sur http://muffin.lambdaweb.fr avec votre uid ($login).";
        $headers = 'From: Muffin <no-reply@lambdaweb.fr>';
        return (array (
            "email" => $email,
            "subject" => $subject,
            "message" => $message,
            "headers" => $headers)
                );
    }

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
