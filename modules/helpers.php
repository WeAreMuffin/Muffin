<?php

include_once '../config/configuration.php';

/**
 * Va retourner un object PDO
 * @return \PDO
 */
function getPDO ()
{
    //simulerLatence();
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

/**
 * Va un peu nettoyer le $_POST de ses inpuretées
 */
function sanitizePost ()
{
    foreach ($_POST as $key => $value)
    {
        $_POST[$key] = addslashes($value);
    }
}

/**
 * Va un peu nettoyer le $_GET de ses inpuretées
 */
function sanitizeGet ()
{
    foreach ($_GET as $key => $value)
    {
        $_GET[$key] = addslashes($value);
    }
}

/**
 * modifie la value pour echapper les slashes
 * @param string $value la value a echapper
 */
function clean_value (&$value)
{
    $value = addslashes (trim ($value));
}


/**
 * Va simuler un petit temps de latence propre aux serveurs mous :)
 */
function simulerLatence()
{
    if ($_SERVER['HTTP_HOST'] == 'localhost')
    {
        sleep(1);
    }
}