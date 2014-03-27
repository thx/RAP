Rigel Automation Platform
===

    @version v0.8.1
    @author  Bosn(霍雍), wangjeaf(思竹)
    @weibo   http://weibo.com/bosn, http://github.com/wangjeaf
    @mail    bosn@outlook.com, wangjeaf@gmail.com

什么是RAP?
--------------------------------------

在前后端分离的开发模式下，我们通常需要定义一份`接口文档`来规范接口的具体信息。如一个请求的地址、有几个参数、参数名称及类型含义等等。`RAP` 首先方便团队录入、查看和管理这些接口文档，并通过分析结构化的文档数据，重复利用并生成自测数据、提供自测控制台等等... 大幅度提升开发效率。

相关链接
--------------------------------------

- [快速上手视频(用前必读)](http://v.youku.com/v_show/id_XNjc3NTY2MzI0.html)
- [详细介绍](https://github.com/thx/RAP/blob/master/INTRO.md)
- [文档中心](http://thx.alibaba-inc.com/RAP/)
- [GitHub](https://github.com/thx/RAP/blob/master/INTRO.md)
- [更新日志](https://github.com/thx/RAP/blob/master/UPDATELOG.md)
- [进入RAP(暂限阿里内网)](http://rap.alibaba-inc.com)
- [THX平台](http://thx.alibaba-inc.com)

起始工作
--------------------------------------

### 一、登录 & 注册 ###

目前只支持域帐号登录，域帐号登录后会自动完成新用户注册及登录流程。后续我们会补充其它帐号的登录方式（RAP、微博、QQ等）

### 二、创建项目 ###

- 1. 首先点击上方菜单中的“团队切换”，选择自己的团队或子公司。这些是由系统管理员预设的。
- 2. 选择合适的业务线，您也可以在这里管理业务线。
- 3. 进入业务线后，可在合适的分组下创建自己的项目。您也可以在这里管理自己的分组。

### 三、接口编辑 ###

完成项目创建后，点击项目链接进入`接口文档工作区`，工作区分`编辑模式`和`查看模式`（默认）。查看模式下会隐藏编辑UI使界面更方便查看，需要进行改动时只需点击右上角的“启用编辑”按钮，而后可根据界面提示完成接口文档的编辑工作。首次进入项目系统会自动为您创建默认的第一个模块、页面和请求，请根据需求进行修改。

接口文档的结构：

- `模块 (Module)` 对应工作区不同的Tab，用户可根据喜好进行设置。往往在大项目或接口较多的项目中使用频繁。比如可自己分账户模块、宝贝模块等等...
- `页面 (Page)` 每个模块下有0至多个页面，RAP中的“页面”是逻辑页面，比如单页应用每一个View都可以算做一个页面，具体如何使用用户根据自己喜好设定即可。
- `请求 (Action)` 每个页面下有0至多个请求，RAP中的“请求”是接口文档最小单位，描述了一个WEB请求中的全部信息。
- `参数 (Parameter)` 每个请求中有请求参数列表和响应参数列表，参数是可以嵌套参数的，用以描述复杂的Object嵌套结构。

RAP的文档编辑像Excel编辑一样简单，具体见视频教程。

### 四、完成编辑 ###

完成编辑后，可通过“快捷保存”直接完成保存，也可以通过普通的“保存”提交一些有用的注释信息。RAP的接口文档不同版本之间可以查看和永久切换。您也能通过“导出文档”功能将接口文档以Word文件方式导出（Mac下请修改后缀名为html）。

自动化工具
--------------------------------------

### for FE 之 MOCK ###

RAP会通过文档数据自动为您创建MOCK服务并生成动态的模拟数据。您只需要通过一行代码引入插件，RAP会自动为您拦截在RAP中定义过的请求，具体见“RAP MOCK插件使用方法”。

默认，RAP会为不同数据类型生成默认的数据，您也可以通过手动编写标签实现更好的MOCK行为控制。例如字段 id 需要自增，您可以使用MockJS语法:

变量名     备注
id|+1      @mock=100

表示id从100开始，每次加1

具体Mock规则如何填写，请访问[MockJS文档](http://mockjs.com)，也可参考RAP平台中，[MockJS对接的例子](http://rap.alibaba-inc.com/workspace/myWorkspace.action?projectId=79)。

在编辑Mock规则时，请点击“显示Mock标签”，默认Mock信息会被隐藏，以使得接口文档更方便大多数人查看。

在备注里，MOCK标签和普通的备注需要用分号隔开，比如一个参数叫userId，备注信息是"用户ID", mock标签是@mock=123，则在备注中应该填写:`用户ID;@mock=123`


### for RD 之 Console ###

RAP会根据接口文档数据自动为您创建控制台，它以页面为单位，您可以在这里方便的自测自己的实际开发的接口。它包含的功能：

- 1. 自测功能，自动根据参数提供请求参数输入界面，后端方便自测
- 2. 校验功能，对实际后端输出是否符合接口规范做校验，提示缺少、多余的字段
- 3. 日志功能，提供日志分析，时间记录等

*注意：后端Console暂时仅支持JSONP，RAP v1.0会完成对同域接口自测的支持。

### for QA 之 API ###

RAP开放了Mock规则的API，QA或对此有需求的同学可以通过RAP API去访问和编辑Mock规则，为自动化测试提供便利。

RAP 快捷键
-------------------------------------

- `Alt + F` 工作区搜索，候选列表出现时可通过上、下、回车键操作
- `Ctrl + Enter` 位于参数编辑时，根据当前行的参数标识或参数名称自动补全
- `Tab` 位于参数编辑时，自动切换到下一个位置
- `Shift + Tab` 位于参数编辑时，自动切换到上一个位置

RAP MOCK插件使用方法
--------------------------------------

RAP提供MOCK服务插件（暂时仅支持Kissy和jQuery），使用方法只需要一步:

### 在kissy, jQuery后面引入rap plugin ###

```bash
<script type="text/javascript" src="http://rap.alibaba-inc.com/rap.plugin.js?projectId={{projectId}}&mode={{mode}}"></script>
```

其中`{{projectId}}`为RAP提供的项目ID, `{{mode}}`为RAP路由的工作模式, 默认值为3，白名单会根据RAP中的文档自动配置，对RAP中未录入的接口不会做拦截。
mode不同值具体含义:
- 0 - 不拦截
- 1 - 拦截全部
- 2 - 黑名单中的项不拦截
- 3 - 仅拦截白名单中的项

### 您也可以手动设置黑名单、白名单及查看、设置工作模式 ###

设置黑名单

```bash
RAP.setBlackList(arr);
```

设置白名单

```bash
RAP.setWhiteList(arr);
```

其中arr可以包含匹配字符串，或正则对象，例：['test', /test/g]

查看当前模式

```bash
RAP.getMode();
```

设置当前模式

```bash
RAP.setMode(1);
```

接口文档进阶
--------------------------------------

### 接口文档请求链接语法

http://www.taobao.com/getItem?[callback]=foo

`[callback]` 表示参数`callback`会用作JSONP的回调key，若实际请求为getItem?callback=foo，则返回结果为:foo({...});

http://www.taobao.com/getREST?{path}=delete

`{path}` 表示参数`path`会在RAP文档和开发环境进行接口对接时，需要考虑path参数，一般REST API会使用比较多。因为REST不同请求是通过参数区分的，比如getRest?path=delete, getRest?path=update, 而{path}表示两者为不同的接口。

### 最外层为数组的接口

需要在接口描述的开头增加一条指令：@type=array_map;@length=1
表示返回的最外层结构是数组，长度是1。
