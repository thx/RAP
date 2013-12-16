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


ALTER TABLE tb_project
ADD COLUMN group_id int(10) NULL;

ALTER TABLE tb_user
ADD COLUMN realname varchar(128) NOT NULL
	DEFAULT '';

ALTER TABLE tb_project
ADD COLUMN update_time timestamp NOT NULL
		DEFAULT now();
	