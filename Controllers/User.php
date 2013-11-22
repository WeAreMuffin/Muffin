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
        foreach ($_POST as $key => $value)
        {
            $comp = Moon::get ('c_competences', 'nom_competence', $key);
            $id = $comp->id_competence;
            $assoc = new Entities ("c_user_competences[id_user=\"{$_SESSION['muffin_id']}\"][id_competence=\"{$id}\"]");

            if ( count ($assoc) == 1 )
            {
                $res = Core::getBdd ()->update (
                        array ("niveau" => $value), 'c_user_competences', array ("id_user" => $_SESSION['muffin_id'], "id_competence" => $id));
            }
            else
            {
                $res = Core::getBdd ()->insert (
                        array ("id_user" => $_SESSION['muffin_id'],
                    "id_competence" => $id, "niveau" => $value), 'c_user_competences');
            }
        }
        ($res != 0) ? ($ret = "1") : ($ret = "0");
        echo $ret;
    }
    
    public function deletecompetence($params)
    {
        $comp = Moon::get ('c_competences', 'nom_competence', $_POST['comp']);
            $id = $comp->id_competence;
        $res = Core::getBdd()->delete('c_user_competences', 
                array ("id_user" => $_SESSION['muffin_id'], "id_competence" => $id));
        ($res != 0) ? ($ret = "1") : ($ret = "0");
        echo $ret;
    }

    public function addcompetence ($params)
    {
        $icone = "starburst-outline";
        $nom_joli = strtolower ($_POST['nom_competence']);
        $nom_brut = '_' . htmlentities (str_replace (
                                array (' ', '+', '#'), array ('_', 'plus', 'diese'), $nom_joli
        ));
        $cmp = new Entities ("c_competences[nom_competence=\"{$nom_brut}\"]");
        if ( preg_match ('/[<>?"\']+/', $nom_joli) > 0 || count ($cmp) > 0 )
        {
            echo "-1";
        }
        else if ( Core::getBdd ()->insert (
                        array ("nom_competence" => $nom_brut,
                    "nom_usuel" => $nom_joli, "icone" => $icone, "categorie" => 4), 'c_competences') )
        {
            $nom_joli = ucfirst (htmlentities ($nom_joli));
            $text = <<<EOT
<fieldset>
    <h1><span class="icon-$icone"></span></h1>
    <h4>{$nom_joli}</h4>
    <div class="radio">
        <input type="radio" name="{$nom_brut}" id="{$nom_brut}_low" value="low">
        <label for="{$nom_brut}_low"></label>
    </div>
    <div class="radio">
        <input type="radio" name="{$nom_brut}" id="{$nom_brut}_med" value="med">
        <label for="{$nom_brut}_med"></label>
    </div>
    <div class="radio">
        <input type="radio" name="{$nom_brut}" id="{$nom_brut}_high" value="high">
        <label for="{$nom_brut}_high"></label>
    </div>
    <a class="clear-all" data-items="{$nom_brut}"><span class="icon-remove-circle"></span></a>
</fieldset>
EOT;
            echo "$text";
        }
        else
        {
            echo("error insert");
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

        $preText = "";

        $name = htmlentities (ucfirst ($elt->nom_usuel != null ? $elt->nom_usuel : $elt->nom_competence));
        $icone = ($elt->icone != null ? $elt->icone : "uniF002");
        $str = strtolower (htmlentities ($elt->nom_competence)) . ": { title: \"" . $name . "\","
                . "beforeTitle: '" . $preText . "<h1><span class=\"icon-" . $icone . "\"></span></h1>',"
                . "choices: window.muffin.niveaux() }";
        return $str;
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
        return ("window.items = { " . implode (',', $datas) . "};");
    }

    protected function getCheckedRadios ()
    {
        $datas = array ();
        $id_user = $_SESSION['muffin_id'];
        $competences = new Entities ("c_user_competences[id_user=$id_user]");
        foreach ($competences as $key => $competence)
        {
            $datas[] = '"' . $competence->c_competences->nom_competence . "_" . $competence->niveau . '"';
        }
        return implode (",", $datas);
    }

}
