<?php

/*
 * This file is part of the moon framework.
 *
 * (c) 2013 Lambdaweb - www.lambdaweb.fr
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
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
