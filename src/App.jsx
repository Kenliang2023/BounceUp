import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'

// 导入布局组件
import Layout from './components/Layout'

// 导入页面组件
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import TrainingSelectPage from './pages/TrainingSelectPage'
import TrainingPage from './pages/TrainingPage'
import TrainingPlanPage from './pages/TrainingPlanPage'
import TrainingDayPage from './pages/TrainingDayPage'
import ProgressPage from './pages/ProgressPage'
import RewardsPage from './pages/RewardsPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import CacheCleanerPage from './pages/CacheCleanerPage'

// 导入上下文组件
import { UserProvider } from './contexts/UserContext'
import { TrainingProvider } from './contexts/TrainingContext'
import { TrainingPlanProvider } from './contexts/TrainingPlanContext'
import { RewardProvider } from './contexts/RewardContext'

// PIN码保护组件
import PinProtection from './components/common/PinProtection'
import PrivateRoute from './components/PrivateRoute'

// 导入更新提示组件
import UpdatePrompt from './components/common/UpdatePrompt'

// 导入版本显示组件
import VersionDisplay from './components/common/VersionDisplay'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // 检查是否设置了PIN码
    const hasPin = localStorage.getItem('bounceup_pin') !== null;
    
    // 如果没有设置PIN码，则直接认为已验证
    if (!hasPin) {
      setIsAuthenticated(true);
    } else {
      // 检查是否在当前会话中已验证
      const isAuth = sessionStorage.getItem('bounceup_authenticated') === 'true';
      setIsAuthenticated(isAuth);
    }
    
    setIsLoading(false);
  }, []);
  
  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('bounceup_authenticated', 'true');
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">加载中...</div>;
  }
  
  if (!isAuthenticated) {
    return <PinProtection onAuthenticate={handleAuthenticate} />;
  }

  return (
    <BrowserRouter>
      <UserProvider>
        <TrainingProvider>
          <TrainingPlanProvider>
            <RewardProvider>
              <UpdatePrompt />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/clean-cache" element={<CacheCleanerPage />} />
                
                <Route path="/" element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }>
                  <Route index element={<HomePage />} />
                  <Route path="training" element={<TrainingSelectPage />} />
                  <Route path="training/:id" element={<TrainingPage />} />
                  <Route path="training-plan" element={<TrainingPlanPage />} />
                  <Route path="training-day/:id" element={<TrainingDayPage />} />
                  <Route path="training-day/review/:id" element={<TrainingDayPage review={true} />} />
                  <Route path="progress" element={<ProgressPage />} />
                  <Route path="rewards" element={<RewardsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
                
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
              
              <VersionDisplay />
            </RewardProvider>
          </TrainingPlanProvider>
        </TrainingProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App