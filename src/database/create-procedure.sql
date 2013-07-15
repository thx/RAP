/**
 * create new user
 */
DELIMITER //
CREATE PROCEDURE sp_create_user (
	IN name varchar(56), 
	IN account varchar(56), 
	IN mail varchar(56), 
	IN role varchar(56)    -- fe | rd | qa | pm | admin
)
BEGIN
	DECLARE user_id INT;
	DECLARE role_id INT;
	SET role_id = 5;
	INSERT INTO tb_user (account, password, name, email, last_login_date) VALUES (account, '123456', name, mail, NOW());
	SELECT last_insert_id() INTO user_id;
	IF role = 'fe' THEN
		SET role_id = 5;
	ELSEIF role = 'rd' THEN
		SET role_id = 4;
	ELSEIF role = 'pm' THEN
		SET role_id = 3;
	ELSEIF role = 'qa' THEN
		SET role_id = 6;
	ELSEIF role = 'rd' THEN
		SET role_id = 4;
	ELSEIF role = 'admin' THEN
		SET role_id = 2;
	END IF;
	INSERT INTO tb_role_and_user (user_id, role_id) VALUES (user_id, role_id);
END //
DELIMITER ;