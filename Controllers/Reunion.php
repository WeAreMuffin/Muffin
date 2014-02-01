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

class Reunion extends Controller
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

/**
     * @PathInfo('user/competence')
     */
    public function proposer ($params)
    {

        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam ('user');
        $render = "0";
        $competence = $this->getUrlParam ('competence');
        if ($login and $competence)
	{
	    $c = Moon::get('c_competences', 'id_competence', $competence);
	    ($c->nom_usuel == NULL ? $c = $c->nom_competence : $c = $c->nom_usuel);
            $cpt = new Entities("c_user_competences[id_user=\"$login\"][id_competence=\"$competence\"]");
            if ($cpt)
            {
                $i = array ("id_propose" => $_SESSION['muffin_id'],
                    "id_demande" => $login, "competence" => $competence);
                $res = Core::getBdd ()->insert ($i, 'c_echanges');
		$this->notifier($_SESSION["login"]." voudrait vous aider sur le projet / la notion ".$c, $login);
                $render = "1";
            }
        }
        echo ($render);
    }


    /**
     * @PathInfo('user/competence')
     */
    public function accepter($params)
    {

        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam ('user');
        $render = "0";
        $competence = $this->getUrlParam ('competence');
        if ($login and $competence)
	{
	    $c = Moon::get('c_competences', 'id_competence', $competence);
	    ($c->nom_usuel == NULL ? $c = $c->nom_competence : $c = $c->nom_usuel);
            $cpt = new Entities("c_echanges[id_propose=\"$login\"][competence=\"$competence\"]");
            if ($cpt)
            {
                $i = array ("id_demande" => $_SESSION['muffin_id'],
                    "id_propose" => $login, "competence" => $competence);
                $res = Core::getBdd ()->update (array("resume" => "accepte"), 'c_echanges', $i);
		$this->notifier($_SESSION["login"]." a accepté votre aide sur le projet / la notion ".$c, $login);
                $render = "1";
            }
        }
        echo ($render);
    }

    /**
     * @PathInfo('user/competence')
     */
    public function bien($params)
    {

        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam ('user');
        $render = "0";
        $competence = $this->getUrlParam ('competence');
        if ($login and $competence)
	{
	    $c = Moon::get('c_competences', 'id_competence', $competence);
	    ($c->nom_usuel == NULL ? $c = $c->nom_competence : $c = $c->nom_usuel);
            $cpt = new Entities("c_echanges[id_propose=\"$login\"][competence=\"$competence\"][resume=\"accepte\"]");
            if ($cpt)
            {
                $i = array ("id_demande" => $_SESSION['muffin_id'],
                    "id_propose" => $login, "competence" => $competence);
                $res = Core::getBdd ()->update (array("resume" => "bien"), 'c_echanges', $i);

		/* This user doesn't need help anymore ! Mission complete ! :D */
		$res = Core::getBdd ()->update (array("want_to_learn" => 0), 'c_user_competences',
		    array("id_user" => $_SESSION['muffin_id'], "id_competence" => $competence));
		$this->notifier($_SESSION["login"]." vous remercie de l'avoir aidé sur le projet / la notion ".$c, $login);
                $render = "1";
            }
        }
        echo ($render);
    }

    /**
     * @PathInfo('user/competence')
     */
    public function pasbien($params)
    {

        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam ('user');
        $render = "0";
        $competence = $this->getUrlParam ('competence');
        if ($login and $competence)
	{
	    $c = Moon::get('c_competences', 'id_competence', $competence);
	    ($c->nom_usuel == NULL ? $c = $c->nom_competence : $c = $c->nom_usuel);
            $cpt = new Entities("c_echanges[id_propose=\"$login\"][competence=\"$competence\"][resume=\"accepte\"]");
            if ($cpt)
            {
                $i = array ("id_demande" => $_SESSION['muffin_id'],
                    "id_propose" => $login, "competence" => $competence);
                $res = Core::getBdd ()->update (array("resume" => "pasbien"), 'c_echanges', $i);
		$this->notifier($_SESSION["login"]." vous remercie de l'avoir aidé sur le projet / la notion ".$c, $login);
                $render = "1";
            }
        }
        echo ($render);
    }


    protected function notifier($message, $id)
    {
	$i = array ("id_user" => $id, "message" => $message);
	$res = Core::getBdd()->insert($i, 'c_notifications');
	return ($res);
    }

    public function oldhelp ($params)
    {
        $this->registerParams ($params);
        $user = $_SESSION['muffin_id'];

        $q = "  SELECT *
                FROM c_user_competences uc
                    INNER JOIN c_competences c
                    ON uc.id_competence = c.id_competence
                    INNER JOIN c_user u
                    ON uc.id_user = u.id
                WHERE id_user != :id
                    AND want_to_learn = 1
                    AND c.nom_competence IN (
                        SELECT nom_competence
                        FROM c_user_competences ucb
                        INNER JOIN c_competences cb
                        ON ucb.id_competence = cb.id_competence
                        WHERE id_user = :idu AND ucb.want_to_teach = 1 AND cb.expired = 1);
            ";
        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("id" => $user,"idu" => $user));
        $res = $r->fetchAll(PDO::FETCH_CLASS);
        $this->addData("users_to_help", $res);
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
