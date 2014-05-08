<?php

// Pour vérifier a tout moment qu'on est dans l'index.php
$INDEX = true;

// on ajoute l'autoload des classes et on crée la connexion
require_once(__DIR__.'/Moon/loader.php');

/**
 * Enfin, on démarre notre moteur
 */

/**
 * @TODO: TO REMOVE IN PRODUCTION ENVIRONMENT
 */
if (false and $_SERVER["REMOTE_ADDR"] != "62.210.34.161")
    header("Location: uc.php");
else
{
    apc_clear_cache();
    apc_clear_cache("user");

    Core::startEngine();

    Core::route();
}
?>
