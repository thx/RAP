<%@ taglib prefix="s" uri="/struts-tags" %>
<%--
  Created by IntelliJ IDEA.
  User: mashengbo
  Date: 15/9/16
  Time: 15:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>
Exception : <s:property value="%{exception}"/>

Exception stacktrace: <s:property value="exceptionStack"/>
</body>
</html>
