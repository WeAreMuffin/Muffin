<?php

include_once '../config/configuration.php';

function getPDO ()
{
    // Retorune un tableau associatif contenant les identifiants à la base de données.
    $ids = getIds();
    $conn = null;
    try
    {
        $conn = new PDO ("mysql:host={$ids['host']};dbname={$ids['dbname']}", $ids['user'], $ids['pass']);
    }
    catch (Exception $exc)
    {
        var_dump ($exc);
        echo $exc->getTraceAsString ();
    }
    return $conn;
}

function sanitizePost ()
{
    foreach ($_POST as $key => $value)
    {
        $_POST[$key] = addslashes($value);
    }
}

function sanitizeGet ()
{
    foreach ($_GET as $key => $value)
    {
        $_GET[$key] = addslashes($value);
    }
}

function clean_value (&$value)
{
    $value = addslashes (trim ($value));
}

function generatePassPhrase ()
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
    
    $end = array(
        "?",
        "!",
        ".",
        "...",
        "?!"
    );
    
    $passPhrase = $exclamations[array_rand($exclamations)]
            .' '.$before[array_rand($before)]
            .' '.$adj[array_rand($adj)]
            .' '.$fruits[array_rand($fruits)]
            .$end[array_rand($end)];
    return strtolower($passPhrase);
}
