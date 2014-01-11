![logo](http://www.lambdaweb.fr/muffin/muffin-logo.png)

Muffin
=========================

Un petit site web pour **partager** son **savoir** faire et **recueillir** les **compétences** de chacun.


1. Prérequis
-----------

- **PHP 5.5**
- **MySql > 15.x** ou **MariaDB > 5.x**
- Module **Apache-APC**

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
