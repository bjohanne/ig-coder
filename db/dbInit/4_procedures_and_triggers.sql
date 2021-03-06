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

-- --------------------------------------------------------
-- PROCEDURES
-- --------------------------------------------------------

DELIMITER $$

-- --------------------------------------------------------
-- Creators
-- --------------------------------------------------------

# Create document
CREATE PROCEDURE `create_document` (IN `name` VARCHAR(150), IN `description` VARCHAR(500), IN `project_id` MEDIUMINT UNSIGNED, IN `visibility_id` MEDIUMINT UNSIGNED,
    IN `user_uuid` VARCHAR(48), OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid, @user_id);
CALL permcheck_create_document(@user_id, project_id, @inner_result);
IF @inner_result IS TRUE THEN
	IF visibility_id IS NULL THEN
		CALL help_get_project_visibility(project_id, @project_visibility);
		SET visibility_id = @project_visibility;
	END IF;
	INSERT INTO `Document` (`name`, `description`, `project_id`, `visibility_id`) VALUES (name, description, project_id, visibility_id);
	SELECT d.`document_id`, d.`name`, d.`description`, d.`project_id`, d.`visibility_id`, UNIX_TIMESTAMP(d.`created_time`) as 'created_time', UNIX_TIMESTAMP(d.`modified_time`) as 'modified_time'
	FROM Document d WHERE d.`document_id` = last_insert_id();
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Create project
CREATE PROCEDURE `create_project` (IN `name` VARCHAR(150), IN `description` VARCHAR(500), IN `visibility_id` MEDIUMINT UNSIGNED, IN `user_uuid` VARCHAR(48))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid, @user_id);
INSERT INTO `Project` (`name`, `description`, `visibility_id`) VALUES (name, description, visibility_id);
SELECT p.`project_id`, p.`name`, p.`description`, p.`visibility_id`, UNIX_TIMESTAMP(p.`created_time`) as 'created_time', UNIX_TIMESTAMP(p.`modified_time`) as 'modified_time'
FROM `Project` p WHERE p.`project_id` = last_insert_id();
INSERT INTO `Project_User` (`project_id`, `user_id`, `member_type_id`) VALUES (last_insert_id(), @user_id, 1); # Last insert ID is that of the Project, not the ProjectMemberPermission created by the trigger on Project
END$$

# Create user
CREATE PROCEDURE `create_user` (IN `foreign_id` VARCHAR(48), IN `first_name` VARCHAR(75), IN `last_name` VARCHAR(75))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
INSERT INTO `User` (`foreign_id`, `first_name`, `last_name`) VALUES (foreign_id, first_name, last_name)$$

# Create statement
CREATE PROCEDURE `create_statement` (IN `foreign_id` MEDIUMINT UNSIGNED, IN `document_id` MEDIUMINT UNSIGNED, IN `user_uuid` VARCHAR(48), OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid, @user_id);
CALL permcheck_update_document(@user_id, document_id, @inner_result);
IF @inner_result IS TRUE THEN
	INSERT INTO `Statement` (`foreign_id`, `document_id`) VALUES (foreign_id, document_id);
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Create statement version
CREATE PROCEDURE `create_statement_version` (IN `foreign_id` MEDIUMINT UNSIGNED, IN `statement_id` MEDIUMINT UNSIGNED, IN `user_uuid` VARCHAR(48), OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid, @user_id);
CALL help_get_document_of_statement(statement_id, @document_id);
CALL permcheck_update_document(@user_id, @document_id, @inner_result);
IF @inner_result IS TRUE THEN
	INSERT INTO `StatementVersion` (`foreign_id`, `statement_id`, `user_id`) VALUES (foreign_id, statement_id, @user_id);
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Create project member
CREATE PROCEDURE `create_project_member` (IN `project_id` MEDIUMINT UNSIGNED, IN `user_uuid_object` VARCHAR(48), IN `member_type_id` MEDIUMINT UNSIGNED, IN `user_uuid_actor` VARCHAR(48),
    OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid_object, @user_id_object);
CALL help_get_user_id(user_uuid_actor, @user_id_actor);
CALL help_get_membership(@user_id_actor, project_id, @membership_actor);
IF @membership_actor = 1 OR (@membership_actor = 2 AND member_type_id IN (2, 3)) THEN
	DELETE pu FROM `Project_User` pu WHERE pu.`project_id` = project_id AND pu.`user_id` = @user_id_object;
	INSERT INTO `Project_User` (`project_id`, `user_id`, `member_type_id`) VALUES (project_id, @user_id_object, member_type_id);
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Create permission (project, member)
CREATE PROCEDURE `create_project_member_permission` (IN `project_id` MEDIUMINT UNSIGNED, IN `member_type_id` MEDIUMINT UNSIGNED, IN `operation_type_id` MEDIUMINT UNSIGNED, IN `user_uuid_actor` VARCHAR(48),
    OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid_actor, @user_id_actor);
CALL help_get_membership(@user_id_actor, project_id, @membership);
IF @membership = 1 THEN
	INSERT INTO `ProjectMemberPermission` (`project_id`, `member_type_id`, `operation_type_id`) VALUES (project_id, member_type_id, operation_type_id);
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Create permission (project, user)
CREATE PROCEDURE `create_project_user_permission` (IN `project_id` MEDIUMINT UNSIGNED, IN `user_uuid_perm` VARCHAR(48), IN `operation_type_id` MEDIUMINT UNSIGNED, IN `user_uuid_actor` VARCHAR(48),
    OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid_perm, @user_id_perm);
CALL help_get_user_id(user_uuid_actor, @user_id_actor);
CALL help_get_membership(@user_id_actor, project_id, @membership);
IF @membership = 1 THEN
	INSERT INTO `ProjectUserPermission` (`project_id`, `user_id`, `operation_type_id`) VALUES (project_id, @user_id_perm, operation_type_id);
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Create permission (document, member)
CREATE PROCEDURE `create_document_member_permission` (IN `document_id` MEDIUMINT UNSIGNED, IN `member_type_id` MEDIUMINT UNSIGNED, IN `operation_type_id` MEDIUMINT UNSIGNED, IN `user_uuid_actor` VARCHAR(48),
    OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid_actor, @user_id_actor);
CALL help_get_membership_of_document(@user_id_actor, document_id, @membership);
IF @membership = 1 THEN
	INSERT INTO `DocumentMemberPermission` (`document_id`, `member_type_id`, `operation_type_id`) VALUES (document_id, member_type_id, operation_type_id);
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Create permission (document, user)
CREATE PROCEDURE `create_document_user_permission` (IN `document_id` MEDIUMINT UNSIGNED, IN `user_uuid_perm` VARCHAR(48), IN `operation_type_id` MEDIUMINT UNSIGNED, IN `user_uuid_actor` VARCHAR(48),
    OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid_perm, @user_id_perm);
CALL help_get_user_id(user_uuid_actor, @user_id_actor);
CALL help_get_membership_of_document(@user_id_actor, document_id, @membership);
IF @membership = 1 THEN
	INSERT INTO `DocumentUserPermission` (`document_id`, `user_id`, `operation_type_id`) VALUES (document_id, @user_id_perm, operation_type_id);
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

-- --------------------------------------------------------
-- Readers / getters
-- --------------------------------------------------------

# Read document
CREATE PROCEDURE `read_document` (IN `document_id` MEDIUMINT UNSIGNED, IN `user_uuid` VARCHAR(48), OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF NOT EXISTS(SELECT * FROM `Document` d WHERE d.`document_id` = document_id) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document ID does not exist', MYSQL_ERRNO = '02000';
END IF;
CALL help_get_user_id(user_uuid, @user_id);
CALL permcheck_read_document(@user_id, document_id, @inner_result);
IF @inner_result IS TRUE THEN
	SELECT d.`document_id`, d.`name`, d.`description`, d.`project_id`, d.`visibility_id`, UNIX_TIMESTAMP(d.`created_time`) as 'created_time', UNIX_TIMESTAMP(d.`modified_time`) as 'modified_time'
	FROM `Document` d WHERE d.`document_id` = document_id;
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Read project
CREATE PROCEDURE `read_project` (IN `project_id` MEDIUMINT UNSIGNED, IN `user_uuid` VARCHAR(48), OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF NOT EXISTS(SELECT * FROM `Project` p WHERE p.`project_id` = project_id) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Project ID does not exist', MYSQL_ERRNO = '02000';
END IF;
CALL help_get_user_id(user_uuid, @user_id);
CALL permcheck_read_project(@user_id, project_id, @inner_result);
IF @inner_result IS TRUE THEN
	SELECT p.`project_id`, p.`name`, p.`description`, p.`visibility_id`, UNIX_TIMESTAMP(p.`created_time`) as 'created_time', UNIX_TIMESTAMP(p.`modified_time`) as 'modified_time'
	FROM `Project` p WHERE p.`project_id` = project_id;
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Read all public projects
CREATE PROCEDURE `read_all_projects_public` ()  READS SQL DATA
    SQL SECURITY INVOKER
SELECT p.`project_id`, p.`name`, p.`description`, p.`visibility_id`, UNIX_TIMESTAMP(p.`created_time`) as 'created_time', UNIX_TIMESTAMP(p.`modified_time`) as 'modified_time'
FROM `Project` p WHERE p.`visibility_id` = 3$$

# Read all public or internal projects
CREATE PROCEDURE `read_all_projects_public_internal` (IN `user_uuid` VARCHAR(48))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF user_uuid IS NOT NULL THEN
	SELECT p.`project_id`, p.`name`, p.`description`, p.`visibility_id`, UNIX_TIMESTAMP(p.`created_time`) as 'created_time', UNIX_TIMESTAMP(p.`modified_time`) as 'modified_time'
	FROM `Project` p WHERE p.`visibility_id` = 3 OR p.`visibility_id` = 2;
ELSE
	SELECT p.`project_id`, p.`name`, p.`description`, p.`visibility_id`, UNIX_TIMESTAMP(p.`created_time`) as 'created_time', UNIX_TIMESTAMP(p.`modified_time`) as 'modified_time'
	FROM `Project` p WHERE p.`visibility_id` = 3;
END IF;
END$$

# Read all projects a user is member of
CREATE PROCEDURE `read_all_projects_member` (IN `user_uuid` VARCHAR(48))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid, @user_id);
SELECT p.`project_id`, p.`name`, p.`description`, p.`visibility_id`, UNIX_TIMESTAMP(p.`created_time`) as 'created_time', UNIX_TIMESTAMP(p.`modified_time`) as 'modified_time'
FROM `Project` p INNER JOIN `Project_User` pu ON p.`project_id` = pu.`project_id`
WHERE pu.`user_id` = @user_id AND p.`visibility_id` = 1
AND EXISTS(SELECT * FROM `ProjectMemberPermission` pmp WHERE pmp.`project_id` = p.`project_id` AND pmp.`member_type_id` = pu.`member_type_id` AND pmp.`operation_type_id` = 2);
END$$

# Read all projects shared with a user
CREATE PROCEDURE `read_all_projects_shared` (IN `user_uuid` VARCHAR(48))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid, @user_id);
SELECT p.`project_id`, p.`name`, p.`description`, p.`visibility_id`, UNIX_TIMESTAMP(p.`created_time`) as 'created_time', UNIX_TIMESTAMP(p.`modified_time`) as 'modified_time'
FROM `Project` p WHERE p.`visibility_id` = 1
AND EXISTS(SELECT * FROM `ProjectUserPermission` pup WHERE pup.`project_id` = p.`project_id` AND pup.`user_id` = @user_id AND pup.`operation_type_id` = 2);
END$$

# Read all documents of a project
CREATE PROCEDURE `read_all_documents_of_project` (IN `project_id` MEDIUMINT UNSIGNED, IN `user_uuid` VARCHAR(48))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid, @user_id);
CALL help_get_membership(@user_id, project_id, @membership);
SELECT * FROM `Document` d WHERE d.`project_id` = project_id
AND ((EXISTS(SELECT * FROM `DocumentMemberPermission` dmp WHERE dmp.`document_id` = d.`document_id` AND dmp.`member_type_id` = @membership AND dmp.`operation_type_id` = 2)
	OR EXISTS(SELECT * FROM `DocumentUserPermission` dup WHERE dup.`document_id` = d.`document_id` AND dup.`user_id` = @user_id AND dup.`operation_type_id` = 2))
OR (user_uuid IS NOT NULL AND d.`visibility_id` = 2)
OR d.`visibility_id` = 3);
END$$

# Read all statements of a document
CREATE PROCEDURE `read_all_statements_of_document` (IN `document_id` MEDIUMINT UNSIGNED, IN `user_uuid` VARCHAR(48))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid, @user_id);
CALL help_get_membership_of_document(@user_id, document_id, @membership);
SELECT s.`statement_id`, s.`foreign_id`, s.`document_id`, UNIX_TIMESTAMP(s.`created_time`) as 'created_time', UNIX_TIMESTAMP(s.`modified_time`) as 'modified_time'
FROM `Statement` s INNER JOIN `Document` d ON s.`document_id` = d.`document_id` WHERE s.`document_id` = document_id
AND ((EXISTS(SELECT * FROM `DocumentMemberPermission` dmp WHERE dmp.`document_id` = document_id AND dmp.`member_type_id` = @membership AND dmp.`operation_type_id` = 2)
	OR EXISTS(SELECT * FROM `DocumentUserPermission` dup WHERE dup.`document_id` = document_id AND dup.`user_id` = @user_id AND dup.`operation_type_id` = 2))
OR (user_uuid IS NOT NULL AND d.`visibility_id` = 2)
OR d.`visibility_id` = 3);
END$$

# Read all versions of a statement
CREATE PROCEDURE `read_all_versions_of_statement` (IN `statement_id` MEDIUMINT UNSIGNED, IN `user_uuid` VARCHAR(48))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid, @user_id);
CALL help_get_document_of_statement(statement_id, @document_id);
CALL help_get_membership_of_document(@user_id, @document_id, @membership);
SELECT sv.`version_id`, sv.`foreign_id`, sv.`statement_id`, sv.`user_id`, UNIX_TIMESTAMP(sv.`created_time`) as 'created_time', UNIX_TIMESTAMP(sv.`modified_time`) as 'modified_time'
FROM StatementVersion sv INNER JOIN `Statement` s ON sv.`statement_id` = s.`statement_id` INNER JOIN `Document` d ON s.`document_id` = d.`document_id`
WHERE sv.`statement_id` = statement_id
AND ((EXISTS(SELECT * FROM `DocumentMemberPermission` dmp WHERE dmp.`document_id` = @document_id AND dmp.`member_type_id` = @membership AND dmp.`operation_type_id` = 2)
	OR EXISTS(SELECT * FROM `DocumentUserPermission` dup WHERE dup.`document_id` = @document_id AND dup.`user_id` = @user_id AND dup.`operation_type_id` = 2))
OR (user_uuid IS NOT NULL AND d.`visibility_id` = 2)
OR d.`visibility_id` = 3);
END$$

# Get user
CREATE PROCEDURE `get_user` (IN `user_uuid` VARCHAR(48))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF NOT EXISTS(SELECT * FROM `User` u WHERE u.`foreign_id` = user_uuid) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User foreign_id does not exist', MYSQL_ERRNO = '02000';
END IF;
SELECT u.`user_id`, u.`foreign_id`, u.`first_name`, u.`last_name`, u.`disabled`, u.`privileged`, UNIX_TIMESTAMP(u.`created_time`) as 'created_time', UNIX_TIMESTAMP(u.`modified_time`) as 'modified_time'
FROM `User` u WHERE u.`foreign_id` = user_uuid;
END$$

# Get all users
CREATE PROCEDURE `get_all_users` ()  READS SQL DATA
    SQL SECURITY INVOKER
SELECT u.`user_id`, u.`foreign_id`, u.`first_name`, u.`last_name`, u.`disabled`, u.`privileged`, UNIX_TIMESTAMP(u.`created_time`) as 'created_time', UNIX_TIMESTAMP(u.`modified_time`) as 'modified_time'
FROM `User` u$$

-- --------------------------------------------------------
-- Updaters
-- --------------------------------------------------------

# Update document
CREATE PROCEDURE `update_document` (IN `name` VARCHAR(150), IN `description` VARCHAR(500), IN `visibility_id` MEDIUMINT UNSIGNED, IN `document_id` MEDIUMINT UNSIGNED,
    IN `user_uuid` VARCHAR(48), OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF NOT EXISTS(SELECT * FROM `Document` d WHERE d.`document_id` = document_id) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document ID does not exist', MYSQL_ERRNO = '02000';
END IF;
CALL help_get_user_id(user_uuid, @user_id);
CALL permcheck_update_document(@user_id, document_id, @inner_result);
IF @inner_result IS TRUE THEN
	UPDATE `Document` d SET
		d.`name` = IF(name IS NOT NULL, name, d.`name`),
		d.`description` = IF(description IS NOT NULL, description, d.`description`),
		d.`visibility_id` = IF(visibility_id IS NOT NULL, visibility_id, d.`visibility_id`)
	WHERE d.`document_id` = document_id;
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Update project
CREATE PROCEDURE `update_project` (IN `name` VARCHAR(150), IN `description` VARCHAR(500), IN `visibility_id` MEDIUMINT UNSIGNED, IN `project_id` MEDIUMINT UNSIGNED,
    IN `user_uuid` VARCHAR(48), OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF NOT EXISTS(SELECT * FROM `Project` p WHERE p.`project_id` = project_id) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Project ID does not exist', MYSQL_ERRNO = '02000';
END IF;
CALL help_get_user_id(user_uuid, @user_id);
CALL permcheck_update_project(@user_id, project_id, @inner_result);
IF @inner_result IS TRUE THEN
	UPDATE `Project` p SET
		p.`name` = IF(name IS NOT NULL, name, p.`name`),
		p.`description` = IF(description IS NOT NULL, description, p.`description`),
		p.`visibility_id` = IF(visibility_id IS NOT NULL, visibility_id, p.`visibility_id`)
	WHERE p.`project_id` = project_id;
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Update user
CREATE PROCEDURE `update_user` (IN `first_name` VARCHAR(75), IN `last_name` VARCHAR(75), IN `user_uuid` VARCHAR(48))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF NOT EXISTS(SELECT * FROM `User` u WHERE u.`foreign_id` = user_uuid) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User foreign_id does not exist', MYSQL_ERRNO = '02000';
END IF;
UPDATE `User` u SET
	u.`first_name` = IF(first_name IS NOT NULL, first_name, d.`first_name`),
	u.`last_name` = IF(last_name IS NOT NULL, last_name, d.`last_name`)
WHERE u.`foreign_id` = user_uuid;
END$$

# Enable user
CREATE PROCEDURE `enable_user` (IN `user_uuid` VARCHAR(48))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF NOT EXISTS(SELECT * FROM `User` u WHERE u.`foreign_id` = user_uuid) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User foreign_id does not exist', MYSQL_ERRNO = '02000';
END IF;
UPDATE `User` u SET u.`disabled` = 0 WHERE u.`foreign_id` = user_uuid;
END$$

# Promote project member to owner
CREATE PROCEDURE `make_project_owner` (IN `project_id` MEDIUMINT UNSIGNED, IN `user_uuid_object` VARCHAR(48), IN `user_uuid_actor` VARCHAR(48), OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid_object, @user_id_object);
CALL help_get_user_id(user_uuid_actor, @user_id_actor);
CALL help_get_membership(@user_id_object, project_id, @membership_object);
CALL help_get_membership(@user_id_actor, project_id, @membership_actor);
IF @membership_actor = 1 AND @membership_object IN (1, 2, 3) THEN
	DELETE pu FROM `Project_User` pu WHERE pu.`project_id` = project_id AND pu.`user_id` = @user_id_object;
	INSERT INTO `Project_User` (`project_id`, `user_id`, `member_type_id`) VALUES (project_id, @user_id_object, 1);
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

-- --------------------------------------------------------
-- Deleters
-- --------------------------------------------------------

# Delete document
CREATE PROCEDURE `delete_document` (IN `document_id` MEDIUMINT UNSIGNED, IN `user_uuid` VARCHAR(48), OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF NOT EXISTS(SELECT * FROM `Document` d WHERE d.`document_id` = document_id) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Document ID does not exist', MYSQL_ERRNO = '02000';
END IF;
CALL help_get_user_id(user_uuid, @user_id);
CALL permcheck_delete_document(@user_id, document_id, @inner_result);
IF @inner_result IS TRUE THEN
	DELETE d FROM `Document` d WHERE d.`document_id` = document_id;
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Delete project
CREATE PROCEDURE `delete_project` (IN `project_id` MEDIUMINT UNSIGNED, IN `user_uuid` VARCHAR(48), OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF NOT EXISTS(SELECT * FROM `Project` p WHERE p.`project_id` = project_id) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Project ID does not exist', MYSQL_ERRNO = '02000';
END IF;
CALL help_get_user_id(user_uuid, @user_id);
CALL permcheck_delete_project(@user_id, project_id, @inner_result);
IF @inner_result IS TRUE THEN
	DELETE p FROM `Project` p WHERE p.`project_id` = project_id;
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Disable user
CREATE PROCEDURE `disable_user` (IN `user_uuid` VARCHAR(48))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF NOT EXISTS(SELECT * FROM `User` u WHERE u.`foreign_id` = user_uuid) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User foreign_id does not exist', MYSQL_ERRNO = '02000';
END IF;
UPDATE `User` u SET u.`disabled` = 1 WHERE u.`foreign_id` = user_uuid;
END$$

# Delete statement
CREATE PROCEDURE `delete_statement` (IN `statement_id` MEDIUMINT UNSIGNED, IN `user_uuid` VARCHAR(48), OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF NOT EXISTS(SELECT * FROM `Statement` s WHERE s.`statement_id` = statement_id) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Statement ID does not exist', MYSQL_ERRNO = '02000';
END IF;
CALL help_get_user_id(user_uuid, @user_id);
CALL help_get_document_of_statement(statement_id, @document_id);
CALL permcheck_update_document(@user_id, @document_id, @inner_result);
IF @inner_result IS TRUE THEN
	DELETE s FROM `Statement` s WHERE s.`statement_id` = statement_id;
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Delete project member
CREATE PROCEDURE `delete_project_member` (IN `project_id` MEDIUMINT UNSIGNED, IN `user_uuid_object` VARCHAR(48), IN `user_uuid_actor` VARCHAR(48))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid_object, @user_id_object);
CALL help_get_user_id(user_uuid_actor, @user_id_actor);
CALL help_get_membership(@user_id_actor, project_id, @membership_actor);
IF @membership_actor = 1 THEN
	DELETE pu FROM `Project_User` pu WHERE pu.`project_id` = project_id AND pu.`user_id` = @user_id_object;
END IF;
END$$

# Delete permission (project, member)
CREATE PROCEDURE `delete_project_member_permission` (IN `project_id` MEDIUMINT UNSIGNED, IN `member_type_id` MEDIUMINT UNSIGNED, IN `operation_type_id` MEDIUMINT UNSIGNED, IN `user_uuid_actor` VARCHAR(48),
    OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid_actor, @user_id_actor);
CALL help_get_membership(@user_id_actor, project_id, @membership);
IF @membership = 1 THEN
	DELETE pmp FROM `ProjectMemberPermission` pmp WHERE pmp.`project_id` = project_id AND pmp.`member_type_id` = member_type_id AND pmp.`operation_type_id` = operation_type_id;
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Delete permission (project, user)
CREATE PROCEDURE `delete_project_user_permission` (IN `project_id` MEDIUMINT UNSIGNED, IN `user_uuid_perm` VARCHAR(48), IN `operation_type_id` MEDIUMINT UNSIGNED, IN `user_uuid_actor` VARCHAR(48),
    OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid_perm, @user_id_perm);
CALL help_get_user_id(user_uuid_actor, @user_id_actor);
CALL help_get_membership(@user_id_actor, project_id, @membership);
IF @membership = 1 THEN
	DELETE pup FROM `ProjectUserPermission` pup WHERE pup.`project_id` = project_id AND pup.`user_id` = @user_id_perm AND pup.`operation_type_id` = operation_type_id;
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$


# Delete permission (document, member)
CREATE PROCEDURE `delete_document_member_permission` (IN `document_id` MEDIUMINT UNSIGNED, IN `member_type_id` MEDIUMINT UNSIGNED, IN `operation_type_id` MEDIUMINT UNSIGNED, IN `user_uuid_actor` VARCHAR(48),
    OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid_actor, @user_id_actor);
CALL help_get_membership_of_document(@user_id_actor, document_id, @membership);
IF @membership = 1 THEN
	DELETE dmp FROM `DocumentMemberPermission` dmp WHERE dmp.`document_id` = document_id AND dmp.`member_type_id` = member_type_id AND dmp.`operation_type_id` = operation_type_id;
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

# Delete permission (document, user)
CREATE PROCEDURE `delete_document_user_permission` (IN `document_id` MEDIUMINT UNSIGNED, IN `user_uuid_perm` VARCHAR(48), IN `operation_type_id` MEDIUMINT UNSIGNED, IN `user_uuid_actor` VARCHAR(48),
    OUT `result` TINYINT(1))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_user_id(user_uuid_perm, @user_id_perm);
CALL help_get_user_id(user_uuid_actor, @user_id_actor);
CALL help_get_membership_of_document(@user_id_actor, document_id, @membership);
IF @membership = 1 THEN
	DELETE dup FROM `DocumentUserPermission` dup WHERE dup.`document_id` = document_id AND dup.`user_id` = @user_id_perm AND dup.`operation_type_id` = operation_type_id;
	SET result = TRUE;
ELSE
	SET result = FALSE;
END IF;
END$$

-- --------------------------------------------------------
-- Helpers for permission checkers
-- --------------------------------------------------------

# Helper: Get user membership of a project
CREATE PROCEDURE `help_get_membership` (IN `user_id` MEDIUMINT UNSIGNED, IN `project_id` MEDIUMINT UNSIGNED, OUT `membership` MEDIUMINT UNSIGNED)  READS SQL DATA
    SQL SECURITY INVOKER
SELECT pu.`member_type_id` INTO membership FROM `Project_User` pu WHERE pu.`user_id` = user_id AND pu.`project_id` = project_id$$

# Helper: Get user membership given a document
CREATE PROCEDURE `help_get_membership_of_document` (IN `user_id` MEDIUMINT UNSIGNED, IN `document_id` MEDIUMINT UNSIGNED, OUT `membership` MEDIUMINT UNSIGNED)  READS SQL DATA
    SQL SECURITY INVOKER
SELECT pu.`member_type_id` INTO membership FROM `Project_User` pu INNER JOIN `Document` d ON pu.`project_id` = d.`project_id`
WHERE pu.`user_id` = user_id AND d.`document_id` = document_id$$

# Helper: Get the project ID for a document ID
CREATE PROCEDURE `help_get_project_of_document` (IN `document_id` MEDIUMINT UNSIGNED, OUT `project_id` MEDIUMINT UNSIGNED)  READS SQL DATA
    SQL SECURITY INVOKER
SELECT d.`project_id` INTO project_id FROM `Document` d WHERE d.`document_id` = document_id$$

# Helper: Get the document ID for a statement ID
CREATE PROCEDURE `help_get_document_of_statement` (IN `statement_id` MEDIUMINT UNSIGNED, OUT `document_id` MEDIUMINT UNSIGNED)  READS SQL DATA
    SQL SECURITY INVOKER
SELECT s.`document_id` INTO document_id FROM `Statement` s WHERE s.`statement_id` = statement_id$$

# Helper: Get a project's visibility
CREATE PROCEDURE `help_get_project_visibility` (IN `project_id` MEDIUMINT UNSIGNED, OUT `visibility_id` MEDIUMINT UNSIGNED)  READS SQL DATA
    SQL SECURITY INVOKER
SELECT p.`visibility_id` INTO visibility_id FROM `Project` p WHERE p.`project_id` = project_id$$

# Helper: Get a document's visibility
CREATE PROCEDURE `help_get_document_visibility` (IN `document_id` MEDIUMINT UNSIGNED, OUT `visibility_id` MEDIUMINT UNSIGNED)  READS SQL DATA
    SQL SECURITY INVOKER
SELECT d.`visibility_id` INTO visibility_id FROM `Document` d WHERE d.`document_id` = document_id$$

# Helper: Get the ID of a user by UUID
CREATE PROCEDURE `help_get_user_id` (IN `user_uuid` VARCHAR(48), OUT `user_id` MEDIUMINT UNSIGNED)  READS SQL DATA
    SQL SECURITY INVOKER
SELECT u.`user_id` INTO user_id FROM `User` u WHERE u.`foreign_id` = user_uuid$$

-- --------------------------------------------------------
-- Permission checkers
-- --------------------------------------------------------

# Operation types:
# 1: 'create_document'
# 2: 'read'
# 3: 'update'
# 4: 'delete'

# Base check: Project permission
CREATE PROCEDURE `permcheck_project` (IN `user_id` MEDIUMINT UNSIGNED, IN `project_id` MEDIUMINT UNSIGNED, IN `operation_type_id` MEDIUMINT UNSIGNED, IN `member_type_id` MEDIUMINT UNSIGNED,
    OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF EXISTS(SELECT * FROM `ProjectMemberPermission` pmp WHERE pmp.`project_id` = project_id AND pmp.`member_type_id` = member_type_id AND pmp.`operation_type_id` = operation_type_id) THEN
	SET result = TRUE;
ELSE
	IF EXISTS(SELECT * FROM `ProjectUserPermission` pup WHERE pup.`project_id` = project_id AND pup.`user_id` = user_id AND pup.`operation_type_id` = operation_type_id) THEN
		SET result = TRUE;
	ELSE
		SET result = FALSE;
	END IF;
END IF;
END$$

# Base check: Document permission
CREATE PROCEDURE `permcheck_document` (IN `user_id` MEDIUMINT UNSIGNED, IN `document_id` MEDIUMINT UNSIGNED, IN `operation_type_id` MEDIUMINT UNSIGNED, IN `member_type_id` MEDIUMINT UNSIGNED,
    OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
IF EXISTS(SELECT * FROM `DocumentMemberPermission` dmp WHERE dmp.`document_id` = document_id AND dmp.`member_type_id` = member_type_id AND dmp.`operation_type_id` = operation_type_id) THEN
	SET result = TRUE;
ELSE
	IF EXISTS(SELECT * FROM `DocumentUserPermission` dup WHERE dup.`document_id` = document_id AND dup.`user_id` = user_id AND dup.`operation_type_id` = operation_type_id) THEN
		SET result = TRUE;
	ELSE
		SET result = FALSE;
	END IF;
END IF;
END$$

# Check: Create document
CREATE PROCEDURE `permcheck_create_document` (IN `user_id` MEDIUMINT UNSIGNED, IN `project_id` MEDIUMINT UNSIGNED, OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_membership(user_id, project_id, @membership);
CALL permcheck_project(user_id, project_id, 1, @membership, @project_result);
SET result = @project_result;
END$$

# Check: Read document
CREATE PROCEDURE `permcheck_read_document` (IN `user_id` MEDIUMINT UNSIGNED, IN `document_id` MEDIUMINT UNSIGNED, OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_document_visibility(document_id, @document_visibility);
IF @document_visibility = 1 THEN		# Private visibility
	CALL help_get_membership_of_document(user_id, document_id, @membership);
	CALL permcheck_document(user_id, document_id, 2, @membership, @document_result);
	SET result = @document_result;
ELSEIF @document_visibility = 2 THEN	# Internal visibility
	IF user_id IS NOT NULL THEN	# User is logged in
		SET result = TRUE;
	ELSE				# User is not logged in
		SET result = FALSE;
	END IF;
ELSEIF @document_visibility = 3 THEN	# Public visibility
	SET result = TRUE;
ELSE					# Visibility invalid, error
	SET result = FALSE;
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid visibility_id for Document - not in (1, 2, 3)', MYSQL_ERRNO = 'ER_SIGNAL_EXCEPTION';
END IF;
END$$

# Check: Update document
CREATE PROCEDURE `permcheck_update_document` (IN `user_id` MEDIUMINT UNSIGNED, IN `document_id` MEDIUMINT UNSIGNED, OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_membership_of_document(user_id, document_id, @membership);
CALL permcheck_document(user_id, document_id, 3, @membership, @document_result);
SET result = @document_result;
END$$

# Check: Delete document
CREATE PROCEDURE `permcheck_delete_document` (IN `user_id` MEDIUMINT UNSIGNED, IN `document_id` MEDIUMINT UNSIGNED, OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_membership_of_document(user_id, document_id, @membership);
CALL permcheck_document(user_id, document_id, 4, @membership, @document_result);
SET result = @document_result;
END$$

# Check: Read project
CREATE PROCEDURE `permcheck_read_project` (IN `user_id` MEDIUMINT UNSIGNED, IN `project_id` MEDIUMINT UNSIGNED, OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_project_visibility(project_id, @project_visibility);
IF @project_visibility = 1 THEN		# Private visibility
	CALL help_get_membership(user_id, project_id, @membership);
	CALL permcheck_project(user_id, project_id, 2, @membership, @inner_result);
	SET result = @inner_result;
ELSEIF @project_visibility = 2 THEN     # Internal visibility
        IF user_id IS NOT NULL THEN     # User is logged in
                SET result = TRUE;
        ELSE                            # User is not logged in
                SET result = FALSE;
        END IF;
ELSEIF @project_visibility = 3 THEN     # Public visibility
        SET result = TRUE;
ELSE                                    # Visibility invalid, error
        SET result = FALSE;
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid visibility_id for Project - not in (1, 2, 3)', MYSQL_ERRNO = 'ER_SIGNAL_EXCEPTION';
END IF;
END$$

# Check: Update project
CREATE PROCEDURE `permcheck_update_project` (IN `user_id` MEDIUMINT UNSIGNED, IN `project_id` MEDIUMINT UNSIGNED, OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_membership(user_id, project_id, @membership);
CALL permcheck_project(user_id, project_id, 3, @membership, @inner_result);
SET result = @inner_result;
END$$

# Check: Delete project
CREATE PROCEDURE `permcheck_delete_project` (IN `user_id` MEDIUMINT UNSIGNED, IN `project_id` MEDIUMINT UNSIGNED, OUT `result` TINYINT(1))  READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
CALL help_get_membership(user_id, project_id, @membership);
CALL permcheck_project(user_id, project_id, 4, @membership, @inner_result);
SET result = @inner_result;
END$$

-- --------------------------------------------------------
-- TRIGGERS
-- --------------------------------------------------------

CREATE TRIGGER `document_default_permissions` AFTER INSERT ON `Document`
 FOR EACH ROW INSERT INTO `DocumentMemberPermission` (`document_id`, `member_type_id`, `operation_type_id`)
SELECT NEW.`document_id`, ddp.`member_type_id`, ddp.`operation_type_id` FROM DefaultDocumentPermission ddp$$

CREATE TRIGGER `project_default_permissions` AFTER INSERT ON `Project`
 FOR EACH ROW INSERT INTO `ProjectMemberPermission` (`project_id`, `member_type_id`, `operation_type_id`)
SELECT NEW.`project_id`, dpp.`member_type_id`, dpp.`operation_type_id` FROM DefaultProjectPermission dpp$$

-- --------------------------------------------------------

DELIMITER ;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
