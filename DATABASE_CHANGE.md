### Database Change v0.11.5

详情见[v0.11.5设计文档](https://github.com/thx/RAP/wiki/v0.11.5)

```sql
CREATE TABLE tb_corporation_and_user
(
	user_id int(10) NOT NULL,
	corporation_id int(10) NOT NULL,
	role_id int(10) NOT NULL,

	PRIMARY KEY(user_id, corporation_id),
	FOREIGN KEY(user_id) REFERENCES tb_user(id),
	FOREIGN KEY(corporation_id) REFERENCES tb_corporation(id),
	FOREIGN KEY(role_id) REFERENCES tb_role(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE tb_corporation
	ADD COLUMN access_type TINYINT NOT NULL COMMENT '权限控制, 10普通, 20公开'
		DEFAULT 10;

ALTER TABLE tb_corporation
	ADD COLUMN `desc` text NOT NULL COMMENT '备注';

ALTER TABLE tb_project
	ADD COLUMN access_type TINYINT NOT NULL COMMENT '权限控制, 10普通, 0私有'
		DEFAULT 10;

CREATE TABLE tb_rule (
	action_id int(10) NOT NULL
		PRIMARY KEY,  
	rules text NOT NULL, -- JSON规则
	update_time datetime NOT NULL
		DEFAULT NOW(),   -- 最近更新时间

	FOREIGN KEY(action_id) REFERENCES tb_action(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 将老的团队全部设为公开
UPDATE tb_corporation SET access_type = 20;

```

### Database Change v0.11.1
1. 增加了tb_module.name的长度，防止过长模块名报错
2. 增加tb_action.disable_cache字段用于自动化禁用cache处理

```sql
ALTER TABLE `rap_db`.`tb_module` CHANGE COLUMN `name` `name` VARCHAR(256) NOT NULL  ;
ALTER TABLE `rap_db`.`tb_action` ADD COLUMN disable_cache TINYINT NOT NULL DEFAULT 0;
```



### Database Change v0.11.0

add mock count Oct.15 2014
增加了MOCK调用次数记录 2014-10-15

```sql
ALTER TABLE tb_project
ADD COLUMN mock_num int(10) NOT NULL
	DEFAULT 0
```

add employee id Oct.1 2014
增加员工ID 2014-10-1

```sql
ALTER TABLE tb_user
    ADD emp_id varchar(128) NULL
```
