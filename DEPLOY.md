### v0.8.2上线手册


#### 增加心表tb_user_settings

```bash
/**
 * user settings table
 */
CREATE TABLE tb_user_settings
(
	user_id int(10) NOT NULL,
	`key` varchar(128) NOT NULL,
	`value` varchar(128) NOT NULL,
	
	PRIMARY KEY(user_id, `key`),
	FOREIGN KEY(user_id) REFERENCES tb_user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```