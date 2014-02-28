<?php

/*
 * generate_rsa_key.php
 *  @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
 */

set_include_path(get_include_path() . PATH_SEPARATOR . "C:\wamp\www\Rsa\library\phpseclib");
include('Crypt/RSA.php');
session_start();

/*
 * The following function load $privatekey and $publickey
 * from file
 */
function load_key($filenames) {
    if (is_array($filenames)) {
        $contentPrivate = $filenames["privateKey"];
        $contentPublic = $filenames["publicKey"];

        if (is_file($contentPrivate) && is_file($contentPublic)) {
            $_SESSION["privateKey"] = file_get_contents($contentPrivate);
            $_SESSION["publicKey"] = file_get_contents($contentPublic);

            return (TRUE);
        } else {
            return (FALSE);
        }
    } else {
        return (FALSE);
    }
}
