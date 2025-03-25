import { Outlet, NavLink } from 'react-router-dom'

// 底部导航图标可以使用简单的SVG或从图标库导入
// 这里用简单文本替代
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 页面内容区域 */}
      <main className="flex-grow container-app py-4 pb-20">
        <Outlet />
      </main>
      
      {/* 底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200">
        <div className="container-app flex justify-around items-center h-16">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-primary' : 'text-gray-500'}`
            }
          >
            <span className="text-xl">🏠</span>
            <span className="text-xs mt-1">首页</span>
          </NavLink>
          
          <NavLink 
            to="/training/select" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-primary' : 'text-gray-500'}`
            }
          >
            <span className="text-xl">🏀</span>
            <span className="text-xs mt-1">训练</span>
          </NavLink>
          
          <NavLink 
            to="/progress" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-primary' : 'text-gray-500'}`
            }
          >
            <span className="text-xl">📊</span>
            <span className="text-xs mt-1">进度</span>
          </NavLink>
          
          <NavLink 
            to="/rewards" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-primary' : 'text-gray-500'}`
            }
          >
            <span className="text-xl">⭐</span>
            <span className="text-xs mt-1">奖励</span>
          </NavLink>
          
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-primary' : 'text-gray-500'}`
            }
          >
            <span className="text-xl">⚙️</span>
            <span className="text-xs mt-1">设置</span>
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

export default MainLayout 