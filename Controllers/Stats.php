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

		$top_ten_c = "SELECT COUNT( * ) AS c, l.nom AS n, l.prenom AS p, u.login AS l
						FROM c_echanges e
						INNER JOIN c_user u ON e.id_propose = u.id
						INNER JOIN c_42_logins l ON u.login = l.login_eleve
						GROUP BY e.id_propose
						ORDER BY c DESC
						LIMIT 0 , 10";

		$num_r = "SELECT COUNT( * ) AS c FROM c_echanges e";

        $bd = Core::getBdd()->getDb();
        $all = 0 + $bd->query($u_all_c)->fetchObject()->c;
		$insc = 0 + $bd->query($u_insc_c)->fetchObject()->c;
		$actif = $bd->query($u_actif_c)->rowCount();
        $count_exch = 0 + $bd->query($num_r)->fetchObject()->c;
		$top_ten_data = array();
		$top_ten_logins = array();
		$top_ten_max = 0;


		$best_bien_c = "SELECT u.login, l.nom, l.prenom, COUNT( id_propose ) AS c
						FROM c_echanges e
						INNER JOIN c_user u ON e.id_propose = u.id
						INNER JOIN c_42_logins l ON u.login = l.login_eleve
						WHERE e.resume = 'bien'
						GROUP BY id_propose
						ORDER BY c DESC
						LIMIT 1";

		$best_bien = $bd->query($best_bien_c)->fetchObject();
		($best_bien != NULL) ? ($best_bien_login = $best_bien->login) : ($best_bien_login = 0);


		$best_accepte_c = "SELECT u.login, l.nom, l.prenom, COUNT( id_propose ) AS c
						FROM c_echanges e
						INNER JOIN c_user u ON e.id_propose = u.id
						INNER JOIN c_42_logins l ON u.login = l.login_eleve
						WHERE e.resume != 'attente' AND u.login NOT LIKE '".$best_bien_login
						."' GROUP BY id_propose
						ORDER BY c DESC
						LIMIT 1";

		$best_accepte = $bd->query($best_accepte_c)->fetchObject();
		($best_accepte != NULL) ? ($best_accepte_login = $best_accepte->login) : ($best_accepte_login = 0);


		$best_proposer_c = "SELECT u.login, l.nom, l.prenom, COUNT( id_propose ) AS c
						FROM c_echanges e
						INNER JOIN c_user u ON e.id_propose = u.id
						INNER JOIN c_42_logins l ON u.login = l.login_eleve
						WHERE u.login NOT LIKE '".$best_accepte_login
						."' AND u.login NOT LIKE '".$best_bien_login
						."' GROUP BY id_propose
						ORDER BY c DESC
						LIMIT 1";

		$best_proposer = $bd->query($best_proposer_c)->fetchObject();

		foreach  ($bd->query($top_ten_c) as $user)
		{
			$top_ten_logins[] = '"'.ucfirst(strtolower($user['p'])).' '.ucfirst(strtolower($user['n'])).'"';
			$top_ten_data[] = $user['c'];
			if ($user['c'] > $top_ten_max)
				$top_ten_max = $user['c'];
		}
		$top_ten_logins = "[".implode(', ', $top_ten_logins).']';
		$top_ten_data = "[".implode(', ', $top_ten_data).']';

        $actif = ($actif);
        $inactif = $insc - $actif;
        $noninscrit = $all - $insc;

        ($count_exch > 150 && $best_proposer != NULL && $best_accepte != NULL && $best_bien != NULL )
	        ? ($remarquable = 1)
	        : ($remarquable = 0);

        $this->addData("all", $all);
        $this->addData("insc", $insc);
        $this->addData("actif", $actif);
        $this->addData("inactif", $inactif);
        $this->addData("noninscrit", $noninscrit);
        $this->addData("top_ten_data", $top_ten_data);
        $this->addData("top_ten_max", $top_ten_max);
        $this->addData("top_ten_logins", $top_ten_logins);
        $this->addData("remarquable", $remarquable);
        $this->addData("remain", 150 - $count_exch);
        $this->addData("best_proposer", $best_proposer);
        $this->addData("best_accepte", $best_accepte);
        $this->addData("best_bien", $best_bien);
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
