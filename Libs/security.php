<?php

/*
 * Copyright 2014 lambda2.
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
 * (c) 2014 Lambdaweb - www.lambdaweb.fr
 *
 *
 * @author lambda2
 */

include_once('Libs/Crypt/RSA.php');



/*
 * Originally from generate_rsa_key.php
 * @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
 *
 * The following function load $privatekey and $publickey
 * from file
 */
function securityLoadKeys()
{

    $contentPrivate = Core::opts()->security->private_path;
    $contentPublic = Core::opts()->security->public_path;

    if (is_file($contentPrivate) && is_file($contentPublic))
    {
        $_SESSION["privateKey"] = file_get_contents($contentPrivate);
        $_SESSION["publicKey"] = file_get_contents($contentPublic);

        return (true);
    }
    else
    {
    	echo "unable to open contentPublic/Private";
        return (false);
    }
}


function RSADecode ($login, $pass)
{

    /*
     * Originally from valid_connection.php
     * @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
     */

    $rsa = new Crypt_RSA();
    $rsa->setEncryptionMode(CRYPT_RSA_ENCRYPTION_PKCS1);
    $rsa->loadKey($_SESSION["privateKey"]);
    $r = array();

    if ($pass and $login)
    {
        $pseudo = base64_decode($login);
        $pwd = base64_decode($pass);

        $r["login"] = (base64_decode($rsa->decrypt($pseudo)));
        $r["pass"] = (base64_decode($rsa->decrypt($pwd)));
    }
    return ($r);
}
