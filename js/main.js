/*
 * main.js
 *  @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
 */
$("#submit").click(function() {
    var pseudoText;
    var pwdText;
    var md5Pseudo;
    var md5Pwd;

    pseudoText = $('#pseudo').val();
    pwdText = $('#password').val();

    if (pseudoText != "" && pwdText != "") {
        console.log("Valeurs valides.");
        console.log("Encryptage des valeurs en md5...");
        md5Pseudo = pidCrypt.MD5(pseudoText);
        md5Pwd = pidCrypt.MD5(pwdText);
        console.log("Encryptage termine.");
        console.log("--- Valeurs MD5 ---");
        console.log(md5Pseudo);
        console.log(md5Pwd);
        console.log("-------------------");

        console.log("Initalisation de la connection...");
        initConnection(md5Pseudo, md5Pwd);
    }
});


