---
layout: post
title: API
---

## RAP MOCK插件API

RAP提供MOCK服务插件（暂时仅支持Kissy和jQuery），使用方法只需要一步:

### 在kissy, jQuery后面引入rap plugin ###

```bash
<script type="text/javascript" src="http://rap.alibaba-inc.com/rap.plugin.js?projectId={{projectId}}&mode={{mode}}"></script>
```

其中`{{projectId}}`为RAP提供的项目ID, `{{mode}}`为RAP路由的工作模式, 默认值为3，白名单会根据RAP中的文档自动配置，对RAP中未录入的接口不会做拦截。
mode不同值具体含义:
- 0 - 不拦截
- 1 - 拦截全部
- 2 - 黑名单中的项不拦截mdd
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
