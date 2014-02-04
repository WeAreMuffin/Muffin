<?php

/*
 * Copyright 2013 lambda2.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 *
 * This file is part of the moon framework.
 *
 * (c) 2013 Lambdaweb - www.lambdaweb.fr
 *
 *
 * @author lambda2
 */

require "Mail.php";
require 'Mail/mime.php';

/**
* The Muffin specific Mail class.
* @uses PEAR Mail
* @uses PEAR Mail_mime
*/
class MuffinMail
{
	/*
	 * The different kind of mails that the MuffinMail can send,
	 * and wich can requires specific authorizations.
	 */
	protected $available_types = array(
	    "auth_help" => 1,
	    "auth_news" => 2,
	    "auth_vers" => 4
	);

	protected $debug = false;
	protected $debug_addr = "contact@lambdaweb.fr";

	protected $dest;
	protected $mail_type;

	protected $from = "no-reply@muffin.lambdaweb.fr";
	protected $subject = "Muffin";
	protected $content = "";
	protected $htmlContent = "";

	protected $charset = 'utf-8';


	function __construct($user)
	{
		$this->dest = $user;
	}

	public function sendMuffinPass($pass)
	{
		// Text content
		$this->content = "Hey ".$this->dest->login." ! C'était pas trop tot !\n";
		$this->content .= "Voici ton Muffinpass : [ ".$pass." ]\n";
		$this->content .= "Tu peux dès maintenant te connecter sur muffin.lambdaweb.fr\n";

		// Html content
		$this->htmlContent = $this->getHtmlHeader();
		$this->htmlContent .= "<h2>Hey ".$this->dest->login." !</h2>";
		$this->htmlContent .= "<p>Voici ton Muffinpass</p><h3 class='squared'>".$pass."</h3>";
		$this->htmlContent .= "<p>Tu peux dès maintenant te connecter sur <a href='http://muffin.lambdaweb.fr'>muffin.lambdaweb.fr</a></p>\n";
		$this->htmlContent .= $this->getHtmlFooter();

		// The mail subject
		$this->subject = "Muffin · Bienvenue !";
		$this->from = "hello@muffin.lambdaweb.fr";
		return $this->sendMail();
	}

	public function reSendMuffinPass($pass)
	{
		// Text content
		$this->content = "Re-bonjour ".$this->dest->login." !\n";
		$this->content .= "Voici ton nouveau Muffinpass : [ ".$pass." ]\n";
		$this->content .= "Tu peux dès maintenant te connecter sur muffin.lambdaweb.fr\n";

		// Html content
		$this->htmlContent = $this->getHtmlHeader();
		$this->htmlContent .= "<h2>Re-bonjour ".$this->dest->login." !</h2>";
		$this->htmlContent .= "<p style='font-size: 14px;'>Voici ton nouveau Muffinpass</p><div style='margin: 10px;'><h3 style='margin: auto; display: block;background-color: #C02942;border: 1px solid #882737;padding: 2px 15px;color: #FFF;border-radius: 3px;'class='squared'>".$pass."</h3></div>";
		$this->htmlContent .= "<p>Tu peux dès maintenant te connecter sur <a href='http://muffin.lambdaweb.fr'>muffin.lambdaweb.fr</a></p>\n";
		$this->htmlContent .= $this->getHtmlFooter();

		// The mail subject
		$this->subject = "Muffin · Muffinpass oublié !";
		return $this->sendMail();
	}

	protected function getMime()
	{
		$crlf = "\n";

		$mime = new Mail_mime(array(
		                      'eol' => $crlf,
		                      'head_charset' => $this->charset,
		                      'text_charset' => $this->charset,
		                      'html_charset' => $this->charset
		                      ));

		$mime->setTXTBody($this->content);
		$mime->setHTMLBody($this->htmlContent);

		return ($mime);
	}

	protected function getSmtp()
	{
		$params = array();
		$params["debug"] = false;//$this->debug;
		$params["host"] = "smtp.lambdaweb.fr";
		$params["port"] = 587;
		$params["auth"] = true;
		$params["username"] = "andre.aubin@lambdaweb.fr";
		$params["password"] = Core::opts()->database->pass;

		$smtp =& Mail::factory('smtp', $params);
		return ($smtp);
	}

	protected function sendMail()
	{
		$mime = $this->getMime();
		$smtp = $this->getSmtp();

		$body = $mime->get();

		if ($this->debug)
			$recipients = $this->debug_addr;
		else
		{
			if ($this->dest->mail)
				$recipients = $this->dest->mail;
			else
				$recipients = $this->dest->login . "@student.42.fr";
		}

		$headers = array();
		$headers['From']    = $this->from;
		$headers['Subject'] = $this->subject;
		$headers['To'] = $recipients;
		$hdrs = $mime->headers($headers);

		$result = $smtp->send($recipients, $hdrs, $body);

		if ($this->debug)
		{
			$elts = PEAR::isError($smtp);
			Debug::getInstance()->log("Mail envoyé [$recipients]", 0);
			Debug::getInstance()->log($elts, 0);
		}
		return ($result);
	}

	protected function getHtmlHeader()
	{
		$HEADER =
<<<'EOT'
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<!-- If you delete this tag, the sky will fall on your head -->
<meta name="viewport" content="width=device-width">

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Muffin</title>


<style type="text/css">
/* -------------------------------------
		GLOBAL
------------------------------------- */
* {
	margin:0;
	padding:0;
}
* { font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; }

img {
	max-width: 100%;
}
.collapse {
	margin:0;
	padding:0;
}
body {
	-webkit-font-smoothing:antialiased;
	-webkit-text-size-adjust:none;
	width: 100%!important;
	height: 100%;
}


/* -------------------------------------
		HEADER
------------------------------------- */
table.head-wrap { width: 100%;}

.header.container table td.logo { padding: 15px; }
.header.container table td.label { padding: 15px; padding-left:0px;}


/* -------------------------------------
		BODY
------------------------------------- */
table.body-wrap { width: 100%;}


/* -------------------------------------
		FOOTER
------------------------------------- */
table.footer-wrap { width: 100%;	clear:both!important;
}
.footer-wrap .container td.content  p { border-top: 1px solid rgb(215,215,215); padding-top:15px;}
.footer-wrap .container td.content p {
	font-size:10px;
	font-weight: bold;

}


/* -------------------------------------
		TYPOGRAPHY
------------------------------------- */
h1,h2,h3,h4,h5,h6 {
font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; line-height: 1.1; margin:15px;
}
h1 small, h2 small, h3 small, h4 small, h5 small, h6 small { font-size: 60%; line-height: 0; text-transform: none; }

h1 { font-weight:900; font-size: 34px; color: #999;}
h2 { font-weight:900; font-size: 27px;}
h3 { font-weight:900; font-size: 24px;}
h4 { font-weight:900; font-size: 23px;}
h5 { font-weight:900; font-size: 17px;}


/* ---------------------------------------------------
		RESPONSIVENESS
		Nuke it from orbit. It's the only way to be sure.
------------------------------------------------------ */

/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
.container {
	display:block!important;
	max-width:800px!important;
	margin:0 auto!important; /* makes it centered */
    text-align: center;
	clear:both!important;
}

/* This should also be a block element, so that it will fill 100% of the .container */
.content {padding:15px;max-width:600px;margin:0 auto;display:block;
}

/* Let's make sure tables in the content area are 100% wide */
.content table { width: 100%; }


/* Be sure to place a .clear element after each set of columns, just to be safe */
.clear { display: block; clear: both; }


/* -------------------------------------------
		PHONE
		For clients that support media queries.
		Nothing fancy.
-------------------------------------------- */
@media only screen and (max-width: 800px) {

	a[class="btn"] { display:block!important; margin-bottom:10px!important; background-image:none!important; margin-right:0!important;}

	div[class="column"] { width: auto!important; float:none!important;}

	table.social div[class="column"] {
		width:auto!important;
	}

}

/* On fait les resets standards */
a {
    color: #50463E;
}

body {
    color: #413E4A;
    font-family: Geneva,HelveticaNeue,Verdana,sans-serif;
    text-align: center;
}

#banner
{
		padding: 0;
		margin: 0;
	max-width:800px;
	margin:0 auto;
	display:block;
}

p
{
	text-align: center;
	color: #666;
}
h3
{
	text-align: center;
	color: #999;
}

h2
{
	text-align: center;
	color: #50463E;
	padding-bottom: 5px;
	border-bottom: 1px solid #CCC;
}

#redcode
{
	display: block;background-color: #C02942;border: 1px solid #882737;padding: 2px 15px;color: #FFF;border-radius: 3px;
}

.squared
{
	display: block;background-color: #C02942;border: 1px solid #882737;padding: 2px 15px;color: #FFF;border-radius: 3px;
}
</style>
</head>

<body cz-shortcut-listen="true">


<!-- BODY -->
<table class="body-wrap">
	<tbody><tr>
		<td></td>
		<td class="container">

			<div class="content" style='padding:15px;max-width:800px;margin:0 auto;display:block;'>
			<table>
				<tbody><tr>
					<td>


<img id="banner" width="100%" src="http://lambdaweb.fr/muffin/bannerw.png">

<!-- Texte du mail -->
EOT;
		return ($HEADER);
	}

	protected function getHtmlFooter()
	{
		return "</td></tr></tbody></table></div></td><td></td></tr></tbody></table></body></html>";
	}

    /**
     * Gets the value of debug.
     *
     * @return mixed
     */
    public function getDebug()
    {
        return $this->debug;
    }

    /**
     * Sets the value of debug.
     *
     * @param mixed $debug the debug
     *
     * @return self
     */
    public function setDebug($debug)
    {
        $this->debug = $debug;

        return $this;
    }

    /**
     * Gets the value of debug_addr.
     *
     * @return mixed
     */
    public function getDebug_addr()
    {
        return $this->debug_addr;
    }

    /**
     * Sets the value of debug_addr.
     *
     * @param mixed $debug_addr the debug_addr
     *
     * @return self
     */
    public function setDebug_addr($debug_addr)
    {
        $this->debug_addr = $debug_addr;

        return $this;
    }

    /**
     * Gets the value of dest.
     *
     * @return mixed
     */
    public function getDest()
    {
        return $this->dest;
    }

    /**
     * Sets the value of dest.
     *
     * @param mixed $dest the dest
     *
     * @return self
     */
    public function setDest($dest)
    {
        $this->dest = $dest;

        return $this;
    }

    /**
     * Gets the value of mail_type.
     *
     * @return mixed
     */
    public function getMail_type()
    {
        return $this->mail_type;
    }

    /**
     * Sets the value of mail_type.
     *
     * @param mixed $mail_type the mail_type
     *
     * @return self
     */
    public function setMail_type($mail_type)
    {
        $this->mail_type = $mail_type;

        return $this;
    }

    /**
     * Gets the value of from.
     *
     * @return mixed
     */
    public function getFrom()
    {
        return $this->from;
    }

    /**
     * Sets the value of from.
     *
     * @param mixed $from the from
     *
     * @return self
     */
    public function setFrom($from)
    {
        $this->from = $from;

        return $this;
    }

    /**
     * Gets the value of subject.
     *
     * @return mixed
     */
    public function getSubject()
    {
        return $this->subject;
    }

    /**
     * Sets the value of subject.
     *
     * @param mixed $subject the subject
     *
     * @return self
     */
    public function setSubject($subject)
    {
        $this->subject = $subject;

        return $this;
    }

    /**
     * Gets the value of content.
     *
     * @return mixed
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Sets the value of content.
     *
     * @param mixed $content the content
     *
     * @return self
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Gets the value of htmlContent.
     *
     * @return mixed
     */
    public function getHtmlContent()
    {
        return $this->htmlContent;
    }

    /**
     * Sets the value of htmlContent.
     *
     * @param mixed $htmlContent the html content
     *
     * @return self
     */
    public function setHtmlContent($htmlContent)
    {
        $this->htmlContent = $htmlContent;

        return $this;
    }

    /**
     * Gets the value of charset.
     *
     * @return mixed
     */
    public function getCharset()
    {
        return $this->charset;
    }

    /**
     * Sets the value of charset.
     *
     * @param mixed $charset the charset
     *
     * @return self
     */
    public function setCharset($charset)
    {
        $this->charset = $charset;

        return $this;
    }
}

?>
