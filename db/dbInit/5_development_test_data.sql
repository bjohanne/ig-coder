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

--
-- Dummy User, Project and Document for development
--

INSERT INTO `User` (`foreign_id`, `first_name`, `last_name`) VALUES
('abc123', 'Dummy', 'User1');

INSERT INTO `User` (`foreign_id`, `first_name`, `last_name`) VALUES
('def456', 'Dummy', 'User2');

INSERT INTO `Project` (`name`, `description`, `visibility_id`) VALUES
('My Project', 'A dummy project', 1);   # Private visibility

INSERT INTO `Document` (`name`, `description`, `project_id`, `visibility_id`) VALUES
('My Document', 'A dummy document', 1, 1);	# Private visibility

INSERT INTO `Project_User` (`project_id`, `user_id`, `member_type_id`) VALUES
(1, 1, 1);	# User1 is an owner of the project

INSERT INTO `Project_User` (`project_id`, `user_id`, `member_type_id`) VALUES
(1, 2, 2);      # User2 is a member of the project

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
