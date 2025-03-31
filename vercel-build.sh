#!/bin/bash
# 确保脚本执行时出错就停止
set -e

# 输出调试信息
echo "Starting build process with permission fix..."

# 尝试修复权限问题
if [ -f "node_modules/.bin/vite" ]; then
  echo "Setting permissions for vite executable..."
  chmod +x node_modules/.bin/vite
fi

# 执行构建命令
echo "Running build command..."
npx vite build

echo "Build completed successfully!"
