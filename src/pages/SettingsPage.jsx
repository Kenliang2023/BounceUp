import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const SettingsPage = () => {
  const { user, updateProfile, updatePreferences } = useUser();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [age, setAge] = useState(8);
  const [favoriteColor, setFavoriteColor] = useState('blue');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [currentPin, setCurrentPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);
  const [pinSaved, setPinSaved] = useState(false);
  
  useEffect(() => {
    // 初始化表单数据
    if (user) {
      setName(user.name || '');
      setAge(user.age || 8);
      setFavoriteColor(user.preferences?.favoriteColor || 'blue');
    }
  }, [user]);
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    updateProfile({
      name,
      age
    });
    
    updatePreferences({
      favoriteColor
    });
    
    setProfileSaved(true);
    
    // 3秒后隐藏成功提示
    setTimeout(() => {
      setProfileSaved(false);
    }, 3000);
  };
  
  const handlePinSubmit = (e) => {
    e.preventDefault();
    
    // 检查是否设置了PIN码
    const storedPin = localStorage.getItem('bounceup_pin');
    
    // 如果已设置PIN码，则需要先验证当前PIN码
    if (storedPin !== null) {
      if (currentPin !== storedPin) {
        setPinError('当前PIN码错误');
        return;
      }
    }
    
    // 验证新PIN码
    if (pin.length < 4) {
      setPinError('PIN码至少需要4位数字');
      return;
    }
    
    if (pin !== confirmPin) {
      setPinError('两次输入的PIN码不一致');
      return;
    }
    
    // 保存新PIN码
    localStorage.setItem('bounceup_pin', pin);
    setPinError('');
    setPinSaved(true);
    
    // 清空输入框
    setCurrentPin('');
    setPin('');
    setConfirmPin('');
    
    // 3秒后隐藏成功提示
    setTimeout(() => {
      setPinSaved(false);
    }, 3000);
  };
  
  const handleExportData = () => {
    // 收集所有存储的数据
    const exportData = {
      user: JSON.parse(localStorage.getItem('bounceup_user') || '{}'),
      training: JSON.parse(localStorage.getItem('bounceup_training') || '{}'),
      rewards: JSON.parse(localStorage.getItem('bounceup_rewards') || '{}')
    };
    
    // 创建数据URL
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    // 创建下载链接
    const exportFileDefaultName = `bounceup_backup_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">设置</h1>
      </div>
      
      {/* 个人资料设置 */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">个人资料</h2>
        <form onSubmit={handleProfileSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              名字
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="请输入你的名字"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              年龄
            </label>
            <input
              type="number"
              min="5"
              max="12"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="form-input"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              喜欢的颜色
            </label>
            <select
              value={favoriteColor}
              onChange={(e) => setFavoriteColor(e.target.value)}
              className="form-input"
            >
              <option value="red">红色</option>
              <option value="blue">蓝色</option>
              <option value="green">绿色</option>
              <option value="purple">紫色</option>
              <option value="orange">橙色</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary w-full">
            保存个人资料
          </button>
          
          {profileSaved && (
            <div className="mt-2 p-2 bg-green-100 text-green-700 rounded text-sm text-center">
              个人资料已保存！
            </div>
          )}
        </form>
      </div>
      
      {/* PIN码设置 */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">安全设置</h2>
        <form onSubmit={handlePinSubmit}>
          {localStorage.getItem('bounceup_pin') !== null && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                当前PIN码
              </label>
              <input
                type="password"
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                className="form-input"
                placeholder="请输入当前PIN码"
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {localStorage.getItem('bounceup_pin') !== null ? '新PIN码' : 'PIN码'} (至少4位数字)
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="form-input"
              placeholder="请输入PIN码"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              确认PIN码
            </label>
            <input
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="form-input"
              placeholder="再次输入PIN码"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
          
          {pinError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm text-center">
              {pinError}
            </div>
          )}
          
          <button type="submit" className="btn btn-primary w-full">
            {localStorage.getItem('bounceup_pin') !== null ? '更新PIN码' : '设置PIN码'}
          </button>
          
          {pinSaved && (
            <div className="mt-2 p-2 bg-green-100 text-green-700 rounded text-sm text-center">
              PIN码已更新！
            </div>
          )}
        </form>
      </div>
      
      {/* 数据管理 */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">数据管理</h2>
        <button 
          onClick={handleExportData} 
          className="btn btn-secondary w-full mb-4"
        >
          导出数据备份
        </button>
        
        <p className="text-sm text-gray-600 mt-2">
          导出的数据文件可用于备份或迁移到其他设备。
        </p>
      </div>
      
      {/* 关于 */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">关于 BounceUp</h2>
        <p className="text-sm text-gray-600 mb-1">版本：0.1.0</p>
        <p className="text-sm text-gray-600">
          BounceUp 是一款专为儿童设计的篮球训练助手应用，旨在通过科学、有趣的方式提升篮球技能。
        </p>
      </div>
    </div>
  );
};

export default SettingsPage; 