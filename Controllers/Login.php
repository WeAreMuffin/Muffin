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

    public function index ($params)
    {
        echo "Not allowed";
    }

    /**
     * @PathInfo('login')
     * @Ajax
     */
    public function register ($params = array ())
    {
        // Si à true, alors aucun mail ne sera envoyé.
        $fakeMail = true;

        $login = $this->getUrlParam ('login');
        $pass = $this->generatePassPhrase ();
        
        $student = new Entities ("c_42_logins[login_eleve={$login}]");
        $loginsExists = new Entities ("c_user[login={$login}]");

        if ( !count($student) )
            echo "-2";
        else if ( !count($loginsExists) == false and saveUserToDatabase ($login, $pass) )
        {
            // Si on arrive à envoyer le mail, alors on affiche 1
            if ( $fakeMail or mail ($email, $subject, $message, $headers) )
                echo "1";
            else
                echo "0";
        }
        else
            echo "-1";



        $projets = Moon::getAllHeavy ('project');
        $insertform = Moon::create ('project')->generateInsertForm ();
        $insertEquipeform = Moon::create ('equipe')->generateInsertForm ();
        $customOption = new Option ('new', 'Nouveau');
        $customOption->addData ('toggle', 'insert-equipe-form');
        $insertform->getField ('id_equipe')->addOption ($customOption);
        $this->addData ('projets', $projets);
        $this->addData ('insertProjetForm', $insertform);
        $this->addData ('insertEquipeForm', $insertEquipeform);
        $this->render ();
    }

    /**
     * Va générer un pass "maison" ;)
     * @return string le mot de passe maison
     */
    private function generatePassPhrase ()
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
