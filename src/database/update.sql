ALTER TABLE tb_project
ADD COLUMN related_ids varchar(128) NOT NULL
	DEFAULT ''