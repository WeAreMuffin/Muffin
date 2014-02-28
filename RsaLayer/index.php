<?php
require_once 'generate_rsa_key.php';

/*
 * Load rsa key
 */
$filenames = array(
    "privateKey" => "private/private",
    "publicKey" => "private/public"
);

if (!load_key($filenames))
{
    $error = TRUE;
}
else
{
    $error = FALSE;
}

?>

<!DOCTYPE html>

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
        <script src="js/pidcrypt/sha1.js"></script>
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
            <script src="js/muffin.secure.js"></script>
            <script>
                var connexion = new Muffin.Secure.ConnectionLayer("#submit");
            </script>
    </body>
</html>
