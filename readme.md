# Seed of THX

欢迎使用 thx-base 创建 THX 风格的文档网站。

## 所含内容

```bash
.
├── Gruntfile.js
├── _config.yml
├── _includes
│   ├── archive.html
│   └── ceiling.html
├── assets
│   ├── base.css
│   ├── img
│   │   └── bg.jpg
│   └── syntax
│       └── github.css
├── package.json
└── readme.md
```

## 用法

### 准备

需要安装 jekyll 与 git。 Mac 用户，可以如此安装 jekyll：

```bash
sudo gem install github-pages
```

如果装了 [Homebrew](http://brew.sh/)，则可以如此安装 git：

```bash
brew install git
```

Windows 用户，推荐安装 [msysgit](https://code.google.com/p/msysgit/)。安装 jekyll
的方法请看 [阿狼的文章](http://stormtea123.github.io/jekyll-window7.av/)。

### 简要步骤

- 获取代码
- 修改配置
- 添加内容

```bash
git clone git@github.com:thx/base.git
```

修改 _config.yml ，在 baseurl 一栏填上你的仓库名称：

```diff
--- a/_config.yml
+++ b/_config.yml
@@ -1,4 +1,4 @@
-baseurl: /your-project
+baseurl: /brix-core
```

修改 package.json ，填上 name 一栏：

```diff
--- a/package.json
+++ b/package.json
@@ -1,5 +1,5 @@
 {
-  "name": "base",
+  "name": "brix-core",
```

当然还要修改 git remote：

```bash
git remote set-url origin git@github.com:thx/brix-core.git
```

### 范例

请参考如下示例：

- [thx.github.io](https://github.com/thx/thx.github.io)
- [brix-core](https://github.com/thx/brix-core/tree/gh-pages)
- [magix](https://github.com/thx/magix/tree/gh-pages)

## 来源

当前风格模仿自 http://www.awwwards.com/10-html-css-online-code-editors-for-web-developers.html
