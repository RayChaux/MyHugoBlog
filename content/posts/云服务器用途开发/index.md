+++
date = '2025-11-29T17:02:54+08:00'
draft = true
title = '云服务器用途开发'
author = 'RayChaux'
+++

**摘要：** 本文介绍了基于Unbuntu云服务器的一些用法，包括建立自用图床等……
## 1. 建立自用图床
### 1.1 新建目录
```
bash
sudo mkdir -p /var/www/raychaux.space/img
# 年份子目录，方便管理
sudo mkdir -p /var/www/raychaux.space/img/2025
# 把拥有者改成自己，否则 VS Code 无法上传
sudo chown -R $USER:$USER /var/www/raychaux.space/img
```
### 1.2 nginx配置文件编辑
```
bash
sudo vim /etc/nginx/nginx.conf
    # —— 写入图床目录 —— 
    location ^~ /img/ {
            alias /var/www/raychaux.space/img/;
            autoindex on;                   # 可选：允许浏览器列目录，方便检查
            autoindex_exact_size off;
            autoindex_localtime on;
            expires 30d;                    # 缓存 30 天
            # 只允许自己域名引用
            valid_referers none blocked server_names
            ~^(https?://)?(www\.)?raychaux\.space;
            if ($invalid_referer) {
                    return 403;
            }
    }
sudo chown -R $USER:www-data /var/www/raychaux.space/img    #给予权限
sudo nginx -t && sudo systemctl reload nginx
```
### 1.3 存入文件
直接将jpg/png/gif拖入img文件夹即可
或者
```
bash
scp ./demo.png root@raychaux.space:/var/www/raychaux.space/img/2025/
```
即可在 https://raychaux.space/img/demo.png 查看文件
完成！
### 1.4 注意事项
- 批量上传：在本地的文件夹目录打开bash
  `scp *.jpg raychaux.space:/var/www/raychaux.space/img/`
  即可上传所有.jpg图片
- 可将图片压缩后上传，以免占用太多服务器空间
- 想实时预览目录：
  浏览器打开 https://raychaux.space/img/ 就能列出所有图片
