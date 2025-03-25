# BounceUp：儿童篮球训练助手

<p align="center">
<img src="https://via.placeholder.com/200x200?text=BounceUp" alt="BounceUp Logo" width="200"/>
</p>

## 📱 项目概述

BounceUp是一款专为8岁男孩设计的篮球训练助手PWA应用，特别适合有多动症、注意力不集中、好动的儿童使用。通过科学、系统的训练方法以及游戏化激励机制，帮助儿童提升篮球基本功，培养兴趣和自信心。

### 🎯 目标用户
- **主要用户**：8岁男孩（有多动症、自信心不足、好动）
- **辅助用户**：其父亲（普通父亲，非专业教练）

### 🏀 核心功能

- **科学训练系统**：包含运球、投篮、传球、移动四大类核心技能训练
- **多动症适应设计**：短周期训练单元、明确视觉引导、休息与活动交替
- **激励机制**：星星积分、等级晋升、奖励兑换、成就系统
- **进度可视化**：技能雷达图、进步趋势、训练记录
- **父亲助手工具**：训练指导、进度评估、互动建议

## 🛠️ 技术栈

- **前端框架**: React.js
- **样式方案**: Tailwind CSS
- **构建工具**: Vite.js
- **应用类型**: PWA (Progressive Web App)
- **数据存储**: LocalStorage/IndexedDB
- **部署方案**: Vercel

## 🚀 分阶段开发计划

### 基础版 (MVP)
- 核心训练库（每个技能类别3-5个训练项目）
- 基本记录功能（训练完成记录、简单评估）
- 简单星星奖励系统
- PIN码保护功能
- 离线功能保障

### 增强版
- 数据可视化（技能雷达图、进度趋势图）
- 完整奖励体系（等级、成就、奖励兑换）
- 父亲辅助工具基础版
- PWA完整功能（通知、后台同步）

### 完整版
- 全部父亲助手功能
- 高级数据分析
- 个性化训练推荐
- 完整交互体验优化

## 📲 使用方法

### 快速开始

1. 访问应用网址：[https://bounceup.vercel.app](https://bounceup.vercel.app)
2. 点击"添加到主屏幕"：
   - iOS: 点击分享图标 → "添加到主屏幕"
   - Android: 点击菜单 → "添加到主屏幕"或"安装应用"
3. 设置PIN码以保护您的训练数据
4. 填写基本信息，开始您的篮球训练之旅！

### 数据安全

- 所有训练数据保存在您自己的设备本地
- 定期使用"导出数据"功能备份您的训练记录
- PIN码保护防止他人查看您的训练数据

## 📋 主要功能模块

### 1. 用户与档案管理
- 简单的个人信息设置
- 训练偏好设置
- 训练日历与提醒

### 2. 训练系统
- 四大类核心技能训练库
- 40分钟训练流程管理
- 分步骤训练指导
- 短周期训练单元（5-7分钟）

### 3. 进度追踪系统
- 技能进度量化记录
- 历史训练数据查看
- 进步趋势可视化

### 4. 奖励与激励系统
- 星星积分系统
- 等级晋升机制
- 奖励兑换中心
- 成就解锁系统

### 5. 父亲助手工具
- 训练辅助指导
- 进度评估工具
- 互动建议提供

## 💡 开发者信息

BounceUp是一个开源项目，欢迎贡献代码或提出建议。

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/yourusername/bounceup.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## �� 许可证

MIT License 