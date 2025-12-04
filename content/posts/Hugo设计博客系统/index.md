+++
date = '2025-11-29T17:02:54+08:00'
draft = false
title = '基于Nginx和Hugo部署博客系统'
tags = ["网站建设"] 
+++

摘要：本文介绍了在Nginx上通过Hugo和Blowfish搭建博客的制作过程……

**域名：** 阿里云  
**云服务器：** 阿里云ECS服务器2核2G；

## 1. 安装Hugo
**Windows系统：**
在[GitHub](https://github.com/gohugoio/hugo/releases)上下载扩展版的Hugo（注意安装带extend后缀的），解压到本地，并添加到环境变量Path。
**命令行安装：（不建议）**
管理员模式打开PowerShell，不建议在C盘打开
```
powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))"
# 检查choco 版本 (环境变量一般会自动添加，没有就手动加)
choco -V
```
用choco安装hugo
```
# 安装可能较慢
choco install hugo -confirm
hugo version #检查安装成功
```
## 2. 利用Hugo安装主题（以Blowfish为例）
参考[Hugo中文文档](https://hugo.opendocs.io/getting-started/quick-start/)，在搭建博客文件夹的位置打开CMD，利用Hugo生成博客文件夹。
示例安装的主题为Blowfish，其余主题的安装可从[Hugo主题商店](https://themes.gohugo.io/)中选取。
```
hugo new site MyHugoBlog
cd MyHugoBlog
git init
git submodule add -b main https://github.com/nunocoracao/blowfish.git themes/blowfish
hugo new posts/first.md
```
完毕后会多出一个文件夹，根据[Blowfish官方教程](https://blowfish.page/zh-cn/docs/welcome/)进行网站配置。
命令`hugo serve -D`可以生成预览页面http://localhost:1313/blog/，实时修改网站内容。

## 3. 生成静态文件
利用Hugo生静态文件，生成到 public/ 目录，
```
bash
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
## 4. 上传到服务器
```
bash
rsync -avz --delete public/ root@raychaux.space:/var/www/raychaux.space/blog/ 
# 或
scp -r public/* root@raychaux.space:/var/www/raychaux.space/blog/
sudo nginx -t && sudo systemctl reload nginx    # 重载Nginx，在ssh上操作
```
**编写脚本文件一键上传**
在根目录创建deploy.ps1文件（Windows系统，linux为deploy.sh）,写入以下命令，即可快速更新网页。
```
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
