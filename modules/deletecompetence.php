<?php


include_once './functions.php';

// On nettoie les données contenues dans POST
sanitizePost ();

var_dump($_POST);
if ( isset ($_POST['login']) and isset ($_POST['code']) and isset ($_POST['comp']))
{
    $login = $_POST['login'];
    $code = $_POST['code'];
    $code = $_POST['comp'];
    var_dump($_POST);
    deleteSkill($login, $code, $comp);
    echo "1";
}
else
{
    echo "0";
}