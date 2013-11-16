<?php


include_once './functions.php';

// On nettoie les données contenues dans POST
sanitizePost ();

var_dump($_POST);
if ( isset ($_POST['login']) and isset ($_POST['code']) )
{
    $login = $_POST['login'];
    $code = $_POST['code'];
    unset($_POST['login']);
    unset($_POST['code']);
    var_dump($_POST);
    foreach ($_POST as $key => $value)
    {
        insertOrUpdateSkill($login, $code,$key, $value);
    }
    echo "1";
}
else
{
    echo "0";
}