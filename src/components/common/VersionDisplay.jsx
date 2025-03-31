import { useState, useEffect } from 'react';
import { clearCacheAndReload } from '../../utils/versionCheck';

const VersionDisplay = () => {
  const [currentVersion, setCurrentVersion] = useState('加载中...');
  const [isLatestVersion, setIsLatestVersion] = useState(true);
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  
  useEffect(() => {
    // 获取当前版本
    const metaVersion = document.querySelector('meta[name="version"]');
    const version = metaVersion ? metaVersion.content : '未知';
    setCurrentVersion(version);
    
    // 监听服务工作线程消息
    const checkVersion = () => {
      // 如果是在开发环境，不显示刷新按钮
      if (window.location.hostname === 'localhost') {
        return;
      }
      
      // 检测是否有新版本可用
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(registration => {
          if (registration && registration.waiting) {
            console.log('新版本可用，等待更新');
            setIsLatestVersion(false);
            setShowRefreshButton(true);
          }
        });
      }
    };
    
    checkVersion();
    
    // 添加监听器以检测更新
    window.addEventListener('sw-update-found', () => {
      setIsLatestVersion(false);
      setShowRefreshButton(true);
    });
    
    return () => {
      window.removeEventListener('sw-update-found', () => {});
    };
  }, []);
  
  const handleForceRefresh = () => {
    clearCacheAndReload();
  };
  
  return (
    <div className="text-center py-2 text-xs text-gray-500">
      <p>
        {isLatestVersion 
          ? `当前版本: v${currentVersion}` 
          : `当前版本: v${currentVersion} (有新版本可用)`}
      </p>
      
      {showRefreshButton && (
        <button 
          onClick={handleForceRefresh}
          className="mt-1 px-3 py-1 bg-primary text-white text-xs rounded-md"
        >
          强制更新到最新版本
        </button>
      )}
    </div>
  );
};

export default VersionDisplay;
