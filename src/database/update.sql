CREATE TABLE tb_corporation
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	name varchar(256) NOT NULL,
	logo_url varchar(256) NOT NULL,
	user_id int(10) NOT NULL,
	
	FOREIGN KEY(user_id) REFERENCES tb_user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE tb_production_line
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	name varchar(256) NOT NULL,
	project_num int(10) NOT NULL
		DEFAULT 0,
	corporation_id int(10) NOT NULL,	
	user_id int(10) NOT NULL,
	
	FOREIGN KEY(user_id) REFERENCES tb_user(id),	
	FOREIGN KEY(corporation_id) REFERENCES tb_corporation(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tb_group
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	name varchar(256) NOT NULL,
	production_line_id int(10) NOT NULL,
	user_id int(10) NOT NULL,
	
	FOREIGN KEY(user_id) REFERENCES tb_user(id),
	FOREIGN KEY(production_line_id) REFERENCES tb_production_line(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



+tb_user.group_id    // FOREIGN KEY
+tb_user.login_type // tinyint NOT NULL DEFAULT 1, 1-RAP帐号登录, 2-域帐号登录
+tb_user.ali_user_id // varchar(20) NULL, login_type为2时有效
	