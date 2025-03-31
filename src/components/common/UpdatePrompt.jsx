import { useState, useEffect } from 'react';

const UpdatePrompt = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('idle'); // 'idle', 'updating', 'success', 'error'
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // 监听 Service Worker 更新事件
    if ('serviceWorker' in navigator) {
      // 当 Service Worker 更新时触发提示
      window.addEventListener('sw-update-found', () => {
        setShowUpdatePrompt(true);
      });
      
      // 监听 Service Worker 激活事件
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (updating) {
          setUpdateStatus('success');
          
          // 延迟关闭提示并刷新页面
          setTimeout(() => {
            setShowUpdatePrompt(false);
            window.location.reload();
          }, 2000);
        }
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
    
    // 清理函数
    return () => {
      window.removeEventListener('sw-update-found', () => {
        setShowUpdatePrompt(true);
      });
    };
  }, [updating]);
  
  // 触发更新
  const handleUpdate = () => {
    if (updating) return; // 防止多次点击
    
    setUpdating(true);
    setUpdateStatus('updating');
    
    try {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations()
          .then((registrations) => {
            let found = false;
            
            registrations.forEach(registration => {
              if (registration && registration.waiting) {
                // 发送消息给 Service Worker 触发 skipWaiting
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                found = true;
              }
            });
            
            if (!found) {
              // 如果没有找到等待中的 Service Worker
              setTimeout(() => {
                setUpdateStatus('success');
                // 延迟关闭提示并刷新页面
                setTimeout(() => {
                  setShowUpdatePrompt(false);
                  window.location.reload();
                }, 1500);
              }, 500);
            }
            
            // 设置超时处理
            setTimeout(() => {
              if (updateStatus === 'updating') {
                setUpdateStatus('success');
                // 延迟关闭提示并刷新页面
                setTimeout(() => {
                  setShowUpdatePrompt(false);
                  window.location.reload();
                }, 1500);
              }
            }, 5000);
          })
          .catch(error => {
            console.error('更新Service Worker失败:', error);
            setError('更新失败，请手动刷新页面');
            setUpdateStatus('error');
          });
      } else {
        // 如果不支持Service Worker，直接刷新页面
        window.location.reload();
      }
    } catch (error) {
      console.error('更新过程中出错:', error);
      setError('更新过程中出错，请手动刷新页面');
      setUpdateStatus('error');
    }
  };
  
  // 关闭更新提示
  const handleDismiss = () => {
    setShowUpdatePrompt(false);
    setUpdating(false);
    setUpdateStatus('idle');
    setError(null);
  };
  
  // 手动刷新页面
  const handleRefresh = () => {
    window.location.reload();
  };
  
  if (!showUpdatePrompt) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 z-50 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          {updateStatus === 'idle' && (
            <>
              <p className="font-medium">发现新版本！</p>
              <p className="text-sm opacity-90">更新以获取最新功能和修复</p>
            </>
          )}
          
          {updateStatus === 'updating' && (
            <>
              <p className="font-medium">正在更新...</p>
              <p className="text-sm opacity-90">请稍候，正在应用新版本</p>
            </>
          )}
          
          {updateStatus === 'success' && (
            <>
              <p className="font-medium">更新成功！</p>
              <p className="text-sm opacity-90">新版本已准备就绪，即将刷新页面</p>
            </>
          )}
          
          {updateStatus === 'error' && (
            <>
              <p className="font-medium">更新失败</p>
              <p className="text-sm opacity-90">{error || '请尝试手动刷新页面'}</p>
            </>
          )}
        </div>
        
        <div className="flex space-x-2">
          {updateStatus === 'idle' && (
            <>
              <button 
                onClick={handleDismiss}
                className="px-4 py-2 bg-primary-dark text-white font-medium rounded-md shadow-sm hover:bg-opacity-90"
              >
                稍后
              </button>
              <button 
                onClick={handleUpdate}
                className="px-4 py-2 bg-white text-primary font-medium rounded-md shadow-sm hover:bg-gray-100"
              >
                立即更新
              </button>
            </>
          )}
          
          {updateStatus === 'updating' && (
            <div className="flex items-center px-4 py-2 bg-primary-dark bg-opacity-50 text-white font-medium rounded-md">
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              更新中...
            </div>
          )}
          
          {updateStatus === 'success' && (
            <div className="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-md">
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              更新成功
            </div>
          )}
          
          {updateStatus === 'error' && (
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-white text-red-600 font-medium rounded-md shadow-sm hover:bg-gray-100"
            >
              手动刷新
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePrompt;