<?php

/*
 * Copyright 2014 lambda2.
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
 * (c) 2014 Lambdaweb - www.lambdaweb.fr
 *
 *
 * @author lambda2
 */

class Calendar extends Controller
{

    public function index ($params)
    {
        $this->registerParams($params);
        $this->render();
    }

    /**
     * Va retourner un tableau json contenant tous les évenements à venir
     */
    public function getAllEvents ($params)
    {
        $this->registerParams($params);

        $json = array();

        $reunions = new Entities("c_reunion");
        $reunions->setOrder("reunion_date", "ASC");
        foreach ($reunions as $key => $value)
        {
        	$elt = array();
            $elt["date"] = $value->reunion_date;
            $elt["titre"] = "Réunion sur ".($value->c_competences->nom_usuel ? $value->c_competences->nom_usuel : $value->c_competences->nom_competence);
            $elt["desc"] = $value->reunion_texte;
            $elt["type"] = "bubbles";
            $elt["categorie"] = "réunion";
            $elt["link"] = "Reunion/p/".$value->reunion_id;
            $json[] = $elt;
        }

        // /* for tests */

        // 	$elt = array();
        //     $elt["date"] = "2014-03-15 15:00";
        //     $elt["titre"] = "Atelier écriture arts et dessins";
        //     $elt["desc"] = "On va tous écrire plein de trucs !";
        //     $elt["type"] = "write";
        //     $elt["categorie"] = "atelier";
        //     $elt["link"] = "Reunion/index";
        //     $json[] = $elt;

        // 	$elt = array();
        //     $elt["date"] = "2014-03-15 16:00";
        //     $elt["titre"] = "Atelier écriture arts et dessins et peinture";
        //     $elt["desc"] = "On va tous écrire plein de trucs !";
        //     $elt["type"] = "write";
        //     $elt["categorie"] = "atelier";
        //     $elt["link"] = "Reunion/index";
        //     $json[] = $elt;

        // 	$elt = array();
        //     $elt["date"] = "2014-03-15 17:00";
        //     $elt["titre"] = "Atelier écriture arts et dessins et animé";
        //     $elt["desc"] = "On va tous écrire plein de trucs !";
        //     $elt["type"] = "write";
        //     $elt["categorie"] = "atelier";
        //     $elt["link"] = "Reunion/index";
        //     $json[] = $elt;

        // 	$elt = array();
        //     $elt["date"] = "2014-03-15 19:00";
        //     $elt["titre"] = "Atelier écriture arts et dessins";
        //     $elt["desc"] = "On va tous écrire plein de trucs !";
        //     $elt["type"] = "write";
        //     $elt["categorie"] = "atelier";
        //     $elt["link"] = "Reunion/index";
        //     $json[] = $elt;

        // 	$elt = array();
        //     $elt["date"] = "2014-03-15 21:00";
        //     $elt["titre"] = "Atelier écriture";
        //     $elt["desc"] = "On va tous écrire plein de trucs !";
        //     $elt["type"] = "write";
        //     $elt["categorie"] = "atelier";
        //     $elt["link"] = "Reunion/index";
        //     $json[] = $elt;



        echo(json_encode($json));
    }

    public function grantAccess ()
    {
        if (isset ($_SESSION['login']))
            return true;
        else
        {
            header("./?redirect=Calendar");
            echo "<script>document.location = '?redirect=Reunion'</script";
            return false;
        }
    }

}
