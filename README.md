![logo](http://www.lambdaweb.fr/muffin/muffin.png)

Muffin
=========================

Un petit site web pour **partager** son **savoir** faire et **recueillir** les **compétences** de chacun.

1. Prérequis
-----------

- PHP 5.5
- MySql > 15.x ou MariaDB > 5.x
- Module Apache-APC

`sudo yum install httpd php mariadb php-apc` pour Fedora.

> Pour Ubuntu / Debian based, les packages devraient sensiblement etre les memes, remplacer `yum` par `apt-get`.

2. Installation
--------------

- Il faut cloner le déport de Muffin ansi que les sous modules associés

```bash
# clone du depot avec mise a jour automatique des sous-modules
git clone --recurse-submodules git@github.com:lambda2/Muffin.git
```
- Ensuite, configurer l'acces à la base de données en éditant le fichier d'exemple `Muffin/Config/configuration.yml.sample`.
Une fois les identifiants de connexion à la base de données définis, enregistrer le fichier sous le nom `Muffin/Config/configuration.yml`.

```bash
# copie du fichier d'exemple de configuration
cp Muffin/Config/configuration.yml.sample Muffin/Config/configuration.yml
# édition du fichier de configuration réel
vim Muffin/Config/configuration.yml
```
- Enfin, il faut importer la base de données et ajouter des données d'exemple.
La strucure vide de la base de données est disponible dans le fichier `Muffin/database.sql`.
Pour des raisons de confidentialité évidentes, il n'y a **que** la structure.

3. Pour les développeurs
---------------------------

### 3.1 Détail de l'arborescence

```
├── Config                    // Contient tous les fichiers de configuration
├── Controllers               // Contient les Contrôleurs correspondant aux urls
├── Libs                      // Les librairies php annexes
└── Vues                      // Les templates html correspondant aux controlleurs
```

### 3.2 Les contrôleurs

Lorsque une url est appelée, le routeur appelle automatiquement la méthode du contrôleur correspondant. Par exemple, si on demande l'url `User/p`, c'est la méthode `p ()` de la classe `User` (Qui se trouve dans `Controllers/User.php`) qui sera appelée. Si il n'y a que le nom de la classe dans l'url, c'est par défaut la méthode `index ()` qui est appelée.

Par exemple, l'url `Notification/getCount` va apeller la méthode `getCount ()` de la classe `Notification` (Situé dans `Controllers/Notification.php`) :

```php
class Notification extends Controller
{

// ...

    public function getCount($params)
    {
    	if (isset ($_SESSION['login']))
    	{
    		$cpt = new Entities('c_notifications[id_user="'.$_SESSION["muffin_id"].'"][vu=0]');
    		echo (count($cpt));
    	}
    	else
    		echo "0";
    }

// ...

}
```

Cette méthode affiche simplement le nombre de notifications non-lues de l'utilisateur.

### 3.3 Les vues

Les vues sont codées en twig, un moteur de Template pour PHP. Si vous n’êtes pas familiers avec Twig, je vous invite à [lire la documentation](http://twig.sensiolabs.org/documentation) très complète.

À chaque méthode d'une classe Contrôleur peut correspondre une vue, qu'il est ensuite possible d'appeler depuis le contrôleur avec la méthode `$this->render ()`.

Les vues sont situées dans le répertoire `Vues/`, et sont nommées sous la forme `classe.methode.twig`.

Pour passer des variables à la vue depuis un contrôleur, on utilise la méthode `$this->addData ("nom_a_donner", $variable)` dans le contrôleur.

Par exemple, la méthode `get ()` du contrôleur `Notification` (`Controllers/Notification.php`) permet d'afficher la liste des notifications de l'utilisateur.

Le contrôleur va récupérer toutes les notifications, les ajouter à la Template sous le nom `notifications`, va mettre à jour toutes les notifications de l'utilisateur en les marquant comme lues, et va afficher la Template correspondante (qui correspond donc à `notification.get.twig`, présente dans le répertoire `Vues`).
```php

class Notification extends Controller
{

// ...

    public function get($params)
    {
        	if (isset ($_SESSION['login']))
        	{
        	  // récupérer toutes les notifications
        		$cpt = new Entities('c_notifications[id_user="'.$_SESSION["muffin_id"].'"]');
        		
        		// Trie les résultats par date
        		$cpt->setOrder("date");
        		$cpt->setOrderSort("desc");
        		
        		// Charge le tout depuis la base de données
        		$cpt->loadFromDatabase();
        		
        		// Ajoute toutes les notifications précédemment chargées dans une variable "notifications" du template
        		$this->addData("notifications", $cpt);
        		
        		// Met à jour toutes le snotifications de l'utilisateur en les marquant comme lues
        		Core::getBdd()->update (array("vu" => 1), 'c_notifications', array ("id_user" => $_SESSION['muffin_id']));
        		
        		// Affiche le template correspondant (notification.get.twig)
        		$this->render();
        	}
        	else
        		echo "0";
    }
}

// ...


```

Ensuite, la template `Vues/notification.get.twig` va afficher le résultat :

```twig
<ul id="list-notification">
    {% if notifications|length == 0 %}
	<li><p class="light">Aucune notification</p></li>
    {% else %}
    	{% for notif in notifications %}
    	    {% if notif.vu %}
    	    <li><span class="icon-uniF767"></span> {{ notif.message }}</li>
    	    {% else %}
    		<li class="notification-new"><span class="icon-uniF766"></span> {{ notif.message }}</li>
    	    {% endif %}
    	{% endfor %}
    {% endif %}
</ul>
```

4. Pour les designers / intégrateurs
---------------------------

### 4.1 Installation


Tout ce qu'il vous faut se trouve dans `Templates/Muffin/src`. Les feuilles de styles sont écrites en LESS, et le tout fonctionne avec [Grunt](http://gruntjs.com/).

Pour installer le tout, il faut tout d'abord avoir (donc installer) `node` et (ca va avec) `npm`.

Ensuite, les dépendances s'installeront d'elles mêmes (ainsi que Grunt) en exécutant : `npm install`.

Une fois toutes les dépendances installées, pour compiler les sources, `grunt dev`.
Pour que grunt surveille les dossiers et recompile à chaque modification : `grunt watch`.

### 4.2 Thème

<a href="http://www.colourlovers.com/palette/3257930/Muffin" target="_blank">
<img src="http://www.colourlovers.com/paletteImg/DD5B45/B63440/C45655/FFDDC2/685D49/Muffin.png" alt="Muffin" /></a>
