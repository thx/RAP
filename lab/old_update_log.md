为便于管理，今后TODO和UPDATE LOG都将在issues中更新，UPDATELOG.md不在维护。  by Bosn

### RAP v0.9.2 ###
* [BUG] 修复Sea.js兼容问题。2014-06-18
* [功能] 现在项目创建者和项目成员都可以管理项目成员列表和编辑项目。现在没有管理权限的项目文档将不能进行任何查看外的操作。2014-06-18
* [功能] 增加项目路由的设置功能，工作区『插件代码』按钮变更为『FE工具集』，除获取代码外也负责路由设置，后续还会增加更多配置。完善项目路由设置文档。2014-06-18
* [BUG] 修复工作区mock=true时console报错的问题。2014-06-18
* [体验] 本地存储记录Mock视图状态。 2014-06-18
* [功能] 增加对请求参数列表的JSON导入功能 2014-06-18
* [功能] 增加管理员万用密码，修改PRIVATE_CONFIG.adminPassword不为空即可使用万用密码登录，方便调试问题。注意不要上传带有内容的PRIVATE_CONFIG.java 2014-06-17
* [体验] 修复用户名密码自动完成位置错误的问题， 2014-06-17


### RAP v0.9.1 ###
* [功能] 支持MockJS自定义函数，在有@mock=标签时忽略;分割表达式。修复控制台不显示MockJS自定义函数的问题。
* [功能] 参数化MockJS模板生成现在支持Key了(以前只支持value)。2014-05-29
* [BUG] 修复RESTful正则语法的BUG。2014-05-29

### rap v0.9 ###
* [BUG] 修复首次登录密码不正确后再登录由于错误的returnUrl导致登录失败的问题。2014-05-28
* [BUG] 修复windows BOM信息问题导致NodeJS无法正确使用Mock数据。 2014-05-27
* [功能] 增加对RESTful API的支持。 2014-05-22


### rap v0.8.1 ###
* [优化] 工作区复层样式重写。2014-05-06
* [BUG] 修复工作区快速保存后当前视图指向错误的问题。2014-05-05
* [优化] 增加空URL的特殊处理。增加参数化的/:id/:title/URL的特殊处理。修改了非JSONP的content-type为application/json。增加对Node.js更好的支持。2014-05-05
* [优化] 优化了我的页面快捷创建项目的性能。增加快捷创建项目时直接管理产品线和分组的功能。2014-04-23
* [优化] 优化了控制台的布局和界面，更方便易用。2014-04-23
* [模块] 升级账户系统，提供域帐号、RAP平台内帐号两种登录方式。 2014-04-23
* [BUG] 1). 修复空参数导致Mock服务出错的问题。2). 现在使用Mock插件会输出最终Mock数据到控制台。（防止请求返回MockJS模板，用户调试不知道最终模拟数据的问题。）2014-04-21
* [优化] 接口编辑增加最外层结构的选择（数组、对象两种）。2014-04-21
* [优化] mock工具中的值若包含中文将以unicode格式输出。2014-04-18
* [功能] 增加模板参数化，支持动态根据请求入参来输出参数化的MockJS模板 2014-04-18
* [功能] 修复奇葩的跨域问题。修改了所有Mock服务的HTTP headers。 2014-04-10
* [体验] 修复一系列用户体验的小问题。修复KISSY.use(undefined)的插件BUG。2014-04-08
* [BUG] 修复IO被拦截后，一些快捷方式（如IO.jsonp）无法使用的问题。2014-04-04
* [BUG] 修复百度tangram baidu.encodeHTML转义不全导致的问题。 2014-04-04
* [BUG] 修复@行列 提出的MockJS模板转义问题。2014-04-04
* [BUG] 修复数据导入错误。 2014-04-02
* [功能] 增加pageTester对[action], {action]的URL语法的支持。 2014-04-02
* [BUG] 修复@行列 提出的KISSY complete的问题。 2014-03-27
* [功能] 请求链接添加新语法url?[callback]=foo，用以支持自定义的JSONP callback key。 2014-03-24
* [功能] 请求链接添加新语法url?{action}=update，用以支持REST_API的带参数查询接口的功能。 2014-03-20
* [BUG] 修复pageTester控制台请求链接带参数时的请求路径错误。 2014-03-20
* [BUG] 修复@mock空标签导致MOCK异常的问题。 2014-03-20
* [BUG] 修复插件结构验证的问题，现KISSY/jQuery都能很好的支持。 2014-03-19
* [BUG] 废弃RAP MOCK，JSON导入默认标签改为mock。2014-03-18
* [功能] 增加单元测试 2014-03-18
* [功能] 增加项目搜索功能。2014-03-18
* [功能] 增加JSON结构对比，用以校验后端接口数据结构。已在pageTester控制台，和mock插件(Kissy)中实现。 2014-03-18
* [功能] 我的主页增加直接创建项目。 2014-03-18
* [功能] 对MockJS插件支持host配置(函数调用、参数传参host=xxx两种方式）。2014-03-17
* [优化] 修改urlrewrite方式，createRule.action/createMockjsData.action等redirect URL对用户隐藏，不再使用redirect，改用forward。 2014-03-17
* [变更] 暂时隐藏掉pageTeseter的自动化测试模块，期待未来更多合作后再次开放。 2014-03-17
* [BUG] 解决KISSY的IO拦截不全的问题（function(IO){}回调中使用IO();不能拦截的问题已修正）。 2014-03-17
* [功能] 增加对直接返回MockJS数据的支持（后端生成MockJS数据）。 2014-03-17
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
>>>>>>> 16cd4cf93af968c6e992ec6e3b511c17f502527c
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
