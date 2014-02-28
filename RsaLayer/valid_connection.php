<?php

/*
 * valid_connection.php
 * @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
 */
set_include_path(get_include_path() . PATH_SEPARATOR . "./");
include 'Crypt/RSA.php';
session_start();

$rsa = new Crypt_RSA();
$rsa->setEncryptionMode(CRYPT_RSA_ENCRYPTION_PKCS1);
$rsa->loadKey($_SESSION["privateKey"]);

if ($_POST["pseudo"] && $_POST["password"]) {
    $pseudo = base64_decode($_POST["pseudo"]);
    $pwd = base64_decode($_POST["password"]);

    var_dump(base64_decode($rsa->decrypt($pseudo)));
    var_dump(base64_decode($rsa->decrypt($pwd)));
}
