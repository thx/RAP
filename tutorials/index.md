---
layout: post
title: 快速上手
---

{% raw %}

## 视频教程

<iframe height=498 width=610 src="http://player.youku.com/embed/XNjc3NTY2MzI0" frameborder=0 allowfullscreen></iframe>

## 创建文档

### 登录 & 注册

目前只支持 `域帐号登录`，域帐号登录后会自动完成新用户注册及登录流程。

后续我们会补充其它帐号的登录方式（例如：RAP注册用户、微博账号、QQ账号等）

### 创建项目

方法一、在我的主页中，点击+快速创建项目

方法二、点击最上方菜单中的切换团队，通过选择团队->业务线的方式去创建项目

### 管理项目组织

一、首先点击上方菜单中的 `团队切换`，选择自己的团队或子公司。这些是由系统管理员预设的。

二、 选择合适的 `业务线`，您也可以在这里管理业务线。

三、进入业务线后，可在合适的 `分组` 下创建自己的项目。您也可以在这里管理自己的分组。

## 文档编辑

### 工作区概念

完成项目创建后，点击项目链接进入`接口文档工作区`。

工作区分为以下两种模式：

`查看模式（默认）`：查看模式下，会隐藏编辑UI使界面更方便查看，需要进行改动时只需点击右上角的启用编辑按钮，进入编辑模式。

`编辑模式`：编辑模式下，可根据界面提示完成接口文档的编辑工作。

**首次进入项目系统会自动为您创建默认的第一个模块、页面和请求，请根据需求进行修改。**

### 接口文档的结构

- `模块 (Module)` 对应工作区不同的Tab，用户可根据喜好进行设置。往往在大项目或接口较多的项目中使用频繁。比如可自己分账户模块、宝贝模块等等...
- `页面 (Page)` 每个模块下有0至多个页面，RAP中的“页面”是逻辑页面，比如单页应用每一个View都可以算做一个页面，具体如何使用用户根据自己喜好设定即可。
- `请求 (Action)` 每个页面下有0至多个请求，RAP中的“请求”是接口文档最小单位，描述了一个WEB请求中的全部信息。
- `参数 (Parameter)` 每个请求中有请求参数列表和响应参数列表，参数是可以嵌套参数的，用以描述复杂的Object嵌套结构。


### 保存文档

- `保存` 完成编辑后，可通过 `快捷保存` 直接完成保存，也可以通过普通的 `保存` 提交一些有用的注释信息。

- `版本控制` RAP的接口文档不同版本之间可以查看和永久切换。

- `接口文档导出` 您也能通过 `导出文档` 功能将接口文档以Word文件方式导出（Mac下请修改后缀名为html）。

## 前端Mock工具

### 引入插件

RAP会通过分析接口文档自动生成Mock服务，生成动态的模拟数据。您只需引入一行插件代码即可轻松实现RAP Mock的无缝衔接。详见Mock插件部分。

### Mock规则

默认，RAP会为不同数据类型生成默认的数据，您也可以通过手动编写标签实现更好的Mock行为控制。例如字段 id 需要自增，您可以使用MockJS语法:

```bash
变量名     备注
id|+1     @mock=100

// 表示id从100开始，每次加1
```

具体Mock规则如何填写，请访问<a href="http://mockjs.com" target="_blank">MockJS文档</a>，也可参考RAP平台中 <a href="http://rap.alibaba-inc.com/workspace/myWorkspace.action?projectId=79&mock=true&actionId=899" target="_blank">MockJS对接的例子</a>。

### Mock标签的使用

#### 显示与隐藏

在编辑Mock规则时，请点击右上角的 `Mock`按钮来显示Mock信息 ，为了接口文档的阅读体验，默认Mock信息会被隐藏。

#### 书写规则

在备注里，Mock标签和普通的备注需要用分号隔开，比如：

某一个参数叫`userId`，备注信息是 `用户ID`, mock标签是 `@mock=123`，则在备注中应该填写:

```bash
用户ID;@mock=123
```

#### 转义

```bash
变量名            备注                   结果
escapeDemo       @mock="123"           "escapeDemo" : "\"123\""
noEscapeDemo     @{mock}="123"       "noEscapeDemo" : ""1,2,3"" // 语法错误
```
默认所有@mock的值会被转义，若不需要转义，请以 **@{mock}** 代替。


### Mock插件

#### 插件的引入

RAP提供了 `Mock插件`（暂时仅支持Kissy和jQuery），使用只需要一步。

将以下代码写在KISSY或jQuery js代码之后即可：

```html
<script type="text/javascript" src="http://rap.alibaba-inc.com/rap.plugin.js?projectId={{projectId}}&mode={{mode}}"></script>
```

其中：

- `{{projectId}}`为用户所编辑的接口在RAP中的项目ID
- `{{mode}}`为RAP路由的工作模式, 默认值为3。

mode不同值的具体含义如下:

- 0 - 不拦截
- 1 - 拦截全部
- 2 - 黑名单中的项不拦截
- 3 - 仅拦截白名单中的项

**白名单会根据RAP中已经编辑的接口文档，自动配置，RAP中未录入的接口不会做拦截**

#### 插件提供的JS API

您也可以通过调用RAP给出的JS API，手动设置黑名单、白名单及查看、设置工作模式

##### 设置黑名单

```bash
RAP.setBlackList(arr);
```

##### 设置白名单

```bash
RAP.setWhiteList(arr);
```

其中arr可以包含匹配字符串，或正则对象，例：['test', /test/g]

##### 查看当前模式

```bash
RAP.getMode();
```

##### 设置当前模式

```bash
RAP.setMode(1);
```

## 后端接口控制台

### 如何进入控制台

控制台以RAP文档的`页面`为单位，通过下图中标记的ICON可进入控制台。

<img src="http://gtms03.alicdn.com/tps/i3/T1UOo_FAhdXXcFSA6Q-1048-640.png" width="600" />

控制台的主要功能:

1. 自测功能，自动根据参数提供请求参数输入界面，后端方便自测
2. 校验功能，对实际后端输出是否符合接口规范做校验，提示缺少、多余的字段
3. 日志功能，提供日志分析，时间记录等

## 自动化测试

RAP开放了Mock规则的API，QA或对此有需求的同学可以通过RAP API去访问和编辑Mock规则，为自动化测试提供便利。


## RAP 快捷键

- `Alt + F` 工作区搜索，候选列表出现时可通过上、下、回车键操作
- `Ctrl + Enter` 位于参数编辑时，根据当前行的参数标识或参数名称自动补全
- `Tab` 位于参数编辑时，自动切换到下一个位置
- `Shift + Tab` 位于参数编辑时，自动切换到上一个位置

## 接口文档编辑进阶

### 接口文档请求链接语法

http://www.taobao.com/getItem?[callback]=foo

`[callback]` 表示参数`callback`会用作JSONP的回调key，若实际请求为getItem?callback=foo，则返回结果为:foo({...});

http://www.taobao.com/getREST?{path}=delete

`{path}` 表示参数`path`会在RAP文档和开发环境进行接口对接时，需要考虑path参数，一般REST API会使用比较多。因为REST不同请求是通过参数区分的，比如getRest?path=delete, getRest?path=update, 而{path}表示两者为不同的接口。

### 最外层为数组的接口

需要在接口描述的开头增加一条指令：@type=array_map;@length=1
表示返回的最外层结构是数组，长度是1。





{% endraw %}
