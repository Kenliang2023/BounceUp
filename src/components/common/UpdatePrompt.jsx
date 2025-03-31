import { useState, useEffect } from 'react';

const UpdatePrompt = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  
  useEffect(() => {
    // 监听 Service Worker 更新事件
    if ('serviceWorker' in navigator) {
      // 当 Service Worker 更新时触发提示
      window.addEventListener('sw-update-found', () => {
        setShowUpdatePrompt(true);
      });
      
      // 检查是否有已安装的 Service Worker
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          // 已有等待中的 Service Worker，显示更新提示
          setShowUpdatePrompt(true);
        }
      });
    }
  }, []);
  
  // 触发更新
  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          // 发送消息给 Service Worker 触发 skipWaiting
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          
          // 重新加载页面以应用新版本
          window.location.reload();
        }
      });
    }
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
        <button 
          onClick={handleUpdate}
          className="px-4 py-2 bg-white text-primary font-medium rounded-md shadow-sm"
        >
          立即更新
        </button>
      </div>
    </div>
  );
};

export default UpdatePrompt;
