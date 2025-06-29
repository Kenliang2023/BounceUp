import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CacheCleanerPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('正在清除缓存...');
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // 清除所有缓存
    const clearAllCaches = async () => {
      try {
        // 注销 Service Worker
        setStatus('正在注销 Service Worker...');
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations) {
            await registration.unregister();
          }
        }

        // 清除缓存存储
        setStatus('正在清除缓存存储...');
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
        }

        // 清除 localStorage
        setStatus('正在清除本地存储...');
        localStorage.clear();

        // 清除 IndexedDB
        setStatus('正在清除 IndexedDB...');
        const databases = await window.indexedDB.databases();
        if (databases && databases.length > 0) {
          await Promise.all(
            databases.map(db => {
              return new Promise((resolve, reject) => {
                try {
                  const request = window.indexedDB.deleteDatabase(db.name);
                  request.onsuccess = resolve;
                  request.onerror = reject;
                  request.onblocked = () => {
                    console.warn(`Database ${db.name} deletion was blocked`);
                    resolve(); // 即使被阻塞也继续
                  };
                } catch (err) {
                  console.error(`Error deleting database ${db.name}:`, err);
                  resolve(); // 即使出错也继续
                }
              });
            })
          );
        }

        // 完成所有清理操作
        setStatus('缓存已成功清除！');
        setIsComplete(true);
      } catch (error) {
        console.error('清除缓存失败:', error);
        setStatus('清除缓存时出错');
        setError(error.message || '未知错误');
        setIsComplete(true);
      }
    };

    clearAllCaches();

    // 启动倒计时
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // 自动返回主页
          navigate('/', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 清理定时器
    return () => clearInterval(timer);
  }, [navigate]);

  // 手动返回主页
  const handleReturn = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50 text-center">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-primary mb-4">BounceUp 缓存清理工具</h1>

        <p className="text-gray-600 mb-6">
          如果您的应用出现问题或无法看到最新版本，可以使用此工具清除缓存并刷新应用。
        </p>

        {!isComplete ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-primary font-medium">{status}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {error ? (
              <>
                <div className="w-16 h-16 bg-red-100 text-red-500 flex items-center justify-center rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <p className="text-red-600 font-medium mb-2">{status}</p>
                <p className="text-gray-500 text-sm mb-4">{error}</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-green-100 text-green-500 flex items-center justify-center rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-green-600 font-medium mb-2">{status}</p>
              </>
            )}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleReturn}
            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            返回应用 ({countdown}秒)
          </button>

          <p className="mt-4 text-xs text-gray-500">
            将在{countdown}秒后自动返回应用。如果页面没有自动跳转，请点击上方按钮。
          </p>
        </div>
      </div>
    </div>
  );
};

export default CacheCleanerPage;
