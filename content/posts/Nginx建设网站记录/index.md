+++
date = '2025-11-29T17:02:54+08:00'
draft = false
title = 'Nginx & Hugo建设网站记录'
tags = ["网站建设"]
+++

## 0. 安装Nginx与WordPress
Nginx介绍与使用：[Nginx中文手册](https://nginx.mosong.cc/guide/)。  
参考[如何在Ubuntu上使用LNMP搭建博客系统](https://www.yisu.com/ask/43841472.html)进行安装，使用感觉wordpress自由度不高，页面编辑起来不符合我的期望，于是本文会从卸载wordpress开始。

## 1. 彻底卸载WordPress
### 1.1 可选备份
```bash
# 文件打包
sudo tar -czf /root/wp-files.tgz -C /var/www/html wordpress
# 数据库导出
sudo mysqldump -uroot -p your_wp_db > /root/wp-db.sql
```
### 1.2 删除Wordpress文件
```bash
# 进入站点根目录（路径按实际改）
cd /var/www/html
sudo rm -rf * .[^.]*     # 包含隐藏文件 .htaccess
```
### 1.3 删除数据库及用户
```bash
sudo mysql -uroot -p <<EOF
DROP DATABASE IF EXISTS your_wp_db;
DROP USER IF EXISTS 'wp_user'@'localhost';
FLUSH PRIVILEGES;
EOF
```
### 1.4 删除Nginx虚拟主机
```bash
sudo rm -f /etc/nginx/conf.d/wordpress.conf
sudo nginx -t && sudo systemctl reload nginx
```
## 2. 从安装Nginx开始
### 2.1 安装Nginx
```bash
# CentOS
sudo yum install -y nginx
# Ubuntu/Debian
sudo apt update && sudo apt install -y nginx
sudo systemctl enable --now nginx
```
### 2.2 创建网站目录与权限
```bash
sudo mkdir -p /data/www
sudo chown -R $USER:nginx /data/www   # 以后用普通用户维护即可
```
### 2.3 简单的实践——index页面编写
```bash
sudo vim /data/www/index.html
(vim粘贴)
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
    <meta charset="UTF-8">
    <title>我的个人页</title>
    <style>
        body{font-family:Arial;background:#f5f5f5;text-align:center;margin-top:15%}
        h1{color:#333}
    </style>
    </head>
    <body>
    <h1>Hello，世界！</h1>
    <p>这是我用 Nginx 搭建的个人网页。</p>
    </body>
    </html>
```
### 2.4 将Nginx与域名链接
```bash
sudo vim /etc/nginx/conf.d/mysite.conf
(vim粘贴)
    server {
        listen       80;
        server_name  yourdomain.com  123.123.123.123;   # 更改域名和公网IP

        root   /data/www;
        index  index.html;

        location / {
            try_files $uri $uri/ =404;
        }

        # 可选：30 天缓存静态资源
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 30d;
            add_header Cache-Control "public";
        }
    }
```
保存检查与重载Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```
**此时在浏览器输入你的服务器IP，即可查看到示例的Index页面**

## 3. 配置动画主页
**Nginx常用维护指令**
```bash
sudo nginx -t              # 改完配置先测试
sudo systemctl reload nginx# 平滑重载
sudo tail -f /var/log/nginx/access.log   # 实时看访问
sudo tail -f /var/log/nginx/error.log    # 实时看错误
```
### 3.1 获取配置模板
使用[Github](https://github.com/SimonAKing/HomePage)模板配置，
```bash
cd /var/www/yourdomain.com
git clone https://github.com/SimonAKing/HomePage.git
sudo apt install npm
```
更改`config.json`的个人信息为自己的信息(VSCode远程连接，直接编辑文件)
更改`/etc/nginx/nginx.conf`的root目录改为`/var/www/yourdomain.com/HomePag/dist`**
安装依赖
```bash
cd /var/www/yourdomain.com/HomePage
npm install --registry=https://registry.npmmirror.com
npx gulp build      #编译文件
sudo nginx -t               # 改完配置先测试
sudo systemctl reload nginx # 平滑重载
```
即可在网页上看到修改的主页。
## 4. 简单的blog页面和about页面
### 4.1 在服务器上新建目录
```bash
sudo mkdir -p /var/www/yourdomain.com/{blog,about}
sudo chown -R $USER:$USER /var/www/yourdomain.com
```
### 4.2 写入网页内容
在`about`和`blog`文件夹分别写入`index.html`文件示例，内容如下：  
#### about/index.html
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>About - yourname</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;margin:0;background:#f5f7fa;color:#333;line-height:1.6}
    header{background:#4caf50;color:#fff;padding:2.5rem 0;text-align:center}
    .wrap{max-width:650px;margin:3rem auto;padding:0 1.5rem}
    h2{margin-top:2rem}
    footer{text-align:center;padding:2rem 0;font-size:.9rem;color:#777}
    .avatar{width:120px;height:120px;border-radius:50%;margin:0 auto;display:block;background:#fff;padding:4px;box-shadow:0 2px 6px rgba(0,0,0,.15)}
    .social{margin-top:1rem}
    .social a{margin:0 .5rem;color:#4caf50;font-weight:bold}
  </style>
</head>
<body>
<header>
  <img class="avatar" src="https://cravatar.cn/avatar/ray@chaux.space?s=120&d=retro" alt="avatar" />
  <h1>Hi, I'm Ray</h1>
  <p>全栈开发 · 摄影爱好者 · 终身学习者</p>
</header>

<div class="wrap">
  <h2>关于我</h2>
  <p>
    your info
  </p>

  <h2>技能</h2>
  <ul>
    <li>your info</li>
  </ul>

  <h2>项目</h2>
  <ul>
    
  </ul>

  <h2>联系方式</h2>
  <div class="social">
    <a href="mailto:ray@yourdomain.com">Email</a>
```
#### blog/index.html
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>Blog - yourname</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;margin:0;background:#f5f7fa;color:#333}
    header{background:#0d47a1;color:#fff;padding:2rem 0;text-align:center}
    .wrap{max-width:700px;margin:2rem auto;padding:0 1rem}
    article{background:#fff;padding:1.5rem;margin-bottom:1.5rem;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,.1)}
    h2{margin-top:0;font-size:1.4rem}
    .date{color:#999;font-size:.9rem}
    a{color:#0d47a1;text-decoration:none}
    a:hover{text-decoration:underline}
    footer{text-align:center;padding:2rem 0;font-size:.9rem;color:#777}
  </style>
</head>
<body>
<header>
  <h1>My Blog</h1>
  <p>记录技术与生活</p>
</header>

<div class="wrap">
  <article>
    <h2><a href="./hello-world.html">Hello World：我的第一篇博客</a></h2>
    <div class="date">2025-11-28</div>
    <p>开启博客之旅，聊一聊为什么想写博客以及未来的计划。</p>
  </article>
</div>

<footer>
  <a href="/">返回首页</a> · <a href="/about/">关于我</a>
</footer>
</body>
</html>
```
### 4.3 链接新页面到Nginx
```bash
sudo vim /etc/nginx/nginx.conf
# 写入或追加
    server {
        listen 80;
        server_name yourdomain.com;

        # 主页
        location = / {
            root /var/www/yourdomain.com/HomePage/dist;
            try_files $uri $uri/ /index.html;
        }

        # 所有根目录静态文件（css/js/img 等）
        location / {
            root /var/www/yourdomain.com/HomePage/dist;
            try_files $uri $uri/ =404;
        }

        # —— 两个子目录 —— 
        location ^~ /blog/ {
            alias /var/www/yourdomain.com/blog/;
            index index.html;
            try_files $uri $uri/ /blog/index.html;
        }

        location ^~ /about/ {
            alias /var/www/yourdomain.com/about/;
            index index.html;
            try_files $uri $uri/ /about/index.html;
        }
    }

```
Tips：用 alias 而不是 root，并且末尾一定要加 /，否则路径会多一层。  
try_files 最后一项写 /blog/index.html 是为了刷新子页时仍返回单页。  
重载Nginx后即可看到页面。
## 5. 基于Hugo框架开发blog页面
### 5.1 安装Hugo
**Windows系统：**
在[GitHub](https://github.com/gohugoio/hugo/releases)上下载扩展版的Hugo（注意安装带extend后缀的），解压到本地，并添加到环境变量Path。
**命令行安装：（不建议）**  
管理员模式打开PowerShell，不建议在C盘打开。
```bash
powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))"
# 检查choco 版本 (环境变量一般会自动添加，没有就手动加)
choco -V
```
用choco安装hugo
```bash
# 安装可能较慢
choco install hugo -confirm
hugo version #检查安装成功
```
### 5.2 利用Hugo安装主题（以Blowfish为例）
参考[Hugo中文文档](https://hugo.opendocs.io/getting-started/quick-start/)，在搭建博客文件夹的位置打开CMD，利用Hugo生成博客文件夹。
示例安装的主题为Blowfish，其余主题的安装可从[Hugo主题商店](https://themes.gohugo.io/)中选取。
```bash
hugo new site MyHugoBlog
cd MyHugoBlog
git init
git submodule add -b main https://github.com/nunocoracao/blowfish.git themes/blowfish
hugo new posts/first.md
```
完毕后会多出一个文件夹，根据[Blowfish官方教程](https://blowfish.page/zh-cn/docs/welcome/)进行网站配置。
命令`hugo serve -D`可以生成预览页面http://localhost:1313/blog/，实时修改网站内容。

### 5.3 生成静态文件
利用Hugo生静态文件，生成到 public/ 目录，
```bash
hugo
```
完成后的目录结构为：
```
public/
├─ index.html
├─ posts/
│  └─ first/
│     └─ index.html
├─ tags/...
└─ css/...
```
### 5.4 上传到服务器
```bash
rsync -avz --delete public/ root@yourdomain.com:/var/www/yourdomain.com/blog/ 
# 或
scp -r public/* root@yourdomain.com:/var/www/yourdomain.com/blog/
sudo nginx -t && sudo systemctl reload nginx    # 重载Nginx，在ssh上操作
```
**编写脚本文件一键上传**
在根目录创建deploy.ps1文件（Windows系统，linux为`deploy.sh`）,写入以下命令，即可快速更新网页。
```sh
# deploy.ps1  ← 快速更新网页
# 使用前请确保已安装 Hugo，并配置好 SSH 免密登录
# 执行命令： ./deploy.ps1
Write-Host "Building..."
hugo
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Uploading..."
scp -r public/* root@yourdomain.com:/var/www/yourblog/blog

Write-Host "Reloading nginx..."
ssh root@yourdomain.com "nginx -t && systemctl reload nginx"

Write-Host "Done!"

```