/**
 * 缓存管理工具函数
 */

/**
 * 清除所有应用缓存
 * @returns {Promise<boolean>} 清除成功返回true，失败返回false
 */
export const clearAppCache = async () => {
  try {
    // 清除 Service Worker 缓存
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      const bounceupCaches = cacheNames.filter(name => name.includes('bounceup'));
      
      // 删除所有 bounceup 相关缓存
      await Promise.all(
        bounceupCaches.map(cacheName => caches.delete(cacheName))
      );
    }
    
    // 清除 localStorage
    for (let key in localStorage) {
      if (key.startsWith('bounceup-')) {
        localStorage.removeItem(key);
      }
    }

    // 清除 IndexedDB 存储
    await clearIndexedDB();
    
    return true;
  } catch (error) {
    console.error('清除缓存失败:', error);
    return false;
  }
};

/**
 * 清除 IndexedDB 存储
 */
const clearIndexedDB = () => {
  return new Promise((resolve, reject) => {
    // 检查是否支持 IndexedDB
    if (!window.indexedDB) {
      resolve();
      return;
    }
    
    // 获取所有数据库
    const request = window.indexedDB.databases();
    
    request.onsuccess = (event) => {
      const databases = event.target.result || [];
      
      if (databases.length === 0) {
        resolve();
        return;
      }
      
      let completed = 0;
      let errors = 0;
      
      // 对每个数据库执行删除操作
      databases.forEach(db => {
        try {
          const deleteRequest = window.indexedDB.deleteDatabase(db.name);
          
          deleteRequest.onsuccess = () => {
            completed++;
            if (completed + errors === databases.length) {
              if (errors > 0) {
                reject(new Error(`清除 IndexedDB 时出现 ${errors} 个错误`));
              } else {
                resolve();
              }
            }
          };
          
          deleteRequest.onerror = () => {
            errors++;
            if (completed + errors === databases.length) {
              reject(new Error(`清除 IndexedDB 时出现 ${errors} 个错误`));
            }
          };
        } catch (error) {
          errors++;
          if (completed + errors === databases.length) {
            reject(error);
          }
        }
      });
    };
    
    request.onerror = (event) => {
      reject(new Error('获取数据库列表失败'));
    };
  });
};

/**
 * 创建缓存清理页面
 * 此函数可以创建一个单独的缓存清理页面，不受应用其他部分的影响
 */
export const createCacheCleanerPage = () => {
  // 创建一个新的HTML内容
  const html = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BounceUp 缓存清理工具</title>
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          padding: 16px;
          text-align: center;
          background-color: #f7f9fc;
          color: #333;
        }
        .title {
          color: #4361ee;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        .description {
          color: #555;
          margin-bottom: 32px;
          font-size: 16px;
          max-width: 80%;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(67, 97, 238, 0.1);
          border-radius: 50%;
          border-left-color: #4361ee;
          animation: spin 1s linear infinite;
          margin-bottom: 24px;
        }
        .status {
          font-size: 16px;
          margin-top: 16px;
          color: #4361ee;
        }
        .button {
          background-color: #4361ee;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          display: none;
          margin-top: 24px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <div class="title">BounceUp 缓存清理工具</div>
      <div class="description">如果您的应用出现问题或无法看到最新版本，可以使用此工具清除缓存并刷新应用。</div>
      
      <div class="spinner" id="spinner"></div>
      <div class="status" id="status">正在清除缓存...</div>
      
      <button class="button" id="returnButton">返回应用</button>
      
      <script>
        (function() {
          const spinner = document.getElementById('spinner');
          const status = document.getElementById('status');
          const returnButton = document.getElementById('returnButton');
          
          // 清除所有缓存
          async function clearAllCaches() {
            try {
              // 注销 Service Worker
              if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const registration of registrations) {
                  await registration.unregister();
                }
                status.textContent = "Service Worker 已注销";
              }
              
              // 清除缓存存储
              if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(
                  cacheNames.map(cacheName => caches.delete(cacheName))
                );
                status.textContent = "缓存存储已清除";
              }
              
              // 清除 localStorage
              localStorage.clear();
              status.textContent = "本地存储已清除";
              
              // 清除 IndexedDB
              const databases = await window.indexedDB.databases();
              await Promise.all(
                databases.map(db => {
                  return new Promise((resolve, reject) => {
                    const request = window.indexedDB.deleteDatabase(db.name);
                    request.onsuccess = resolve;
                    request.onerror = reject;
                  });
                })
              );
              
              // 完成所有清理操作
              status.textContent = "缓存已成功清除！";
              spinner.style.display = 'none';
              returnButton.style.display = 'block';
              
            } catch (error) {
              console.error('清除缓存失败:', error);
              status.textContent = "清除缓存时出错，请尝试手动重启应用";
              spinner.style.display = 'none';
              returnButton.style.display = 'block';
            }
          }
          
          // 立即开始清除缓存
          clearAllCaches();
          
          // 返回按钮事件
          returnButton.addEventListener('click', function() {
            // 返回应用首页，使用 replace 以避免返回循环
            window.location.replace('/');
          });
          
          // 10秒后自动返回应用
          setTimeout(function() {
            window.location.replace('/');
          }, 10000);
        })();
      </script>
    </body>
    </html>
  `;
  
  // 在新窗口打开清理页面
  const cleanerWindow = window.open('', '_blank');
  if (cleanerWindow) {
    cleanerWindow.document.write(html);
    cleanerWindow.document.close();
    return true;
  }
  
  // 如果无法打开新窗口，返回 false
  return false;
};
