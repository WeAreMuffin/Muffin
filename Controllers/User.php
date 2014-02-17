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


class User extends Controller
{

    /*
     * Va etre apellée par défaut.
     */
    public function index ($params)
    {
        $this->prepareHomeData($params);
        $this->render ();
    }

    /*
     * Page d'accueil
     */
    public function home ($params)
    {
        $this->prepareHomeData($params);
        $this->render ();
    }

    /**
     * @PathInfo('user')
     * Page d'utilisateur quelconque
     */
    public function p ($params)
    {
        $this->registerParams ($params);
        $login = $this->getUrlParam('user');
        $user = Moon::get ('c_user', 'login', $login);
        if ($user)
        {
            $this->prepareUserData($login, $user);
            $this->render ();
        }
    }


    protected function prepareUserData($login, $user)
    {
        $this->registerParams ($params);
        $uid = $user->id;
        $infos = Moon::get ('c_42_logins', 'login_eleve', $login);

        $q = "  SELECT DISTINCT *
                FROM c_echanges e
                    INNER JOIN c_competences c
                    ON e.competence = c.id_competence
                    INNER JOIN c_user_competences uc
                    ON uc.id_competence = c.id_competence AND uc.id_user = e.id_propose
                    INNER JOIN c_user u
                    ON e.id_propose = u.id
                    INNER JOIN c_42_logins cl
                    ON u.login = cl.login_eleve
                WHERE
                    e.id_demande = :id AND e.resume = 'attente'
                ORDER BY e.resume DESC
            ";

        $q2 = "  SELECT DISTINCT *
                FROM c_echanges e
                    INNER JOIN c_competences c
                    ON e.competence = c.id_competence
                    INNER JOIN c_user_competences uc
                    ON uc.id_competence = c.id_competence AND uc.id_user = e.id_propose
                    INNER JOIN c_user u
                    ON e.id_demande = u.id
                    INNER JOIN c_42_logins cl
                    ON u.login = cl.login_eleve
                WHERE
                    e.id_propose = :id AND e.resume = 'accepte'
                ORDER BY e.resume DESC
            ";

        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("id" => $uid));
        $demandes = $r->fetchAll(PDO::FETCH_CLASS);

        $r = $bd->prepare($q2);
        $r->execute(array("id" => $uid));
        $propositions = $r->fetchAll(PDO::FETCH_CLASS);

        $news = $bd->query("SELECT * FROM c_news c ORDER BY c.date DESC LIMIT 0,5")->fetchAll(PDO::FETCH_CLASS);
        $drafts = $bd->query("SELECT * FROM c_drafts c
                             WHERE c.public > 0 AND c.draft_author != ".$_SESSION['muffin_id']
                             ." ORDER BY c.draft_date_c DESC LIMIT 0,5")->fetchAll(PDO::FETCH_CLASS);

        /* Premiere visite ? */
        if ($user->first_visit == 1)
        {
            $this->addData ('take_a_tour', true);
            $this->setVisited();
        }
        else
        {
            $this->addData ('take_a_tour', false);
        }

        $this->addData ('nom', ucfirst (strtolower ($infos->nom)));
        $this->addData ('user', $user);
        $this->addData ('infos', $infos);
        $this->addData ('news', $news);
        $this->addData ('reunions', $this->get_future_reunions());
        $this->addData ('drafts', $drafts);
        $this->addData ('rank', $this->getRank($uid));
        $this->addData ('count', $this->getCount());
        $this->addData ('demandes', $demandes);
        $this->addData ('propositions', $propositions);
    }



    protected function prepareHomeData($params)
    {
        $this->registerParams ($params);
        $uid = $_SESSION['muffin_id'];
        $infos = Moon::get ('c_42_logins', 'login_eleve', $_SESSION['login']);
        $user = Moon::get ('c_user', 'id', $uid);

        $q = "  SELECT DISTINCT *
                FROM c_echanges e
                    INNER JOIN c_competences c
                    ON e.competence = c.id_competence
                    INNER JOIN c_user_competences uc
                    ON uc.id_competence = c.id_competence AND uc.id_user = e.id_propose
                    INNER JOIN c_user u
                    ON e.id_propose = u.id
                    INNER JOIN c_42_logins cl
                    ON u.login = cl.login_eleve
                WHERE
                    e.id_demande = :id AND e.resume = 'attente'
                ORDER BY e.resume DESC
            ";

        $q2 = "  SELECT DISTINCT *
                FROM c_echanges e
                    INNER JOIN c_competences c
                    ON e.competence = c.id_competence
                    INNER JOIN c_user_competences uc
                    ON uc.id_competence = c.id_competence AND uc.id_user = e.id_propose
                    INNER JOIN c_user u
                    ON e.id_demande = u.id
                    INNER JOIN c_42_logins cl
                    ON u.login = cl.login_eleve
                WHERE
                    e.id_propose = :id AND e.resume = 'accepte'
                ORDER BY e.resume DESC
            ";

        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("id" => $uid));
        $demandes = $r->fetchAll(PDO::FETCH_CLASS);

        $r = $bd->prepare($q2);
        $r->execute(array("id" => $uid));
        $propositions = $r->fetchAll(PDO::FETCH_CLASS);

        $news = $bd->query("SELECT * FROM c_news c ORDER BY c.date DESC LIMIT 0,5")->fetchAll(PDO::FETCH_CLASS);
        $drafts = $bd->query("SELECT * FROM c_drafts c
                             WHERE c.public > 0 AND c.draft_author != ".$_SESSION['muffin_id']
                             ." ORDER BY c.draft_date_c DESC LIMIT 0,5")->fetchAll(PDO::FETCH_CLASS);

        /* Premiere visite ? */
        if ($user->first_visit == 1)
        {
            $this->addData ('take_a_tour', true);
            $this->setVisited();
        }
        else
        {
            $this->addData ('take_a_tour', false);
        }

        $this->addData ('nom', ucfirst (strtolower ($infos->nom)));
        $this->addData ('user', $user);
        $this->addData ('infos', $infos);
        $this->addData ('news', $news);
        $this->addData ('reunions', $this->get_future_reunions());
        $this->addData ('drafts', $drafts);
        $this->addData ('rank', $this->getRank($uid));
        $this->addData ('count', $this->getCount());
        $this->addData ('demandes', $demandes);
        $this->addData ('propositions', $propositions);
    }



    protected function get_future_reunions($me = false)
    {

        $q = "  SELECT *
                FROM  `c_reunion` r
                INNER JOIN `c_user` u ON r.reunion_organisateur = u.id
                INNER JOIN `c_42_logins` lo ON u.login = lo.login_eleve
                INNER JOIN `c_reunion_type` rt ON r.reunion_type = rt.id_type
                LEFT JOIN  `c_competences` c ON r.reunion_competence = c.id_competence
                WHERE `reunion_date` > NOW()
                AND (r.reunion_organisateur ".($me ? "=" : "!=")." :uid);
            ";
        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("uid" => $_SESSION['muffin_id']));
        $res = $r->fetchAll(PDO::FETCH_CLASS);
        return($res);
    }

    /**
     * Will return the rank associated with the given id.
     */
    private function getRank($id)
    {
        $bd = Core::getBdd()->getDb();
        $rank = 0;
        $top_c = "SELECT COUNT( * ) AS c, u.id AS i
                        FROM c_echanges e
                        INNER JOIN c_user u ON e.id_propose = u.id
                        INNER JOIN c_42_logins l ON u.login = l.login_eleve
                        GROUP BY e.id_propose
                        ORDER BY c DESC";

        foreach  ($bd->query($top_c) as $user)
        {
            $rank++;
            if ($user['i'] == $id)
                break;
        }
        if ($rank == 1)
            $rank = "<span class='top-one'>$rank<sup>er</sup></span>";
        else if ($rank == 2)
            $rank = "<span class='top-two'>$rank<sup>ème</sup></span>";
        else if ($rank == 3)
            $rank = "<span class='top-three'>$rank<sup>ème</sup></span>";
        else if ($rank <= 10)
            $rank = "<span class='top-ten'>$rank<sup>ème</sup></span>";
        else if ($rank <= 50)
            $rank = "<span class='top-cinquante'>$rank<sup>ème</sup></span>";
        else
            $rank = "<span class='top-other'>$rank<sup>ème</sup></span>";

        return ($rank);
    }

    /**
     * Will return the total user count
     */
    private function getCount()
    {
        $bd = Core::getBdd()->getDb();
        $u_insc_c = "SELECT DISTINCT COUNT(u.id) as c FROM c_user u";
        $insc = 0 + $bd->query($u_insc_c)->fetchObject()->c;
        return ($insc);
    }

    /**
     * @Ajax
     * @deprecated since 2.1
     */
    public function getstatus ($params)
    {
	    echo("{}");
    }

    private function setVisited()
    {
        Core::getBdd()->update (array("first_visit" => 0), 'c_user', array ("id" => $_SESSION['muffin_id']));
    }


    private function dataIsUpToDate()
    {
        Core::getBdd()->update (array("verifie" => 1), 'c_user', array ("id" => $_SESSION['muffin_id']));
    }

    private function dataIsNotUpToDate()
    {
        Core::getBdd()->update (array("verifie" => 0), 'c_user', array ("id" => $_SESSION['muffin_id']));
    }

    private function dataIsNotUpToDateForAll()
    {
        Core::getBdd()->update (array("verifie" => 0), 'c_user', NULL);
    }

    /**
     * @Ajax
     */
    public function me ($params)
    {
        $is_cached_q = "SELECT verifie as v FROM c_user WHERE id = ".$_SESSION['muffin_id'].";";
        $bd = Core::getBdd()->getDb();
        $is_cached = 0 + $bd->query($is_cached_q)->fetchObject()->v;
        $r = "";

        if ($is_cached)
        {
            $s = false;
            $r = apc_fetch($_SESSION['muffin_id']."_me", $s);
            if ($s == false)
            {
                $formDataJson = $this->generateJsFormData ();
                $checkedRadios = $this->getCheckedRadios ();
                $this->addData ('formDataJson', $formDataJson);
                $this->addData ('checkedRadios', $checkedRadios);
                $r = $this->getRenderedHtml('user.index.me');
                apc_store($_SESSION['muffin_id']."_me", $r);
                $this->dataIsUpToDate();
            }
        }
        else
        {
            $formDataJson = $this->generateJsFormData ();
            $checkedRadios = $this->getCheckedRadios ();
            $this->addData ('formDataJson', $formDataJson);
            $this->addData ('checkedRadios', $checkedRadios);
            $r = $this->getRenderedHtml('user.index.me');
            apc_store($_SESSION['muffin_id']."_me", $r);
            $this->dataIsUpToDate();
        }

        echo ($r);
    }

    public function update ($params)
    {
        $old_pass = $this->filterPost ('o_pass_uid');
        $new_pass = $this->filterPost ('n_pass_uid');
        $new_pass_c = $this->filterPost ('c_pass_uid');
        $user = Moon::get ('c_user', 'id', $_SESSION['muffin_id']);
        $this->apply_email_preferences($user);
        if ( !isNull ($old_pass) and !isNull ($new_pass) and !isNull ($new_pass_c) )
        {
            if ( $user->pass == sha1 ($old_pass) )
            {
                if ( $new_pass == $new_pass_c )
                {
                    Core::getBdd ()->update (
                            array ("pass" => sha1 ($new_pass)), 'c_user', array ("id" => $_SESSION['muffin_id']));
                        echo "1";
                    $this->dataIsNotUpToDate();
                }
                else
                    echo "Les deux mots de passe doivent correspondre";
            }
            else
                echo "Ancien mot de passe incorrect";
        }
        else if ( !isNull ($old_pass) or !isNull ($new_pass) or !isNull ($new_pass_c) )
        {
            echo "Les champs sont incomplets";
        }
        else
        {
            echo "1";
        }
    }

    protected function apply_email_preferences($user)
    {
        $wtl = $this->filterPost('radio_email_wth');
        $reu = $this->filterPost('radio_email_reunion');
        $public = $this->filterPost('c_public_uid');

        $old = $user->accept_mail;
        if ($wtl == "1")
            $old = $old | 1;
        else
            $old = $old & 30;

        if ($reu == "1")
            $old = $old | 8;
        else
            $old = $old & 23;

        $ret = Core::getBdd ()->update (
                array ("comp_public" => $public, "accept_mail" => $old),
                'c_user', array ("id" => $_SESSION['muffin_id']));
    }

    protected function updatePublic ($public)
    {
        return ($ret);
    }

    public function updatecompetence ($params)
    {
        $wtl = $this->filterPost ('want_to_learn');
        $wtt = $this->filterPost ('want_to_teach');
        $id = $this->filterPost ('id_competence');
        $lvl = $this->filterPost ('niveau');

        $assoc = new Entities ("c_user_competences[id_user=\"{$_SESSION['muffin_id']}\"][id_competence=\"{$id}\"]");

        if ( count ($assoc) == 1 )
        {
            $u = array ("niveau" => $lvl,
                "want_to_learn" => $wtl == null ? '0' : $wtl,
                "want_to_teach" => $wtt == null ? '0' : $wtt);
            $res = Core::getBdd ()->update (
                    $u, 'c_user_competences', array ("id_user" => $_SESSION['muffin_id'], "id_competence" => $id));
            $this->dataIsNotUpToDate();
        }
        else
        {
            $i = array ("id_user" => $_SESSION['muffin_id'],
                "id_competence" => $id, "niveau" => $lvl,
                "want_to_learn" => $wtl == null ? '0' : $wtl,
                "want_to_teach" => $wtt == null ? '0' : $wtt);
            $res = Core::getBdd ()->insert ($i, 'c_user_competences');
            $this->dataIsNotUpToDate();
        }
        ($res != 0) ? ($ret = "1") : ($ret = "0");
        echo $ret;
    }

    public function deletecompetence ($params)
    {
        $id = $this->filterPost ('id_competence');
        $res = Core::getBdd ()->delete ('c_user_competences', array ("id_user" => $_SESSION['muffin_id'], "id_competence" => $id));
        ($res != 0) ? ($ret = "1") : ($ret = "0");
        $this->dataIsNotUpToDate();
        echo $ret;
    }

    public function addcompetence ($params)
    {
        $id = false;
        $icone = "sale";
        $nom_joli = strtolower ($this->filterPost ('nom_competence'));
        $desc = strtolower ($this->filterPost ('desc_competence'));
        $type = strtolower ($this->filterPost ('type_competence'));
        $nom_brut = '_' . htmlentities (str_replace (
                                array (' ', '+', '#'), array ('_', 'plus', 'diese'), $nom_joli
        ));
        $cmp = new Entities ("c_competences[nom_competence=\"{$nom_brut}\"]");
        if ( preg_match ('/[<>?"\']+/', $nom_joli) > 0 || count ($cmp) > 0 )
        {
            echo "-1";
        }
        else if ( $id = Core::getBdd ()->insert (
                array ("nom_competence" => $nom_brut,
                    "nom_usuel" => $nom_joli, "description" => $description,
                    "type_competence" => $type, "icone" => $icone), 'c_competences') )
        {
            $this->dataIsNotUpToDate();
            $this->addOrUpdateTags ($id, json_decode ($_POST["modal-new-comp-tags"]));
            $nom_joli = ucfirst (htmlentities ($nom_joli));
            $new = Moon::get ("c_competences", "id_competence", $id);
            $this->dataIsNotUpToDateForAll();
            echo $this->getJsonCodeForElement ($new);
        }
        else
        {
            echo "0";
        }
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
                return false;
    	}
    }

    /*   =======================================================================
     *        Toutes les fonctions concernant les données de formulaire
     *   =======================================================================
     */

    /**
     * Va retourner le bout de code Json compatible [MakeForms] pour la compétence
     * décrite en parametre
     * @param Entity $elt l'objet de l'élément, généré par Moon::getAllHeavy
     * @return string le code Json
     *
     * @see Moon#getAllHeavy
     */
    protected function getJsonCodeForElement ($elt)
    {
        $bname = htmlentities (ucfirst ($elt->nom_usuel != null ? $elt->nom_usuel : $elt->nom_competence));
        $name = htmlentities ($elt->nom_competence);
        $icone = ($elt->icone != null ? $elt->icone : "uniF002");
        $this->addData ('bname', $bname);
        $this->addData ('name', $name);
        $this->addData ('icon', $icone);
        $this->addData ('id_competence', $elt->id_competence);
        $tpl = $this->getRenderedHtml ("user.form.element");
        return $tpl;
    }

    /**
     * Va retourner le code json de l'ensemble des compétences, et l'assigner
     * à la variable "window.items".
     * @return string le code Json
     * @deprecated since 1.5
     */
    protected function generateJsFormData ()
    {
        $f = array();

        for ($i = 3, $c = 0; $i > 0; $i--, $c++)
        {
            $datas = array ();
            $e = new Entities('c_competences[type_competence="'.$i.'"]');
            $e->loadFromDatabase();
            foreach ($e->getEntities() as $competence)
            {
                $datas[] = $this->getJsonCodeForElement ($competence);
            }
	    if ($i == 3 || $i == 2)
		$datas = array_reverse($datas);
            $f[$c] = '<li data-index="'. ($c + 1) .'">' . implode ('', $datas) . "</li>";
        }
        $final = implode ('', $f);
        return ($final);
    }

    /**
     * Va retourner la liste des radios checkées
     * @return string la liste (json)
     */
    protected function getCheckedRadios ()
    {
        $datas = array ();
        $id_user = $_SESSION['muffin_id'];
        $competences = new Entities ("c_user_competences[id_user=$id_user]");
        foreach ($competences as $key => $competence)
        {
            $nom = $competence->c_competences->nom_competence;
            if ( $competence->want_to_learn == "1" )
                $datas[] = '"wtl_' . $nom . '"';
            if ( $competence->want_to_teach == "1" )
                $datas[] = '"wtt_' . $nom . '"';
            $datas[] = '"' . $nom . "_" . $competence->niveau . '"';
        }
        return implode (",", $datas);
    }

	public function addkeyword($params)
	{
		$id_competence = $this->filterPost("id_competence");
		$keywords = $this->filterPost("keywords");
		if ($id_competence)
		{
			if ($keywords == NULL)
				$keywords = "general";
			if (Core::getBdd()->update(
					array("wtl_keyword" => $keywords),
					"c_user_competences",
					array("id_user" => $_SESSION['muffin_id'], "id_competence" => $id_competence)))
			{
				echo "1";
			}
			else
				echo "0";
		}
	}

    /*   =======================================================================
     *        Toutes les fonctions concernant les tags de compétences
     *   =======================================================================
     */

    public function tagscompetence ($params)
    {
        $comp = Moon::getAll ('c_categories');
        $tab = array ();
        foreach ($comp as $key => $value)
        {
            $tab[] = '"' . $value["nom"] . '"';
        }
        echo ("[" . implode (",", $tab) . "]");
    }

    protected function addCategorie ($name)
    {
        $i = array ("nom" => $name, "description" => "");
        $res = Core::getBdd ()->insert ($i, 'c_categories');
        return ($res);
    }

    protected function addOrUpdateTags ($id, $tags)
    {
        foreach ($tags as $tag)
        {
            $cat = new Entities ("c_categories[nom=\"{$tag}\"]");

            /** On crée si besoin, et on récupere l'id */
            if ( count ($cat) == 0 )
            {
                $id_cat = $this->addCategorie ($tag);
            }
            else
            {
                $id_cat = $cat->current ()->id_categorie;
            }

            /* On insere le tag */
            $assoc = new Entities ("c_tags[id_competence=\"{$id}\"][id_categorie=\"{$id_cat}\"]");
            if ( count ($assoc) != 1 )
            {
                $i = array ("id_competence" => $id, "id_categorie" => $id_cat);
                $res = Core::getBdd ()->insert ($i, 'c_tags');
            }
        }
    }

}
