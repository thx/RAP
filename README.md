Rigel Automation Platform
===

    @version v1.1 - (latest version, in master branch)
    @author  Bosn
    @weibo   http://weibo.com/bosn
    @mail    bosnma@live.com

`RAP` is a data automation platform based on shared interface data system. Based on this structured "interface data", we can automatically export some other useful data, for instance: generating mock testing data.

Interface data has its only structure and model, in this hierarchy:

`project` => `module` => `page` => `action` => `parameter` [=> `parameter`]

A project has many modules classified by business logic, a module has many pages, page has actions, and actions has parameters (including request parameters and response parameters), some parameter (like {"p1" : {"p2" : 2}}) has inner parameters.

    RAP Features:
    1. support cascading complex parameters
    2. support shortcuts for using it so conveniently just like using Excel
    3. support interface data version control
    4. can mock data automatically based on interface data
    5. can supply tester utilities based on interface data