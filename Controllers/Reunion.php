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
        $this->addData("inscrit", $this->get_reunions_aray());
        $this->addData("feedback", $this->get_feedback_aray());
        $this->addData('aujourdhui', $this->get_reunions_today());
        $this->addData('past', $this->get_reunions_past());
        $this->addData('future', $this->get_reunions_future());
        $this->render();
    }

    /*
     * Les réunions de l'utilisateur
     */
    public function mine ($params)
    {
        $this->addData("inscrit", $this->get_reunions_aray(true));
        $this->addData("feedback", $this->get_feedback_aray(true));
        $this->addData('aujourdhui', $this->get_reunions_today(true));
        $this->addData('past', $this->get_reunions_past(true));
        $this->addData('future', $this->get_reunions_future(true));
        $this->render();
    }

    public function create ($params)
    {
        $this->addData('competences', new Entities("c_competences"));
        $this->addData('types', new Entities("c_reunion_type"));
        $this->addData('user_role', Role::getUserAuth($_SESSION['muffin_id']));
        $this->render();
    }

     /**
     * @PathInfo('id')
     * Va supprimer une réunion.
     */
    public function delete ($params)
    {
        $id = $this->getUrlParam("id");
        $this->registerParams($params);
        $auteur = $_SESSION["muffin_id"];
        $reunion = new Entities ("c_reunion[reunion_id=\"{$id}\"][reunion_organisateur=\"{$auteur}\"]");

        if (count($reunion) == 1)
        {

            $reunion = $reunion->current();
            //---------------
            $participants = new Entities ("c_reunion_participe[id_reunion=\"{$id}\"]");
            foreach ($participants as $key => $user) {
                $i = array ("id_user" => $user->id_user, "message" => "La réunion sur ".$reunion->c_competences->nom_competence." a été annulée");
                $res = Core::getBdd()->insert($i, 'c_notifications');
            }
            //---------------

            Core::getBdd ()->delete ('c_reunion_participe', array ("id_reunion" => $id));
            if (Core::getBdd ()->delete ('c_reunion', array ("reunion_id" => $id, "reunion_organisateur" => $auteur)))
            {
                echo "1";
            }
            else
            {
                echo "0";
            }
        }
    }

    protected function get_reunions_today($me = false)
    {

        $q = "  SELECT *
                FROM  `c_reunion` r
                INNER JOIN `c_user` u ON r.reunion_organisateur = u.id
                INNER JOIN `c_42_logins` lo ON u.login = lo.login_eleve
                INNER JOIN `c_reunion_type` rt ON r.reunion_type = rt.id_type
                LEFT JOIN  `c_competences` c ON r.reunion_competence = c.id_competence
                WHERE DATE(`reunion_date`) = CURRENT_DATE() AND `reunion_date` > NOW()
                AND r.reunion_organisateur ".($me ? "=" : "!=")." :uid;
            ";
        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("uid" => $_SESSION['muffin_id']));
        $res = $r->fetchAll(PDO::FETCH_CLASS);
        return($res);
    }

    protected function get_reunions_future($me = false)
    {

        $q = "  SELECT *
                FROM  `c_reunion` r
                INNER JOIN `c_user` u ON r.reunion_organisateur = u.id
                INNER JOIN `c_42_logins` lo ON u.login = lo.login_eleve
                INNER JOIN `c_reunion_type` rt ON r.reunion_type = rt.id_type
                LEFT JOIN  `c_competences` c ON r.reunion_competence = c.id_competence
                WHERE DATE(`reunion_date`) > CURRENT_DATE() AND `reunion_date` > NOW()
                AND r.reunion_organisateur ".($me ? "=" : "!=")." :uid;
            ";
        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("uid" => $_SESSION['muffin_id']));
        $res = $r->fetchAll(PDO::FETCH_CLASS);
        return($res);
    }

    protected function get_reunions_past($me = false)
    {

        $q = "  SELECT *
                FROM  `c_reunion` r
                INNER JOIN `c_user` u ON r.reunion_organisateur = u.id
                INNER JOIN `c_42_logins` lo ON u.login = lo.login_eleve
                INNER JOIN `c_reunion_type` rt ON r.reunion_type = rt.id_type
                LEFT JOIN  `c_competences` c ON r.reunion_competence = c.id_competence
                WHERE `reunion_date` < NOW()
                AND r.reunion_organisateur ".($me ? "=" : "!=")." :uid;
            ";
        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("uid" => $_SESSION['muffin_id']));
        $res = $r->fetchAll(PDO::FETCH_CLASS);
        return($res);
    }


    protected function get_reunions_aray($me = false)
    {

        $q = "  SELECT *
                FROM  `c_reunion` r
                LEFT JOIN  `c_reunion_participe` rp ON r.reunion_id = rp.id_reunion
                WHERE rp.id_user = :id GROUP BY r.reunion_id
                AND r.reunion_organisateur ".($me ? "=" : "!=")." :id;
            ";
        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("id" => $_SESSION['muffin_id']));
        $res = $r->fetchAll(PDO::FETCH_CLASS);
        $result = array();
        foreach ($res as $key => $value) {
            $result[] = $value->reunion_id;
        }
        return ($result);
    }

    protected function get_feedback_aray($me = false)
    {

        $q = "  SELECT *
                FROM  `c_reunion` r
                LEFT JOIN  `c_reunion_participe` rp ON r.reunion_id = rp.id_reunion
                WHERE rp.id_user = :id AND rp.feedback IS NOT NULL GROUP BY r.reunion_id
                AND r.reunion_organisateur ".($me ? "=" : "!=")." :id;
            ";
        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("id" => $_SESSION['muffin_id']));
        $res = $r->fetchAll(PDO::FETCH_CLASS);
        $result = array();
        foreach ($res as $key => $value) {
            $result[] = $value->reunion_id;
        }
        return ($result);
    }

    /**
     * @PathInfo('competence')
     */
    public function getModal ($params)
    {
        $competence = $this->getUrlParam ('competence');
        $c = "quelque chose";
        if ($competence)
        {
		    $c = new Entities('c_competences[id_competence="'.$competence.'"]');
		    ($c->nom_usuel == NULL ? $c = $c->current()->nom_competence : $c = $c->current()->nom_usuel);
        }
        $this->addData('competence', $c);
        $this->addData('competence_id', $competence);
        echo $this->getRenderedHtml("reunion.modal.new");
    }

    protected function alertInterestedPeopleForNewReunion($reunion, $competence)
    {
        $reunion = Moon::get('c_reunion', 'reunion_id', $reunion);
        $users = new Entities("c_user_competences[id_competence=\"{$competence}\"][want_to_learn=\"1\"]");
        $c = new Entities("c_competences[id_competence=\"{$competence}\"]");
        ($c->nom_usuel == NULL ? $c = $c->current()->nom_competence : $c = $c->current()->nom_usuel);
        $users->loadFromDatabase();
        var_dump($users);
        foreach ($users as $key => $user)
        {
            $user_to_help = Moon::get('c_user', 'id', $user->id_user);
            echo "ready to send mail to ".$user_to_help->login;
            $mail = new MuffinMail($user_to_help);
            $mail->sendUserReunionCanInterest($reunion, $_SESSION['login'], $c);
        }
    }

    public function nouvelle ($params)
    {
        $render = "0";
        $lieu = $this->filterPost("lieu");
        $text = $this->filterPost("texte");
        $date = $this->filterPost("date");
        $time = $this->filterPost("time");
        $duree = $this->filterPost("duree");
        $type = $this->filterPost("type");
        $competence = $this->filterPost('competence');
        if ($competence)
		{
            /*

			> Permet de brider l'ajout de reunions. A decommenter si necessaire.

            $cpt = new Entities("c_reunion[reunion_organisateur=\"".$_SESSION['muffin_id']."\"][reunion_competence=\"$competence\"]");
            if (count($cpt) == 0)
            {
            */
                $i = array ("reunion_organisateur" => $_SESSION['muffin_id'],
                    "reunion_competence" => $competence, "reunion_texte" => $text, "reunion_type" => $type,
                    "reunion_date" => $date." ".$time.":00", "reunion_duree" => $duree, "reunion_lieu" => $lieu);
                $res = Core::getBdd ()->insert ($i, 'c_reunion');
                $this->alertInterestedPeopleForNewReunion($res, $competence);
				//$this->notifier($_SESSION["login"]." voudrait vous aider sur le projet / la notion ".$c, $login);
                $render = "1";
            /*
            }
            */
        }
        echo ($render);
    }


    /**
     * @PathInfo('reunion')
     */
    public function participer($params)
    {
        $render = "0";
        $reunion = $this->getUrlParam ('reunion');
        if ($reunion)
    	{
            $cpt = new Entities("c_reunion_participe[id_user=\"".$_SESSION['muffin_id']."\"][id_reunion=\"$reunion\"]");
            if (count($cpt) == 0)
            {
                $res = Core::getBdd ()->insert (array ("id_user" => $_SESSION['muffin_id'], "id_reunion" => $reunion), 'c_reunion_participe');
                $render = "1";
            }
            else if (count($cpt) > 0)
            {
                $i = array ("id_user" => $_SESSION['muffin_id'], "id_reunion" => $reunion);
                $res = Core::getBdd ()->delete('c_reunion_participe', $i);
                $render = "-1";
            }
    }
        echo ($render);
    }

    /**
     * @PathInfo('reunion/feedback')
     */
    public function feedback($params)
    {

        // On récupère le login fourni dans l'url
        $reunion = $this->getUrlParam ('reunion');
        $render = "0";
        $feedback = $this->getUrlParam ('feedback');
        if ($reunion and $feedback)
        {
            $cpt = new Entities("c_reunion_participe[id_user=\"".$_SESSION['muffin_id']."\"][id_reunion=\"$reunion\"]");
            if (count($cpt) > 0)
            {
                $i = array ("id_user" => $_SESSION['muffin_id'],
                    "id_reunion" => $reunion);
                $render = Core::getBdd ()->update (array("feedback" => $feedback), 'c_reunion_participe', $i);
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
        {
            header("./?redirect=Reunion");
            echo "<script>document.location = '?redirect=Reunion'</script";
            return false;
        }
    }
}

?>
