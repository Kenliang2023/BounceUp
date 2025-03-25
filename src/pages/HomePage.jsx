import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useTraining } from '../contexts/TrainingContext';
import { useReward } from '../contexts/RewardContext';

const HomePage = () => {
  const { user } = useUser();
  const { skillProgress, trainingHistory, getRecommendedTrainings } = useTraining();
  const { getNextLevel } = useReward();
  
  const nextLevel = getNextLevel();
  const recentTraining = trainingHistory.length > 0 ? trainingHistory[0] : null;
  const recommendedTrainings = getRecommendedTrainings(2);
  
  return (
    <div className="space-y-6">
      {/* 用户欢迎区 */}
      <div className="card bg-primary bg-opacity-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{user.name ? `你好，${user.name}！` : '欢迎回来！'}</h2>
            <p className="text-sm text-gray-600 mt-1">
              今天是继续你的篮球之旅的好时机！
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">⭐</span>
              <span className="font-bold">{user.totalStars || 0}</span>
            </div>
            <span className="text-xs text-gray-600 mt-1">
              {user.level?.name || '新手球员'}
            </span>
          </div>
        </div>
        
        {nextLevel && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>距离{nextLevel.name}还需</span>
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
      
      {/* 快速操作区 */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/training" className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 flex flex-col items-center justify-center text-center">
          <div className="text-3xl mb-2">🏀</div>
          <div className="font-bold">开始训练</div>
          <div className="text-xs mt-1">提升你的篮球技能</div>
        </Link>
        
        <Link to="/rewards" className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 flex flex-col items-center justify-center text-center">
          <div className="text-3xl mb-2">🎁</div>
          <div className="font-bold">奖励中心</div>
          <div className="text-xs mt-1">用星星兑换奖励</div>
        </Link>
      </div>
      
      {/* 技能进度概览 */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">技能进度</h2>
          <Link to="/progress" className="text-primary text-sm">
            查看详情
          </Link>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>运球</span>
              <span>{skillProgress.dribbling}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ width: `${skillProgress.dribbling}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>投篮</span>
              <span>{skillProgress.shooting}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ width: `${skillProgress.shooting}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 最近训练 */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">最近训练</h2>
          <Link to="/progress" className="text-primary text-sm">
            查看历史
          </Link>
        </div>
        
        {recentTraining ? (
          <div className="border rounded-lg p-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{recentTraining.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(recentTraining.date).toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-primary font-bold">{recentTraining.score}</span>
                <span className="text-xs text-gray-500 ml-1">/ 5</span>
              </div>
            </div>
            
            <div className="mt-1">
              <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5">
                {recentTraining.category === 'dribbling' ? '运球' : 
                 recentTraining.category === 'shooting' ? '投篮' : 
                 recentTraining.category === 'passing' ? '传球' : 
                 recentTraining.category === 'movement' ? '移动' : '其他'}
              </span>
              
              <span className="text-xs ml-2 text-gray-600">
                获得 <span className="text-yellow-500">⭐</span> {recentTraining.earnedStars}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-gray-600 text-sm">
              你还没有完成任何训练
            </div>
            <Link to="/training" className="btn-primary text-sm mt-2 inline-block">
              开始第一次训练
            </Link>
          </div>
        )}
      </div>
      
      {/* 推荐训练 */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">推荐训练</h2>
          <Link to="/training" className="text-primary text-sm">
            查看全部
          </Link>
        </div>
        
        {recommendedTrainings.length > 0 ? (
          <div className="space-y-3">
            {recommendedTrainings.map(training => (
              <Link 
                key={training.id}
                to={`/training/${training.id}`}
                className="border rounded-lg p-3 block hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{training.title}</div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 mr-2">
                        {training.level === 1 ? '初级' : 
                         training.level === 2 ? '中级' : 
                         training.level === 3 ? '高级' : ''}
                      </span>
                      <span className="text-xs text-gray-600">
                        {training.duration}分钟
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center p-4">
            <div className="text-gray-600 text-sm">
              正在为你定制训练计划...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; 