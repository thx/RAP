---
layout: post
title: 如何部署RAP服务
---

{% raw %}

### 准备工作

若想部署RAP服务，您需要具备J2EE开发环境。以下是我们想到的您所需的准备工作：

1. Eclipse/MyEclipse
2. JDK 1.6+
3. MySQL
4. Tomcat 6.*+
5. Git

### 构建项目

#### 获取源代码

```bash
git clone git@github.com:thx/RAP.git
git co release
```

确保您正确的切换到release分支，该分支会去掉一些阿里巴巴公司内网才能正常运作的模块。

#### 导入到IDE

以MyEclipse为例，在Package Explorer中右键 -> Import -> Existing Projects into Workspace, 将RAP项目导入进来。

#### 初始化数据库



{% endraw %}
