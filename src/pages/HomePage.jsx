import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useTraining } from '../contexts/TrainingContext';
import { useTrainingPlan } from '../contexts/TrainingPlanContext';
import { useReward } from '../contexts/RewardContext';

const HomePage = () => {
  const { user } = useUser();
  const { skillProgress, getRecentTrainingHistory } = useTraining();
  const { 
    nextTrainingDay, 
    currentPlan, 
    getRecommendedTrainingDates, 
    getCurrentProgress 
  } = useTrainingPlan();
  const { getNextLevel } = useReward();
  
  const nextLevel = getNextLevel();
  const recentTrainings = getRecentTrainingHistory(1);
  const recentTraining = recentTrainings.length > 0 ? recentTrainings[0] : null;
  const trainingProgress = getCurrentProgress();
  
  // 获取推荐的下一个训练日期
  const recommendedDates = getRecommendedTrainingDates(new Date(), 1);
  const nextTrainingDate = recommendedDates.length > 0 ? recommendedDates[0] : null;
  
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
      
      {/* 下一个训练提示 */}
      {nextTrainingDay && (
        <div className="card bg-primary bg-opacity-5">
          <h2 className="font-semibold mb-2">下一个训练</h2>
          <div className="flex justify-between">
            <div>
              <div className="font-medium">{nextTrainingDay.title}</div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {nextTrainingDay.description}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <span className="text-xs bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5 flex items-center">
                  <span>⭐</span>
                  <span className="ml-1">{nextTrainingDay.starReward}</span>
                </span>
              </div>
              <span className="text-xs text-gray-600 mt-1">
                {nextTrainingDay.duration}分钟
              </span>
            </div>
          </div>
          
          {nextTrainingDay.scheduledDate ? (
            <div className="mt-3 flex justify-between items-center">
              <div className="text-sm">
                <span className="font-medium">已安排：</span>
                <span>{new Date(nextTrainingDay.scheduledDate).toLocaleDateString('zh-CN', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <Link 
                to={`/training-day/${nextTrainingDay.id}`}
                className="btn btn-primary btn-sm"
              >
                开始训练
              </Link>
            </div>
          ) : nextTrainingDate ? (
            <div className="mt-3">
              <Link 
                to="/training-plan"
                className="btn btn-primary w-full"
              >
                安排在 {nextTrainingDate.toLocaleDateString('zh-CN', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </Link>
            </div>
          ) : (
            <div className="mt-3">
              <Link 
                to="/training-plan"
                className="btn btn-primary w-full"
              >
                安排训练
              </Link>
            </div>
          )}
        </div>
      )}
      
      {/* 快速操作区 */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/training-plan" className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 flex flex-col items-center justify-center text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="font-bold">训练计划</div>
          <div className="text-xs mt-1">按计划提升你的技能</div>
        </Link>
        
        <Link to="/rewards" className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 flex flex-col items-center justify-center text-center">
          <div className="text-3xl mb-2">🎁</div>
          <div className="font-bold">奖励中心</div>
          <div className="text-xs mt-1">用星星兑换奖励</div>
        </Link>
      </div>
      
      {/* 训练计划进度 */}
      {currentPlan && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">当前训练计划</h2>
            <Link to="/training-plan" className="text-primary text-sm">
              查看详情
            </Link>
          </div>
          
          <div>
            <div className="font-medium">{currentPlan.levelName}</div>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              {currentPlan.description}
            </p>
            
            <div className="flex justify-between text-sm mb-1">
              <span>总体进度</span>
              <span>{trainingProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary rounded-full h-2.5" 
                style={{ width: `${trainingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
      
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
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>传球</span>
              <span>{skillProgress.passing}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ width: `${skillProgress.passing}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>移动</span>
              <span>{skillProgress.movement}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ width: `${skillProgress.movement}%` }}
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
            <Link to="/training-plan" className="btn-primary text-sm mt-2 inline-block">
              开始第一次训练
            </Link>
          </div>
        )}
      </div>
      
      {/* 自由训练入口 */}
      <div className="card bg-gray-50">
        <h2 className="font-semibold mb-3">自由训练</h2>
        <p className="text-sm text-gray-600 mb-4">
          想要针对特定技能进行训练？尝试自由训练模式，按自己的节奏练习。
        </p>
        <Link to="/training" className="btn btn-outline w-full">
          浏览所有训练项目
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
