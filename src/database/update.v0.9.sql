-- RAP v0.9 database script


-- tb_user.name from varchar(16) changed to varchar(256)

alter table tb_user modify name varchar(256);

-- new added table for notifications system: tb_notification
	
CREATE TABLE tb_notification
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	user_id int(10) NOT NULL,
	type_id smallint NOT NULL,
	param1 varchar(128) NULL,
	param2 varchar(128) NULL,
	param3 text NULL,
	create_time timestamp NOT NULL
		DEFAULT now(),
		
	is_read smallint NOT NULL
		DEFAULT 0,
	
	FOREIGN KEY(user_id) REFERENCES tb_user(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- add target_user_id
ALTER TABLE tb_notification
ADD COLUMN target_user_id int(10) NOT NULL
