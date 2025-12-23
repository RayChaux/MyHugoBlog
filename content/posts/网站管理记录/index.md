+++
date = '2025-12-11T17:02:54+08:00'
draft = false
title = '网站管理记录'
tags = ["网站建设"]
+++

## 一、GitHub托管与编译上传
### 1.1 Github托管代码
#### 1.1.1 初始化git
```bash
# 设置git用户（全局）
git config --global user.name "name"
git config --global user.email "youremail"
# 设置git用户（当前仓库）
git config user.name "name"
git config user.email "youremail"

cd your-blog              # 进入 Hugo 站点根目录
git init
echo "public/" > .gitignore   # 不跟踪生成的静态文件
echo "resources/" >> .gitignore
git add .
git commit -m "first commit"
```
#### 1.1.2 Github上建立Repository
Repository name 填 `my-blog`（随意），Public 即可。
不要 勾选 `Initialize this repository with a README`。
#### 1.1.3 推送本地仓库
```bash
git remote add origin https://github.com/<你的用户名>/my-blog.git
git branch -M main
git push -u origin main
```
#### 1.1.4 日常维护
```bash
git add .
git commit -m "commit name"
git push
```
### 1.2 GitHub自动部署代码
通过Github的workfloow自动用Hugo编译push的代码，并上传到服务器`blog/`文件夹，实现自动部署。
在本地仓库根目录新建`.github/workflows/deploy.yml`,写入
```yml
name: Deploy to My ECS

on:
  push:
    branches: ["main"]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: '0.152.2'
          extended: true

      - name: Build
        run: |
          hugo --gc --baseURL "https://yourdomain.com/blog/"

      - name: Deploy to ECS
        uses: appleboy/scp-action@v0.1.5
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: "public/."          # 整站内容
          target: "/var/www/yourdomain.com/blog/"
          strip_components: 1

      - name: Reload nginx
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            nginx -t && systemctl reload nginx
```
将其中的域名信息和路径换为自己的。
其中，`SSH_HOST`、`SSH_USER`、`SSH_PRIVATE_KEY`是需要在Gtihub中配置的密钥，具体配置方法为 
**① 本地生成密钥**
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f deploy_key
# 生成 deploy_key（私钥） 和 deploy_key.pub（公钥）
```
**② 把公钥放进 ECS（让 GitHub 能登录）**
```bash
# 本地执行
cat deploy_key.pub | ssh root@yourdoamin.com "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```
**③ 把私钥存进 GitHub Secrets**
浏览器 → 仓库 → Settings → Secrets and variables → Actions → New repository secret  
需要注意的是，三个条目都要写入，写入后再次点击编辑按钮是无法显示密钥的值的，这并非没有写入，而是Github的安全机制。
| name              | value                         |
| :----:            | :----:                        |
| `SSH_PRIVATE_KEY` | 复制 `deploy_key` 文件全部内容 |
| `SSH_HOST`        | `yourdomain.com`              |
| `SSH_USER`        | `root`                        |  

除此之外，还需要修改Action的设置：  
进入你的仓库 → Settings → Actions → General，最底部 "Workflow permissions" → 选择"Read and write permissions"  
✅ 同时勾选 "Allow GitHub Actions to create and approve pull requests"，点 Save保存。  
最后，将deploy.yml推送到Github，就可以完成第一次部署了
```bash
git add .github/workflows/deploy.yml
git commit -m "ci: deploy to ECS via SSH"
git push
```
刷新页面即可看到通过Github更新后的网页，后续的日常维护只需要正常的push代码，Github就会自动部署。

## 二、备案信息添加
在Hugo文件夹新建`/layouts/partials/footer.html`，覆盖原有主题页脚模式。
备案图标位置：`assets/img/beian.png`
```html
{{/* 覆盖 Blowfish 默认 footer，仅调整间距 */}}
<footer class="site-footer">
  <div class="footer-row">

    {{/* 组件 1 */}}
    <span class="footer-item">Copyright</span>

    {{/* 间距 1 */}}
    <i class="spacer" style="width:7rem;"></i>

    {{/* 组件 2 */}}
    <a href="youurl"
      rel="noreferrer" target="_blank"
      style="display:inline-flex;align-items:center;gap:4px;">
      <img src="{{ (resources.Get "img/beian.png").RelPermalink }}"
          width="20" height="20" alt="备案图标">
      你的网安备案号
    </a>

    {{/* 间距 2 */}}
    <i class="spacer" style="width:2rem;"></i>

    {{/* 组件 3 */}}
    <a class="footer-item" href="https://beian.miit.gov.cn/#/Integrated/index" rel="noreferrer" target="_blank">你的备案号</a>

    {{/* 间距 3 */}}
    <i class="spacer" style="width:7rem;"></i>

    {{/* 组件 4 */}}
    <span class="footer-item">
      Powered by <a href="https://gohugo.io/" target="_blank" rel="noopener">Hugo</a> &
      <a href="https://github.com/nunocoracao/blowfish" target="_blank" rel="noopener">Blowfish</a>
    </span>

  </div>
</footer>

{{/* 让 spacer 不占流高度 */}}
<style>
.site-footer{ text-align:center;font-size:13px;color:#999;padding:1.5rem 0; }
.footer-row{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;} /* ← 纵向居中 */
.footer-item{ white-space:nowrap;line-height:20px; } /* ← 统一行高（=图标高度） */
.beian a{ display:inline-flex;align-items:center;gap:6px;line-height:20px; } /* ← 图标文字同一基线 */
.beian img{ vertical-align:middle; }
</style>
```