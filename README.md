Rigel Automation Platform
===

    @version v0.7.0
    @author  Bosn(霍雍), wangjeaf(思竹)
    @weibo   http://weibo.com/bosn, http://github.com/wangjeaf
    @mail    bosn@outlook.com, wangjeaf@gmail.com

什么是RAP?
--------------------------------------

在前后端分离的开发模式下，我们通常需要一些`接口文档`来规范接口具体的返回格式。比如一个请求的链接是什么、有几个参数、参数类型、标识符、含义等等。`RAP` 首先方便您录入和管理这些接口文档，并通过分析文档数据为您生成自测数据、提供自测控制台、为自动化测试提供接口数据等等，大大提升开发效率。
   
RAP MOCK插件使用方法
--------------------------------------

RAP提供MOCK服务插件（暂时仅支持Kissy和jQuery），使用方法只需要一步:

### 在kissy, jQuery后面引入rap plugin ###

```bash
<script type="text/javascript" src="http://rap.alibaba-inc.com/rap.plugin.js?id={{id}}&mode={{mode}}"></script>
```

其中`{{id}}`为RAP提供的项目ID, `{{mode}}`为RAP路由的工作模式, 默认值为3，白名单会根据RAP中的文档自动配置，对RAP中未录入的接口不会做拦截。
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


