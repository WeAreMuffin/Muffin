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

class Notification extends Controller
{

    /*
     * Va etre apellée par défaut.
     */
    public function index ($params)
    {
    	echo "0";
    	return (false);
    }

    public function getCount($params)
    {
    	if (isset ($_SESSION['login']))
    	{
    		$cpt = new Entities('c_notifications[id_user="'.$_SESSION["muffin_id"].'"][vu=0]');
    		echo (count($cpt));
    	}
    	else
    		echo "0";
    }

    public function readLastNew($params)
    {
    	if (isset ($_SESSION['login']))
    	{
    		$cpt = new Entities('c_notifications[id_user="'.$_SESSION["muffin_id"].'"][vu=0]');
    		if ($cpt)
    		{
    			Core::getBdd()->update (array("vu" => 1), 'c_notifications',
    				array ("id_notification" => $cpt->current()->id_notification));
    			echo "1";
    		}
    		else
    			echo "0";
    	}
    	else
    		echo "0";
    }

    public function getLastNew($params)
    {
    	if (isset ($_SESSION['login']))
    	{
    		$cpt = new Entities('c_notifications[id_user="'.$_SESSION["muffin_id"].'"][vu=0]');
    		if ($cpt)
    		{
    			echo ($cpt->current()->message);
    		}
    		else
    		{
    			echo "Pas de nouvelle notification.";
    		}
    	}
    	else
    		echo "0";
    }

    public function getNew($params)
    {
    	if (isset ($_SESSION['login']))
    	{
    		$cpt = new Entities('c_notifications[id_user="'.$_SESSION["muffin_id"].'"][vu=0]');
    		$cpt->loadFromDatabase();
    		$this->addData("notifications", $cpt);
    		Core::getBdd()->update (array("vu" => 1), 'c_notifications', array ("id_user" => $_SESSION['muffin_id']));
    		$this->render();
    	}
    	else
    		echo "0";
    }

    public function get($params)
    {
    	if (isset ($_SESSION['login']))
    	{
    		$cpt = new Entities('c_notifications[id_user="'.$_SESSION["muffin_id"].'"]');
    		$cpt->setOrder("date");
    		$cpt->setOrderSort("desc");
    		$cpt->loadFromDatabase();
    		$this->addData("notifications", $cpt);
    		Core::getBdd()->update (array("vu" => 1), 'c_notifications', array ("id_user" => $_SESSION['muffin_id']));
    		$this->render();
    	}
    	else
    		echo "0";
    }

    /*   =======================================================================
     *                      Surcharge pour l'accès membre
     *   =======================================================================
     */

    public function grantAccess ()
    {
    	return true;
    }
}

?>
