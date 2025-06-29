import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCacheCleanerPage } from '../../utils/cacheManager';

const VersionDisplay = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const version = import.meta.env.VITE_APP_VERSION || '0.1.1';

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleCleanCache = () => {
    // 尝试创建缓存清理页面，如果失败则使用路由导航
    const success = createCacheCleanerPage();
    if (!success) {
      navigate('/clean-cache');
    }
    setShowMenu(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {showMenu && (
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-2 w-48">
          <div className="text-xs text-gray-600 mb-2 px-2">当前版本: v{version}</div>

          <button
            onClick={handleCleanCache}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            清除缓存
          </button>
        </div>
      )}

      <button
        onClick={handleMenuToggle}
        className="bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center hover:bg-gray-50"
        aria-label="应用版本与设置"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default VersionDisplay;
