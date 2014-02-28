<?php

/*
 * get_public_key.php
 * @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
 */
session_start();
if ($_SESSION["publicKey"])
{
    echo $_SESSION["publicKey"];
}
