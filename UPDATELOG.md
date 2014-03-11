### rap v1.0 ###
* [UE] 增加搜索快捷键Alt + F。2014-03-11
* [UE] 搜索优化-限制每类条目数最多6条，支持快捷键上、下、回车检索。 2014-03-10
* [BUG] 解决MockJS标签导致pageTester无法正确检验接口结构的问题 2014-03-10
* [功能] 参数现在可以按照identifier（标识符）顺序排序了，如果没有identifier或为空，则按照系统自动生成的参数ID（与创建时间顺序一致）排序 2014-03-10
* [功能] pageTester控制台现在支持mockjs了，跟路径包含mockjs时会自动对返回的JSON串用mockjs处理 2014-03-10
* [BUG] 修复rap插件 id="rap" 节点放在script 标签前导致加载失败的问题 2014-03-10
* [功能] 完成了工作区搜索。妈妈再也不用担心我找不到接口了。 2014-03-04
* [UE] 文档编辑区升级到bootstrap3，提升UI，调整按钮、提示文案。下线老版hint，改用原生title。 2014-03-03
* [BUG] 修复工作区数据projectData中包含特殊字符导致提交失败、系统异常的问题。2014-02-19
* [BUG] 修复Mock标签包含单引号时项目不能正常编辑的错误 2014-02-19
* [BUG] 修复Mock标签包含空格时不能正常过滤的错误 2014-02-18

### rap v0.8 ###
* [改进] 改进编辑状态下的样式 2014-02-12
* [BUG] 修复新版CSS导致模块不能删除的问题 2014-02-12
* [功能] 增加新建项目默认模块、请求和参数 2014-02-12
* [功能] 增加jQuery/Kissy插件，更好的使用RAP MOCK 2014-01-14
* [BUG] 修复JSON导入最外层为数组时失效的问题 2014-01-14
* [重构] 修复JSHint提出的N多个rap.js中的编码规范问题 2014-01-14
* [改进] 增加当前action的高亮显示 2014-01-15
* [插件] RAP MOCK插件增加黑白名单及工作模式配置的功能 2014-01-16
* [MOCK]
    * 1. 处理多选1预发（data|1:["1","2","3","8"]）时，错误增加引好的问题。 2014-01-17
    * 2. 常规RAP MOCK规则忽略掉MockJS语法，例如：{"data|1" : [1,2,3]} => {"data" : 1}
    * 3. 修复createData对参数做过滤时，修改到服务器上的标识符从而导致MockJS标签丢失的问题
* [MOCK] 特性支持Check List
    * List数组长度 data|1-10 √
    * 自增     id|+1     √
    * 随机数   id|1-10   √
    * 枚举     [1,2,3]   √
    * 字符串生成         √
* [插件] 升级了插件，根据项目ID自动生成包含默认白名单列表的插件脚本，同时该脚本内含mockjs，用户只需要引入rap plugin即可。 2014-01-22
* [文档] 整理了README.md文档及UPDATE_LOG 2014-01-22
### rap v0.7 ###
* [组织]新增对公司、业务线、分组分级的项目组织结构管理。全新设计的界面。 2013-12-16
* [UC]增加公司统一账户登录。这里后续还会增加普通帐号的支持。（外部用户请注释掉web.xml中的SSOFilter及相应的filter-mapping, 然后恢复template.rap.vm中的logout注销按钮即可正常使用。 2013-12-16
* [作者信息]作者新增思竹(wangweaf)，感谢新伙伴的加入，让我们的RAP越来越强大！谢谢思竹和李牧的大力支持！
* [MOCK模块]增加对array<number>, array<string>, array<object>, array<boolean>的@value支持，RAP用户一旦为数组元素设定@value标签，将以@value中的内容作为该字段输出，不会继续遍历深层结构。 2013-11-21
* [MOCK模块]增加对备注标签、注释分隔符的转义处理，当用户标签内容包含分隔符分号时，需使用////替代来防止当作分隔符处理。 2013-11-21
* [MOCK模块]增加MOCK串联，只要设置tb_project.related_ids即可实现跨项目的MOCK数据共享 2013-12-10

### rap v0.6 ###
* data mock
    * enhance mock for type equals to "array<string>"
    * string data type now support @format
    * MOCK API param exists after "callback=jsonp123" will be resulting in errors.
    * fix empty parameter bug (mock data cannot be generated when empty parameter exists)
* workspace
    * new feature: show/hide mock labels, by default, @value labels will be hidden
    * fix bug: check in versions disorder
    * fix bug: default focus in edit mode inputs disorder
    * fix bug: labels partly shown in workspace because of HTML encoding
* system
    * fix log4j tomcat startup error, change log level to WARN
### rap v0.5 ###
* data mock
    * fix problems when request URL is absolute 07/15/2013
    * enhance JSON import, default add @value into remark field 07/15/2013
    * fix bugs when JSON imported has Array<xxx> elements 07/16/2013
    * chenge database table tb_action.request_url, request_template to text,change name to varchar(256) 07/16/2013
    * add MD5 password encryption 07/17/2013
    * optimize left tree display in interface edit workspace 07/17/2013
    * change display order, from name => identifier to identifier => name, optimize parameter list display 07/17/2013

### rap v0.4 ###
* change version back to 0.4
* add automation testing module, allow user use "modify" and "reset" interfaces to change mock rules dynamically by HTTP requests
* add timestamp mechanism to prevent from cache errors
* add new tag format like @format[3], @value[4] to affect specified index of array element
* add new tag regex like @regex=[a-zA-Z]bc to import powerful regular expression mechanism
* update pageTester, add new tabs modify and reset which can help operate on mock data

### rap v0.3 ###
* UE: login automatically redirect 09/10/2012
* add new mock data tag:@value=[xx], for mocking from 01 to 30, eg->@value=2012-09-[xx], output: 2012-09-01, 2012-09-02, 2012-09-03...  09/10/2012
* update mock service, add @type=array, @type=array_map, @length=\d+ for action description, add new _c callback  09/10/2012
* add @code @end support for action description area for code formatting  09/10/2012
* increase size of working area  09/10/2012
* fix bugs (data type choose, word file export encoding, etc.)  09/10/2012

### rap v0.2 ###
* simplify operation flow √ 08/29/2012
* fix shortcuts compatibilities in different browsers (0.1 only support Firefox)  07/24/2012
* change literal for some are too old 07/24/2012
* validation for JSON String in page testers 07/24/2012
* add more comment for my code 07/24/2012
* add project introduction in README.md 07/18/2012
* add new path configuration, static path of local and remote can be same. 07/19/2012
