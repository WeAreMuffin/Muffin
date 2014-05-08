-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 25, 2014 at 05:38 PM
-- Server version: 5.5.34-MariaDB-log
-- PHP Version: 5.5.8

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
-- Creation: Feb 24, 2014 at 02:52 PM
--

DROP TABLE IF EXISTS `c_42_logins`;
CREATE TABLE IF NOT EXISTS `c_42_logins` (
  `login_eleve` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `user_icone` varchar(255) DEFAULT 'chef',
  `poste` varchar(255) DEFAULT NULL,
  `type` enum('eleve','staff','admin') DEFAULT 'eleve',
  `mail` varchar(255) DEFAULT NULL,
  `picture` text,
  PRIMARY KEY (`login_eleve`),
  UNIQUE KEY `login_eleve_2` (`login_eleve`),
  KEY `login_eleve` (`login_eleve`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_42_time`
--
-- Creation: Feb 14, 2014 at 03:45 AM
--

DROP TABLE IF EXISTS `c_42_time`;
CREATE TABLE IF NOT EXISTS `c_42_time` (
  `login` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `duration` int(255) NOT NULL DEFAULT '0',
  `poste` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`login`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_blame_competences`
--
-- Creation: Dec 02, 2013 at 06:23 AM
--

DROP TABLE IF EXISTS `c_blame_competences`;
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
-- Creation: Nov 17, 2013 at 12:36 PM
--

DROP TABLE IF EXISTS `c_categories`;
CREATE TABLE IF NOT EXISTS `c_categories` (
  `id_categorie` int(255) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icone_categorie` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=71 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_competences`
--
-- Creation: Jan 06, 2014 at 05:32 PM
--

DROP TABLE IF EXISTS `c_competences`;
CREATE TABLE IF NOT EXISTS `c_competences` (
  `id_competence` int(255) NOT NULL AUTO_INCREMENT,
  `nom_competence` varchar(255) NOT NULL,
  `nom_usuel` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icone` varchar(255) DEFAULT NULL,
  `type_competence` int(255) DEFAULT NULL,
  `expired` int(2) DEFAULT '0',
  PRIMARY KEY (`id_competence`),
  UNIQUE KEY `nom` (`nom_competence`),
  KEY `type_competence` (`type_competence`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=128 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_drafts`
--
-- Creation: Feb 24, 2014 at 02:29 PM
--

DROP TABLE IF EXISTS `c_drafts`;
CREATE TABLE IF NOT EXISTS `c_drafts` (
  `draft_id` int(255) NOT NULL AUTO_INCREMENT,
  `draft_name` varchar(255) NOT NULL,
  `draft_content` text NOT NULL,
  `draft_date_c` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `draft_author` int(255) DEFAULT NULL,
  `public` int(1) DEFAULT '0',
  `read_count` int(255) DEFAULT '0',
  `draft_views` int(255) DEFAULT '0',
  PRIMARY KEY (`draft_id`),
  KEY `draft_author` (`draft_author`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_drafts_like`
--
-- Creation: Feb 11, 2014 at 09:08 AM
--

DROP TABLE IF EXISTS `c_drafts_like`;
CREATE TABLE IF NOT EXISTS `c_drafts_like` (
  `id_user_like` int(255) NOT NULL,
  `id_draft_like` int(255) NOT NULL,
  PRIMARY KEY (`id_user_like`,`id_draft_like`),
  KEY `id_draft_like` (`id_draft_like`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_echanges`
--
-- Creation: Jan 08, 2014 at 04:48 AM
--

DROP TABLE IF EXISTS `c_echanges`;
CREATE TABLE IF NOT EXISTS `c_echanges` (
  `id_demande` int(255) NOT NULL,
  `id_propose` int(255) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `competence` int(255) NOT NULL,
  `resume` enum('attente','annule','accepte','bien','pasbien') DEFAULT 'attente',
  PRIMARY KEY (`id_demande`,`id_propose`,`competence`),
  KEY `id_propose` (`id_propose`),
  KEY `competence` (`competence`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_news`
--
-- Creation: Jan 24, 2014 at 07:31 AM
--

DROP TABLE IF EXISTS `c_news`;
CREATE TABLE IF NOT EXISTS `c_news` (
  `id_news` int(255) NOT NULL AUTO_INCREMENT,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `text` text NOT NULL,
  `id_auteur` int(255) NOT NULL,
  PRIMARY KEY (`id_news`),
  KEY `id_auteur` (`id_auteur`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_notifications`
--
-- Creation: Dec 04, 2013 at 11:40 AM
--

DROP TABLE IF EXISTS `c_notifications`;
CREATE TABLE IF NOT EXISTS `c_notifications` (
  `id_notification` int(255) NOT NULL AUTO_INCREMENT,
  `id_user` int(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `vu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_notification`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=174 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_quote`
--
-- Creation: Dec 10, 2013 at 06:14 AM
--

DROP TABLE IF EXISTS `c_quote`;
CREATE TABLE IF NOT EXISTS `c_quote` (
  `id_quote` int(255) NOT NULL AUTO_INCREMENT,
  `icon_quote` varchar(255) DEFAULT NULL,
  `text_quote` varchar(255) NOT NULL,
  `author_quote` varchar(255) NOT NULL,
  PRIMARY KEY (`id_quote`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_reunion`
--
-- Creation: Feb 11, 2014 at 09:10 AM
--

DROP TABLE IF EXISTS `c_reunion`;
CREATE TABLE IF NOT EXISTS `c_reunion` (
  `reunion_id` int(255) NOT NULL AUTO_INCREMENT,
  `reunion_competence` int(255) NOT NULL,
  `reunion_organisateur` int(255) NOT NULL,
  `reunion_texte` text,
  `reunion_date` datetime NOT NULL,
  `reunion_duree` int(255) DEFAULT NULL,
  `reunion_lieu` text,
  `reunion_type` int(255) DEFAULT '1',
  PRIMARY KEY (`reunion_id`),
  KEY `reunion_competence` (`reunion_competence`,`reunion_organisateur`),
  KEY `reunion_organisateur` (`reunion_organisateur`),
  KEY `reunion_type` (`reunion_type`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=38 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_reunion_participe`
--
-- Creation: Feb 11, 2014 at 09:10 AM
--

DROP TABLE IF EXISTS `c_reunion_participe`;
CREATE TABLE IF NOT EXISTS `c_reunion_participe` (
  `id_reunion` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `feedback` int(255) DEFAULT NULL,
  PRIMARY KEY (`id_reunion`,`id_user`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_reunion_type`
--
-- Creation: Feb 11, 2014 at 09:10 AM
--

DROP TABLE IF EXISTS `c_reunion_type`;
CREATE TABLE IF NOT EXISTS `c_reunion_type` (
  `id_type` int(255) NOT NULL AUTO_INCREMENT,
  `nom_type` varchar(255) NOT NULL,
  `description_type` varchar(255) NOT NULL,
  `icone_type` varchar(255) DEFAULT NULL,
  `role_type` int(255) DEFAULT '1',
  PRIMARY KEY (`id_type`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_roles`
--
-- Creation: Feb 11, 2014 at 09:10 AM
--

DROP TABLE IF EXISTS `c_roles`;
CREATE TABLE IF NOT EXISTS `c_roles` (
  `id_role` int(255) NOT NULL AUTO_INCREMENT,
  `role_value` int(255) NOT NULL,
  `nom_role` varchar(255) NOT NULL,
  `icone_role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_role`),
  UNIQUE KEY `nom_role` (`nom_role`),
  KEY `role_value` (`role_value`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_tags`
--
-- Creation: Nov 29, 2013 at 06:43 AM
--

DROP TABLE IF EXISTS `c_tags`;
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
-- Creation: Jan 05, 2014 at 08:27 AM
--

DROP TABLE IF EXISTS `c_type_competence`;
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
-- Creation: Feb 24, 2014 at 02:30 PM
--

DROP TABLE IF EXISTS `c_user`;
CREATE TABLE IF NOT EXISTS `c_user` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `verifie` int(1) NOT NULL DEFAULT '0',
  `comp_public` tinyint(4) DEFAULT '1',
  `first_visit` int(1) DEFAULT '1',
  `accept_mail` int(8) NOT NULL DEFAULT '31',
  `auths` int(255) NOT NULL DEFAULT '1',
  `bio` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=471 ;

-- --------------------------------------------------------

--
-- Table structure for table `c_user_competences`
--
-- Creation: Feb 24, 2014 at 02:31 PM
--

DROP TABLE IF EXISTS `c_user_competences`;
CREATE TABLE IF NOT EXISTS `c_user_competences` (
  `id_user` int(255) NOT NULL,
  `id_competence` int(255) NOT NULL,
  `niveau` varchar(255) DEFAULT NULL,
  `want_to_learn` int(255) DEFAULT '0',
  `want_to_teach` int(255) DEFAULT '0',
  `wtl_keyword` varchar(255) NOT NULL DEFAULT 'general',
  `date_user_c` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
-- Constraints for table `c_drafts`
--
ALTER TABLE `c_drafts`
  ADD CONSTRAINT `c_drafts_ibfk_1` FOREIGN KEY (`draft_author`) REFERENCES `c_user` (`id`);

--
-- Constraints for table `c_drafts_like`
--
ALTER TABLE `c_drafts_like`
  ADD CONSTRAINT `c_drafts_like_ibfk_2` FOREIGN KEY (`id_draft_like`) REFERENCES `c_drafts` (`draft_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `c_drafts_like_ibfk_1` FOREIGN KEY (`id_user_like`) REFERENCES `c_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `c_echanges`
--
ALTER TABLE `c_echanges`
  ADD CONSTRAINT `c_echanges_ibfk_2` FOREIGN KEY (`id_demande`) REFERENCES `c_user` (`id`),
  ADD CONSTRAINT `c_echanges_ibfk_3` FOREIGN KEY (`id_propose`) REFERENCES `c_user` (`id`),
  ADD CONSTRAINT `c_echanges_ibfk_4` FOREIGN KEY (`competence`) REFERENCES `c_competences` (`id_competence`);

--
-- Constraints for table `c_news`
--
ALTER TABLE `c_news`
  ADD CONSTRAINT `c_news_ibfk_1` FOREIGN KEY (`id_auteur`) REFERENCES `c_user` (`id`);

--
-- Constraints for table `c_reunion`
--
ALTER TABLE `c_reunion`
  ADD CONSTRAINT `c_reunion_ibfk_3` FOREIGN KEY (`reunion_type`) REFERENCES `c_reunion_type` (`id_type`),
  ADD CONSTRAINT `c_reunion_ibfk_1` FOREIGN KEY (`reunion_competence`) REFERENCES `c_competences` (`id_competence`),
  ADD CONSTRAINT `c_reunion_ibfk_2` FOREIGN KEY (`reunion_organisateur`) REFERENCES `c_user` (`id`);

--
-- Constraints for table `c_reunion_participe`
--
ALTER TABLE `c_reunion_participe`
  ADD CONSTRAINT `c_reunion_participe_ibfk_1` FOREIGN KEY (`id_reunion`) REFERENCES `c_reunion` (`reunion_id`),
  ADD CONSTRAINT `c_reunion_participe_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `c_user` (`id`);

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
