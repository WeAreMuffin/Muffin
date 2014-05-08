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

class Api extends Controller
{

    public function index ($params)
    {
    	return (0);
    }
    /**
     *
     * @PathInfo('login')
     */
    public function user ($params)
    {
        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam('login');
        $user = new Entities('c_42_logins[login_eleve="'.$login.'"]');
        $elt = $user->current();
        echo json_encode($elt);
    }

}

?>
