<?php

/*
 * Va contenir toutes les fonctions qui concernent directement l'application
 */

include_once 'helpers.php';


/*   =======================================================================
 *              Toutes les fonctions concernant l'utilisateur
 *   =======================================================================  */

/**
 * Va regarder dans la base de données si le login spécifié existe déja.
 * @param string $login le login à verifier
 * @return bool true si le login existe, false sinon
 */
function loginExists ($login)
{
    $pdo = getPDO ();
    $requete = "SELECT COUNT(*) FROM c_user WHERE login = :login";
    $sth = $pdo->prepare ($requete);
    $sth->execute (array (':login' => $login));
    $results = $sth->fetchAll ();
    return (intval ($results[0][0]) >= 1);
}

/**
 * Va vérifier que le mot de passe fourni est valide pour l'utilisateur spécifié
 * @param string $login le login
 * @param string $pass le mot de passe (en clair)
 * @return bool true si tout est bon.
 */
function checkPassword ($login, $pass)
{
    sleep (1);
    $pass = sha1 (trim (strtolower ($pass)));
    $pdo = getPDO ();
    $requete = "SELECT COUNT(*) FROM c_user WHERE login = :login AND pass = :pass";
    $sth = $pdo->prepare ($requete);
    $sth->execute (array (':login' => $login, ':pass' => $pass));
    $results = $sth->fetchAll ();
    return (intval ($results[0][0]) >= 1);
}

/**
 * Va enregistrer un nouvel utilisateur avec le login et le mot de passe
 * fourni en parametre.
 * @param string $login le login
 * @param string $pass le mot de passe
 * @return bool true si l'insertion est un succès
 */
function saveUserToDatabase ($login, $pass)
{
    $pass = sha1 (trim (strtolower ($pass)));
    $pdo = getPDO ();
    $requete = "INSERT INTO c_user VALUES (null, :login, :pass, 0)";
    $sth = $pdo->prepare ($requete);
    return ($sth->execute (array (':login' => $login, ':pass' => $pass)));
}

/**
 * Va mettre à jour utilisateur avec le mot de passe
 * fourni en parametre.
 * @param string $login le login
 * @param string $pass le mot de passe
 * @return bool true si la mise à jour est un succès
 */
function updateUserToDatabase ($login, $pass)
{
    $pass = sha1 (trim (strtolower ($pass)));
    $pdo = getPDO ();
    $requete = "UPDATE c_user SET pass = :pass WHERE login = :login";
    $sth = $pdo->prepare ($requete);
    return ($sth->execute (array (':login' => $login, ':pass' => $pass)));
}

/**
 * Retourne l'identifiant de l'utilisateur avec le login fourni en parametre
 * @param string $login le login de l'utilisateur
 * @return int l'id de l'utilisateur ou NULL
 */
function getUserId ($login)
{
    $pdo = getPDO ();
    $requete = "SELECT id FROM c_user "
            . "WHERE login = :login";
    $sth = $pdo->prepare ($requete);
    $sth->execute (array (':login' => $login));
    return ($sth->fetchObject ()->id);
}

/*   =======================================================================
 *      Toutes les fonctions concernant l'insertion / maj de compétences
 *   =======================================================================  */

/**
 * Va regarder dans la base de données si la competence spécifié existe déja.
 * @param string $comp la competence à verifier
 * @param string $login l'id du login associé à la competence à verifier
 * @return bool true si la competence existe, false sinon
 */
function compExists ($comp, $login)
{
    $pdo = getPDO ();
    $requete = "SELECT COUNT(*) FROM c_user_competences "
            . "WHERE id_competence = :id_competence"
            . " AND id_user = :id_user";
    $sth = $pdo->prepare ($requete);
    $sth->execute (array (':id_competence' => $comp, ':id_user' => $login));
    $results = $sth->fetchAll ();
    var_dump ($results);
    return (intval ($results[0][0]) >= 1);
}

/**
 * Retourne l'identifiant de la competence avec le nom fourni en parametre
 * @param string $comp le nom de la competence
 * @return int l'id de la competence ou NULL
 */
function getSkillId ($comp)
{
    $pdo = getPDO ();
    $requete = "SELECT id_competence FROM c_competences "
            . "WHERE nom_competence = :comp";
    $sth = $pdo->prepare ($requete);
    $sth->execute (array (':comp' => $comp));
    return ($sth->fetchObject ()->id_competence);
}

/**
 * 
 * @param string $login
 * @param string $code
 * @param string $comp
 * @param string $level
 * @return boolean
 */
function insertOrUpdateSkill ($login, $code, $comp, $level)
{
    $pdo = getPDO ();
    if ( checkPassword ($login, $code) )
    {
        $id_comp = getSkillId ($comp);
        $id_user = getUserId ($login);
        echo ("id_comp = " . $id_comp);
        echo ("id_user = " . $id_user);
        if ( compExists ($id_comp, $id_user) )
        {
            /** @TODO mettre à jour */
            $requete = "UPDATE c_user_competences SET niveau = :lvl "
                    . "WHERE id_user = :id_user AND id_competence = :id_comp";
            $sth = $pdo->prepare ($requete);
            return ($sth->execute (array (
                        ':id_user' => $id_user,
                        ':id_comp' => $id_comp,
                        ':lvl' => $level))
                    );
        }
        else
        {
            $requete = "INSERT INTO c_user_competences VALUES (:id_user, :id_comp, :lvl)";
            $sth = $pdo->prepare ($requete);
            return ($sth->execute (array (
                        ':id_user' => $id_user,
                        ':id_comp' => $id_comp,
                        ':lvl' => $level))
                    );
        }
    }
    else
        return false;
}

/**
 * Va supprimer l'association [utilisateur] -> [competence] avec les infos spécifiées
 * en parametre
 * @param string $login le login de l'utilisateur
 * @param string $code le mot de passe de l'utilisateur
 * @param string $comp le nom de la compétence
 * @return boolean true si la supression est un succès
 */
function deleteSkill ($login, $code, $comp)
{
    $pdo = getPDO ();
    if ( checkPassword ($login, $code) )
    {
        echo("check pass !");
        $id_comp = getSkillId ($comp);
        $id_user = getUserId ($login);
        if ( compExists ($id_comp, $id_user) )
        {
            echo("exists !");
            $requete = "DELETE FROM c_user_competences "
                    . "WHERE id_user = :id_user AND id_competence = :id_comp";
            $sth = $pdo->prepare ($requete);
            return ($sth->execute (array (':id_user' => $id_user, ':id_comp' => $id_comp)) );
        }
        else
            return true;
    }
    else
        return false;
}

/*   =======================================================================
 *        Toutes les fonctions concernant les données de formulaire
 *   =======================================================================  */

/**
 * Va retourner le bout de code Json compatible [MakeForms] pour la compétence
 * décrite en parametre
 * @param StdObject $elt l'objet de l'élément, généré par PDOStatement->fetchObject()
 * @param bool $pre ~ Non fonctionnel
 * @return string le code Json
 * 
 * @see PDOStatement#fetchObject
 */
function getJsonCodeForElement ($elt, $pre = false)
{
    /*
     * web: {

      title: "web",
      beforeTitle: '<h1><span class="icon-network"></span></h1>',
      choices: niveaux(["html5","css3","jquery","php","mysql","postgres"])
      }
     */
    $preText = ""; /* ($pre ? "<h5 class=\"breaker\">".addslashes($elt->nom)
      ."<small>".addslashes($elt->description)."</small></h5>" : ""); */

    $name = ucfirst ($elt->nom_usuel != null ? $elt->nom_usuel : $elt->nom_competence);
    $icone = ($elt->icone != null ? $elt->icone : "uniF002");
    $str = strtolower ($elt->nom_competence) . ": { title: \"" . $name . "\","
            . "beforeTitle: '" . $preText . "<h1><span class=\"icon-" . $icone . "\"></span></h1>',"
            . "choices: niveaux() }";
    return $str;
}

/**
 * Va retourner le code json de l'ensemble des compétences, et l'assigner
 * à la variable "window.items".
 * @return string le code Json
 */
function generateJsFormData ()
{
    $pdo = getPDO ();
    $requete = "SELECT * FROM c_competences co INNER JOIN c_categories ca "
            . "ON co.categorie = ca.id_categorie ORDER BY id_categorie";
    $sth = $pdo->query ($requete);
    $datas = array ();
    $pre = 0;
    while ($competence = $sth->fetchObject ())
    {
        $datas[] = getJsonCodeForElement ($competence, ($competence->id_categorie != $pre));
        $pre = $competence->id_categorie;
    }
    return ("window.items = { " . implode (',', $datas) . "};");
}

function getCheckedRadios ($login, $code)
{
    $pdo = getPDO ();
    $datas = array ();
    if ( checkPassword ($login, $code) )
    {
        $id_user = getUserId ($login);

        $requete = "SELECT co.nom_competence AS nom, cuc.niveau AS lvl "
                . "FROM c_user_competences cuc "
                . "INNER JOIN c_competences co "
                . "ON cuc.id_competence = co.id_competence "
                . "WHERE id_user = :id_user";
        $sth = $pdo->prepare ($requete);
        $sth->execute (array (':id_user' => $id_user));
        while ($elt = $sth->fetchObject ())
        {
            $datas[] = '"' . $elt->nom . "_" . $elt->lvl . '"';
        }
    }
    return implode (",", $datas);
}
