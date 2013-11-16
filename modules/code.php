<?php

include_once './functions.php';

// On nettoie les données contenues dans POST
sanitizePost ();


if ( $_POST['action'] == 'register' and isset ($_POST['login']) )
{
// On récupère le login
    $login = $_POST['login'];

    $email = $login . '@student.42.fr';
    $pass = generatePassPhrase ();
    $subject = "Votre passphrase";
    $message = "Voici votre passphrase: " . $pass
            . "\nVous pouvez l'entrer dès maintenant.";

    if ( loginExists ($login) == false and saveUserToDatabase ($login, $pass) )
    {
        // Si on arrive à envoyer le mail, alors on affiche 1
        /* if ( mail ($email, $subject, $message) )
          {
          echo "1";
          } */
        if ( true )
        {
            echo "1";
        }
        else
        {
            echo "0";
        }
    }
    else
    {
        echo "-1";
    }
    /** @TODO Enlever cette bligne */
    echo $message;
}
else if ( $_POST['action'] == 'checkCode' and isset ($_POST['login']) and isset ($_POST['code']) )
{

// On récupère le login
    $login = $_POST['login'];
    $pass = $_POST['code'];
    if ( checkPassword ($login, $pass) )
    {
        echo "1";
    }
    else
    {
        echo "0";
    }
}
else if ( $_POST['action'] == 'update' and isset ($_POST['login']) )
{
// On récupère le login
    $login = $_POST['login'];

    $email = $login . '@student.42.fr';
    $pass = generatePassPhrase ();
    $subject = "Votre (nouvelle) passphrase";
    $message = "Voici votre passphrase: " . $pass
            . "\nVous pouvez l'entrer dès maintenant.";

    if ( updateUserToDatabase ($login, $pass) )
    {
        // Si on arrive à envoyer le mail, alors on affiche 1
        /* if ( mail ($email, $subject, $message) )
          {
          echo "1";
          } */
        if ( true )
        {
            echo "1";
        }
        else
        {
            echo "0";
        }
    }
    else
    {
        echo "-1";
    }
    /** @TODO Enlever cette bligne */
    echo $message;
}