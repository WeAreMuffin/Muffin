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

function sendAlternativeMail($from, $to, $subject, $message)
{
	$cmd = escapeshellcmd("echo \"{$message}\" | mail -s '{$subject}' -r {$from} {$to}");
	$e = exec($cmd);
	return ($e);
}

function testAlternativeMail()
{
	$a = array("bonjour", "comment", "ca", "va <b>bien</b> ?", "<html><body><p>petit <i>con</i></p></body></html>");
	foreach ($a as $key => $value) {
		var_dump(sendAlternativeMail("test@muffin.lambdaweb.fr", "andre.aubin.ldaw@gmail.com", "test", $value));
	}
}

?>
