import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useReward } from '../contexts/RewardContext';
import RewardManagerButton from '../components/reward/RewardManagerButton';
import RedemptionHistoryButton from '../components/reward/RedemptionHistoryButton';

const RewardsPage = () => {
  const { user } = useUser();
  const { 
    rewards, 
    redeemReward, 
    getNextLevel, 
    redeemedRewards,
    categoryOptions,
    getRewardsByCategory,
    getCategoryLabel
  } = useReward();
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const nextLevel = getNextLevel();
  
  const handleRewardClick = (reward) => {
    setSelectedReward(reward);
    setError('');
  };
  
  const handleRedeem = () => {
    if (!selectedReward) return;
    
    try {
      redeemReward(selectedReward.id);
      setRedeemSuccess(true);
      
      // 3秒后重置
      setTimeout(() => {
        setRedeemSuccess(false);
        setSelectedReward(null);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">奖励中心</h1>
        <div className="flex space-x-2">
          <RedemptionHistoryButton className="px-3 py-1 text-sm border rounded hover:bg-gray-50" />
          <RewardManagerButton className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary-dark" />
        </div>
      </div>
      
      {/* 星星和等级 */}
      <div className="card bg-primary bg-opacity-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">当前等级</div>
            <div className="font-bold text-xl">{user.level?.name || '新手球员'}</div>
          </div>
          <div className="flex items-center">
            <div className="text-secondary text-2xl mr-1">⭐</div>
            <div className="font-bold text-xl">{user.totalStars}</div>
          </div>
        </div>
        
        {nextLevel && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>距离下一等级: {nextLevel.name}</span>
              <span>{Math.max(0, nextLevel.minStars - user.totalStars)}颗星星</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-secondary rounded-full h-2" 
                style={{ 
                  width: `${Math.min(100, (user.totalStars - user.level.minStars) / (nextLevel.minStars - user.level.minStars) * 100)}%` 
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      {/* 可兑换奖励 */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">可兑换奖励</h2>
        
        {/* 分类筛选 */}
        <div className="flex overflow-x-auto pb-2 mb-3">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap mr-2 ${
              activeCategory === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
          
          {categoryOptions.filter(c => c.value !== 'default').map(category => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap mr-2 ${
                activeCategory === category.value 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {getRewardsByCategory(activeCategory).length > 0 ? (
          <>
            <div className="space-y-4">
              {getRewardsByCategory(activeCategory).map((reward) => (
                <div 
                  key={reward.id}
                  className={`p-3 border rounded-lg cursor-pointer 
                    ${selectedReward?.id === reward.id ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200'}`}
                  onClick={() => handleRewardClick(reward)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{reward.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{reward.description}</div>
                      {reward.category && reward.category !== 'default' && (
                        <div className="mt-1">
                          <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                            {getCategoryLabel(reward.category)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                      <span className="text-secondary text-sm mr-1">⭐</span>
                      <span className="font-semibold">{reward.starCost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedReward && (
              <div className="mt-4">
                <button 
                  onClick={handleRedeem}
                  disabled={user.totalStars < selectedReward.starCost}
                  className={`btn w-full ${user.totalStars >= selectedReward.starCost ? 'btn-primary' : 'bg-gray-300 cursor-not-allowed text-gray-600'}`}
                >
                  {user.totalStars >= selectedReward.starCost 
                    ? `兑换 ${selectedReward.name}` 
                    : `还需要 ${selectedReward.starCost - user.totalStars} 颗星星`}
                </button>
                
                {error && (
                  <div className="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm text-center">
                    {error}
                  </div>
                )}
                
                {redeemSuccess && (
                  <div className="mt-2 p-2 bg-green-100 text-green-700 rounded text-sm text-center">
                    兑换成功！请找父亲领取奖励。
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-6">
            <div className="text-3xl mb-2">🎁</div>
            <div className="font-semibold">暂无可兑换奖励</div>
            <p className="text-sm text-gray-600 mt-1">
              完成更多训练获取星星，解锁奖励！
            </p>
          </div>
        )}
      </div>
      
      {/* 兑换历史 */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">兑换历史</h2>
        
        {redeemedRewards.length > 0 ? (
          <div className="space-y-3">
            {redeemedRewards.map((redemption) => (
              <div key={redemption.id} className="border-b pb-2 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div className="font-semibold">{redemption.rewardName}</div>
                  <div className="flex items-center">
                    <span className="text-secondary text-sm mr-1">⭐</span>
                    <span className="font-semibold">{redemption.cost}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(redemption.date).toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6">
            <div className="text-3xl mb-2">📜</div>
            <div className="font-semibold">暂无兑换记录</div>
            <p className="text-sm text-gray-600 mt-1">
              您兑换的奖励将显示在这里
            </p>
          </div>
        )}
      </div>
      
      {/* 成就系统占位 */}
      <div className="card bg-gradient-to-r from-purple-50 to-blue-50 p-6">
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl mb-3">🏆</div>
          <div className="font-semibold text-center">成就系统</div>
          <p className="text-sm text-gray-600 text-center mt-2 max-w-sm">
            即将推出更丰富的成就系统！完成特定挑战获得很酷的徽章和奖励。
          </p>
          <div className="mt-4 grid grid-cols-4 gap-3 w-full max-w-md">
            <div className="bg-gray-100 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center opacity-60">
              🏀
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center opacity-60">
              🔥
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center opacity-60">
              ⭐
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center opacity-60">
              💪
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs bg-yellow-100 text-yellow-800 rounded-full px-3 py-1">即将上线</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage; 