---
layout: post
title: RAP APIs
---

{% raw %}

## 引入RAP MOCK 插件

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

## 插件提供的JS API

您也可以通过调用RAP给出的JS API，手动设置黑名单、白名单及查看、设置工作模式

### 设置黑名单

```bash
RAP.setBlackList(arr);
```

### 设置白名单

```bash
RAP.setWhiteList(arr);
```

其中arr可以包含匹配字符串，或正则对象，例：['test', /test/g]

### 查看当前模式

```bash
RAP.getMode();
```

### 设置当前模式

```bash
RAP.setMode(1);
```
{% endraw %}
