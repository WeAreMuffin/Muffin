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

class Echanges extends Controller
{

    /*
     * Va etre apellée par défaut.
     */
    public function index ($params)
    {
        $this->registerParams ($params);
        $user = $_SESSION['muffin_id'];
        $want_to_learn = new Entities ("c_user_competences[id_user=$user][want_to_learn=1]");

        $q = "  SELECT * 
                FROM c_user_competences uc 
                    INNER JOIN c_competences c 
                    ON uc.id_competence = c.id_competence 
                    INNER JOIN c_user u
                    ON uc.id_user = u.id
                    INNER JOIN c_42_logins cl
                    ON u.login = cl.login_eleve
		    LEFT JOIN c_echanges e
		    ON e.id_demande = u.id AND e.competence = c.id_competence
                WHERE id_user != :id 
                    AND want_to_learn = 1 
                    AND c.nom_competence IN (
                        SELECT nom_competence 
                        FROM c_user_competences ucb 
                        INNER JOIN c_competences cb 
                        ON ucb.id_competence = cb.id_competence 
                        WHERE id_user = :idu AND ucb.want_to_teach = 1 AND cb.expired = 0);
            ";
        $q_2 = "  SELECT * 
                FROM c_user_competences uc 
                    INNER JOIN c_competences c 
                    ON uc.id_competence = c.id_competence 
                    INNER JOIN c_user u
                    ON uc.id_user = u.id
                    INNER JOIN c_42_logins cl
                    ON u.login = cl.login_eleve
		    LEFT JOIN c_echanges e
		    ON e.id_propose = u.id AND e.competence = c.id_competence
                WHERE id_user != :id 
                    AND want_to_teach = 1 
                    AND c.nom_competence IN (
                        SELECT nom_competence 
                        FROM c_user_competences ucb 
                        INNER JOIN c_competences cb 
                        ON ucb.id_competence = cb.id_competence 
                        WHERE id_user = :idu AND ucb.want_to_learn = 1 AND cb.expired = 0);
            ";

        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("id" => $user,"idu" => $user));
        $res = $r->fetchAll(PDO::FETCH_CLASS);

        $r_2 = $bd->prepare($q_2);
        $r_2->execute(array("id" => $user,"idu" => $user));
        $res_2 = $r_2->fetchAll(PDO::FETCH_CLASS);

        $this->addData("want_to_learn", $want_to_learn);
        $this->addData("users_to_help", $res);
        $this->addData("users_can_help", $res_2);
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

 
    public function oldneed ($params)
    {
        $this->registerParams ($params);
        $user = $_SESSION['muffin_id'];
        $want_to_learn = new Entities ("c_user_competences[id_user=$user][want_to_learn=1]");
        $q_2 = "  SELECT * 
                FROM c_user_competences uc 
                    INNER JOIN c_competences c 
                    ON uc.id_competence = c.id_competence 
                    INNER JOIN c_user u
                    ON uc.id_user = u.id
                WHERE id_user != :id 
                    AND want_to_teach = 1 
                    AND c.nom_competence IN (
                        SELECT nom_competence 
                        FROM c_user_competences ucb 
                        INNER JOIN c_competences cb 
                        ON ucb.id_competence = cb.id_competence 
                        WHERE id_user = :idu AND ucb.want_to_learn = 1 AND cb.expired = 1);
            ";
        $bd = Core::getBdd()->getDb();
        $r_2 = $bd->prepare($q_2);
        $r_2->execute(array("id" => $user,"idu" => $user));
        $res_2 = $r_2->fetchAll(PDO::FETCH_CLASS);
        $this->addData("users_can_help", $res_2);
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
