import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrainingPlan } from '../contexts/TrainingPlanContext';
import { useUser } from '../contexts/UserContext';

const TrainingPlanPage = () => {
  const { 
    currentPlan, 
    trainingDays, 
    nextTrainingDay,
    scheduleTrainingDay, 
    getRecommendedTrainingDates,
    getTrainingDaysByWeek,
    getCurrentProgress,
    weekDayNames,
    isLoading
  } = useTrainingPlan();
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [activeWeek, setActiveWeek] = useState(1);
  const [progress, setProgress] = useState(0);
  const [schedulingDay, setSchedulingDay] = useState(null);
  const [suggestedDates, setSuggestedDates] = useState([]);
  
  // 计算当前进度
  useEffect(() => {
    setProgress(getCurrentProgress());
  }, [trainingDays]);
  
  // 当用户选择一个训练日进行安排时
  const handleScheduleTraining = (trainingDay) => {
    setSchedulingDay(trainingDay);
    
    // 获取推荐的训练日期
    const recommendedDates = getRecommendedTrainingDates(new Date(), 3);
    setSuggestedDates(recommendedDates);
  };
  
  // 确认安排训练
  const confirmSchedule = (trainingDayId, date) => {
    scheduleTrainingDay(trainingDayId, date);
    setSchedulingDay(null);
  };
  
  // 取消安排
  const cancelSchedule = () => {
    setSchedulingDay(null);
  };
  
  // 开始训练
  const startTraining = (trainingDayId) => {
    navigate(`/training-day/${trainingDayId}`);
  };
  
  // 获取当前周的训练日
  const currentWeekTrainingDays = getTrainingDaysByWeek(activeWeek);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!currentPlan) {
    return (
      <div className="card p-6 text-center">
        <div className="text-3xl mb-3">⚠️</div>
        <p className="font-semibold">未找到训练计划</p>
        <p className="text-gray-600 mt-2">
          似乎出了一些问题，请联系技术支持或返回首页
        </p>
        <Link to="/" className="btn btn-primary mt-4">
          返回首页
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">训练计划</h1>
      </div>
      
      {/* 计划概览 */}
      <div className="card">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">{currentPlan.levelName}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {currentPlan.description}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">总体进度</div>
            <div className="text-2xl font-bold text-primary">{progress}%</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary rounded-full h-2.5 transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* 下一个训练提示 */}
      {nextTrainingDay && (
        <div className="card bg-primary bg-opacity-10 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">下一个训练日</h3>
              <div className="text-lg font-semibold mt-1">{nextTrainingDay.title}</div>
              <p className="text-sm text-gray-600 mt-1">
                {nextTrainingDay.description}
              </p>
            </div>
            <div className="flex">
              <span className="text-xs bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5 flex items-center">
                <span>⭐</span>
                <span className="ml-1">{nextTrainingDay.starReward}</span>
              </span>
              <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5 ml-2 flex items-center">
                <span>⏱️</span>
                <span className="ml-1">{nextTrainingDay.duration}分钟</span>
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
              <button 
                onClick={() => startTraining(nextTrainingDay.id)}
                className="btn btn-primary"
              >
                开始训练
              </button>
            </div>
          ) : (
            <div className="mt-3">
              <button 
                onClick={() => handleScheduleTraining(nextTrainingDay)}
                className="btn btn-primary w-full"
              >
                安排这次训练
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* 训练周选择器 */}
      <div className="card overflow-x-auto">
        <h3 className="font-semibold mb-3">训练周</h3>
        <div className="flex space-x-2">
          {currentPlan.weeklyPlans.map(week => (
            <button
              key={week.weekId}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeWeek === week.weekId
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setActiveWeek(week.weekId)}
            >
              {week.weekName}
            </button>
          ))}
        </div>
      </div>
      
      {/* 当前周训练日 */}
      <div className="space-y-4">
        <h3 className="font-semibold">训练安排</h3>
        
        {currentWeekTrainingDays.length > 0 ? (
          currentWeekTrainingDays.map(day => (
            <div 
              key={day.id} 
              className={`card p-4 border-l-4 ${
                day.isCompleted 
                  ? 'border-green-500' 
                  : day.isPending 
                    ? 'border-yellow-500'
                    : 'border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{day.title}</div>
                  <p className="text-sm text-gray-600 mt-1">
                    {day.description}
                  </p>
                </div>
                <div className="flex">
                  <span className="text-xs bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5 flex items-center">
                    <span>⭐</span>
                    <span className="ml-1">{day.starReward}</span>
                  </span>
                  <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5 ml-2 flex items-center">
                    <span>⏱️</span>
                    <span className="ml-1">{day.duration}分钟</span>
                  </span>
                </div>
              </div>
              
              <div className="mt-3">
                {day.isCompleted ? (
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-green-600 flex items-center">
                      <span className="mr-1">✓</span>
                      <span>已完成</span>
                      {day.score && (
                        <span className="ml-2">
                          得分: <span className="font-medium">{day.score.toFixed(1)}</span>
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => navigate(`/training-day/review/${day.id}`)}
                      className="btn btn-sm btn-outline"
                    >
                      查看详情
                    </button>
                  </div>
                ) : day.scheduledDate ? (
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">已安排：</span>
                      <span>{new Date(day.scheduledDate).toLocaleDateString('zh-CN', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <button 
                      onClick={() => startTraining(day.id)}
                      className="btn btn-primary btn-sm"
                    >
                      开始训练
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleScheduleTraining(day)}
                    className="btn btn-outline w-full"
                  >
                    安排这次训练
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="card p-6 text-center">
            <p className="text-gray-600">
              该周没有训练安排
            </p>
          </div>
        )}
      </div>
      
      {/* 训练日安排弹窗 */}
      {schedulingDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">安排训练日</h3>
            
            <div className="mb-4">
              <div className="font-medium">{schedulingDay.title}</div>
              <p className="text-sm text-gray-600 mt-1">
                {schedulingDay.description}
              </p>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="font-medium">推荐训练日期</div>
              {suggestedDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => confirmSchedule(schedulingDay.id, date)}
                  className="block w-full text-left p-3 border rounded-lg hover:bg-primary hover:bg-opacity-10 transition-colors"
                >
                  <div className="font-medium">
                    {weekDayNames[date.getDay()]}
                  </div>
                  <div className="text-sm text-gray-600">
                    {date.toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={cancelSchedule}
                className="btn btn-outline flex-1"
              >
                取消
              </button>
              <input
                type="date"
                onChange={(e) => {
                  if (e.target.value) {
                    confirmSchedule(schedulingDay.id, new Date(e.target.value));
                  }
                }}
                className="btn btn-primary flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPlanPage;
