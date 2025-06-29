// 用于检测和处理版本更新的工具函数

/**
 * 检查应用是否有新版本
 * 通过比较应用版本与服务端版本判断
 */
export const checkForAppUpdate = async () => {
  try {
    // 当前应用版本（从 meta 标签获取）
    const currentVersionMeta = document.querySelector('meta[name="version"]');
    const currentVersion = currentVersionMeta ? currentVersionMeta.content : '0.0.0';

    // 创建一个自定义事件来触发更新检查
    // 实际使用时，可以添加从服务器检查版本的逻辑
    window.dispatchEvent(
      new CustomEvent('sw-update-check', {
        detail: { currentVersion },
      })
    );

    // 如果有 Service Worker 注册
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        // 如果有等待中的 Service Worker，表示有更新
        if (registration.waiting) {
          console.log('检测到新版本应用待安装');
          // 触发自定义事件，通知应用有更新
          window.dispatchEvent(new CustomEvent('sw-update-found'));
          return true;
        }

        // 监听更新
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('新版本已下载，等待安装');
              window.dispatchEvent(new CustomEvent('sw-update-found'));
            }
          });
        });

        // 每次页面加载时检查更新
        registration.update().catch(err => {
          console.error('检查更新失败:', err);
        });
      }
    }

    return false;
  } catch (error) {
    console.error('版本检查错误:', error);
    return false;
  }
};

/**
 * 强制清除所有缓存并刷新应用
 */
export const clearCacheAndReload = async () => {
  try {
    // 跳转到专用的缓存清理页面
    window.location.href = '/clear-cache.html';
  } catch (error) {
    console.error('清除缓存失败:', error);
    // 如果出错，尝试直接刷新
    window.location.reload(true);
  }
};
