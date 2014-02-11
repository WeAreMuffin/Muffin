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

class Drafts extends Controller
{

    /*
     * Va etre apellée par défaut.
     */
    public function index ($params)
    {
        $this->registerParams($params);
        $userdrafts = new Entities ("c_drafts[draft_author=".$_SESSION["muffin_id"]."]");
        $this->addData("userdrafts", $userdrafts);
        $this->render ();
    }

    /*
     * liste des drafts
     */
    public function all ($params)
    {
        $this->registerParams($params);
        $drafts = new Entities ("c_drafts[draft_author!=".$_SESSION["muffin_id"]."][public>0]");
        $this->addData("drafts", $drafts);
        $this->render ();
    }

    /*
     * liste des drafts de l'utilisateur
     */
    public function mine ($params)
    {
        $this->registerParams($params);
        $userdrafts = new Entities ("c_drafts[draft_author=".$_SESSION["muffin_id"]."]");
        $this->addData("userdrafts", $userdrafts);
        $this->render ();
    }

    /*
     * creation d'un draft
     */
    public function create ($params)
    {
        $this->registerParams($params);
        $userdrafts = new Entities ("c_drafts[draft_author=".$_SESSION["muffin_id"]."]");
        $this->addData("userdrafts", $userdrafts);
        $this->render ();
    }

    /*
     * Va creer un draft
     */
    public function new_draft ($params)
    {
        $title = $this->filterPost("titre");
        $text = $this->filterPost("texte");
        $auteur = $_SESSION["muffin_id"];
        if ($title and $auteur and $text)
        {
            $id = Core::getBdd ()->insert (
                    array ("draft_name" => $title,
                        "draft_content" => $text, "draft_date_m" => "NOW()",
                        "draft_author" => $auteur), 'c_drafts');
            echo $id;
        }
        else
        {
            echo "0";
        }
    }

    /*
     * Va mettre a jour un draft.
     */
    public function update ($params)
    {
        $this->registerParams($params);
        $title = $this->filterPost("titre");
        $text = $this->filterPost("texte");
        $id = $this->filterPost ('id');
        $draft = Moon::get ('c_drafts', 'draft_id', $id);
        $auteur = $_SESSION["muffin_id"];
        if ($title and $auteur and $text
            and $draft->exists() and $draft->draft_author == $auteur)
        {
            $nid = Core::getBdd ()->update (
                            array ("draft_name" => $title,
                        "draft_content" => $text), 'c_drafts', array ("draft_id" => $id));
            echo $nid;
        }
        else
        {
            echo "0";
        }
    }

    /*
     * Va changer la visibilitee du draft
     */
    public function visibility ($params)
    {
        $id = $this->filterPost("id");
        $new_v = $this->filterPost("new_v");
        $this->registerParams($params);
        $draft = Moon::get ('c_drafts', 'draft_id', $id);
        $auteur = $_SESSION["muffin_id"];
        if ($draft->draft_author == $auteur)
        {
            $nid = Core::getBdd ()->update (
                            array ("public" => $new_v), 'c_drafts', array ("draft_id" => $id));
            echo "{success: '{$nid}'}";
        }
        else
        {
            echo ($this->getErrorJson("access"));
        }
    }

    /*
     * Va renvoyer un draft.
     */
    public function get ($params)
    {
        $id = $this->filterPost("id");
        $this->registerParams($params);
        $draft = Moon::get ('c_drafts', 'draft_id', $id);
        $auteur = $_SESSION["muffin_id"];
        if ($draft->draft_author == $auteur)
        {
            echo (json_encode($draft));
        }
        else
        {
            echo ($this->getErrorJson("access"));
        }
    }

    /*
     * Va supprimer un draft.
     */
    public function delete ($params)
    {
        $id = $this->filterPost("id");
        $this->registerParams($params);
        $auteur = $_SESSION["muffin_id"];
        if (Core::getBdd ()->delete ('c_drafts', array ("draft_id" => $id, "draft_author" => $_SESSION["muffin_id"])))
        {
            echo "1";
        }
        else
        {
            echo "0";
        }
    }

     /**
     * @PathInfo('idDraft')
     * Va renvoyer un draft.
     */
    public function read ($params)
    {
        $id = $this->filterPost("id");
        $this->registerParams($params);
        $idg = $this->getUrlParam ('idDraft');
        $drafts = new Entities ("c_drafts[draft_author!=".$_SESSION["muffin_id"]."][public>0]");
        $likes = new Entities ("c_drafts_like[id_draft_like=\"{$id}\"]");
        if ($idg != NULL)
            $id = $idg;
        $draft = Moon::get ('c_drafts', 'draft_id', $id);
        if ($draft->public != 0 or $draft->draft_author == $_SESSION["muffin_id"])
        {
            $this->incrementViews($id);
            $this->addData("draft", $draft);
            $this->addData("drafts", $drafts);
            $this->addData("likes", $likes);
            $this->render ();
        }
        else
            echo ($this->getErrorJson("access"));
    }

    protected function incrementViews($draft_id)
    {
        $draft = Moon::get ('c_drafts', 'draft_id', $draft_id);
        $views = $draft->draft_views;
        $views++;
        $nid = Core::getBdd ()->update (array ("draft_views" => $views), 'c_drafts', array ("draft_id" => $draft_id));
    }

    /**
     * @PathInfo('draft')
     */
    public function star($params)
    {
        $render = "0";
        $draft = $this->getUrlParam ('draft');
        if ($draft)
        {
            $cpt = new Entities("c_drafts_like[id_user_like=\"".$_SESSION['muffin_id']."\"][id_draft_like=\"$draft\"]");
            if (count($cpt) == 0)
            {
                $res = Core::getBdd ()->insert (array ("id_user_like" => $_SESSION['muffin_id'], "id_draft_like" => $draft), 'c_drafts_like');
                $render = "1";
            }
            else if (count($cpt) > 0)
            {
                $i = array ("id_user_like" => $_SESSION['muffin_id'], "id_draft_like" => $draft);
                $res = Core::getBdd ()->delete('c_drafts_like', $i);
                $render = "-1";
            }
    }
        echo ($render);
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
     *                      Json d'erreur
     *   =======================================================================
     */

    private function getErrorJson($type)
    {
        switch ($type) {
            case 'access':
                return ("{error: 'error', msg: 'Vous n\'avez pas les droits nécessaires pour effectuer cette action'}");
                break;

            default:
                return ("{error: 'error', msg: 'Une erreur s\'est produite.'}");
                break;
        }
    }
}

?>
