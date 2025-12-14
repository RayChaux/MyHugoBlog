+++
date = '2025-11-29T17:02:54+08:00'
draft = false
title = '云服务器用途开发'
tags = ["服务器"]
author = 'RayChaux'
+++

**摘要：** 本文介绍了基于Unbuntu云服务器的一些用法，包括建立自用图床等……
## 1. 建立自用图床
### 1.1 新建目录
```bash
sudo mkdir -p /var/www/raychaux.space/img
# 年份子目录，方便管理
sudo mkdir -p /var/www/raychaux.space/img/2025
# 把拥有者改成自己，否则 VS Code 无法上传
sudo chown -R $USER:$USER /var/www/raychaux.space/img
```
### 1.2 nginx配置文件编辑
```bash
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
```bash
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
### 1.5 使用图形化界面快捷管理
**① 安装php8.2-fpm**
```bash
# 添加PHP官方PPA
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
# 安装PHP 8.2-FPM
sudo apt install php8.2-fpm php8.2-cli php8.2-common
sudo systemctl enable --now php8.2-fpm
# 确认安装
ls /run/php/php8.2-fpm.sock
# 输出/run/php/php8.2-fpm.sock为成功
```
**② 编写php文件**
在`yourdomain.com`下建立`upload.php`
```php
<?php
$pass   = 'YOUR_PASS';                 // 只有你知道的密码
$base   = __DIR__ . '/img';            // 图床根目录
$max    = 10 * 1024 * 1024;            // 10M 单文件
$exts   = ['jpg','jpeg','png','gif','webp'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['pass'])) {
    if ($_POST['pass'] !== $pass) die('❌ 密码错误');
    if (!isset($_FILES['pic']))   die('❌ 未选择文件');
    $file = $_FILES['pic'];
    if ($file['error'] !== 0)     die('❌ 上传失败');
    if ($file['size'] > $max)     die('❌ 文件过大（>10M）');

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $exts))   die('❌ 仅限图片格式');

    // 子文件夹：日期或自定义
    $sub = isset($_POST['folder']) && preg_match('/^\w+$/', $_POST['folder'])
           ? $_POST['folder']
           : date('Y-m');
    $dir = $base . '/' . $sub;
    if (!is_dir($dir)) mkdir($dir, 0755, true);

    $name = date('YmdHis') . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $path = $dir . '/' . $name;
    move_uploaded_file($file['tmp_name'], $path);
    $url = 'https://raychaux.space/img/' . $sub . '/' . $name;
    exit($url);   // 返回直链
}
?>
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>图床上传</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
body{background:#f5f7fa}.card{max-width:500px;margin:2rem auto}
#urlBox{display:none}
</style>
</head>
<body>
<div class="card shadow">
  <div class="card-body">
    <h5 class="card-title">图床上传</h5>
    <input type="password" id="pass" class="form-control mb-2" placeholder="输入密码">
    <input type="text" id="folder" class="form-control mb-2" placeholder="子文件夹（留空=按月份）">
    <input type="file" id="pic" class="form-control mb-2" accept="image/*">
    <button class="btn btn-primary w-100" onclick="upload()">上传</button>
    <div id="urlBox" class="mt-3">
      <label>直链（点击复制）</label>
      <input type="text" id="urlOut" class="form-control" readonly>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script>
async function upload(){
  const pass   = document.getElementById('pass').value;
  const folder = document.getElementById('folder').value || '';
  const file   = document.getElementById('pic').files[0];
  if(!pass||!file)return alert('请填密码并选择图片');
  const fd = new FormData();
  fd.append('pass', pass);
  fd.append('folder', folder);
  fd.append('pic', file);
  const res = await fetch('', {method:'POST', body:fd});
  const url = await res.text();
  if(url.includes('❌')) return alert(url);
  document.getElementById('urlOut').value = url;
  document.getElementById('urlBox').style.display = 'block';
  document.getElementById('urlOut').select();
  document.execCommand('copy');
  alert('已复制到剪贴板！');
}
</script>
</body>
</html>
```
赋予权限
```bash
sudo chown $USER:$USER /var/www/raychaux.space/upload.php
sudo chmod 644 /var/www/raychaux.space/upload.php
```
**③ 修改`nginx.conf`配置**
写入
```nginx
location ~ \.php$ {
    root /var/www/raychaux.space;
    fastcgi_pass unix:/run/php/php8.2-fpm.sock;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
}
```
重载nginx后即可在https://yourdomain.com/upload.php看到上传界面。