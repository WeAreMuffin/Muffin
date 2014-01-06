-- phpMyAdmin SQL Dump
-- version 3.5.8.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 06, 2014 at 07:06 AM
-- Server version: 5.5.33a-MariaDB-log
-- PHP Version: 5.5.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `competences`
--

-- --------------------------------------------------------

--
-- Table structure for table `c_42_logins`
--

CREATE TABLE IF NOT EXISTS `c_42_logins` (
  `login_eleve` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  PRIMARY KEY (`login_eleve`),
  UNIQUE KEY `login_eleve_2` (`login_eleve`),
  KEY `login_eleve` (`login_eleve`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_blame_competences`
--

CREATE TABLE IF NOT EXISTS `c_blame_competences` (
  `id_user` int(255) NOT NULL,
  `id_comp` int(255) NOT NULL,
  PRIMARY KEY (`id_user`,`id_comp`),
  KEY `blame_competence_ibfk_2` (`id_comp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_categories`
--

CREATE TABLE IF NOT EXISTS `c_categories` (
  `id_categorie` int(255) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icone_categorie` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=55 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_competences`
--

CREATE TABLE IF NOT EXISTS `c_competences` (
  `id_competence` int(255) NOT NULL AUTO_INCREMENT,
  `nom_competence` varchar(255) NOT NULL,
  `nom_usuel` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icone` varchar(255) DEFAULT NULL,
  `type_competence` int(255) DEFAULT NULL,
  PRIMARY KEY (`id_competence`),
  UNIQUE KEY `nom` (`nom_competence`),
  KEY `type_competence` (`type_competence`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=98 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_echanges`
--

CREATE TABLE IF NOT EXISTS `c_echanges` (
  `id_demande` int(255) NOT NULL,
  `id_propose` int(255) NOT NULL,
  `prix` int(255) DEFAULT '0',
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_competence` int(255) NOT NULL,
  `acceptee` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id_demande`,`id_propose`,`id_competence`),
  KEY `id_competence` (`id_competence`),
  KEY `id_propose` (`id_propose`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_notifications`
--

CREATE TABLE IF NOT EXISTS `c_notifications` (
  `id_notification` int(255) NOT NULL AUTO_INCREMENT,
  `id_user` int(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `vu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_notification`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_quote`
--

CREATE TABLE IF NOT EXISTS `c_quote` (
  `id_quote` int(255) NOT NULL AUTO_INCREMENT,
  `icon_quote` varchar(255) DEFAULT NULL,
  `text_quote` varchar(255) NOT NULL,
  `author_quote` varchar(255) NOT NULL,
  PRIMARY KEY (`id_quote`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_tags`
--

CREATE TABLE IF NOT EXISTS `c_tags` (
  `id_competence` int(255) NOT NULL,
  `id_categorie` int(255) NOT NULL,
  PRIMARY KEY (`id_competence`,`id_categorie`),
  KEY `id_categorie` (`id_categorie`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_type_competence`
--

CREATE TABLE IF NOT EXISTS `c_type_competence` (
  `id_type` int(255) NOT NULL AUTO_INCREMENT,
  `nom_type` varchar(255) NOT NULL,
  `desc_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_type`),
  UNIQUE KEY `nom_type` (`nom_type`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_user`
--

CREATE TABLE IF NOT EXISTS `c_user` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `verifie` int(1) NOT NULL DEFAULT '0',
  `comp_public` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=189 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_user_competences`
--

CREATE TABLE IF NOT EXISTS `c_user_competences` (
  `id_user` int(255) NOT NULL,
  `id_competence` int(255) NOT NULL,
  `niveau` varchar(255) DEFAULT NULL,
  `want_to_learn` int(255) DEFAULT '0',
  `want_to_teach` int(255) DEFAULT '0',
  `price` int(255) unsigned DEFAULT '0',
  PRIMARY KEY (`id_user`,`id_competence`),
  KEY `id_competence` (`id_competence`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `c_blame_competences`
--
ALTER TABLE `c_blame_competences`
  ADD CONSTRAINT `blame_competence_ibkf_1` FOREIGN KEY (`id_user`) REFERENCES `c_user` (`id`),
  ADD CONSTRAINT `c_blame_competences_ibfk_2` FOREIGN KEY (`id_comp`) REFERENCES `c_competences` (`id_competence`);

--
-- Constraints for table `c_competences`
--
ALTER TABLE `c_competences`
  ADD CONSTRAINT `c_competences_ibfk_1` FOREIGN KEY (`type_competence`) REFERENCES `c_type_competence` (`id_type`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `c_echanges`
--
ALTER TABLE `c_echanges`
  ADD CONSTRAINT `c_echanges_ibfk_1` FOREIGN KEY (`id_competence`) REFERENCES `c_competences` (`id_competence`),
  ADD CONSTRAINT `c_echanges_ibfk_2` FOREIGN KEY (`id_demande`) REFERENCES `c_user` (`id`),
  ADD CONSTRAINT `c_echanges_ibfk_3` FOREIGN KEY (`id_propose`) REFERENCES `c_user` (`id`);

--
-- Constraints for table `c_tags`
--
ALTER TABLE `c_tags`
  ADD CONSTRAINT `c_tags_ibfk_1` FOREIGN KEY (`id_competence`) REFERENCES `c_competences` (`id_competence`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `c_tags_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `c_categories` (`id_categorie`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `c_user`
--
ALTER TABLE `c_user`
  ADD CONSTRAINT `c_user_ibfk_1` FOREIGN KEY (`login`) REFERENCES `c_42_logins` (`login_eleve`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `c_user_competences`
--
ALTER TABLE `c_user_competences`
  ADD CONSTRAINT `c_user_competences_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `c_user` (`id`),
  ADD CONSTRAINT `c_user_competences_ibfk_2` FOREIGN KEY (`id_competence`) REFERENCES `c_competences` (`id_competence`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
