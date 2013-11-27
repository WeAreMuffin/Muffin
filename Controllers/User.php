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

    public function index ($params)
    {
        $this->registerParams ($params);
        $infos = new Entities ("c_user[login=\"{$_SESSION['login']}\"]");
        $formDataJson = $this->generateJsFormData ();
        $checkedRadios = $this->getCheckedRadios ();
        $this->addData ('formDataJson', $formDataJson);
        $this->addData ('checkedRadios', $checkedRadios);
        $this->render ();
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
        }
        else
        {
            $i = array ("id_user" => $_SESSION['muffin_id'],
                "id_competence" => $id, "niveau" => $lvl,
                "want_to_learn" => $wtl == null ? '0' : $wtl,
                "want_to_teach" => $wtt == null ? '0' : $wtt);
            $res = Core::getBdd ()->insert ($i, 'c_user_competences');
        }
        ($res != 0) ? ($ret = "1") : ($ret = "0");
        echo $ret;
    }

    public function deletecompetence ($params)
    {
        $id = $this->filterPost ('id_competence');
        $res = Core::getBdd ()->delete ('c_user_competences', array ("id_user" => $_SESSION['muffin_id'], "id_competence" => $id));
        ($res != 0) ? ($ret = "1") : ($ret = "0");
        echo $ret;
    }

    public function addcompetence ($params)
    {
        $id = false;
        $icone = "sale";
        $nom_joli = strtolower ($_POST['nom_competence']);
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
                    "nom_usuel" => $nom_joli, "icone" => $icone, "categorie" => 4), 'c_competences') )
        {
            $nom_joli = ucfirst (htmlentities ($nom_joli));
            $new = Moon::get("c_competences","id_competence",$id);
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
            return false;
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
     */
    protected function generateJsFormData ()
    {
        $datas = array ();
        foreach (Moon::getAllHeavy ("c_competences") as $key => $competence)
        {
            $datas[] = $this->getJsonCodeForElement ($competence);
        }
        return (implode ('', $datas));
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
            $nom =  $competence->c_competences->nom_competence;
            if ( $competence->want_to_learn == "1")
                $datas[] = '"wtl_' . $nom . '"';
            if ( $competence->want_to_teach == "1")
                $datas[] = '"wtt_' . $nom . '"';
            $datas[] = '"' . $nom . "_" . $competence->niveau . '"';
        }
        return implode (",", $datas);
    }

}
