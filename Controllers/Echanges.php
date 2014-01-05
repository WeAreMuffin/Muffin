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
                WHERE id_user != :id 
                    AND want_to_learn = 1 
                    AND c.nom_competence IN (
                        SELECT nom_competence 
                        FROM c_user_competences ucb 
                        INNER JOIN c_competences cb 
                        ON ucb.id_competence = cb.id_competence 
                        WHERE id_user = :idu AND ucb.want_to_teach = 1);
            ";

        $bd = Core::getBdd()->getDb();
        $r = $bd->prepare($q);
        $r->execute(array("id" => $user,"idu" => $user));
        $res = $r->fetchAll(PDO::FETCH_CLASS);


        $this->addData("want_to_learn", $want_to_learn);
        $this->addData("users", $res);
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
            $cpt = new Entities("c_user_competences[id_user=\"$login\"][id_competence=\"$competence\"]");
            if ($cpt)
            {
                $cpt = $cpt->current();
                $i = array ("id_propose" => $_SESSION['muffin_id'],
                    "id_demande" => $login, "id_competence" => $competence, "prix" => $cpt->price);
                $res = Core::getBdd ()->insert ($i, 'c_echanges');
                $render = "1";
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
            return false;
    }
}

?>