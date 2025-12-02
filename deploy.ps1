# deploy.ps1  ← 快速更新网页，终端执行hp即可
# 使用前请确保已安装 Hugo，并配置好 SSH 免密登录
# 执行命令： ./deploy.ps1
Write-Host "Building..."
hugo
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Uploading..."
scp -r public/* root@raychaux.space:/var/www/raychaux.space/blog/

Write-Host "Reloading nginx..."
ssh root@raychaux.space "nginx -t && systemctl reload nginx"

Write-Host "Done!"
