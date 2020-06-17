CREATE USER 'user'@'localhost' IDENTIFIED BY 'pass';

GRANT SELECT, INSERT, UPDATE, DELETE ON `mgmt`.* TO 'user'@'localhost';

GRANT EXECUTE ON PROCEDURE `mgmt`.`create_dataset` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_dataset_member_permission` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_dataset_user_permission` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_project` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_project_member` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_project_member_permission` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_project_user_permission` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_statement` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_statement_version` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_user` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_dataset` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_dataset_member_permission` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_dataset_user_permission` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_project` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_project_member` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_project_member_permission` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_project_user_permission` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_statement` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`disable_user` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`enable_user` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`get_user` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`make_project_owner` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`read_dataset` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`read_project` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`update_dataset` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`update_project` TO 'user'@'localhost';
GRANT EXECUTE ON PROCEDURE `mgmt`.`update_user` TO 'user'@'localhost';

FLUSH PRIVILEGES;
