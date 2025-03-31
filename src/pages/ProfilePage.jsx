import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import DataManagement from '../components/profile/DataManagement';
import { clearCacheAndReload } from '../utils/versionCheck';

const ProfilePage = () => {
  const { user, updateUser, logout, resetAllData } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [age, setAge] = useState(user.age || '');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const navigate = useNavigate();
  
  const handleEditToggle = () => {
    if (isEditing) {
      // 取消编辑，重置表单
      setName(user.name || '');
      setAge(user.age || '');
      setError('');
    }
    setIsEditing(!isEditing);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('姓名不能为空');
      return;
    }
    
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 4 || ageNum > 15) {
      setError('年龄必须在4-15岁之间');
      return;
    }
    
    try {
      // 更新用户信息
      updateUser({
        ...user,
        name,
        age: ageNum
      });
      
      setIsEditing(false);
      setError('');
      setSuccessMsg('信息更新成功！');
      
      // 3秒后清除成功消息
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError('更新信息失败');
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleResetData = () => {
    resetAllData();
    setShowResetConfirm(false);
    navigate('/login');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">个人资料</h1>
        {!isEditing && (
          <button 
            onClick={handleEditToggle}
            className="btn-secondary text-sm"
          >
            编辑资料
          </button>
        )}
      </div>
      
      {/* 个人信息卡片 */}
      <div className="card">
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        
        {successMsg && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-sm">
            {successMsg}
          </div>
        )}
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                姓名
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                年龄
              </label>
              <input
                id="age"
                type="number"
                min="4"
                max="15"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
              <p className="text-xs text-gray-500 mt-1">年龄范围: 4-15岁</p>
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button 
                type="button"
                onClick={handleEditToggle}
                className="btn-outline"
              >
                取消
              </button>
              <button 
                type="submit"
                className="btn-primary"
              >
                保存
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-600">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span>{user.name?.charAt(0).toUpperCase() || '?'}</span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-600">姓名</div>
                <div className="font-medium">{user.name || '未设置'}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600">年龄</div>
                <div className="font-medium">{user.age ? `${user.age}岁` : '未设置'}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600">当前等级</div>
                <div className="font-medium">{user.level?.name || '新手球员'}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600">星星总数</div>
                <div className="font-medium flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span>{user.totalStars || 0}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 数据管理 */}
      <div className="card">
        <DataManagement />
      </div>
      
      {/* 应用设置 */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">应用设置</h2>
        
        <div className="space-y-4">
          <div>
            <button 
              onClick={handleLogout}
              className="w-full text-left flex justify-between items-center py-2 text-red-600"
            >
              <span>退出登录</span>
              <span>→</span>
            </button>
          </div>
          
          <div>
            <button 
              onClick={() => setShowResetConfirm(true)}
              className="w-full text-left flex justify-between items-center py-2 text-red-600"
            >
              <span>重置所有数据</span>
              <span>→</span>
            </button>
          </div>
          
          <div>
            <button 
              onClick={clearCacheAndReload}
              className="w-full text-left flex justify-between items-center py-2 text-blue-600"
            >
              <span>刷新应用缓存</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* 关于应用 */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">关于应用</h2>
        
        <div className="space-y-2">
          <div>
            <div className="text-sm text-gray-600">应用版本</div>
            <div className="font-medium">v0.1.1</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600">开发者</div>
            <div className="font-medium">专为ADHD儿童设计</div>
          </div>
        </div>
      </div>
      
      {/* 重置确认对话框 */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-3">确认重置</h3>
            <p className="text-gray-700 mb-5">
              重置将清除所有数据，包括训练记录、星星和奖励。此操作不可撤销。
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="btn-outline"
              >
                取消
              </button>
              <button 
                onClick={handleResetData}
                className="btn bg-red-600 text-white hover:bg-red-700"
              >
                确认重置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;