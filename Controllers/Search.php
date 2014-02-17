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

class Search extends Controller
{

    public function index ($params)
    {
        $this->rejectAccess();
    }

    /**
     *
     * @PathInfo('login')
     */
    public function user($params)
    {
        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam ('login');
        $infos = new Entities('c_user[login="'.$login.'"][comp_public="1"]');
        $render = "0";

        if ( count($infos) == 1 )
        {
            $user = Moon::get ('c_42_logins', 'login_eleve', $login);
            $login = $infos->current()->id;
            $formDataJson = $this->generateJsFormData ($login);
            $checkedRadios = $this->getCheckedRadios ($login);
            $this->addData ('user', $user);
            $this->addData ('formDataJson', $formDataJson);
            $this->addData ('checkedRadios', $checkedRadios);
            $this->render ();
        }
        echo $render;
    }

    /**
     *
     * @PathInfo('login')
     */
    public function users($params)
    {
        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam('login');
        $q = "SELECT login FROM c_user WHERE login LIKE :login AND comp_public = 1";
        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("login" => '%'.$login.'%'));
        $res = $r->fetchAll(PDO::FETCH_COLUMN);
        echo(json_encode($res));
    }

    /**
     * The main search function
     * @TODO confidentialité
     */
    public function searchall($params)
    {
        // On récupère le login fourni dans l'url
        $query = $this->filterPost('search');
        $users = $this->searchGlobalUsers($query);
        echo(json_encode($users));
    }

    protected function searchGlobalUsers($q)
    {
        $return = array();
        $qu = "  SELECT * FROM c_user u
                INNER JOIN c_42_logins cl
                ON u.login = cl.login_eleve WHERE u.login LIKE :login";
        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($qu);
        $r->execute(array("login" => '%'.$q.'%'));
        while ($e = $r->fetchObject())
        {
            $return[] = array(
                              "icon" => $e->user_icone,
                              "text" => $e->login,
                              "desc" => strtolower($e->prenom." ".$e->nom),
                              "link" => "User/p/".$e->login);
        }
        return ($return);
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


    /*
     * Specifique aux formulaires
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
        $tpl = $this->getRenderedHtml ("search.form.element");
        return $tpl;
    }

    /**
     * Va retourner le code json de l'ensemble des compétences, et l'assigner
     * à la variable "window.items".
     * @return string le code Json
     */
    protected function generateJsFormData ($user)
    {
        $datas = array ();
	$q = "SELECT * FROM c_competences WHERE c_competences.id_competence IN (
		SELECT id_competence FROM c_user_competences
		WHERE `c_user_competences`.`id_user` = :id )";
        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("id" => $user));
        $res = $r->fetchAll(PDO::FETCH_CLASS);
        foreach ( $res as $key => $competence)
        {
            $datas[] = $this->getJsonCodeForElement ($competence);
        }
        return (implode ('', $datas));
    }

    /**
     * Va retourner la liste des radios checkées
     * @return string la liste (json)
     */
    protected function getCheckedRadios ($login)
    {
        $datas = array ();
        $competences = new Entities ("c_user_competences[id_user=$login]");
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

}
