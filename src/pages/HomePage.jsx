import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useTraining } from '../contexts/TrainingContext';
import { useTrainingPlan } from '../contexts/TrainingPlanContext';
import { useReward } from '../contexts/RewardContext';
import { getCurrentLevelByStars } from '../data/trainingPlan';
import AutoPlanButton from '../components/training/AutoPlanButton';

const HomePage = () => {
  const { user } = useUser();
  const { skillProgress, getRecentTrainingHistory } = useTraining();
  const {
    nextTrainingDay,
    currentPlan,
    getRecommendedTrainingDates,
    getCurrentProgress,
    getTodayTrainings,
    createCustomTrainingDay,
    trainingDurationOptions,
  } = useTrainingPlan();
  const { getNextLevel } = useReward();

  const [todayTrainings, setTodayTrainings] = useState([]);
  const [showQuickTraining, setShowQuickTraining] = useState(false);
  const [quickTrainingDuration, setQuickTrainingDuration] = useState(15);

  // 获取今日训练
  useEffect(() => {
    setTodayTrainings(getTodayTrainings());
  }, [getTodayTrainings]);

  const nextLevel = getNextLevel();
  const recentTrainings = getRecentTrainingHistory(1);
  const recentTraining = recentTrainings.length > 0 ? recentTrainings[0] : null;
  const trainingProgress = getCurrentProgress();

  // 获取推荐的下一个训练日期
  const recommendedDates = getRecommendedTrainingDates(new Date(), 1);
  const nextTrainingDate = recommendedDates.length > 0 ? recommendedDates[0] : null;

  // 获取当前等级
  const currentLevel = getCurrentLevelByStars(user?.totalStars || 0);

  // 创建快速训练
  const handleCreateQuickTraining = () => {
    // 创建自定义训练
    const newTraining = createCustomTrainingDay(quickTrainingDuration, new Date());

    // 关闭弹窗
    setShowQuickTraining(false);

    // 跳转到训练页面
    if (newTraining) {
      window.location.href = `/training-day/${newTraining.id}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* 用户欢迎区 */}
      <div className="card bg-primary bg-opacity-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">
              {user.name ? `你好，${user.name}！` : '欢迎回来！'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">今天是继续你的篮球之旅的好时机！</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">⭐</span>
              <span className="font-bold">{user.totalStars || 0}</span>
            </div>
            <span className="text-xs text-gray-600 mt-1">{currentLevel?.name || '新手球员'}</span>
          </div>
        </div>

        {nextLevel && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>距离{nextLevel.name}还需</span>
              <span>{Math.max(0, nextLevel.requiredStars - user.totalStars)}颗星星</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-secondary rounded-full h-2"
                style={{
                  width: `${Math.min(100, ((user.totalStars - currentLevel.requiredStars) / (nextLevel.requiredStars - currentLevel.requiredStars)) * 100)}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* 今日训练 */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">今日训练</h2>
          <button onClick={() => setShowQuickTraining(true)} className="text-primary text-sm">
            快速训练
          </button>
        </div>

        {todayTrainings.length > 0 ? (
          todayTrainings.map(training => (
            <Link
              key={training.id}
              to={`/training-day/${training.id}`}
              className="block border rounded-lg p-3 mb-3 last:mb-0 hover:border-primary"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{training.title}</div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">{training.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center">
                    <span className="text-xs bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5">
                      ⭐ {training.starReward}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{training.duration}分钟</span>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-end">
                <span className="text-primary text-sm">开始训练 →</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center p-6">
            <div className="text-3xl mb-2">🏀</div>
            <p className="text-gray-600 text-sm mb-3">今天还没有安排训练</p>
            <div className="flex justify-center space-x-2">
              <button onClick={() => setShowQuickTraining(true)} className="btn btn-sm btn-outline">
                快速训练
              </button>
              <Link to="/training-plan" className="btn btn-sm btn-primary">
                查看训练计划
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 等级进度卡片 */}
      <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex items-center mb-3">
          <span
            className={`text-2xl bg-${currentLevel?.color}-100 text-${currentLevel?.color}-600 p-2 rounded-full mr-3`}
          >
            {currentLevel?.icon}
          </span>
          <div>
            <h3 className="font-semibold">{currentLevel?.name}等级</h3>
            <p className="text-sm text-gray-600">{currentLevel?.description}</p>
          </div>
        </div>

        {currentLevel?.reward && (
          <div className="bg-white rounded-lg p-3 mb-3">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🎁</span>
              <div>
                <div className="font-medium text-sm">{currentLevel.reward.name}</div>
                <p className="text-xs text-gray-500">{currentLevel.reward.description}</p>
              </div>
            </div>
          </div>
        )}

        <Link to="/training-plan" className="btn btn-primary w-full">
          查看完整训练计划
        </Link>
      </div>

      {/* 快速操作区 */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/progress"
          className="card bg-gradient-to-br from-green-500 to-green-600 text-white p-4 flex flex-col items-center justify-center text-center"
        >
          <div className="text-3xl mb-2">📊</div>
          <div className="font-bold">训练进度</div>
          <div className="text-xs mt-1">查看你的技能提升</div>
        </Link>

        <Link
          to="/rewards"
          className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 flex flex-col items-center justify-center text-center"
        >
          <div className="text-3xl mb-2">🎁</div>
          <div className="font-bold">奖励中心</div>
          <div className="text-xs mt-1">用星星兑换奖励</div>
        </Link>
      </div>

      {/* 训练计划进度 */}
      {currentPlan && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">训练计划进度</h2>
            <div className="flex items-center space-x-2">
              <AutoPlanButton className="px-3 py-1 text-sm" buttonText="智能计划" />
              <Link to="/training-plan" className="text-primary text-sm">
                查看详情
              </Link>
            </div>
          </div>

          <div>
            <div className="font-medium">{currentPlan.levelName}</div>
            <p className="text-sm text-gray-600 mt-1 mb-3">{currentPlan.description}</p>

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
                    day: 'numeric',
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
                {recentTraining.category === 'dribbling'
                  ? '运球'
                  : recentTraining.category === 'shooting'
                    ? '投篮'
                    : recentTraining.category === 'passing'
                      ? '传球'
                      : recentTraining.category === 'movement'
                        ? '移动'
                        : '其他'}
              </span>

              <span className="text-xs ml-2 text-gray-600">
                获得 <span className="text-yellow-500">⭐</span> {recentTraining.earnedStars}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-gray-600 text-sm">你还没有完成任何训练</div>
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

      {/* 快速训练弹窗 */}
      {showQuickTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">快速训练</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">选择训练时长</label>
              <div className="grid grid-cols-3 gap-2">
                {trainingDurationOptions.slice(0, 6).map(option => (
                  <button
                    key={option.value}
                    onClick={() => setQuickTrainingDuration(option.value)}
                    className={`p-2 border rounded-lg text-center ${
                      quickTrainingDuration === option.value
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <p className="text-sm text-gray-600 mt-3">
                系统将根据你当前的等级和选择的时长，立即创建今日训练。
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowQuickTraining(false)}
                className="btn btn-outline flex-1"
              >
                取消
              </button>
              <button onClick={handleCreateQuickTraining} className="btn btn-primary flex-1">
                立即开始训练
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
