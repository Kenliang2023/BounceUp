# BounceUp 部署指南

本文档提供将 BounceUp 应用部署到 Vercel 的详细步骤。

## 准备工作

1. **创建 GitHub 账号**（如果还没有）
   - 访问 [GitHub](https://github.com) 注册账号

2. **创建 Vercel 账号**
   - 访问 [Vercel](https://vercel.com) 注册账号
   - 推荐使用 GitHub 账号登录，可以简化后续流程

3. **准备好项目代码**
   - 确保项目代码已推送到 GitHub 仓库

## 部署步骤

### 方法一：通过 Vercel 网站部署

1. **登录 Vercel**
   - 访问 [Vercel](https://vercel.com) 并登录您的账号

2. **导入项目**
   - 点击 "New Project" 按钮
   - 选择 "Import Git Repository"
   - 选择包含 BounceUp 代码的 GitHub 仓库

3. **配置项目**
   - **项目名称**：可以使用默认的或自定义一个名称，如 "bounceup"
   - **框架预设**：确保选择 "Vite" 作为框架预设
   - **构建配置**：通常 Vercel 会自动检测正确的配置，如下所示：
     - 构建命令：`npm run build`
     - 输出目录：`dist`
     - 安装命令：`npm install`

4. **部署项目**
   - 点击 "Deploy" 按钮
   - Vercel 将开始构建和部署过程
   - 部署完成后，您会看到一个成功消息和项目预览链接

5. **设置自定义域名**（可选）
   - 在项目仪表板中，点击 "Domains" 部分
   - 添加您拥有的域名并按照说明配置 DNS 设置

### 方法二：使用 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel CLI**
   ```bash
   vercel login
   ```

3. **部署项目**
   - 导航到项目目录
   ```bash
   cd path/to/bounceup
   ```
   
   - 执行部署命令
   ```bash
   vercel
   ```
   
   - 按照提示填写配置信息，或者使用默认设置

4. **设置为生产环境**（首次部署后）
   ```bash
   vercel --prod
   ```

## 部署后的操作

1. **测试应用**
   - 使用提供的部署 URL 访问应用
   - 测试核心功能，确保一切正常

2. **设置环境变量**（如果需要）
   - 在 Vercel 项目仪表板中，前往 "Settings" -> "Environment Variables"
   - 添加需要的环境变量

3. **设置重定向规则**（对于 SPA）
   - 创建 `vercel.json` 文件在项目根目录，添加如下内容：
   ```json
   {
     "routes": [
       { "handle": "filesystem" },
       { "src": "/(.*)", "dest": "/index.html" }
     ]
   }
   ```
   - 这确保了 SPA 的路由正常工作

4. **启用自动部署**
   - 默认情况下，当您将更改推送到 GitHub 仓库时，Vercel 会自动重新部署
   - 可以在项目设置中的 "Git" 部分管理此功能

## 问题排查

1. **构建失败**
   - 检查构建日志，识别错误
   - 确保所有依赖项都正确列在 `package.json` 中
   - 验证项目在本地能成功构建（`npm run build`）

2. **PWA 功能不正常**
   - 确保 Service Worker 配置正确
   - 验证 manifest.json 配置
   - 使用 Chrome DevTools 的 Lighthouse 检查 PWA 得分

3. **路由问题**
   - 确保已设置好处理客户端路由的重定向规则
   - 检查应用内的路由配置

## 维护和更新

1. **监控应用性能**
   - 使用 Vercel Analytics 监控应用性能
   - 定期运行 Lighthouse 检查

2. **更新应用**
   - 将更新推送到 GitHub 仓库
   - Vercel 将自动部署更新

## 自动化部署工作流（CI/CD）

通过 Vercel 与 GitHub 的集成，您已经拥有了一个基本的 CI/CD 管道：

1. 开发新功能或修复 bug
2. 提交并推送到 GitHub
3. Vercel 自动构建并部署更新
4. 验证更改在生产或预览环境中

## 使用提示

- 使用 Vercel 的预览部署功能来测试 PR 变更
- 利用 Vercel 的分析功能了解用户如何使用应用
- 考虑为生产部署设置自定义域名，提升专业形象

## 相关资源

- [Vercel 文档](https://vercel.com/docs)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [PWA 调试指南](https://web.dev/debug-pwa/) 