<?php

include_once './functions.php';

// On nettoie les données contenues dans POST
sanitizePost ();

if ( isset ($_POST['login']) and isset ($_POST['code']) )
{
    $icone = "starburst-outline";
    $login = $_POST['login'];
    $code = $_POST['code'];
    $nom_joli = strtolower ($_POST['nom_competence']);
    $nom_brut = '_'.htmlentities(str_replace (
            array (' ', '+', '#'), array ('_', 'plus', 'diese'), $nom_joli
    ));
    if ( preg_match ('/[<>?"\']+/', $nom_joli) > 0)
    {
        echo "-1";
    }
    else if( insertCompetence ($login, $code, $nom_brut, $nom_joli, $icone) )
    {
        $nom_joli = ucfirst(htmlentities($nom_joli));
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
else
{
    echo("error set");
    echo "0";
}