/*
 * connection.js
 * Sources https://www.pidder.de/pidcrypt/?page=demo_rsa-encryption
 * @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
 */
function initConnection(pseudo, pwd) {
    $.get("get_public_key.php", function(publicKey) {
        var rsa;
        var crypted;
        var params;
        var pk;
        var asn;
        var tree;
        var pseudo_crypt;
        var pwd_crypt;

        console.log("Reception de la cle publique...");
        if (publicKey === undefined || publicKey == "")
            console.log("Connection error.");
        else {
            console.log("Cle public recue.");
            
            console.log("Traitement de la cle publique...");
            params = certParser(publicKey);
            if (params.b64) {
                console.log("Cle public ok.");
                
                console.log("Debut de l'encryptage des donees.");
                pk = pidCryptUtil.decodeBase64(params.b64);
                rsa = new pidCrypt.RSA();

                asn = pidCrypt.ASN1.decode(pidCryptUtil.toByteArray(pk));
                tree = asn.toHexTree();
                rsa.setPublicKeyFromASN(tree);
                
                console.log("Encryption en cours...");
                pseudo_crypt = rsa.encrypt(pseudo);
                pwd_crypt = rsa.encrypt(pwd);
                crypted = {
                    pseudo: pidCryptUtil.fragment(pidCryptUtil.encodeBase64(pidCryptUtil.convertFromHex(pseudo_crypt)), 64),
                    password: pidCryptUtil.fragment(pidCryptUtil.encodeBase64(pidCryptUtil.convertFromHex(pwd_crypt)), 64)
                };
                
                console.log("Identifiants cryptés.");
                console.log("Preparation de l'envoi au serveur.");
                send_data(crypted, "login");
            }
        }
    });
}

