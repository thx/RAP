# RAP ![](https://api.travis-ci.org/thx/RAP.svg)

### What is RAP?

RAP is a web tool that allows web applcation developers to rapidly define and document web APIs that are used in typical RESTful-API based web applications. RAP can also be used to generate API mock data and run API services to enable front-end developers in writing and testing their front-end code that makes consumpiont of the predefined web API loaded with mock data, hence reducing the dependency from the backend development work. Meanwhile, backend developers can implement their backend code according to the defintion of API on their own pace to meet the quality and timeline requirements. With RAP, you can really do more with less.

RAP通过GUI工具帮助WEB工程师更高效的管理接口文档，同时通过分析接口结构自动生成Mock数据、校验真实接口的正确性，使接口文档成为开发流程中的强依赖。有了结构化的API数据，RAP可以做的更多，而我们可以避免更多重复劳动。

<img src="http://gtms04.alicdn.com/tps/i4/TB19tgUKVXXXXXAXXXXAhCB5VXX-1222-646.png" width="600" />


### Why we use RAP?
* Enterprise-level application: 350+ corporations including Alibaba Group have adopted RAP to manage their important API Docs and development effort!
* Fast and responsive technical support with continuous update. Go to issues list to find out how active the community is!
* Free and open source: freedom is in your hand!

### 为什么我们信赖RAP？
* 企业级应用，包括阿里集团在内得350多个企业都在使用RAP管理重要的接口文档。
* 快速高效的技术支持，持续的更新，去Issues看一看就知道有多热闹。
* 免费、开源，一切尽在掌握中！

### 如何使用RAP
1. 直接访问由作者维护的[rapapi.org](http://rapapi.org)
2. 自己部署一个RAP服务器，参考最新Release部分

### 快速上手 quick guide
* English: [Quick Guide Manual](https://github.com/thx/RAP/wiki/quick_guide) at first.
* 中文：[Video Tutorial 视频教程](http://thx.github.io/RAP/study.html)

### 分支说明
* master: 最新代码会在master，所以master是最新的，但是不保证稳定。且有一些公司自用的东西，所以提交记录可以参考，但不能直接使用master分支。
* release：是相对稳定的最新代码分支，也是RAP对外打包的分支
* 其它分支：根据开发需要，大的版本会以版本号为分支名，打一些临时分支。

### 最新Release
* [Release](https://github.com/thx/RAP/releases)
* [如何部署RAP服务器](https://github.com/thx/RAP/wiki/deploy_manual_cn)
* [如何使用RAP编辑文档](https://github.com/thx/RAP/wiki/user_manual_cn)

### 其它LINKS
* 我想大概了解RAP => [Official Site 官网](http://thx.github.io/RAP)
* 我想查找详细的文档资料 => [Wiki/Documents/Manual 文档/手册](http://github.com/thx/RAP/wiki)
* 我想快速了解什么是RAP => [视频介绍](http://vodcdn.video.taobao.com/player/ugc/tb_ugc_pieces_core_player_loader.swf?version=1.0.20150330&vid=11622279&uid=11051796&p=1&t=1&rid=&random=6666)
* 我想快速上手RAP使用方法 => [视频教程](http://thx.github.io/RAP/study.html)
* 我要反馈问题 => [Issues](http://github.com/thx/RAP/issues)

### Architecture
* Frontend: Velocity + jQuery + qUnit
* Backend: Hibernate5 + Spring4 + Struts2
* Data Store: MySQL5 + Redis3
* Deployment: Tomcat + Docker
* CI: Travis

## 订阅RAP更新?

为了在有新Release、发现重大安全漏洞时能够及时的通知到各位管理员，请关注 [订阅帖](https://github.com/thx/RAP/issues/234)

 
## About

    @version     v0.14.3
    @author      @nuysoft @zhangmeng712 @bosn @wangjeaf
    @director    @limu @xinglie
    @update      Sep. 8th 2016
    @dependency  MockJS(@nuysoft)
    @license     GPL

## Contact

    @问题反馈   https://github.com/thx/RAP/issues (推荐)
    @旺旺群聊   582755829 (找到小伙伴)
    @作者微博   http://weibo.com/bosn (求粉:3  )
    
## Contributors List 贡献者

`belerweb`, `xinglie`, `nunnly`, `x03570227`, `jokefaker`, etc.

[Contributors Details](https://github.com/thx/RAP/graphs/contributors)

## 赞助商
* 感谢[阿里云](http://www.aliyun.com)赞助服务器

## 其它链接
* THX开源工具集: [http://thx.github.io/](http://thx.github.io/)
* 作者微博：[@Bosn](http://weibo.com/bosn)

## RAP的客户
* 阿里巴巴集团
* 蚂蚁金服
* Boss直聘
* 苏州白鸽云信息技术有限公司
* 厦门优优汇联信息科技有限公司
* 杭州匠人网络科技有限公司
* 深圳润民科技有限公司
* 南京爱动信息技术有限公司
* 智能云科信息科技有限公司


您也在使用RAP?请 [在这里](https://github.com/thx/RAP/issues/272) 更新您的公司.
