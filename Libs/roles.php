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


/**
* The Muffin specific Role class
*/
class Role
{
	static $USER = 1;
	static $ATELIER = 2;
	static $MODERATOR = 4;
	static $ADMIN = 8;

	function __construct($user)
	{
	}

	public static function getUserAuth($id)
	{
		$user = Moon::get ('c_user', 'id', $id);
		if ($user->exists())
		{
			return ($user->auths);
		}
		return (0);
	}

	public static function allowed($userId, $ressource)
	{
		return (self::getUserAuth($userId) & $ressource);
	}

	public static function isUser($id)
	{
		return (self::allowed($id, self::$USER));
	}

	public static function isAdmin($id)
	{
		return (self::allowed($id, self::$ADMIN));
	}

	public static function isAdminWithRole($role)
	{
		return ($role & self::$ADMIN);
	}

}

?>
