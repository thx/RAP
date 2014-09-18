---
layout: post
title: RAP
---

{% raw %}

## 什么是RAP?

<div style="font-size: 20px; text-align: center; margin-top: 40px; margin-bottom: 40px; color: #af235d; font-weight: bold;">RAP — 接口管理&自动化工具</div>

在前后端分离的开发模式下，我们通常需要定义一份 `接口文档`来规范接口的具体信息。如一个请求的请求地址、请求类型、请求参数、响应参数、每一个参数的名称、类型、含义、备注等等。 RAP可以方便团队录入、查看、管理和共享这些接口文档，并通过分析这些结构化的文档数据，生成MOCK数据、校验真实接口、提供一系列的自动化工具来提升工作效率。

* 访问阿里内网部署的RAP请点 <a href="http://rap.alibaba-inc.com" target="_blank">这里</a>
* 想部署自己的RAP服务器，请点击 <a href="http://thx.github.io/RAP/resources/RAP-deploy/" target="_blank">这里</a>
* 使用或部署RAP时遇到问题，请在<a href="http://github.com/thx/RAP/issues" target="_blank">这里</a>反馈

## 上手并了解RAP只需5分钟!

<iframe height=498 width=610 src="http://player.youku.com/embed/XNjk5NjMxODA4" frameborder=0 allowfullscreen></iframe>

片源: <a href="http://cloud.video.taobao.com//play/u/11051796/p/1/e/1/t/1/11622279.swf" target="_blank">淘宝视频(推荐)</a> <a href="http://v.youku.com/v_show/id_XNjk5NjMxODA4.html" target="_blank">优酷</a>

## 为什么使用RAP管理接口文档？

### 图形化的接口数据编辑

彻底摆脱纯文本的接口维护，通过类Excel的简单操作，即可完成复杂接口数据的编辑、查看、管理和共享。

<img src="http://gtms02.alicdn.com/tps/i2/T1chaxFwdbXXbNZB.a-2474-1456.png" alt="RAP文档编辑区" width="800" />
### 结构化的接口数据存储

RAP将接口数据结构化的存储在服务器中，在接口数据快捷编辑、接口版本间的数据对比、JSON-Schema结构数据导出等方面，都能够轻松应付。

### 简单高效的模拟数据生成

通过引入插件，`一行代码`即可将整个Web系统的异步请求导入RAP，享用 `RAP + Mockjs` 提供的多样化的模拟数据。

### 结构化的版本对比

和目前市场上的其它接口工具不同，RAP在文档的编写&提交&校验时，通过GUI来保证结构的正确性。在出现版本问题时，不会出现诡异的纯文本DIFF，而是基于RAP文档结构去比较并处理版本冲突。所以RAP在处理复杂接口的问题上具有先天的优势。

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
<li><img src="/RAP/assets/img/logos-taobao.png"/></li>
<li><img src="/RAP/assets/img/logos-aliyun.png"/></li>
<li><img src="/RAP/assets/img/logos-aligrp.png"/></li>
</ul>

目前阿里`20`个BU以及携程、浦东软件园--汇智软件、部分开源社区人士等都在使用RAP！截止`2014年9月17日`仅阿里内部的RAP就拥有`718`名工程师用户，承载`275`个业务项目，定义了`1661`个接口，文档提交次数超过`8000`次。

## 在线Demo
<iframe width="100%" height="400" src="http://jsfiddle.net/a5Gg3/2/embedded/result,html,js,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

说明：

- 本Demo 暂限阿里内网使用
- 本Demo的数据由 [RAP + [Mockjs](http://mockjs.com/)]自动生成，点击Demo中的 `Result` 标签，即可发现每一次渲染数据都不一样
- 本Demo 的模板引擎使用的是Crox，详见 [Crox官网](/crox)
- 本Demo 对应的RAP项目ID 为 `85`，项目地址为：[RAP Demo项目地址](http://rap.alibaba-inc.com/workspace/myWorkspace.action?projectId=85&mock=true)
- 本Demo 使用的接口数据是 `/onlinedemo.do` 对应的数据，接口配置截图如下：

<img src="/RAP/assets/img/rap-config.png"/>

{% endraw %}



