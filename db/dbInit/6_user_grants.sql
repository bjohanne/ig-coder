CREATE USER 'user'@'%' IDENTIFIED BY 'RV%6Ywfp6S&bf@';

GRANT SELECT, INSERT, UPDATE, DELETE ON `mgmt`.* TO 'user'@'%';

GRANT EXECUTE ON PROCEDURE `mgmt`.`create_dataset` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_dataset_member_permission` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_dataset_user_permission` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_project` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_project_member` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_project_member_permission` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_project_user_permission` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_statement` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_statement_version` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`create_user` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_dataset` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_dataset_member_permission` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_dataset_user_permission` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_project` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_project_member` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_project_member_permission` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_project_user_permission` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`delete_statement` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`disable_user` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`enable_user` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`get_user` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`make_project_owner` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`read_dataset` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`read_project` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`update_dataset` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`update_project` TO 'user'@'%';
GRANT EXECUTE ON PROCEDURE `mgmt`.`update_user` TO 'user'@'%';

FLUSH PRIVILEGES;
