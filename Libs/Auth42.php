<?php
/*
 * Copyright 2013 Muffin.
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
 *
 */

/**
 * A simple (and light) exception class, for catching specific errors.
 */
class Auth42Exception extends Exception
{

    public function __construct ($message, $code = 0, $previous = null)
    {
        $body = "An error occured with 42 ldap authentification: ";
        parent::__construct ($body . $message, $code, $previous);
    }

}

/**
 * A simple abstract layer to use ldap in order to manage 42 authentications.
 * @see ldap_bind
 * @see ldap_connect
 *
 * @author lambda2 <andre.aubin@lambdaweb.fr>
 * @license http://www.apache.org/licenses/LICENSE-2.0 Apache2
 * @link https://gist.github.com/sanecz/9025826 A gist to understand simple bind
 */
class Auth42
{
    /* The 42 ldap url */

    const serverUrl = "ldaps://ldap.42.fr";

    protected $dn;
    protected $bind;
    protected $password;
    protected $handle;

    /**
     * Will construct a new Auth42 object, wich is a ldap based search and
     * authentication tool.
     *
     * @param array $dn the dn to use. If no dn is provided, will use
     * ou=2013,ou=people,dc=42,dc=fr as the default dn.
     * @param string $password an optionnal password to connect with.
     */
    public function __construct ($dn = array (), $password = "")
    {
        if ( count ($dn) )
        {
            $this->dn = $dn;
        }
        else
        {
            $this->dn = array (
                "uid" => "",
                "ou" => array ("2013", "people"),
                "dc" => array ("42", "fr")
            );
        }
        $this->password = $password;
    }

    /**
     * Will try to bind the ldap with the previously given dn and password.
     * At the end, will close the ldap_handle.
     * @return int the binding result (0 on failure).
     * @throws Auth42Exception
     */
    public function bind ()
    {
        $r = $this->bindOnHandle();
        ldap_close ($this->handle);
        return ($r);
    }

    /**
     * Will try to bind the ldap with the registered informations.
     * This function will not automatically close the ldap handle.
     * @return int the binding result (0 on failure).
     * @throws Auth42Exception
     */
    protected function bindOnHandle()
    {
        $ok = false;
        try
        {
            $this->handle = ldap_connect (self::serverUrl);
            ldap_set_option ($this->handle, LDAP_OPT_PROTOCOL_VERSION, 3);
            if ($this->handle)
            {
                $bindDn = $this->computeDn();
                $ok = $this->bind = ldap_bind ($this->handle, $bindDn, $this->password);
                return ($ok);
            }
        }
        catch (Exception $e)
        {
            //ldap_close ($this->handle);
            throw new Auth42Exception("Bind error (" . $e->getMessage () . ")");
        }
        return ($ok);
    }

    /**
     * Will try to search the given query on the ldap.
     * if a login and a password are supplied, will try to bind the ldap with theses
     * id before the request. On failure, will throw an Auth42Exception.
     * If no filter is supplied, the default filter ("dc=42,dc=fr") is applied.
     *
     * @param string $query the query to execute, like 'uid=a*'.
     * @param string $login an optionnal login to bind the server.
     * @param string $password an optionnal password to bind the server.
     * @param string $filter a filter to apply on the search request. Default: "dc=42,dc=fr".
     * @return array the search result(s), or false on failure.
     * @throws Auth42Exception when the auth fail.
     */
    public function search($query, $login = NULL, $password = NULL, $filter = NULL)
    {
        if ($filter == NULL)
        {
            $filter = "dc=42,dc=fr";
        }
        if ($login and $password)
        {
            $this->setPassword($password);
            $this->setDn(array (
                    "uid" => $login,
                    "ou" => array ("2013", "people"),
                    "dc" => array ("42", "fr")
                ));
        }
        $res = $this->bindOnHandle();
        $sr = ldap_search($this->handle, $filter, $query);
        if ($sr)
        {
            $info = ldap_get_entries($this->handle, $sr);
        }
        else
        {
            $info = false;
        }
        ldap_close ($this->handle);
        return ($info);
    }

    /**
     * Will try to authenticate the user on the 42 ldap with the given
     * password and username.
     *
     * @param string $login the login (uid) of the student
     * @param string $password the password of the student
     * @return boolean true on success, false otherwise.
     * @link http://www.php.net/manual/fr/language.exceptions.php finally >= 5.5
     */
    static function authenticate ($login, $password)
    {
        $tmp = new Auth42 (array (
            "uid" => $login,
            "ou" => array ("2013", "people"),
            "dc" => array ("42", "fr")
                ), $password);
        try
        {
            $res = $tmp->bind();
        }
        catch (Exception $exc)
        {
            $res = NULL;
        }
        finally
        {
            return ($res != false);
        }
    }

    /**
     * Will convert the arrays of dn into an undersandable string.
     * @return string a string with all the dn(s).
     */
    protected function computeDn ()
    {
        $computed = array ();
        foreach ($this->dn as $key => $value)
        {
            if ( is_array ($value) )
            {
                foreach ($value as $field)
                {
                    $computed[] = $key . '=' . $field;
                }
            }
            else
            {
                $computed[] = $key . '=' . $value;
            }
        }
        return (implode (',', $computed));
    }

    /*
     * =====================================================================
     * 				DN Management
     * =====================================================================
     */

    /**
     * Will add (or replace) the value of the given key with
     * the given (new) value(s). If there is more than one value to add, use
     * an array instead of a string.
     *
     * @param string $key the key to add / replace.
     * @param string|array $value the value(s) to add.
     */
    public function addOrReplaceDn ($key, $value)
    {
        $this->dn[$key] = $value;
    }

    /**
     * Remove the given dn key of the current instance.
     * @param string $key the dn to remove.
     */
    public function removeDn ($key)
    {
        unset ($this->dn[$key]);
    }

    /*
     * =====================================================================
     *                        Getters and Setters
     * =====================================================================
     */

    public function getDn ()
    {
        return $this->dn;
    }

    public function getBind ()
    {
        return $this->bind;
    }

    public function getPassword ()
    {
        return $this->password;
    }

    public function getHandle ()
    {
        return $this->handle;
    }

    public function setDn ($dn)
    {
        $this->dn = $dn;
    }

    public function setBind ($bind)
    {
        $this->bind = $bind;
    }

    public function setPassword ($password)
    {
        $this->password = $password;
    }

    public function setHandle ($handle)
    {
        $this->handle = $handle;
    }

}

?>
