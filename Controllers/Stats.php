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

class Stats extends Controller
{

    /*
     * Va etre apellée par défaut.
     */
    public function index ($params)
    {
    	$u_all_c = "SELECT COUNT(*) as c FROM c_42_logins";
    	$u_insc_c = "SELECT DISTINCT COUNT(u.id) as c FROM c_user u";
    	$u_actif_c = "SELECT DISTINCT u.id as c FROM c_user_competences uc INNER JOIN c_user u ON uc.id_user = u.id";

		$top_ten_c = "SELECT COUNT( * ) AS c, u.login AS l
						FROM c_echanges e
						INNER JOIN c_user u ON e.id_propose = u.id
						GROUP BY e.id_propose
						ORDER BY c DESC
						LIMIT 0 , 10";

        $bd = Core::getBdd()->getDb();

        $all = 0 + $bd->query($u_all_c)->fetchObject()->c;
		$insc = 0 + $bd->query($u_insc_c)->fetchObject()->c;
		$actif = $bd->query($u_actif_c)->rowCount();
		$top_ten_data = array();
		$top_ten_logins = array();
		$top_ten_max = 0;
		foreach  ($bd->query($top_ten_c) as $user)
		{
			$top_ten_logins[] = '"'.$user['l'].'"';
			$top_ten_data[] = $user['c'];
			if ($user['c'] > $top_ten_max)
				$top_ten_max = $user['c'];
		}
		$top_ten_logins = "[".implode(', ', $top_ten_logins).']';
		$top_ten_data = "[".implode(', ', $top_ten_data).']';

        $actif = ($actif);
        $inactif = $insc - $actif;
        $noninscrit = $all - $insc;

        $this->addData("all", $all);
        $this->addData("insc", $insc);
        $this->addData("actif", $actif);
        $this->addData("inactif", $inactif);
        $this->addData("noninscrit", $noninscrit);
        $this->addData("top_ten_data", $top_ten_data);
        $this->addData("top_ten_max", $top_ten_max);
        $this->addData("top_ten_logins", $top_ten_logins);
        $this->render ();
    }

    /*   =======================================================================
     *                      Surcharge pour l'accès membre
     *   =======================================================================
     */

    public function grantAccess ()
    {
        if ( isset ($_SESSION['login']) )
            return true;
        else
            return false;
    }
}

?>
