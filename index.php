<?php
if ($_SERVER["SERVER_ADDR"] != "192.168.0.13")
	header("Location: uc.php");
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
apc_clear_cache();

Core::startEngine();

Core::route();
?>
