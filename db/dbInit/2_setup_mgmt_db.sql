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

CREATE DATABASE mgmt;
USE mgmt;

--
-- Table structure for table `Dataset`
--

CREATE TABLE `Dataset` (
  `dataset_id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_id` mediumint(8) UNSIGNED NOT NULL,
  `visibility_id` mediumint(8) UNSIGNED NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DatasetMemberPermission`
--

CREATE TABLE `DatasetMemberPermission` (
  `permission_id` mediumint(8) UNSIGNED NOT NULL,
  `dataset_id` mediumint(8) UNSIGNED NOT NULL,
  `member_type_id` mediumint(8) UNSIGNED NOT NULL,
  `operation_type_id` mediumint(8) UNSIGNED NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DatasetUserPermission`
--

CREATE TABLE `DatasetUserPermission` (
  `permission_id` mediumint(8) UNSIGNED NOT NULL,
  `dataset_id` mediumint(8) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `operation_type_id` mediumint(8) UNSIGNED NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DefaultDatasetPermission`
--

CREATE TABLE `DefaultDatasetPermission` (
  `member_type_id` mediumint(8) UNSIGNED NOT NULL,
  `operation_type_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DefaultProjectPermission`
--

CREATE TABLE `DefaultProjectPermission` (
  `member_type_id` mediumint(8) UNSIGNED NOT NULL,
  `operation_type_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `MemberType`
--

CREATE TABLE `MemberType` (
  `member_type_id` mediumint(8) UNSIGNED NOT NULL,
  `member_type` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `OperationType`
--

CREATE TABLE `OperationType` (
  `operation_type_id` mediumint(8) UNSIGNED NOT NULL,
  `operation_type` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Project`
--

CREATE TABLE `Project` (
  `project_id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visibility_id` mediumint(8) UNSIGNED NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProjectMemberPermission`
--

CREATE TABLE `ProjectMemberPermission` (
  `permission_id` mediumint(8) UNSIGNED NOT NULL,
  `project_id` mediumint(8) UNSIGNED NOT NULL,
  `member_type_id` mediumint(8) UNSIGNED NOT NULL,
  `operation_type_id` mediumint(8) UNSIGNED NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProjectUserPermission`
--

CREATE TABLE `ProjectUserPermission` (
  `permission_id` mediumint(8) UNSIGNED NOT NULL,
  `project_id` mediumint(8) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `operation_type_id` mediumint(8) UNSIGNED NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Project_User`
--

CREATE TABLE `Project_User` (
  `project_id` mediumint(8) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `member_type_id` mediumint(8) UNSIGNED NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Statement`
--

CREATE TABLE `Statement` (
  `statement_id` mediumint(8) UNSIGNED NOT NULL,
  `foreign_id` mediumint(8) UNSIGNED NOT NULL,
  `dataset_id` mediumint(8) UNSIGNED NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `StatementVersion`
--

CREATE TABLE `StatementVersion` (
  `version_id` mediumint(8) UNSIGNED NOT NULL,
  `foreign_id` mediumint(8) UNSIGNED NOT NULL,
  `statement_id` mediumint(8) UNSIGNED NOT NULL,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `foreign_id` varchar(48) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  `privileged` tinyint(1) NOT NULL DEFAULT 0,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Visibility`
--

CREATE TABLE `Visibility` (
  `visibility_id` mediumint(8) UNSIGNED NOT NULL,
  `visibility` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Dataset`
--
ALTER TABLE `Dataset`
  ADD PRIMARY KEY (`dataset_id`),
  ADD KEY `d_dataset_id` (`dataset_id`),
  ADD KEY `d_project_id` (`project_id`),
  ADD KEY `d_visibility_id` (`visibility_id`);

--
-- Indexes for table `DatasetMemberPermission`
--
ALTER TABLE `DatasetMemberPermission`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `dmp_unique_combo` (`dataset_id`, `member_type_id`, `operation_type_id`),
  ADD KEY `dmp_permission_id` (`permission_id`),
  ADD KEY `dmp_dataset_id` (`dataset_id`),
  ADD KEY `dmp_member_type_id` (`member_type_id`),
  ADD KEY `dmp_operation_type_id` (`operation_type_id`),
  ADD CHECK (`operation_type_id` IN (2, 3, 4));

--
-- Indexes for table `DatasetUserPermission`
--
ALTER TABLE `DatasetUserPermission`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `dup_unique_combo` (`dataset_id`, `user_id`, `operation_type_id`),
  ADD KEY `dup_permission_id` (`permission_id`),
  ADD KEY `dup_dataset_id` (`dataset_id`),
  ADD KEY `dup_user_id` (`user_id`),
  ADD KEY `dup_operation_type_id` (`operation_type_id`),
  ADD CHECK (`operation_type_id` IN (2, 3, 4));

--
-- Indexes for table `DefaultDatasetPermission`
--
ALTER TABLE `DefaultDatasetPermission`
  ADD PRIMARY KEY (`member_type_id`, `operation_type_id`),
  ADD KEY `ddp_member_type_id` (`member_type_id`),
  ADD KEY `ddp_operation_type_id` (`operation_type_id`),
  ADD CHECK (`operation_type_id` IN (2, 3, 4));

--
-- Indexes for table `DefaultProjectPermission`
--
ALTER TABLE `DefaultProjectPermission`
  ADD PRIMARY KEY (`member_type_id`, `operation_type_id`),
  ADD KEY `dpp_member_type_id` (`member_type_id`),
  ADD KEY `dpp_operation_type_id` (`operation_type_id`);

--
-- Indexes for table `MemberType`
--
ALTER TABLE `MemberType`
  ADD PRIMARY KEY (`member_type_id`),
  ADD KEY `mt_member_type_id` (`member_type_id`);

--
-- Indexes for table `OperationType`
--
ALTER TABLE `OperationType`
  ADD PRIMARY KEY (`operation_type_id`),
  ADD KEY `ot_operation_type_id` (`operation_type_id`);

--
-- Indexes for table `Project`
--
ALTER TABLE `Project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `p_project_id` (`project_id`),
  ADD KEY `p_visibility_id` (`visibility_id`);

--
-- Indexes for table `ProjectMemberPermission`
--
ALTER TABLE `ProjectMemberPermission`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `pmp_unique_combo` (`project_id`, `member_type_id`, `operation_type_id`),
  ADD KEY `pmp_permission_id` (`permission_id`),
  ADD KEY `pmp_project_id` (`project_id`),
  ADD KEY `pmp_member_type_id` (`member_type_id`),
  ADD KEY `pmp_operation_type_id` (`operation_type_id`);

--
-- Indexes for table `ProjectUserPermission`
--
ALTER TABLE `ProjectUserPermission`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `pup_unique_combo` (`project_id`, `user_id`, `operation_type_id`),
  ADD KEY `pup_permission_id` (`permission_id`),
  ADD KEY `pup_project_id` (`project_id`),
  ADD KEY `pup_user_id` (`user_id`),
  ADD KEY `pup_operation_type_id` (`operation_type_id`);

--
-- Indexes for table `Project_User`
--
ALTER TABLE `Project_User`
  ADD PRIMARY KEY (`project_id`,`user_id`),
  ADD KEY `pu_project_id` (`project_id`),
  ADD KEY `pu_user_id` (`user_id`),
  ADD KEY `pu_member_type_id` (`member_type_id`);

--
-- Indexes for table `Statement`
--
ALTER TABLE `Statement`
  ADD PRIMARY KEY (`statement_id`),
  ADD UNIQUE KEY `s_foreign_id` (`foreign_id`),
  ADD KEY `s_statement_id` (`statement_id`),
  ADD KEY `s_dataset_id` (`dataset_id`);

--
-- Indexes for table `StatementVersion`
--
ALTER TABLE `StatementVersion`
  ADD PRIMARY KEY (`version_id`),
  ADD UNIQUE KEY `sv_foreign_id` (`foreign_id`),
  ADD KEY `sv_version_id` (`version_id`),
  ADD KEY `sv_statement_id` (`statement_id`),
  ADD KEY `sv_user_id` (`user_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `u_foreign_id` (`foreign_id`),
  ADD KEY `u_user_id` (`user_id`);

--
-- Indexes for table `Visibility`
--
ALTER TABLE `Visibility`
  ADD PRIMARY KEY (`visibility_id`),
  ADD KEY `v_visibility_id` (`visibility_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Dataset`
--
ALTER TABLE `Dataset`
  MODIFY `dataset_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DatasetMemberPermission`
--
ALTER TABLE `DatasetMemberPermission`
  MODIFY `permission_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DatasetUserPermission`
--
ALTER TABLE `DatasetUserPermission`
  MODIFY `permission_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MemberType`
--
ALTER TABLE `MemberType`
  MODIFY `member_type_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `OperationType`
--
ALTER TABLE `OperationType`
  MODIFY `operation_type_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Project`
--
ALTER TABLE `Project`
  MODIFY `project_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ProjectMemberPermission`
--
ALTER TABLE `ProjectMemberPermission`
  MODIFY `permission_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ProjectUserPermission`
--
ALTER TABLE `ProjectUserPermission`
  MODIFY `permission_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Statement`
--
ALTER TABLE `Statement`
  MODIFY `statement_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `StatementVersion`
--
ALTER TABLE `StatementVersion`
  MODIFY `version_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `user_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Visibility`
--
ALTER TABLE `Visibility`
  MODIFY `visibility_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Dataset`
--
ALTER TABLE `Dataset`
  ADD CONSTRAINT `d_project_id` FOREIGN KEY (`project_id`) REFERENCES `Project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_visibility_id` FOREIGN KEY (`visibility_id`) REFERENCES `Visibility` (`visibility_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `DatasetMemberPermission`
--
ALTER TABLE `DatasetMemberPermission`
  ADD CONSTRAINT `dmp_dataset_id` FOREIGN KEY (`dataset_id`) REFERENCES `Dataset` (`dataset_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dmp_member_type_id` FOREIGN KEY (`member_type_id`) REFERENCES `MemberType` (`member_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dmp_operation_type_id` FOREIGN KEY (`operation_type_id`) REFERENCES `OperationType` (`operation_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `DatasetUserPermission`
--
ALTER TABLE `DatasetUserPermission`
  ADD CONSTRAINT `dup_dataset_id` FOREIGN KEY (`dataset_id`) REFERENCES `Dataset` (`dataset_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dup_operation_type_id` FOREIGN KEY (`operation_type_id`) REFERENCES `OperationType` (`operation_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dup_user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `DefaultDatasetPermission`
--
ALTER TABLE `DefaultDatasetPermission`
  ADD CONSTRAINT `ddp_member_type_id` FOREIGN KEY (`member_type_id`) REFERENCES `MemberType` (`member_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ddp_operation_type_id` FOREIGN KEY (`operation_type_id`) REFERENCES `OperationType` (`operation_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `DefaultProjectPermission`
--
ALTER TABLE `DefaultProjectPermission`
  ADD CONSTRAINT `dpp_member_type_id` FOREIGN KEY (`member_type_id`) REFERENCES `MemberType` (`member_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dpp_operation_type_id` FOREIGN KEY (`operation_type_id`) REFERENCES `OperationType` (`operation_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Project`
--
ALTER TABLE `Project`
  ADD CONSTRAINT `p_visibility_id` FOREIGN KEY (`visibility_id`) REFERENCES `Visibility` (`visibility_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `ProjectMemberPermission`
--
ALTER TABLE `ProjectMemberPermission`
  ADD CONSTRAINT `pmp_member_type_id` FOREIGN KEY (`member_type_id`) REFERENCES `MemberType` (`member_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pmp_operation_type_id` FOREIGN KEY (`operation_type_id`) REFERENCES `OperationType` (`operation_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pmp_project_id` FOREIGN KEY (`project_id`) REFERENCES `Project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ProjectUserPermission`
--
ALTER TABLE `ProjectUserPermission`
  ADD CONSTRAINT `pup_operation_type_id` FOREIGN KEY (`operation_type_id`) REFERENCES `OperationType` (`operation_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pup_project_id` FOREIGN KEY (`project_id`) REFERENCES `Project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pup_user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Project_User`
--
ALTER TABLE `Project_User`
  ADD CONSTRAINT `pu_member_type_id` FOREIGN KEY (`member_type_id`) REFERENCES `MemberType` (`member_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pu_project_id` FOREIGN KEY (`project_id`) REFERENCES `Project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pu_user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Statement`
--
ALTER TABLE `Statement`
  ADD CONSTRAINT `s_dataset_id` FOREIGN KEY (`dataset_id`) REFERENCES `Dataset` (`dataset_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `StatementVersion`
--
ALTER TABLE `StatementVersion`
  ADD CONSTRAINT `sv_statement_id` FOREIGN KEY (`statement_id`) REFERENCES `Statement` (`statement_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sv_user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
