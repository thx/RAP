/**************************************************
 *                                                *
 *          account module                        *
 *                                                *
 **************************************************/


/** 
 * user table
 */
CREATE TABLE tb_user
(	
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	account varchar(32) NOT NULL,
	password varchar(128) NOT NULL,
	name varchar(256) NOT NULL,
	email varchar(256) NOT NULL,
	create_date timestamp NOT NULL
		DEFAULT now(),
	is_locked_out int(1) NOT NULL COMMENT 'is the user locked out'
		DEFAULT 0,
	is_hint_enabled int(1) NOT NULL COMMENT 'is user hint enabled'
		DEFAULT 1,
	last_login_date datetime NOT NULL,
	incorrect_login_attempt int(10) NOT NULL COMMENT 'count of incorrect login attempts, will be set to 0 after any succesful login'
		DEFAULT 0,
	realname varchar(128) NOT NULL
	DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/** 
 * role table
 * roles instruction:
 *     user  - every registered shuold have this role
 *       rd  - research and development engineering
 *       qa  - quality engineering
 *       pm  - project manager
 *       op  - operation manager
 *    admin  - administrator
 *      god  - super admin
 */
CREATE TABLE tb_role
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	name varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
 * user role table
 */
CREATE TABLE tb_role_and_user
(
	user_id int(10) NOT NULL,
	role_id int(10) NOT NULL,
	
	PRIMARY KEY(user_id, role_id),
	FOREIGN KEY(user_id) REFERENCES tb_user(id),
	FOREIGN KEY(role_id) REFERENCES tb_role(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/**************************************************
 *                                                *
 *          project module                        *
 *                                                *
 **************************************************/



/**
 * parameter table
 */
CREATE TABLE tb_parameter
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	name varchar(256) NULL,
	identifier varchar(256) NULL,
	data_type varchar(32) NULL,
	remark text NULL,
	expression varchar(128) NULL,
	mock_data text NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/** 
 * project table
 * workspace_mode 1-vss(default) 2-svn
 * stage 1-design 2-developing 3-debug
 */
CREATE TABLE tb_project
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	version nvarchar(128) NOT NULL
		DEFAULT '0.0.0.1',
	name varchar(128) NOT NULL,
	create_date timestamp NOT NULL
		DEFAULT now(),
	user_id int(10) NOT NULL,
	introduction text NULL,
	workspace_mode int(10) NOT NULL
		DEFAULT 1,
	stage int(10) NOT NULL
		DEFAULT 1,
	project_data longtext NULL,
	group_id int(10) NULL,
	related_ids varchar(128) NOT NULL
	DEFAULT '',
	update_time timestamp NOT NULL
		DEFAULT now(),

	FOREIGN KEY(user_id) REFERENCES tb_user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/** 
 * user list and user table 
 * used for creating multiple to multiple mapping
 * access_level: 
 *     1 - read
 *     2 - read&write
 *     3 - read&write&manage
 */
CREATE TABLE tb_project_and_user
(
	project_id int(10) NOT NULL,
	user_id int(10) NOT NULL,
	access_level int NOT NULL 
		DEFAULT 1,

	PRIMARY KEY(project_id, user_id),
	FOREIGN KEY(project_id) REFERENCES tb_project(id),
	FOREIGN KEY(user_id) REFERENCES tb_user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
 * module table
 */
CREATE TABLE tb_module
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	project_id int(10) NOT NULL,
	name varchar(16) NOT NULL,
	introduction varchar(128) NULL,

	FOREIGN KEY(project_id) REFERENCES tb_project(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
 * page table
 */
CREATE TABLE tb_page
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	name varchar(56) NOT NULL,
	module_id int(10) NOT NULL,
	introduction text NULL,
	template varchar(128) NULL,

	FOREIGN KEY(module_id) REFERENCES tb_module(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
 * action table
 * request_type: 
 *     1 - get
 *     2 - post
 *     3 - ajax get
 *     4 - ajax post
 */
CREATE TABLE tb_action
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	name varchar(256) NOT NULL,
	description text NULL,

    /* request block */
	request_type int NOT NULL
		DEFAULT 1,
	request_url text NULL,

	/* response block */
	response_template text NULL /* front end template path */

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
	
/**
 * action and page table
 * used for creating multiple to multiple mapping
 */
CREATE TABLE tb_action_and_page
(
	action_id int(10) NOT NULL,
	page_id int(10) NOT NULL,

	FOREIGN KEY(action_id) REFERENCES tb_action(id),
	FOREIGN KEY(page_id) REFERENCES tb_page(id),
	PRIMARY KEY(action_id, page_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/**
 * parameter and parameter mapping
 * complex_parameter has so many parameters(List<Map> or Map)
 */
CREATE TABLE tb_complex_parameter_list_mapping
(
	complex_parameter_id int(10) NOT NULL,
	parameter_id int(10) NOT NULL,
	
	PRIMARY KEY(complex_parameter_id, parameter_id),
	FOREIGN KEY(complex_parameter_id) REFERENCES tb_parameter(id),
	FOREIGN KEY(parameter_id) REFERENCES tb_parameter(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
 * parameter and action's request mapping
 */
CREATE TABLE tb_request_parameter_list_mapping
(
	action_id int(10) NOT NULL,
	parameter_id int(10) NOT NULL,
	
	PRIMARY KEY(action_id, parameter_id),
	FOREIGN KEY(action_id) REFERENCES tb_action(id),
	FOREIGN KEY(parameter_id) REFERENCES tb_parameter(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
 * parameter and action's response mapping
 */
CREATE TABLE tb_response_parameter_list_mapping
(
	action_id int(10) NOT NULL,
	parameter_id int(10) NOT NULL,
	
	PRIMARY KEY(action_id, parameter_id),
	FOREIGN KEY(action_id) REFERENCES tb_action(id),
	FOREIGN KEY(parameter_id) REFERENCES tb_parameter(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;





/**************************************************
 *                                                *
 *          workspace module                      *
 *                                                *
 **************************************************/


/**
 * workspace
 */
CREATE TABLE tb_workspace
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	project_id int(10) NOT NULL,
	user_id int NOT NULL,
	create_date timestamp NOT NULL
		DEFAULT now(),
	update_date datetime NOT NULL,
	project_data longtext NOT NULL,
	project_data_original longtext NOT NULL,
	
	FOREIGN KEY(project_id) REFERENCES tb_project(id),
	FOREIGN KEY(user_id) REFERENCES tb_user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
 * workspace save
 */
CREATE TABLE tb_workspace_save
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	workspace_id int(10) NOT NULL,
	update_date datetime NOT NULL,
	project_data longtext NOT NULL,
	
	FOREIGN KEY(workspace_id) REFERENCES tb_workspace(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
 * check in table
 * workspaceMode 1-VSS 2-SVN
 */
CREATE TABLE tb_check_in 
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	create_date timestamp NOT NULL
		DEFAULT now(),
	tag varchar(128) NULL,
	user_id int(10) NOT NULL,
	project_id int(10) NOT NULL,
	description text NULL,
	version varchar(128) NOT NULL,
	project_data longtext NOT NULL,
	workspace_mode int(10) NOT NULL,
	log text NULL,
	
	FOREIGN KEY(user_id) REFERENCES tb_user(id),
	FOREIGN KEY(project_id) REFERENCES tb_project(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

CREATE TABLE tb_notification
(
	id int(10) AUTO_INCREMENT NOT NULL
		PRIMARY KEY,
	user_id int(10) NOT NULL,      -- 接受通知的用户id
	target_user_id int(10) NOT NULL, -- 上下文用户id
	type_id smallint NOT NULL, -- 1-文档修改,2-被加入新项目
	param1 varchar(128) NULL,  -- 1,2-项目id
	param2 varchar(128) NULL,  -- 1,2-项目名称
	param3 text NULL,
	create_time timestamp NOT NULL
		DEFAULT now(),
		
	is_read smallint NOT NULL
		DEFAULT 0,
	
	FOREIGN KEY(user_id) REFERENCES tb_user(id),
	FOREIGN KEY(target_user_id) REFERENCES tb_user(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
