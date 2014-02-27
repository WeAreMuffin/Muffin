<?php
require_once 'generate_rsa_key.php';
/*
 * Generate rsa key
 */
//if (!generate_key()) {
//    $error = TRUE;
//} else {
//    $error = FALSE;
//}

/*
 * Load rsa key
 */
$filenames = array(
    "privateKey" => "private/private",
    "publicKey" => "private/public"
);
if (!load_key($filenames)) {
    $error = TRUE;
} else {
    $error = FALSE;
}
?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Cryptage RSA</title>
        <script src="js/jquery/jquery.js"></script>
        <script src="js/pidcrypt/pidcrypt.js"></script>
        <script src="js/pidcrypt/pidcrypt_util.js"></script>
        <script src="js/pidcrypt/asn1.js"></script>
        <script src="js/pidcrypt/jsbn.js"></script>
        <script src="js/pidcrypt/prng4.js"></script>
        <script src="js/pidcrypt/rng.js"></script>
        <script src="js/pidcrypt/rsa.js"></script>
        <script src="js/pidcrypt/md5.js"></script>
    </head>
    <body>
        <?php
        if ($error) :
            ?>
            <div class="error"
            <?php
        endif;
        ?>
             <div class="form">
                <label for="login">Pseudo</label>
                <input type="text" id="pseudo" name="pseudo" />
                <label for="password">Password</label>
                <input type="password" id="password" class="password" />
                <button id="submit">Envoyer</button>
            </div>
            <script src="js/certParser.js"></script>
            <script src="js/send_data.js"></script>
            <script src="js/connection.js"></script>
            <script src="js/main.js"></script>
    </body>
</html>