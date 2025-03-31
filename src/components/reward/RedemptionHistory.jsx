import { useState } from 'react';
import { useReward } from '../../contexts/RewardContext';

/**
 * 奖励兑换历史记录组件
 * 显示所有已兑换的奖励的详细历史记录
 */
const RedemptionHistory = ({ onClose }) => {
  const { redeemedRewards } = useReward();
  const [filter, setFilter] = useState('all'); // 'all', 'week', 'month'
  
  // 根据筛选条件过滤记录
  const getFilteredRedemptions = () => {
    if (filter === 'all') {
      return redeemedRewards;
    }
    
    const now = new Date();
    const filterDate = new Date();
    
    if (filter === 'week') {
      filterDate.setDate(now.getDate() - 7);
    } else if (filter === 'month') {
      filterDate.setMonth(now.getMonth() - 1);
    }
    
    return redeemedRewards.filter(redemption => {
      const redemptionDate = new Date(redemption.date);
      return redemptionDate >= filterDate;
    });
  };
  
  // 按月份对历史记录进行分组
  const groupedRedemptions = () => {
    const filtered = getFilteredRedemptions();
    const grouped = {};
    
    filtered.forEach(redemption => {
      const date = new Date(redemption.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          month: new Date(date.getFullYear(), date.getMonth(), 1),
          items: []
        };
      }
      
      grouped[monthKey].items.push(redemption);
    });
    
    // 转换为数组并按月份排序
    return Object.values(grouped).sort((a, b) => b.month - a.month);
  };
  
  // 计算统计数据
  const getStatistics = () => {
    const filtered = getFilteredRedemptions();
    
    return {
      totalRedemptions: filtered.length,
      totalStars: filtered.reduce((sum, r) => sum + r.cost, 0),
      averageCost: filtered.length > 0 
        ? Math.round(filtered.reduce((sum, r) => sum + r.cost, 0) / filtered.length) 
        : 0
    };
  };
  
  const stats = getStatistics();
  const groups = groupedRedemptions();
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 max-w-lg w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">兑换历史记录</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* 统计数据 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-xs text-gray-600">兑换总数</div>
          <div className="text-lg font-bold text-blue-700">{stats.totalRedemptions}</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <div className="text-xs text-gray-600">星星总数</div>
          <div className="text-lg font-bold text-yellow-700">⭐ {stats.totalStars}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-xs text-gray-600">平均花费</div>
          <div className="text-lg font-bold text-green-700">{stats.averageCost}</div>
        </div>
      </div>
      
      {/* 筛选条件 */}
      <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
        <button 
          onClick={() => setFilter('all')}
          className={`flex-1 py-1 text-sm text-center rounded ${
            filter === 'all' ? 'bg-white shadow' : 'hover:bg-gray-200'
          }`}
        >
          全部
        </button>
        <button 
          onClick={() => setFilter('month')}
          className={`flex-1 py-1 text-sm text-center rounded ${
            filter === 'month' ? 'bg-white shadow' : 'hover:bg-gray-200'
          }`}
        >
          最近一个月
        </button>
        <button 
          onClick={() => setFilter('week')}
          className={`flex-1 py-1 text-sm text-center rounded ${
            filter === 'week' ? 'bg-white shadow' : 'hover:bg-gray-200'
          }`}
        >
          最近一周
        </button>
      </div>
      
      {/* 历史记录列表 */}
      <div className="max-h-96 overflow-y-auto">
        {groups.length > 0 ? (
          groups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4 last:mb-0">
              <div className="text-sm font-medium text-gray-500 mb-2">
                {group.month.toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long'
                })}
              </div>
              
              <div className="space-y-2">
                {group.items.map((redemption) => (
                  <div key={redemption.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{redemption.rewardName}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(redemption.date).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-yellow-800">
                        <span className="text-yellow-600 mr-1">⭐</span>
                        <span className="text-sm font-semibold">{redemption.cost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">📜</div>
            <div className="text-gray-500">没有兑换记录</div>
          </div>
        )}
      </div>
      
      <div className="text-center mt-6">
        <button 
          onClick={onClose}
          className="px-6 py-2 bg-primary text-white rounded-lg"
        >
          关闭
        </button>
      </div>
    </div>
  );
};

export default RedemptionHistory;