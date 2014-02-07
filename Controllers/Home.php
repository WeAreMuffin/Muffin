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


/**
 * @author lambda2
 */
class Home extends Controller
{
    /*
     * La fonction d'index.
     * C'est elle qui sera apellée par défaut.
     */

    public function index ($params = array ())
    {
        $redirect = $this->filterGet("redirect");
        $this->addData ('redirect', $redirect);
        $this->render ();
    }

    /**
     * @PathInfo('login')
     */
    public function loginNew ($params = array ())
    {
        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam ('login');
        $this->addData ('login', $login);
        $this->render ();
    }

    /**
     * @PathInfo('login')
     */
    public function loginExists ($params = array ())
    {
        // On récupère le login fourni dans l'url
        $login = $this->getUrlParam ('login');
        $this->addData ('login', $login);
        $this->render ();
    }

}

?>
