Rigel Automation Platform
===

    @version v0.6.0
    @author  Bosn Ma
    @weibo   http://weibo.com/bosn
    @mail    bosn@outlook.com

`RAP` 是一个WEB接口管理系统，可通过结构化的接口文档生成测试数据。

所谓“接口文档”定义了WEB请求的格式与细节。

文档的结构：
`project` => `module` => `page` => `request` => `parameter` [=> `parameter`]

一个项目（`project`）定义了多个模块，可根据业务逻辑或个人喜好定义。
一个模块（`module`）由多个页面组成。
一个页面（`page`）包含多个请求。
一个请求（`request`）包含一个请求参数列表，和一个响应参数列表。
对每一个参数，可能包含子参数（也就是复杂参数，例如{"a" : 1, "b" : {"p" : 2}}）

基于这种结构化的文档，RAP可零成本的自动生成游泳的模拟数据。

    RAP主要功能
    1. 支持版本管理
    2. 数据模拟服务，支持模拟规则
    3. 支持无限层级的复杂参数
    4. 支持许多快捷键，用起来像Excel一样方便
    5. 提供后端控制台，可验证真实接口输出的格式
    6. 支持JSON导入，Word文档导出


`RAP` is a web interfaces management system, can generate mock data based on structured interface documents.

So-called "Interface Document" defined the format and details of web requests.

Structure of the doc:
`project` => `module` => `page` => `request` => `parameter` [=> `parameter`]

A project can defined multiple modules based on business logic or personal preferences.
A module has many pages.
A page has many requests.
A request has a request parameter list and a response parameter list.
For each parameter may has inner parameters. (complex parameter, like {"a" : 1, "b" : {"p" : 2}})

Based on this structured document data, RAP can automatically generate useful mock data without any work.

    RAP main features:
    1. supports version control
    2. supplys mock data service, supports mock rules
    3. supports infinite cascading complex parameters
    4. supports many shortcuts, using it conviniencely just like using Excel
    5. supplys a back-end console, can validate format of real interface output
    6. supports JSON import, Microsoft Word File export
