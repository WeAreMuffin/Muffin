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
	if (window.Muffin == undefined)
	{
		var Muffin = {};
		window.Muffin = Muffin;
	}

	Muffin.Secure = {};

	window.Muffin.Secure.ConnectionLayer = function(opts)
	{
		var _this = this;

		this.opts = {
			button: '[data-secure-button="rsa"]',
			loginField: "#input-login",
			passField: "#input-pass42",
			onSuccess: undefined,
			onError: undefined,
		};

		if (opts !== undefined)
		{
			this.opts = _.extend(this.opts, this.opts, opts);
		}

		this.shaLogin = "";
		this.shaPass = "";
		console.log("click", this.login, this.pass, this.opts);

		if (typeof(this.opts.button) != "object" && this.opts.button != "manual")
		{
			this.opts.button = $(this.opts.button);
		}
		if (this.opts.button.length && this.opts.button != "manual")
		{
			$(this.opts.button).click(function()
			{
				_this.run();
			});
		}
	}

	window.Muffin.Secure.ConnectionLayer.prototype.run = function(opts)
	{
		if (opts !== undefined)
		{
			this.opts = _.extend(this.opts, this.opts, opts);
		}
		this.login = $(this.opts.loginField).val();
		this.pass = $(this.opts.passField).val();
		console.log("click", this.login, this.pass, this);
	    if (this.login != "" && this.pass != "")
	    {
	        this.shaLogin = this.login; /* pidCrypt.SHA1(this.login); */
	        this.shaPass = this.pass; /* pidCrypt.SHA1(this.pass); */
	        console.log("Encryptage termine.");
	        console.log("Initalisation de la connection...");
	        this.initConnection();
	    }
	}

	window.Muffin.Secure.ConnectionLayer.prototype.initConnection = function()
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
	    $.get("Secure/getPublicKey", function(publicKey)
	    {
	        var rsa;
	        var params;
	        var pk;
	        var asn;
	        var tree;
	        var pseudo_crypt;
	        var pwd_crypt;

	        console.log("Reception de la cle publique...");
	        if (publicKey === undefined || publicKey == "{}")
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
	                    login: pidCryptUtil.fragment(pidCryptUtil.encodeBase64(pidCryptUtil.convertFromHex(pseudo_crypt)), 64),
	                    pass42: pidCryptUtil.fragment(pidCryptUtil.encodeBase64(pidCryptUtil.convertFromHex(pwd_crypt)), 64)
	                };

	                console.log("Identifiants cryptés.");
	                console.log("Preparation de l'envoi au serveur.");
	                _this.sendData("login");
	            }
	        }
	    });
	}

	window.Muffin.Secure.ConnectionLayer.prototype.sendData = function(type)
	{
		/*
		 * From @C0r3y8/Rsa.
		 * @link https://github.com/C0r3y8/Rsa/blob/master/js/send_data.js
		 *
		 * send_data.js
		 * @author: Stéphane Barale (C0r3y8) stephane.barale@gmail.com
		 */
		var _this = this;
	    switch (type)
	    {
	        case "login" :
	            console.log("Envoi des donnees cryptees...");
	            $.post("Login/tryToLogIn/", this.crypted, function(ans)
	            {
	                console.log("Donnees envoyees.");

	            	if (ans == "1" && _this.opts.onSuccess != undefined)
	            	{
	            		_this.opts.onSuccess(ans, _this.opts.instance);
	            	}
	            	else if (ans != "1" && _this.opts.onError != undefined)
	            	{
	            		_this.opts.onError(ans, _this.opts.instance);
	            	}
	            });
	        	break;
	        default:
	        	console.log("Undefined data sended. Aborting.");
	    }
	}

})();
