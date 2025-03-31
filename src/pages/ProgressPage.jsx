import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTraining } from '../contexts/TrainingContext';
import { useTrainingPlan } from '../contexts/TrainingPlanContext';
import { useUser } from '../contexts/UserContext';
import { getCurrentLevelByStars } from '../data/trainingPlan';
import TrainingCalendar from '../components/training/TrainingCalendar';

const ProgressPage = () => {
  const { skillProgress, trainingHistory } = useTraining();
  const { getTrainingStatsByDateRange, getCurrentProgress } = useTrainingPlan();
  const { user } = useUser();
  
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'skills', 'history', 'calendar'
  const [timeFrame, setTimeFrame] = useState('week'); // 'week', 'month', 'all'
  const [stats, setStats] = useState({ completedCount: 0, scheduledCount: 0, totalStars: 0 });
  const [planProgress, setPlanProgress] = useState(0);
  
  // 获取当前等级
  const currentLevel = getCurrentLevelByStars(user?.totalStars || 0);
  
  // 获取训练统计数据
  useEffect(() => {
    let startDate = new Date();
    let endDate = new Date();
    
    // 设置时间范围
    if (timeFrame === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (timeFrame === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else {
      // 全部时间
      startDate = new Date(2020, 0, 1);
    }
    
    const statsData = getTrainingStatsByDateRange(startDate, endDate);
    setStats(statsData);
  }, [timeFrame, getTrainingStatsByDateRange]);
  
  // 获取计划进度
  useEffect(() => {
    setPlanProgress(getCurrentProgress());
  }, [getCurrentProgress]);
  
  // 格式化时间显示
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // 渲染总览视图
  const renderOverview = () => (
    <div className="space-y-6">
      {/* 等级进度卡片 */}
      <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex items-center mb-4">
          <span className={`text-2xl bg-${currentLevel?.color}-100 text-${currentLevel?.color}-600 p-2 rounded-full mr-3`}>
            {currentLevel?.icon}
          </span>
          <div>
            <h3 className="font-semibold">{currentLevel?.name}等级</h3>
            <div className="text-xs text-gray-600 mt-1">
              累计获得 <span className="text-yellow-500 font-medium">{user.totalStars}</span> 颗星星
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>等级进度</span>
            <span>{planProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary rounded-full h-2.5" 
              style={{ width: `${planProgress}%` }}
            ></div>
          </div>
        </div>
        
        {currentLevel?.reward && (
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🎁</span>
              <div>
                <div className="font-medium text-sm">{currentLevel.reward.name}</div>
                <p className="text-xs text-gray-500">{currentLevel.reward.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 训练统计 */}
      <div className="card">
        <h3 className="font-semibold mb-3">训练统计</h3>
        
        {/* 时间范围选择器 */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setTimeFrame('week')}
            className={`px-3 py-1 rounded text-sm ${
              timeFrame === 'week'
              ? 'bg-primary text-white'
              : 'bg-gray-100'
            }`}
          >
            近7天
          </button>
          <button
            onClick={() => setTimeFrame('month')}
            className={`px-3 py-1 rounded text-sm ${
              timeFrame === 'month'
              ? 'bg-primary text-white'
              : 'bg-gray-100'
            }`}
          >
            近30天
          </button>
          <button
            onClick={() => setTimeFrame('all')}
            className={`px-3 py-1 rounded text-sm ${
              timeFrame === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100'
            }`}
          >
            全部
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.completedCount}</div>
            <div className="text-xs text-gray-600">完成训练</div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.totalStars}</div>
            <div className="text-xs text-gray-600">获得星星</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.scheduledCount}</div>
            <div className="text-xs text-gray-600">待完成训练</div>
          </div>
        </div>
      </div>
      
      {/* 技能进度概览 */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">技能进度</h3>
          <button
            onClick={() => setViewMode('skills')}
            className="text-primary text-sm"
          >
            查看详情
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>运球</span>
              <span>{skillProgress.dribbling}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 rounded-full h-2" 
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
                className="bg-red-500 rounded-full h-2" 
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
                className="bg-green-500 rounded-full h-2" 
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
                className="bg-orange-500 rounded-full h-2" 
                style={{ width: `${skillProgress.movement}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 最近训练 */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">最近训练</h3>
          <button
            onClick={() => setViewMode('history')}
            className="text-primary text-sm"
          >
            查看全部
          </button>
        </div>
        
        {trainingHistory.length > 0 ? (
          <div className="space-y-3">
            {trainingHistory.slice(0, 3).map((record) => (
              <div key={record.recordId} className="border-b pb-2 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{record.title || '训练记录'}</div>
                    <div className="text-xs text-gray-500">
                      {formatDate(record.date)}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary font-bold">{record.score}</span>
                    <span className="text-xs text-gray-500 ml-1">/ 5</span>
                  </div>
                </div>
                
                <div className="mt-1 flex items-center">
                  <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5">
                    {record.category === 'dribbling' ? '运球' : 
                     record.category === 'shooting' ? '投篮' : 
                     record.category === 'passing' ? '传球' : 
                     record.category === 'movement' ? '移动' : '其他'}
                  </span>
                  
                  <span className="text-xs ml-2 text-gray-600">
                    获得 <span className="text-yellow-500">⭐</span> {record.earnedStars}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4">
            <div className="text-xl mb-2">📊</div>
            <div className="text-gray-600 text-sm">暂无训练记录</div>
          </div>
        )}
      </div>
      
      {/* 训练日历 */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">训练日历</h3>
          <button
            onClick={() => setViewMode('calendar')}
            className="text-primary text-sm"
          >
            查看完整日历
          </button>
        </div>
        
        <Link to="/training-plan" className="btn btn-primary w-full">
          管理训练计划
        </Link>
      </div>
    </div>
  );
  
  // 渲染技能进度详情
  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">技能进度</h2>
        <button
          onClick={() => setViewMode('overview')}
          className="text-primary"
        >
          返回总览
        </button>
      </div>
      
      {/* 运球技能 */}
      <div className="card">
        <div className="flex items-center mb-3">
          <span className="text-xl bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
            🏀
          </span>
          <h3 className="font-semibold">运球技能</h3>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>技能熟练度</span>
            <span>{skillProgress.dribbling}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 rounded-full h-2.5" 
              style={{ width: `${skillProgress.dribbling}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="font-medium mb-1">运球技能评估</div>
          <p className="text-sm text-gray-700">
            {skillProgress.dribbling < 20 ? '初学者水平，需要继续练习基本运球技能。' :
             skillProgress.dribbling < 40 ? '已掌握基础运球，可以尝试简单的变向。' :
             skillProgress.dribbling < 60 ? '运球技能进步明显，可以开始练习更复杂的控球。' :
             skillProgress.dribbling < 80 ? '运球技能熟练，可以在移动中自如控球。' :
             '运球技能已经非常出色，可以尝试高级控球技巧。'}
          </p>
        </div>
        
        <div className="mt-3">
          <Link to="/training" className="btn btn-sm btn-outline w-full">
            查看运球训练项目
          </Link>
        </div>
      </div>
      
      {/* 投篮技能 */}
      <div className="card">
        <div className="flex items-center mb-3">
          <span className="text-xl bg-red-100 text-red-600 p-2 rounded-full mr-3">
            🎯
          </span>
          <h3 className="font-semibold">投篮技能</h3>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>技能熟练度</span>
            <span>{skillProgress.shooting}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-red-500 rounded-full h-2.5" 
              style={{ width: `${skillProgress.shooting}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-3">
          <div className="font-medium mb-1">投篮技能评估</div>
          <p className="text-sm text-gray-700">
            {skillProgress.shooting < 20 ? '初学者水平，需要练习正确的投篮姿势。' :
             skillProgress.shooting < 40 ? '已掌握基础投篮姿势，准确性需要提高。' :
             skillProgress.shooting < 60 ? '投篮技能进步明显，可以开始练习不同距离的投篮。' :
             skillProgress.shooting < 80 ? '投篮技能熟练，有较高的命中率。' :
             '投篮技能已经非常出色，可以尝试高难度投篮。'}
          </p>
        </div>
        
        <div className="mt-3">
          <Link to="/training" className="btn btn-sm btn-outline w-full">
            查看投篮训练项目
          </Link>
        </div>
      </div>
      
      {/* 传球技能 */}
      <div className="card">
        <div className="flex items-center mb-3">
          <span className="text-xl bg-green-100 text-green-600 p-2 rounded-full mr-3">
            👐
          </span>
          <h3 className="font-semibold">传球技能</h3>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>技能熟练度</span>
            <span>{skillProgress.passing}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 rounded-full h-2.5" 
              style={{ width: `${skillProgress.passing}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3">
          <div className="font-medium mb-1">传球技能评估</div>
          <p className="text-sm text-gray-700">
            {skillProgress.passing < 20 ? '初学者水平，需要练习基本传球方式。' :
             skillProgress.passing < 40 ? '已掌握基础传球，准确性需要提高。' :
             skillProgress.passing < 60 ? '传球技能进步明显，可以开始练习不同类型的传球。' :
             skillProgress.passing < 80 ? '传球技能熟练，传球准确且有力。' :
             '传球技能已经非常出色，可以尝试高难度传球。'}
          </p>
        </div>
        
        <div className="mt-3">
          <Link to="/training" className="btn btn-sm btn-outline w-full">
            查看传球训练项目
          </Link>
        </div>
      </div>
      
      {/* 移动技能 */}
      <div className="card">
        <div className="flex items-center mb-3">
          <span className="text-xl bg-orange-100 text-orange-600 p-2 rounded-full mr-3">
            👟
          </span>
          <h3 className="font-semibold">移动技能</h3>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>技能熟练度</span>
            <span>{skillProgress.movement}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-orange-500 rounded-full h-2.5" 
              style={{ width: `${skillProgress.movement}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-3">
          <div className="font-medium mb-1">移动技能评估</div>
          <p className="text-sm text-gray-700">
            {skillProgress.movement < 20 ? '初学者水平，需要练习基本移动步伐。' :
             skillProgress.movement < 40 ? '已掌握基础移动，灵活性需要提高。' :
             skillProgress.movement < 60 ? '移动技能进步明显，可以开始练习更复杂的移动。' :
             skillProgress.movement < 80 ? '移动技能熟练，移动速度和灵活性良好。' :
             '移动技能已经非常出色，移动灵活且反应迅速。'}
          </p>
        </div>
        
        <div className="mt-3">
          <Link to="/training" className="btn btn-sm btn-outline w-full">
            查看移动训练项目
          </Link>
        </div>
      </div>
    </div>
  );
  
  // 渲染训练历史
  const renderHistory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">训练历史</h2>
        <button
          onClick={() => setViewMode('overview')}
          className="text-primary"
        >
          返回总览
        </button>
      </div>
      
      {trainingHistory.length > 0 ? (
        <div className="card">
          <div className="space-y-4">
            {trainingHistory.map((record) => (
              <div key={record.recordId} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{record.title || '训练记录'}</div>
                    <div className="text-xs text-gray-500">
                      {formatDate(record.date)}
                      {record.duration && ` · ${record.duration}分钟`}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary font-bold">{record.score}</span>
                    <span className="text-xs text-gray-500 ml-1">/ 5</span>
                  </div>
                </div>
                
                <div className="mt-1 flex items-center flex-wrap">
                  <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5 mr-2 mb-1">
                    {record.category === 'dribbling' ? '运球' : 
                     record.category === 'shooting' ? '投篮' : 
                     record.category === 'passing' ? '传球' : 
                     record.category === 'movement' ? '移动' : '其他'}
                  </span>
                  
                  <span className="text-xs bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5 mr-2 mb-1">
                    ⭐ {record.earnedStars}
                  </span>
                  
                  {record.level && (
                    <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 mb-1">
                      {record.level}
                    </span>
                  )}
                </div>
                
                {record.feedback && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600 italic">"{record.feedback}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card p-6 text-center">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-semibold">暂无训练记录</div>
          <p className="text-sm text-gray-600 mt-1">
            完成训练后，您的记录将显示在这里
          </p>
          <Link to="/training-plan" className="btn btn-primary mt-4">
            查看训练计划
          </Link>
        </div>
      )}
    </div>
  );
  
  // 渲染日历视图
  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">训练日历</h2>
        <button
          onClick={() => setViewMode('overview')}
          className="text-primary"
        >
          返回总览
        </button>
      </div>
      
      <div className="card">
        <TrainingCalendar />
        
        <div className="flex justify-center mt-4">
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-100 mr-1"></div>
              <span>已安排</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-100 mr-1"></div>
              <span>已完成</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Link to="/training-plan" className="btn btn-primary">
          管理训练计划
        </Link>
      </div>
    </div>
  );
  
  // 根据当前视图模式选择渲染内容
  const renderContent = () => {
    switch (viewMode) {
      case 'skills':
        return renderSkills();
      case 'history':
        return renderHistory();
      case 'calendar':
        return renderCalendar();
      default:
        return renderOverview();
    }
  };
  
  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default ProgressPage;