+++
date = '2025-11-29T17:02:54+08:00'
draft = false
title = 'Nginx建设网站记录'
+++

## 0. 安装Nginx与WordPress
Nginx介绍与使用：[Nginx中文手册](https://nginx.mosong.cc/guide/)。  
参考[如何在Ubuntu上使用LNMP搭建博客系统](https://www.yisu.com/ask/43841472.html)的教程进行安装，使用感觉wordpress自由度不高，页面编辑起来比较难受，遂放弃。

## 1. 彻底卸载WordPress
### 1.1 可选备份
```
bash
# 文件打包
sudo tar -czf /root/wp-files.tgz -C /var/www/html wordpress
# 数据库导出
sudo mysqldump -uroot -p your_wp_db > /root/wp-db.sql
```
### 1.2 删除Wordpress文件
```
bash
# 进入站点根目录（路径按实际改）
cd /var/www/html
sudo rm -rf * .[^.]*     # 包含隐藏文件 .htaccess
```
### 1.3 删除数据库及用户
```
bash
sudo mysql -uroot -p <<EOF
DROP DATABASE IF EXISTS your_wp_db;
DROP USER IF EXISTS 'wp_user'@'localhost';
FLUSH PRIVILEGES;
EOF
```
### 1.4 删除Nginx虚拟主机
```
bash
sudo rm -f /etc/nginx/conf.d/wordpress.conf
sudo nginx -t && sudo systemctl reload nginx
```
## 2. 从安装Nginx开始
### 2.1 安装Nginx
```
bash
# CentOS
sudo yum install -y nginx
# Ubuntu/Debian
sudo apt update && sudo apt install -y nginx
sudo systemctl enable --now nginx
```
### 2.2 创建网站目录与权限
```
bash
sudo mkdir -p /data/www
sudo chown -R $USER:nginx /data/www   # 以后用普通用户维护即可
```
### 2.3 简单的实践——index页面编写
```
bash
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
```
bash
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
```
sudo nginx -t
sudo systemctl reload nginx
```
**此时可在 http://ECS-IP 查看到示例的Index页面**

## 3. 配置动画主页
**Nginx常用维护指令**
```
bash
sudo nginx -t              # 改完配置先测试
sudo systemctl reload nginx# 平滑重载
sudo tail -f /var/log/nginx/access.log   # 实时看访问
sudo tail -f /var/log/nginx/error.log    # 实时看错误
```
### 3.1 获取配置模板
使用[Github](https://github.com/SimonAKing/HomePage)模板配置，
```
bash
cd /var/www/raychaux.space
git clone https://github.com/SimonAKing/HomePage.git
sudo apt install npm
```
更改`config.json`的个人信息为自己的信息(VSCode远程连接，直接编辑文件)
更改`/etc/nginx/nginx.conf`的root目录改为`/var/www/raychaux.space/HomePag/dist`**
安装依赖
```
bash
cd /var/www/raychaux.space/HomePage
npm install --registry=https://registry.npmmirror.com
npx gulp build      #编译文件
sudo nginx -t               # 改完配置先测试
sudo systemctl reload nginx # 平滑重载
```
即可在网页上看到修改的主页。
## 4. 简单的blog页面和about页面
### 4.1 在服务器上新建目录
```
bash
sudo mkdir -p /var/www/raychaux.space/{blog,about}
sudo chown -R $USER:$USER /var/www/raychaux.space
```
### 4.2 写入网页内容
在`about`和`blog`文件夹分别写入`index.html`文件示例，内容如下：  
#### about/index.html
```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>About - RayChaux</title>
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
    90 后程序员，目前专注于 Web 与云原生技术栈。<br>
    日常语言：TypeScript / Python / Go。<br>
    相信“写代码是为了解决问题，写博客是为了解决未来的问题”。
  </p>

  <h2>技能</h2>
  <ul>
    <li>前端：Vue3、React、Vite、Webpack、Tailwind CSS</li>
    <li>后端：Node.js、NestJS、Express、Gin、Spring Boot</li>
    <li>运维：Linux、Docker、Kubernetes、CI/CD、阿里云</li>
  </ul>

  <h2>项目</h2>
  <ul>
    <li><a href="https://github.com/raychaux/seed-api" target="_blank">seed-api</a> - 轻量级 Node.js API 脚手架</li>
    <li><a href="https://github.com/raychaux/image-bed" target="_blank">image-bed</a> - 自建图床，支持 CDN 自动刷新</li>
  </ul>

  <h2>联系方式</h2>
  <div class="social">
    <a href="mailto:ray@raychaux.space">Email</a>
```
#### blog/index.html
```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>Blog - RayChaux</title>
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
  <h1>Ray's Blog</h1>
  <p>记录技术与生活</p>
</header>

<div class="wrap">
  <article>
    <h2><a href="./hello-world.html">Hello World：我的第一篇博客</a></h2>
    <div class="date">2025-11-28</div>
    <p>开启博客之旅，聊一聊为什么想写博客以及未来的计划。</p>
  </article>

  <article>
    <h2><a href="./nginx-notes.html">Nginx 静态站点部署笔记</a></h2>
    <div class="date">2025-11-20</div>
    <p>从购买域名到 HTTPS 证书，完整记录一次阿里云 ECS 部署过程。</p>
  </article>

  <article>
    <h2><a href="./vue3-script-setup.html">Vue3 script setup 语法糖踩坑记录</a></h2>
    <div class="date">2025-11-10</div>
    <p>新语法糖很香，但也藏着一些小陷阱，本文一起梳理。</p>
  </article>
</div>

<footer>
  <a href="/">返回首页</a> · <a href="/about/">关于我</a>
</footer>
</body>
</html>
```
### 4.3 链接新页面到Nginx
```
bash
sudo vim /etc/nginx/nginx.conf
# 写入或追加
    server {
        listen 80;
        server_name raychaux.space;

        # 主页
        location = / {
            root /var/www/raychaux.space/HomePage/dist;
            try_files $uri $uri/ /index.html;
        }

        # 所有根目录静态文件（css/js/img 等）
        location / {
            root /var/www/raychaux.space/HomePage/dist;
            try_files $uri $uri/ =404;
        }

        # —— 两个子目录 —— 
        location ^~ /blog/ {
            alias /var/www/raychaux.space/blog/;
            index index.html;
            try_files $uri $uri/ /blog/index.html;
        }

        location ^~ /about/ {
            alias /var/www/raychaux.space/about/;
            index index.html;
            try_files $uri $uri/ /about/index.html;
        }
    }

```
Tips：用 alias 而不是 root，并且末尾一定要加 /，否则路径会多一层。
try_files 最后一项写 /blog/index.html 是为了刷新子页时仍返回单页。
重载Nginx后即可看到页面。