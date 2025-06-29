import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import VersionDisplay from './common/VersionDisplay';

// 导航项配置
const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/training-plan', label: '计划', icon: '🏆' },
  { path: '/training', label: '训练', icon: '🏀' },
  { path: '/progress', label: '进度', icon: '📊' },
  { path: '/profile', label: '我的', icon: '👤' },
];

const Layout = () => {
  const location = useLocation();
  const { user } = useUser();
  const [showGreeting, setShowGreeting] = useState(true);

  // 控制欢迎信息的显示
  useEffect(() => {
    if (showGreeting) {
      const timer = setTimeout(() => {
        setShowGreeting(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showGreeting]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 顶部欢迎信息 - 仅在首次加载时短暂显示 */}
      {showGreeting && location.pathname === '/' && (
        <div className="bg-primary text-white p-3 text-center animate-fadeSlideDown">
          欢迎回来，{user.name}！继续你的篮球之旅吧！
        </div>
      )}

      {/* 头部 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/logo.png" alt="BounceUp Logo" className="h-8 w-8 mr-2" />
              <h1 className="text-xl font-bold text-primary">BounceUp</h1>
            </div>

            <div className="flex items-center">
              {/* 星星展示 */}
              <div className="flex items-center mr-3">
                <span className="text-yellow-500 mr-1">⭐</span>
                <span className="font-semibold">{user.totalStars || 0}</span>
              </div>

              {/* 用户头像 */}
              <Link to="/profile" className="block">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user.name?.charAt(0).toUpperCase() || '?'}</span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区 */}
      <main className="flex-grow container mx-auto px-4 py-4">
        <Outlet />
      </main>

      {/* 底部导航 */}
      <footer className="bg-white shadow-inner sticky bottom-0 z-10">
        <nav className="container mx-auto">
          <ul className="flex justify-around">
            {navItems.map(item => (
              <li key={item.path} className="flex-1">
                <Link
                  to={item.path}
                  className={`flex flex-col items-center justify-center py-2 
                    ${
                      location.pathname === item.path ||
                      (item.path === '/training-plan' &&
                        location.pathname.startsWith('/training-day')) ||
                      (item.path === '/training' && location.pathname.startsWith('/training/'))
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`}
                >
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 版本显示 */}
        <VersionDisplay />
      </footer>
    </div>
  );
};

export default Layout;
