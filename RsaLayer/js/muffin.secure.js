/*
 * This file is part of Muffin.
 *
 * (c) 2014 Lambdaweb - www.lambdaweb.fr
 *
 * @see @WeAreMuffin/Muffin
 * @author lambda2
 */

(function()
{
	if (Muffin == undefined)
	{
		var Muffin = {};
		window.Muffin = Muffin;
	}

	Muffin.Secure = {};

	Muffin.Secure.ConnectionLayer = function(element)
	{
		var _this = this;

		this.connectButton = element;
		this.shaLogin = "";
		this.shaPass = "";
		console.log("click", this.login, this.pass, this);

		if (typeof(element) != "object")
		{
			this.connectButton = $(element);
		}
		if (this.connectButton.length)
		{
			$(this.connectButton).click(function()
			{
				_this.login = $('#pseudo').val();
				_this.pass = $('#password').val();
				console.log("click", _this.login, _this.pass, _this);
			    if (_this.login != "" && _this.pass != "") {
			        console.log("Valeurs valides.");
			        console.log("Encryptage des valeurs en SHA1...", _this.login);
			        _this.shaLogin = pidCrypt.SHA1(_this.login);
			        _this.shaPass = pidCrypt.SHA1(_this.pass);
			        console.log("Encryptage termine.");
			        console.log("--- Valeurs SHA1 ---");
			        console.log(_this.shaLogin);
			        console.log(_this.shaPass);
			        console.log("-------------------");

			        console.log("Initalisation de la connection...");
			        _this.initConnection();
			    }

			});
		}
	}

	Muffin.Secure.ConnectionLayer.prototype.initConnection = function()
	{
		/*
		 * From @C0r3y8/Rsa.
		 * @link https://github.com/C0r3y8/Rsa/blob/master/js/connection.js
		 *
		 * connection.js
		 * Sources https://www.pidder.de/pidcrypt/?page=demo_rsa-encryption
		 * @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
		 */
		var _this = this;
	    $.get("get_public_key.php", function(publicKey)
	    {
	        var rsa;
	        var params;
	        var pk;
	        var asn;
	        var tree;
	        var pseudo_crypt;
	        var pwd_crypt;

	        console.log("Reception de la cle publique...");
	        if (publicKey === undefined || publicKey == "")
	            console.log("Connection error.");
	        else
	        {
	            console.log("Cle public recue.");

	            console.log("Traitement de la cle publique...");
	            params = certParser(publicKey);
	            if (params.b64)
	            {
	                console.log("Cle publique ok.");

	                console.log("Debut de l'encryptage des donees.");
	                pk = pidCryptUtil.decodeBase64(params.b64);
	                rsa = new pidCrypt.RSA();

	                asn = pidCrypt.ASN1.decode(pidCryptUtil.toByteArray(pk));
	                tree = asn.toHexTree();
	                rsa.setPublicKeyFromASN(tree);

	                console.log("Encryption en cours...");
	                pseudo_crypt = rsa.encrypt(_this.shaLogin);
	                pwd_crypt = rsa.encrypt(_this.shaPass);

	                _this.crypted =
	                {
	                    pseudo: pidCryptUtil.fragment(pidCryptUtil.encodeBase64(pidCryptUtil.convertFromHex(pseudo_crypt)), 64),
	                    password: pidCryptUtil.fragment(pidCryptUtil.encodeBase64(pidCryptUtil.convertFromHex(pwd_crypt)), 64)
	                };

	                console.log("Identifiants cryptés.");
	                console.log("Preparation de l'envoi au serveur.");
	                _this.sendData("login");
	            }
	        }
	    });
	}

	Muffin.Secure.ConnectionLayer.prototype.sendData = function(type)
	{
		/*
		 * From @C0r3y8/Rsa.
		 * @link https://github.com/C0r3y8/Rsa/blob/master/js/send_data.js
		 *
		 * send_data.js
		 * @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
		 */
	    switch (type)
	    {
	        case "login" :
	            console.log("Envoi des donnees cryptees...");
	            $.post("valid_connection.php", this.crypted, function(ans)
	            {
	                console.log("Donnees envoyees.");
	                if (ans != "" && ans !== undefined)
	                {
	                    $(".form").append('<div><br>Resultat du decryptage serveur:<br>' + ans + '</div>');
	                    console.log("End");
	                }
	                else
	                    console.log("Error aucune reponse du serveur");
	            });
	        	break;
	        default:
	        	console.log("Undefined data sended. Aborting.");
	    }
	}

})();
