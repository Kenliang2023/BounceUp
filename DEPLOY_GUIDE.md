# BounceUp 部署指南

## 🚀 快速部署到 Vercel

### 方法一：命令行部署（推荐）

1. **确保已登录 Vercel**

   ```bash
   vercel login
   ```

2. **部署到生产环境**

   ```bash
   vercel --prod
   ```

3. **部署到预览环境**（用于测试）
   ```bash
   vercel
   ```

### 方法二：通过 GitHub 自动部署

1. 将代码推送到 GitHub

   ```bash
   git push origin main
   ```

2. 在 Vercel 控制台导入项目
   - 访问 https://vercel.com/new
   - 选择你的 GitHub 仓库
   - 点击 Import
   - Vercel 会自动检测项目配置

### 方法三：通过 Vercel 控制台

1. 访问 https://vercel.com
2. 点击 "Add New" -> "Project"
3. 选择 "Import Git Repository"
4. 授权并选择你的仓库

## 📋 部署前检查清单

- [x] 构建成功：`npm run build`
- [x] 代码已提交：`git status`
- [x] 版本号已更新：package.json 中的 version
- [x] CHANGELOG.md 已更新
- [x] 所有 ESLint 错误已修复

## 🔧 部署配置

项目已配置以下文件：

- `vercel.json` - Vercel 部署配置
- `vercel-build.sh` - 自定义构建脚本
- `.gitignore` - 忽略不需要部署的文件

## 🌐 访问已部署的应用

部署成功后，你会获得：

- **生产环境 URL**：`https://your-app.vercel.app`
- **预览环境 URL**：`https://your-app-git-branch.vercel.app`

## 🔄 更新部署

每次代码更新后：

1. 提交代码：`git add . && git commit -m "your message"`
2. 推送到 GitHub：`git push`
3. Vercel 会自动部署（如果配置了 GitHub 集成）
4. 或手动部署：`vercel --prod`

## ⚠️ 注意事项

1. **环境变量**：如需配置环境变量，在 Vercel 控制台设置
2. **域名**：可在 Vercel 控制台配置自定义域名
3. **分析**：Vercel 提供免费的 Web Analytics

## 🐛 故障排除

如果部署失败：

1. 检查构建日志：`vercel logs`
2. 本地测试构建：`npm run build`
3. 查看 Vercel 控制台的错误信息
4. 确保 node 版本兼容（项目使用 Node.js 18+）
