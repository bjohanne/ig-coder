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
-- Known rows for table `MemberType`
--

INSERT INTO `MemberType` (`member_type_id`, `member_type`) VALUES
(1, 'owner'),
(2, 'member'),
(3, 'guest');

--
-- Known rows for table `OperationType`
--

INSERT INTO `OperationType` (`operation_type_id`, `operation_type`) VALUES
(1, 'create_dataset'),
(2, 'read'),
(3, 'update'),
(4, 'delete_project'),
(5, 'delete_dataset');

--
-- Known rows for table `Visibility`
--

INSERT INTO `Visibility` (`visibility_id`, `visibility`) VALUES
(1, 'private'),
(2, 'internal'),
(3, 'public');

--
-- Known rows for table `DefaultProjectPermission`
--

INSERT INTO `DefaultProjectPermission` (`member_type_id`, `operation_type_id`) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),	# Owner has all permissions
(2, 2), (2, 3),				# Member can read and update
(3, 2);					# Guest can read

--
-- Known rows for table `DefaultDatasetPermission`
--

INSERT INTO `DefaultDatasetPermission` (`member_type_id`, `operation_type_id`) VALUES
(1, 2), (1, 3), (1, 5),	# Owner has all permissions that apply to datasets (Read, Update, Delete Dataset)
(2, 2), (2, 3),		# Member can read and update
(3, 2);			# Guest can read

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
