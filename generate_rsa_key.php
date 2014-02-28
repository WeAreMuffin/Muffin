<?php

/*
 * generate_rsa_key.php
 *  @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
 */

include('Crypt/RSA.php');
session_start();

/*
 * The following function load $privatekey and $publickey
 * from file
 */
function load_key($filenames)
{
    if (is_array($filenames))
    {
        $contentPrivate = $filenames["privateKey"];
        $contentPublic = $filenames["publicKey"];

        if (is_file($contentPrivate) && is_file($contentPublic))
        {
            $_SESSION["privateKey"] = file_get_contents($contentPrivate);
            $_SESSION["publicKey"] = file_get_contents($contentPublic);

            return (true);
        }
        else
        {
            return (false);
        }
    }
    else
    {
        return (false);
    }
}
