<?php
// Pour vérifier a tout moment qu'on est dans l'index.php
$INDEX = true;

// on ajoute l'autoload des classes et on crée la connexion
require_once(__DIR__.'/Moon/loader.php');

/**
 * Enfin, on démarre notre moteur
 */

Core::startEngine();

Core::route();

?>
