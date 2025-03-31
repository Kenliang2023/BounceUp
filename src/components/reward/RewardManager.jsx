import { useState, useEffect } from 'react';
import { useReward } from '../../contexts/RewardContext';

/**
 * 奖励管理组件
 * 允许父母添加、编辑和管理奖励项目
 */
const RewardManager = ({ onClose }) => {
  const { allRewards, addReward, updateReward } = useReward();
  
  const [rewards, setRewards] = useState([]);
  const [editingReward, setEditingReward] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // 表单字段
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [starCost, setStarCost] = useState(10);
  const [category, setCategory] = useState('default');
  const [priority, setPriority] = useState('medium');
  const [available, setAvailable] = useState(true);
  
  // 初始化奖励列表
  useEffect(() => {
    setRewards(allRewards);
  }, [allRewards]);
  
  // 奖励类别选项
  const categoryOptions = [
    { value: 'default', label: '默认' },
    { value: 'screen', label: '屏幕时间' },
    { value: 'activity', label: '活动' },
    { value: 'item', label: '物品' },
    { value: 'special', label: '特别奖励' }
  ];
  
  // 优先级选项
  const priorityOptions = [
    { value: 'low', label: '低', color: 'blue' },
    { value: 'medium', label: '中', color: 'green' },
    { value: 'high', label: '高', color: 'orange' },
    { value: 'top', label: '最高', color: 'red' }
  ];
  
  // 重置编辑表单
  const resetForm = () => {
    setName('');
    setDescription('');
    setStarCost(10);
    setCategory('default');
    setPriority('medium');
    setAvailable(true);
    setEditingReward(null);
    setIsAdding(false);
  };
  
  // 开始添加新奖励
  const handleAddNew = () => {
    resetForm();
    setIsAdding(true);
  };
  
  // 开始编辑奖励
  const handleEdit = (reward) => {
    setEditingReward(reward);
    setName(reward.name);
    setDescription(reward.description);
    setStarCost(reward.starCost);
    setCategory(reward.category || 'default');
    setPriority(reward.priority || 'medium');
    setAvailable(reward.available);
    setIsAdding(false);
  };
  
  // 保存奖励
  const handleSave = () => {
    if (!name.trim()) {
      alert('奖励名称不能为空');
      return;
    }
    
    const rewardData = {
      name,
      description,
      starCost: Number(starCost),
      category,
      priority,
      available
    };
    
    if (isAdding) {
      // 添加新奖励
      addReward(rewardData);
    } else if (editingReward) {
      // 更新现有奖励
      updateReward(editingReward.id, rewardData);
    }
    
    resetForm();
  };
  
  // 切换奖励可用状态
  const handleToggleAvailability = (reward) => {
    updateReward(reward.id, { available: !reward.available });
  };
  
  // 取消编辑
  const handleCancel = () => {
    resetForm();
  };
  
  // 获取优先级颜色
  const getPriorityColor = (priorityValue) => {
    const option = priorityOptions.find(opt => opt.value === priorityValue);
    return option ? option.color : 'gray';
  };
  
  // 获取类别显示名称
  const getCategoryLabel = (categoryValue) => {
    const option = categoryOptions.find(opt => opt.value === categoryValue);
    return option ? option.label : '默认';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 max-w-lg w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">奖励管理</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* 奖励编辑表单 */}
      {(isAdding || editingReward) && (
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className="font-semibold mb-3">
            {isAdding ? '添加新奖励' : '编辑奖励'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                奖励名称
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
                placeholder="例如：额外30分钟游戏时间"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                描述
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
                placeholder="详细描述这个奖励..."
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  星星花费
                </label>
                <input
                  type="number"
                  min={1}
                  max={999}
                  value={starCost}
                  onChange={e => setStarCost(parseInt(e.target.value) || 1)}
                  className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  类别
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  优先级
                </label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center h-full pt-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={e => setAvailable(e.target.checked)}
                    className="mr-2 h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span>可兑换</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-4">
              <button 
                onClick={handleCancel}
                className="px-4 py-2 border rounded"
              >
                取消
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 奖励列表 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">奖励列表</h3>
          <button 
            onClick={handleAddNew}
            className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
          >
            添加奖励
          </button>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {rewards.map(reward => (
            <div 
              key={reward.id} 
              className={`p-3 border rounded flex justify-between items-start ${!reward.available && 'opacity-60'}`}
            >
              <div className="flex-1">
                <div className="font-medium flex items-center">
                  {reward.name}
                  {reward.category && reward.category !== 'default' && (
                    <span className="ml-2 text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
                      {getCategoryLabel(reward.category)}
                    </span>
                  )}
                  {reward.priority && reward.priority !== 'medium' && (
                    <span className={`ml-2 text-xs bg-${getPriorityColor(reward.priority)}-100 text-${getPriorityColor(reward.priority)}-800 rounded-full px-2 py-0.5`}>
                      {priorityOptions.find(o => o.value === reward.priority)?.label || '中'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {reward.description}
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-yellow-500">⭐</span>
                  <span className="text-sm ml-1">{reward.starCost}</span>
                </div>
              </div>
              
              <div className="flex items-center ml-4">
                <button 
                  onClick={() => handleEdit(reward)}
                  className="text-primary p-1"
                  title="编辑"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleToggleAvailability(reward)}
                  className={`p-1 ${reward.available ? 'text-green-500' : 'text-gray-400'}`}
                  title={reward.available ? '设为不可用' : '设为可用'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-6">
        <button 
          onClick={onClose}
          className="px-6 py-2 bg-primary text-white rounded-lg"
        >
          完成
        </button>
      </div>
    </div>
  );
};

export default RewardManager;