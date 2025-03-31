import { useState, useEffect } from 'react';

const UpdatePrompt = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [updating, setUpdating] = useState(false);
  
  useEffect(() => {
    // 监听 Service Worker 更新事件
    if ('serviceWorker' in navigator) {
      // 当 Service Worker 更新时触发提示
      window.addEventListener('sw-update-found', () => {
        setShowUpdatePrompt(true);
      });
      
      // 检查是否有已安装的 Service Worker
      const checkRegistration = async () => {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations) {
            if (registration && registration.waiting) {
              // 已有等待中的 Service Worker，显示更新提示
              setShowUpdatePrompt(true);
              break;
            }
          }
        } catch (error) {
          console.error('检查 Service Worker 更新失败:', error);
        }
      };
      
      checkRegistration();
    }
  }, []);
  
  // 触发更新
  const handleUpdate = () => {
    if (updating) return; // 防止多次点击
    
    setUpdating(true);
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => {
          let updated = false;
          
          const updatePromises = registrations.map(registration => {
            if (registration && registration.waiting) {
              // 发送消息给 Service Worker 触发 skipWaiting
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
              updated = true;
              
              // 监听控制权变化
              return new Promise((resolve) => {
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                  resolve();
                });
              });
            }
            return Promise.resolve();
          });
          
          // 等待所有更新完成
          Promise.all(updatePromises)
            .then(() => {
              if (updated) {
                // 添加一个小延迟后再重新加载页面
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              } else {
                // 如果没有找到等待中的Service Worker，也重新加载页面
                window.location.reload(true);
              }
            })
            .catch(() => {
              // 如果出错，强制刷新页面
              window.location.reload(true);
            });
        })
        .catch(error => {
          console.error('更新Service Worker失败:', error);
          // 如果出错，尝试强制刷新页面
          window.location.reload(true);
        });
    } else {
      // 如果不支持Service Worker，直接刷新页面
      window.location.reload(true);
    }
  };
  
  // 关闭更新提示
  const handleDismiss = () => {
    setShowUpdatePrompt(false);
  };
  
  if (!showUpdatePrompt) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 z-50 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">发现新版本！</p>
          <p className="text-sm opacity-90">更新以获取最新功能和修复</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleDismiss}
            disabled={updating}
            className={`px-4 py-2 ${updating ? 'bg-gray-500' : 'bg-primary-dark'} text-white font-medium rounded-md shadow-sm`}
          >
            稍后
          </button>
          <button 
            onClick={handleUpdate}
            disabled={updating}
            className={`px-4 py-2 ${updating ? 'bg-gray-200 text-gray-500' : 'bg-white text-primary'} font-medium rounded-md shadow-sm flex items-center`}
          >
            {updating ? (
              <>
                <span className="mr-2">更新中</span>
                <span className="inline-block w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
              </>
            ) : (
              '立即更新'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePrompt;