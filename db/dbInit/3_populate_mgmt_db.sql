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

INSERT INTO `MemberType` (`member_type`) VALUES
('owner'),	# 1
('member'),	# 2
('guest');	# 3

--
-- Known rows for table `OperationType`
--

INSERT INTO `OperationType` (`operation_type`) VALUES
('create_dataset'),	# 1
('read'),			# 2
('update'),		    # 3
('delete_project'),	# 4
('delete_dataset');	# 5

--
-- Known rows for table `Visibility`
--

INSERT INTO `Visibility` (`visibility`) VALUES
('private'),	# 1
('internal'),	# 2
('public');	# 3

--
-- Known rows for table `DefaultProjectPermission`
--

INSERT INTO `DefaultProjectPermission` (`member_type_id`, `operation_type_id`) VALUES
('1', '1'), ('1', '2'), ('1', '3'), ('1', '4'), ('1', '5'),
('2', '2'), ('2', '3'),
('3', '2');

--
-- Known rows for table `DefaultDatasetPermission`
--

INSERT INTO `DefaultDatasetPermission` (`member_type_id`, `operation_type_id`) VALUES
('1', '2'), ('1', '3'), ('1', '5'),
('2', '2'), ('2', '3'),
('3', '2');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
