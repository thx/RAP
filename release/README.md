部署办法
====

将war包修改为ROOT.war后放入tomcat webapps文件夹中

startup.sh(.bat)启动tomcat，该war包自动部署到文件夹ROOT

停掉服务器，打开ROOT中得WEB-INF`/classes/mysql.local.properties` 来修改数据库配置

启动tomcat，完成部署。

具体部署请查看GitHub [Wiki](https://github.com/thx/RAP/wiki)中得部署手册。
