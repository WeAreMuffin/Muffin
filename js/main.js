/*
 * main.js
 *  @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
 */
$("#submit").click(function() {
    var pseudoText;
    var pwdText;
    var sha1Pseudo;
    var sha1Password;

    pseudoText = $('#pseudo').val();
    pwdText = $('#password').val();

    if (pseudoText != "" && pwdText != "") {
        console.log("Valeurs valides.");
        console.log("Encryptage des valeurs en SHA1...");
        sha1Pseudo = pidCrypt.SHA1(pseudoText);
        sha1Password = pidCrypt.SHA1(pwdText);
        console.log("Encryptage termine.");
        console.log("--- Valeurs SHA1 ---");
        console.log(sha1Pseudo);
        console.log(sha1Password);
        console.log("-------------------");

        console.log("Initalisation de la connection...");
        initConnection(sha1Pseudo, sha1Password);
    }
});


