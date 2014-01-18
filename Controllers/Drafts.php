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
        $drafts = new Entities ("c_drafts");
        $userdrafts = new Entities ("c_drafts[draft_author=".$_SESSION["muffin_id"]."]");
        $this->addData("drafts", $drafts);
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
            echo "{}";
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
}

?>
