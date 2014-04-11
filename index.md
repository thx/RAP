---
layout: post
title: RAP
---

{% raw %}

## 什么是RAP?

<div style="font-size: 20px; text-align: center; margin-top: 40px; margin-bottom: 40px; color: #af235d">RAP — 随时随地 编辑、查看、使用、校验接口数据</div>

在前后端分离的开发模式下，我们通常需要定义一份 `接口文档`来规范接口的具体信息。如一个请求的：

 - 请求地址
 - 请求类型
 - 请求参数
 - 响应参数
 - 每一个参数的名称、类型、含义、备注等

[RAP](http://rap.alibaba-inc.com) 可以方便团队录入、查看、管理和共享这些接口文档，并通过结构化的文档数据，分析并生成自测数据、提供自测控制台等等... 大幅度提升开发效率。

如果您现在就想访问RAP，请点击 [这里](http://rap.alibaba-inc.com)

## 为什么使用RAP？

### 图形化的接口数据编辑

彻底摆脱纯文本的接口维护，通过类Excel的简单操作，即可完成复杂接口数据的编辑、查看、管理和共享。

<img src="http://gtms02.alicdn.com/tps/i2/T1chaxFwdbXXbNZB.a-2474-1456.png" alt="RAP文档编辑区" width="800" />
### 结构化的接口数据存储

RAP将接口数据结构化的存储在服务器中，在接口数据快捷编辑、接口版本间的数据对比、JSON-Schema结构数据导出等方面，都能够轻松应付。

### 简单高效的模拟数据生成

通过引入插件，`一行代码`即可将整个Web系统的异步请求导入RAP，享用 `RAP + Mockjs` 提供的多样化的模拟数据。

### 全周期的接口数据支持

#### 前端的模拟数据生成
请参见 `简单高效的模拟数据生成` 部分

#### 后端的接口真实数据校验
RAP能够通过存储的结构化接口数据，对后端给出的真实数据进行校验，以确保真实数据符合接口要求。

#### QA的自动化测试支持
RAP开放了Mock规则的API，QA同学可利用这些API，为自动化测试提供便利。

#### 项目相关者随时查看接口文档
任何时候，项目相关者如果想要查看最新的接口信息，以及接口的历史版本，都可以通过RAP直接看到。

## 谁在使用RAP？
<style type="text/css">
    ul.who-are-using {
        list-style-type: none;
        margin-left: 10px;
    }
    .who-are-using li {
        padding: 10px;
        font-size: 20px;
        font-weight: bold;
        color: #F90;
    }
</style>
<ul class="who-are-using">
<li><img src="/RAP/assets/img/logos-alimama.png"/></li>
<li><img src="/RAP/assets/img/logos-alipay.png"/></li>
<li><img src="/RAP/assets/img/logos-aliyun.png"/></li>
<li><img src="/RAP/assets/img/logos-taobao.png"/></li>
<li>商家业务部</li>
</ul>

## 在线Demo
<iframe width="100%" height="500" src="http://jsfiddle.net/a5Gg3/embedded/result,html,js,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

说明：

- 本Demo 暂限阿里内网使用
- 本Demo的数据由 [RAP + [Mockjs](http://mockjs.com/)]自动生成，点击Demo中的 `Result` 标签，即可发现每一次渲染数据都不一样
- 本Demo 的模板引擎使用的是Crox，详见 [Crox官网](/crox)
- 本Demo 对应的RAP项目ID 为 `85`，项目地址为：[RAP Demo项目地址](http://rap.alibaba-inc.com/workspace/myWorkspace.action?projectId=85&mock=true)
- 本Demo 使用的接口数据是 `/perf/2014.json` 对应的数据

## 相关链接

- [快速上手视频(用前必读)](http://v.youku.com/v_show/id_XNjc3NTY2MzI0.html)
- [详细介绍](http://thx.github.io/RAP/resources/rap-intro/)
- [文档中心](http://thx.github.io/RAP/)
- [Github](https://github.com/thx/RAP)
- [更新日志](https://github.com/thx/RAP/blob/master/UPDATELOG.md)
- [进入RAP(暂限阿里内网)](http://rap.alibaba-inc.com)
- [THX平台](http://thx.github.io)

{% endraw %}
