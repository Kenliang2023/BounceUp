# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-06-29

### Added
- 初始版本发布
- 核心训练功能
  - 运球训练（12个模块）
  - 投篮训练（12个模块）
  - 传球训练（12个模块）
  - 移动训练（12个模块）
  - 父子互动训练（12个模块）
- 训练计划系统
  - 10个等级的训练计划
  - 自动生成训练日程
  - 父亲助手功能
- 进度追踪系统
  - 技能雷达图
  - 训练日历视图
  - 历史记录查看
- 奖励系统
  - 星星积分机制
  - 等级晋升系统（10个等级）
  - 奖励兑换功能
  - 自定义奖励管理
- 用户系统
  - PIN码保护
  - 多用户支持
  - 用户档案管理
  - 数据导入导出
- PWA功能
  - 离线支持
  - 安装到主屏幕
  - 自动更新检测
- 代码质量工具
  - ESLint配置
  - Prettier代码格式化
  - Husky Git钩子

### Security
- PIN码保护敏感数据
- 本地数据存储（无服务器依赖）

### Fixed
- 修复 node_modules 错误跟踪问题
- 修复 ESLint 配置错误
- 修复代码格式问题

## [0.1.1] - 2025-04-30

### Added
- MVP基础功能实现
- 基础训练模块
- 简单的进度追踪

### Changed
- UI界面优化
- 性能改进

## [0.1.0] - 2025-04-01

### Added
- 项目初始化
- 基础架构搭建
- React + Vite 开发环境配置