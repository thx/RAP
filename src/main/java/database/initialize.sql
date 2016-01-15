CREATE DATABASE IF NOT EXISTS rap_db
  DEFAULT CHARSET utf8
  COLLATE utf8_general_ci;

USE rap_db;


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
  id                      INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  account                 VARCHAR(32)            NOT NULL
  COMMENT '账户名 account name',
  password                VARCHAR(128)           NOT NULL
  COMMENT '密码 password',
  name                    VARCHAR(256)           NOT NULL
  COMMENT '名字/昵称 name/nickname',
  email                   VARCHAR(256)           NOT NULL
  COMMENT 'email',
  create_date             TIMESTAMP              NOT NULL
  COMMENT '创建日期 create date'
    DEFAULT now(),
  is_locked_out           INT(1)                 NOT NULL
  COMMENT '用户是否锁定 is the user locked out'
    DEFAULT 0,
  is_hint_enabled         INT(1)                 NOT NULL
  COMMENT '是否开启新手引导 is user hint enabled'
    DEFAULT 1,
  last_login_date         DATETIME               NOT NULL
  COMMENT '最近登录 last login date',
  incorrect_login_attempt INT(10)                NOT NULL
  COMMENT '错误登录次数，登录成功后会重置为0 count of incorrect login attempts, will be set to 0 after any succesful login'
    DEFAULT 0,
  realname                VARCHAR(128)           NOT NULL
  COMMENT '真实姓名'
    DEFAULT '',
  emp_id                  VARCHAR(45)            NULL
  COMMENT '工号，可选',
  mock_num                INT(10)                NOT NULL
  COMMENT 'mock次数，用于记录该用户所创建的接口被调用的mock次数。 mock num, used for record mock API invokation count'
    DEFAULT 0
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

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
  id   INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  name VARCHAR(16)            NOT NULL
  COMMENT '角色名称 role name'
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * user role table
 */
CREATE TABLE tb_role_and_user
(
  user_id INT(10) NOT NULL,
  role_id INT(10) NOT NULL,

  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES tb_user (id),
  FOREIGN KEY (role_id) REFERENCES tb_role (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


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
  id         INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  name       VARCHAR(256)           NULL
  COMMENT '参数含义 parameter name',
  identifier VARCHAR(256)           NULL
  COMMENT '变量名/参数标识符 parameter identifier',
  data_type  VARCHAR(32)            NULL
  COMMENT '数据类型 data type',
  remark     TEXT                   NULL
  COMMENT '备注/mock数据等 remark/mock data',
  expression VARCHAR(128)           NULL
  COMMENT '备用字段：表达式 backup column:expression',
  mock_data  TEXT                   NULL
  COMMENT '备用字段:mock数据 backup column:mock data'
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * project table
 * workspace_mode 1-vss(default) 2-svn
 * stage 1-design 2-developing 3-debug
 */
CREATE TABLE tb_project
(
  id             INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  `version`      VARCHAR(128)           NOT NULL
  COMMENT '版本号 version no.'
    DEFAULT '0.0.0.1',
  name           VARCHAR(128)           NOT NULL
  COMMENT '项目名称 project name',
  create_date    TIMESTAMP              NOT NULL
  COMMENT '创建日期 create date'
    DEFAULT now(),
  user_id        INT(10)                NOT NULL
  COMMENT '创建人ID, project author id',
  introduction   TEXT                   NULL
  COMMENT '项目描述 project introduction',
  workspace_mode INT(10)                NOT NULL
  COMMENT '工作区提交模式(类VSS or SVN)，暂时弃用了。 Workspace submit mode, deprecated.'
    DEFAULT 1,
  stage          INT(10)                NOT NULL
  COMMENT '项目阶段，暂时废弃;project stage, temply deprecated.  1-design 2-developing 3-debug'
    DEFAULT 1,
  project_data   LONGTEXT               NULL
  COMMENT '项目JSON数据，存放当前最新的版本。 project JSON data, saved the newest version of the project',
  group_id       INT(10)                NULL
  COMMENT '分组ID group id',
  related_ids    VARCHAR(128)           NOT NULL
  COMMENT '路由ID，用于指定与哪些项目共享mock数据; router id, used for specify sharing data with which projects.'
    DEFAULT '',
  update_time    DATETIME               NOT NULL
  COMMENT '更新时间 update time',
  mock_num       INT                    NOT NULL
  COMMENT 'mock次数 mock num'
    DEFAULT 0,
  access_type    TINYINT                NOT NULL
  COMMENT '权限控制, 10普通, 0私有'
    DEFAULT 10,

  FOREIGN KEY (user_id) REFERENCES tb_user (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

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
  project_id   INT(10) NOT NULL,
  user_id      INT(10) NOT NULL,
  access_level INT     NOT NULL
    DEFAULT 1,

  PRIMARY KEY (project_id, user_id),
  FOREIGN KEY (project_id) REFERENCES tb_project (id),
  FOREIGN KEY (user_id) REFERENCES tb_user (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * module table
 */
CREATE TABLE tb_module
(
  id           INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  project_id   INT(10)                NOT NULL,
  name         VARCHAR(256)           NOT NULL,
  introduction VARCHAR(128)           NULL,

  FOREIGN KEY (project_id) REFERENCES tb_project (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * page table
 */
CREATE TABLE tb_page
(
  id           INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  name         VARCHAR(56)            NOT NULL,
  module_id    INT(10)                NOT NULL,
  introduction TEXT                   NULL,
  template     VARCHAR(128)           NULL,

  FOREIGN KEY (module_id) REFERENCES tb_module (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

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
  id                INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  name              VARCHAR(256)           NOT NULL,
  description       TEXT                   NULL,

  /* request block */
  request_type      INT                    NOT NULL
  COMMENT '请求类型get/post/put/delete等等 request type'
    DEFAULT 1, /** request_type = 99, mount type **/
  request_url       TEXT                   NULL,

  disable_cache     TINYINT                NOT NULL
  COMMENT '禁用Mock缓存 disable mock cache'
    DEFAULT 0,

  /* response block */
  response_template TEXT                   NULL
  COMMENT '响应模板地址, 暂时弃用。 response template address, temply deprecated.'

)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * action and page table
 * used for creating multiple to multiple mapping
 */
CREATE TABLE tb_action_and_page
(
  action_id INT(10) NOT NULL,
  page_id   INT(10) NOT NULL,

  FOREIGN KEY (action_id) REFERENCES tb_action (id),
  FOREIGN KEY (page_id) REFERENCES tb_page (id),
  PRIMARY KEY (action_id, page_id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


/**
 * parameter and parameter mapping
 * complex_parameter has so many parameters(List<Map> or Map)
 */
CREATE TABLE tb_complex_parameter_list_mapping
(
  complex_parameter_id INT(10) NOT NULL,
  parameter_id         INT(10) NOT NULL,

  PRIMARY KEY (complex_parameter_id, parameter_id),
  FOREIGN KEY (complex_parameter_id) REFERENCES tb_parameter (id),
  FOREIGN KEY (parameter_id) REFERENCES tb_parameter (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * parameter and action's request mapping
 */
CREATE TABLE tb_request_parameter_list_mapping
(
  action_id    INT(10) NOT NULL,
  parameter_id INT(10) NOT NULL,

  PRIMARY KEY (action_id, parameter_id),
  FOREIGN KEY (action_id) REFERENCES tb_action (id),
  FOREIGN KEY (parameter_id) REFERENCES tb_parameter (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * parameter and action's response mapping
 */
CREATE TABLE tb_response_parameter_list_mapping
(
  action_id    INT(10) NOT NULL,
  parameter_id INT(10) NOT NULL,

  PRIMARY KEY (action_id, parameter_id),
  FOREIGN KEY (action_id) REFERENCES tb_action (id),
  FOREIGN KEY (parameter_id) REFERENCES tb_parameter (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


/**************************************************
 *                                                *
 *          workspace module                      *
 *                                                *
 **************************************************/


/**
 * workspace, deprecated 工作区，暂时未使用
 */
CREATE TABLE tb_workspace
(
  id                    INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  project_id            INT(10)                NOT NULL,
  user_id               INT                    NOT NULL,
  create_date           TIMESTAMP              NOT NULL
    DEFAULT now(),
  update_date           DATETIME               NOT NULL,
  project_data          LONGTEXT               NOT NULL,
  project_data_original LONGTEXT               NOT NULL,

  FOREIGN KEY (project_id) REFERENCES tb_project (id),
  FOREIGN KEY (user_id) REFERENCES tb_user (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * workspace save, deprecated 工作区保存草稿，暂时未使用
 */
CREATE TABLE tb_workspace_save
(
  id           INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  workspace_id INT(10)                NOT NULL,
  update_date  DATETIME               NOT NULL,
  project_data LONGTEXT               NOT NULL,

  FOREIGN KEY (workspace_id) REFERENCES tb_workspace (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * check in table
 * every API document submit saved here, used for version control.
 * 每一次提交记录在这里，用于版本管理和回滚控制
 * workspaceMode 1-VSS 2-SVN
 */
CREATE TABLE tb_check_in
(
  id             INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  create_date    TIMESTAMP              NOT NULL
    DEFAULT now(),
  tag            VARCHAR(128)           NULL
  COMMENT 'tag标签 暂时未使用 deprecated',
  user_id        INT(10)                NOT NULL
  COMMENT '提交人 submit user id',
  project_id     INT(10)                NOT NULL
  COMMENT '提交的项目ID submit project id',
  description    TEXT                   NULL
  COMMENT '提交描述 submit description',
  version        VARCHAR(128)           NOT NULL
  COMMENT '版本号 version no.',
  project_data   LONGTEXT               NOT NULL
  COMMENT '项目JSON数据 project json data',
  workspace_mode INT(10)                NOT NULL
  COMMENT '工作区模式(弃用) workspace mode(deprecated)',
  log            TEXT                   NULL
  COMMENT '更新日志，用于存储与最近一个版本的对比差异。暂时未使用。update log, used for calculate versions differences. Deprecated.',

  FOREIGN KEY (user_id) REFERENCES tb_user (id),
  FOREIGN KEY (project_id) REFERENCES tb_project (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * user settings table
 * 用户配置表
 */
CREATE TABLE tb_user_settings
(
  user_id INT(10)      NOT NULL,
  `key`   VARCHAR(128) NOT NULL
  COMMENT '配置KEY config key',
  `value` VARCHAR(128) NOT NULL
  COMMENT '配置VALUE config value',

  PRIMARY KEY (user_id, `key`),
  FOREIGN KEY (user_id) REFERENCES tb_user (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * user notification table
 * 用户通知表
 */

CREATE TABLE tb_notification
(
  id             INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  user_id        INT(10)                NOT NULL
  COMMENT '接受通知的用户id; user id to be notified.',
  target_user_id INT(10)                NOT NULL
  COMMENT '上下文用户id; context user id',
  type_id        SMALLINT               NOT NULL
  COMMENT '1-文档修改,2-被加入新项目',
  param1         VARCHAR(128)           NULL
  COMMENT '1,2-项目id',
  param2         VARCHAR(128)           NULL
  COMMENT ' 1,2-项目名称',
  param3         TEXT                   NULL
  COMMENT '备用预留 reserved',
  create_time    TIMESTAMP              NOT NULL
  COMMENT '创建时间 create time'
    DEFAULT now(),

  is_read        SMALLINT               NOT NULL
  COMMENT '是否已读 is notification read'
    DEFAULT 0,

  FOREIGN KEY (user_id) REFERENCES tb_user (id),
  FOREIGN KEY (target_user_id) REFERENCES tb_user (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * corporation table
 * 公司表
 */
CREATE TABLE tb_corporation
(
  id          INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  name        VARCHAR(256)           NOT NULL,
  logo_url    VARCHAR(256)           NULL,
  user_id     INT(10)                NULL,
  access_type TINYINT                NOT NULL
  COMMENT '权限控制, 10普通, 20公开'
    DEFAULT 10,
  `desc`      TEXT                   NOT NULL
  COMMENT '备注',

  FOREIGN KEY (user_id) REFERENCES tb_user (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


/**
 * product line table
 * 生产线表
 */
CREATE TABLE tb_production_line
(
  id             INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  name           VARCHAR(256)           NOT NULL,
  project_num    INT(10)                NOT NULL
    DEFAULT 0,
  corporation_id INT(10)                NOT NULL,
  user_id        INT(10)                NOT NULL,

  FOREIGN KEY (user_id) REFERENCES tb_user (id),
  FOREIGN KEY (corporation_id) REFERENCES tb_corporation (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * project group table
 * 项目分组表
 */
CREATE TABLE tb_group
(
  id                 INT(10) AUTO_INCREMENT NOT NULL
    PRIMARY KEY,
  name               VARCHAR(256)           NOT NULL,
  production_line_id INT(10)                NOT NULL,
  user_id            INT(10)                NOT NULL,

  FOREIGN KEY (user_id) REFERENCES tb_user (id),
  FOREIGN KEY (production_line_id) REFERENCES tb_production_line (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/**
 * 规则表，存储通过Open API设置的Mock规则
 * Stored mock rules set by Open API
 */
CREATE TABLE tb_rule (
  action_id   INT(10)  NOT NULL
    PRIMARY KEY,
  rules       TEXT     NOT NULL, -- JSON规则
  update_time DATETIME NOT NULL
    DEFAULT NOW(), -- 最近更新时间

  FOREIGN KEY (action_id) REFERENCES tb_action (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE tb_corporation_and_user
(
  user_id        INT(10) NOT NULL,
  corporation_id INT(10) NOT NULL,
  role_id        INT(10) NOT NULL,

  PRIMARY KEY (user_id, corporation_id),
  FOREIGN KEY (user_id) REFERENCES tb_user (id),
  FOREIGN KEY (corporation_id) REFERENCES tb_corporation (id),
  FOREIGN KEY (role_id) REFERENCES tb_role (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


-- required base data
INSERT INTO tb_role (name) VALUES ('god');
INSERT INTO tb_role (name) VALUES ('admin');
INSERT INTO tb_role (name) VALUES ('user');
-- removed unused qa/pm/rd roles


INSERT INTO tb_user (account, password, email, create_date, last_login_date, name) VALUES
  ('admin', 'RESERVED', 'admin@example.com', NOW(), NOW(), 'admin');

INSERT INTO tb_role_and_user (user_id, role_id) VALUES (1, 1);

-- INSERT INTO tb_corporation (name, logo_url, user_id) VALUES ('MyTeam', 'empty', 1);
-- 新版RAP可以自建团队，不需要插入默认团队了。
-- RAP v0.11.5+ users can create teams by their own, so there's no need to set default team.
