<?php

include_once './functions.php';

// On nettoie les données contenues dans POST
sanitizePost ();

$message = '
<html>
<head>
  <title>Birthday Reminders for August</title>
</head>
<body>
  <p>Here are the birthdays upcoming in August!</p>
  <table>
    <tr>
      <th>Person</th><th>Day</th><th>Month</th><th>Year</th>
    </tr>
    <tr>
      <td>Joe</td><td>3rd</td><td>August</td><td>1970</td>
    </tr>
    <tr>
      <td>Sally</td><td>17th</td><td>August</td><td>1973</td>
    </tr>
  </table>
</body>
</html>
';


// On récupère le login
$login = $_POST['login'];

$email = $login . '@student.42.fr';
$pass = generatePassPhrase ();
$subject = "Muffin - Votre muffinpass";
$message = "Voici votre muffinpass: [ $pass ]\n"
        . "Vous pouvez l'entrer dès maintenant sur http://muffin.lambdaweb.fr avec votre uid ($login).";
$headers = 'From: Muffin <no-reply@lambdaweb.fr>';

if ( $_POST['action'] == 'register' and isset ($_POST['login']) )
{
    if ( loginExists ($login) == false and saveUserToDatabase ($login, $pass) )
    {
        // Si on arrive à envoyer le mail, alors on affiche 1
        if ( mail ($email, $subject, $message, $headers) )
            echo "1";
        else
            echo "0";
    }
    else
        echo "-1";
}
else if ( $_POST['action'] == 'checkCode' and isset ($_POST['login']) and isset ($_POST['code']) )
{
    $pass = $_POST['code'];
    if ( checkPassword ($login, $pass) )
        echo "1";
    else
        echo "0";
}
else if ( $_POST['action'] == 'update' and isset ($_POST['login']) )
{
    if ( updateUserToDatabase ($login, $pass) )
    {
        // Si on arrive à envoyer le mail, alors on affiche 1
        if ( mail ($email, $subject, $message, $headers) )
            echo "1";
        else
            echo "0";
    }
    else
        echo "-1";
}