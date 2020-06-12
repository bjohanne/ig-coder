-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jun 05, 2020 at 12:32 PM
-- Server version: 10.4.13-MariaDB-1:10.4.13+maria~bionic-log
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mgmt`
--

USE mgmt;

DELIMITER $$

--
-- Procedures
--

CREATE DEFINER=`root`@`%` PROCEDURE `permcheck_add_dataset` (IN `user_id` MEDIUMINT UNSIGNED, OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
SET result = 1$$

-- --------------------------------------------------------

CREATE DEFINER=`root`@`%` PROCEDURE `add_dataset` (IN `name` VARCHAR(150) CHARSET utf8mb4, IN `description` VARCHAR(500) CHARSET utf8mb4, IN `visibility_id` MEDIUMINT UNSIGNED)  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL permcheck_add_dataset(user_id, @result);

IF @result IS TRUE THEN
	INSERT INTO `Dataset` (`name`, `description`, `visibility_id`) VALUES (name, description, visibility_id)$$
    SELECT last_insert_id();
ELSE
	SELECT 0;
END IF;
END

CREATE DEFINER=`root`@`%` PROCEDURE `add_project` (IN `name` VARCHAR(150) CHARSET utf8mb4, IN `description` VARCHAR(500), IN `visibility_id` MEDIUMINT UNSIGNED)  MODIFIES SQL DATA
    SQL SECURITY INVOKER
INSERT INTO `Project` (`name`, `description`, `visibility_id`) VALUES (name, description, visibility_id)$$

CREATE DEFINER=`root`@`%` PROCEDURE `add_user` (IN `foreign_id` VARCHAR(48) CHARSET utf8mb4, IN `first_name` VARCHAR(75) CHARSET utf8mb4, IN `last_name` VARCHAR(75) CHARSET utf8mb4)  MODIFIES SQL DATA
    SQL SECURITY INVOKER
INSERT INTO `User` (`foreign_id`, `first_name`, `last_name`) VALUES (foreign_id, first_name, last_name)$$

-- --------------------------------------------------------

CREATE DEFINER=`root`@`%` PROCEDURE `delete_dataset` (IN `dataset_id` MEDIUMINT UNSIGNED)  MODIFIES SQL DATA
    SQL SECURITY INVOKER
DELETE FROM `Dataset` WHERE `dataset_id` = dataset_id$$

CREATE DEFINER=`root`@`%` PROCEDURE `delete_project` (IN `project_id` MEDIUMINT UNSIGNED)  MODIFIES SQL DATA
    SQL SECURITY INVOKER
DELETE FROM `Project` WHERE `project_id` = project_id$$

CREATE DEFINER=`root`@`%` PROCEDURE `disable_user` (IN `user_id` MEDIUMINT UNSIGNED)  MODIFIES SQL DATA
    SQL SECURITY INVOKER
UPDATE `User` SET `disabled` = 1 WHERE `user_id` = user_id$$

-- --------------------------------------------------------

CREATE DEFINER=`root`@`%` PROCEDURE `get_dataset` (IN `dataset_id` MEDIUMINT UNSIGNED)  READS SQL DATA
    SQL SECURITY INVOKER
SELECT * FROM `Dataset` WHERE `dataset_id` = dataset_id$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_project` (IN `project_id` MEDIUMINT UNSIGNED)  READS SQL DATA
    SQL SECURITY INVOKER
SELECT * FROM `Project` WHERE `project_id` = project_id$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_user` (IN `user_id` MEDIUMINT UNSIGNED)  READS SQL DATA
    SQL SECURITY INVOKER
SELECT * FROM `User` WHERE `user_id` = user_id$$

DELIMITER ;

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
