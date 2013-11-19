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

require_once "PHPUnit/Framework/TestCase.php";

require_once(__DIR__.'/Moon/loader.php');

class LoginTest extends PHPUnit_Extensions_Database_TestCase
{
    /**
     * @var Core
     */
    protected $core;
    protected $obj;
    
    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp()
    {
        Core::startEngine();
        $this->core = Core::getInstance();
        $this->obj = new Login();
    }
}
