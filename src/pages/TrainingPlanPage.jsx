import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrainingPlan } from '../contexts/TrainingPlanContext';
import { useUser } from '../contexts/UserContext';
import TrainingCalendar from '../components/training/TrainingCalendar';
import AutoPlanButton from '../components/training/AutoPlanButton';

const TrainingPlanPage = () => {
  const {
    currentPlan,
    getAllTrainingDays,
    nextTrainingDay,
    scheduleTrainingDay,
    createCustomTrainingDay,
    getRecommendedTrainingDates,
    getTrainingDaysByWeek,
    getCurrentProgress,
    weekDayNames,
    trainingDurationOptions,
    preferredDuration,
    changePreferredDuration,
    isLoading,
  } = useTrainingPlan();
  const { user } = useUser();
  const navigate = useNavigate();

  const [activeWeek, setActiveWeek] = useState(1);
  const [progress, setProgress] = useState(0);
  const [schedulingDay, setSchedulingDay] = useState(null);
  const [suggestedDates, setSuggestedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCreateCustom, setShowCreateCustom] = useState(false);
  const [customDuration, setCustomDuration] = useState(preferredDuration);
  const [viewMode, setViewMode] = useState('calendar'); // 'list' or 'calendar', 默认改为日历视图
  const [allTrainingDays, setAllTrainingDays] = useState([]);

  // 加载所有训练日
  useEffect(() => {
    setAllTrainingDays(getAllTrainingDays());
  }, [getAllTrainingDays]);

  // 计算当前进度
  useEffect(() => {
    setProgress(getCurrentProgress());
  }, [getCurrentProgress]);

  // 当用户选择一个训练日进行安排时
  const handleScheduleTraining = trainingDay => {
    setSchedulingDay(trainingDay);
    setSelectedDate(null);

    // 获取推荐的训练日期
    const recommendedDates = getRecommendedTrainingDates(new Date(), 3);
    setSuggestedDates(recommendedDates);
  };

  // 确认安排训练
  const confirmSchedule = (trainingDayId, date) => {
    scheduleTrainingDay(trainingDayId, date);
    setSchedulingDay(null);
    setShowCreateCustom(false);
  };

  // 取消安排
  const cancelSchedule = () => {
    setSchedulingDay(null);
    setShowCreateCustom(false);
  };

  // 开始训练
  const startTraining = trainingDayId => {
    navigate(`/training-day/${trainingDayId}`);
  };

  // 创建自定义训练
  const handleCreateCustomTraining = (date = null) => {
    setShowCreateCustom(true);
    setSelectedDate(date);
  };

  // 确认创建自定义训练
  const confirmCreateCustomTraining = () => {
    const newTrainingDay = createCustomTrainingDay(customDuration, selectedDate);

    if (newTrainingDay && selectedDate) {
      scheduleTrainingDay(newTrainingDay.id, selectedDate);
    }

    setShowCreateCustom(false);
    setSelectedDate(null);
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
        <p className="text-gray-600 mt-2">似乎出了一些问题，请联系技术支持或返回首页</p>
        <Link to="/" className="btn btn-primary mt-4">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和视图切换 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">训练计划</h1>
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'calendar' ? 'bg-primary text-white' : 'hover:bg-gray-200'
            }`}
            aria-label="日历视图"
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              日历
            </span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-200'
            }`}
            aria-label="列表视图"
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              列表
            </span>
          </button>
        </div>
      </div>

      {/* 计划概览 - 在两种视图中都显示 */}
      <div className="card">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`text-2xl bg-${currentPlan.color}-100 text-${currentPlan.color}-600 p-2 rounded-full`}
              >
                {currentPlan.icon}
              </span>
              <div>
                <h2 className="text-lg font-semibold">{currentPlan.levelName}</h2>
                <p className="text-sm text-gray-600">{currentPlan.description}</p>
              </div>
            </div>

            {currentPlan.reward && (
              <div className="mt-2 text-sm">
                <span className="font-medium">完成奖励：</span>
                <span className="text-yellow-600">{currentPlan.reward.name}</span>
              </div>
            )}
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

      {/* 下一个训练提示 - 在两种视图中都显示 */}
      {nextTrainingDay && (
        <div className="card bg-primary bg-opacity-5 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">下一个训练</h3>
              <div className="text-lg font-semibold mt-1">{nextTrainingDay.title}</div>
              <p className="text-sm text-gray-600 mt-1">{nextTrainingDay.description}</p>
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
                <span>
                  {new Date(nextTrainingDay.scheduledDate).toLocaleDateString('zh-CN', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <button onClick={() => startTraining(nextTrainingDay.id)} className="btn btn-primary">
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

      {/* 日历视图 - 移动到顶部位置 */}
      {viewMode === 'calendar' && (
        <div className="space-y-6">
          {/* 添加自动计划按钮 */}
          <div className="flex justify-end">
            <AutoPlanButton className="px-4 py-2" buttonText="智能生成训练计划" />
          </div>

          {/* 日历主体 */}
          <div className="card overflow-hidden">
            <TrainingCalendar />
          </div>

          {/* 自定义训练设置 */}
          <div className="card">
            <h3 className="font-semibold mb-3">自定义训练</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                首选训练时长 ({preferredDuration}分钟)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {trainingDurationOptions.slice(0, 6).map(option => (
                  <button
                    key={option.value}
                    onClick={() => changePreferredDuration(option.value)}
                    className={`p-2 border rounded-lg text-center ${
                      preferredDuration === option.value
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs truncate">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => handleCreateCustomTraining()} className="btn btn-primary w-full">
              创建自定义训练
            </button>
          </div>
        </div>
      )}

      {/* 列表视图 - 保持原有逻辑 */}
      {viewMode === 'list' && (
        <>
          {/* 添加自动计划按钮 */}
          <div className="flex justify-end mb-4">
            <AutoPlanButton className="px-4 py-2" buttonText="智能生成训练计划" />
          </div>

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
                      <p className="text-sm text-gray-600 mt-1">{day.description}</p>
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
                          <span>
                            {new Date(day.scheduledDate).toLocaleDateString('zh-CN', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
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
                <p className="text-gray-600">该周没有训练安排</p>
              </div>
            )}
          </div>

          {/* 自定义训练列表 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">自定义训练</h3>
              <button
                onClick={() => handleCreateCustomTraining()}
                className="btn btn-sm btn-outline"
              >
                + 添加
              </button>
            </div>

            {allTrainingDays.filter(d => d.isCustom).length > 0 ? (
              allTrainingDays
                .filter(d => d.isCustom)
                .map(day => (
                  <div
                    key={day.id}
                    className={`card p-4 border-l-4 ${
                      day.isCompleted
                        ? 'border-green-500'
                        : day.isPending
                          ? 'border-yellow-500'
                          : 'border-purple-500'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <div className="font-semibold">{day.title}</div>
                          <span className="text-xs bg-purple-100 text-purple-800 rounded-full px-2 py-0.5 ml-2">
                            自定义
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{day.description}</p>
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
                            <span>
                              {new Date(day.scheduledDate).toLocaleDateString('zh-CN', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
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
                <p className="text-gray-600">没有自定义训练</p>
                <button
                  onClick={() => handleCreateCustomTraining()}
                  className="btn btn-primary btn-sm mt-2"
                >
                  创建自定义训练
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* 训练日安排弹窗 */}
      {schedulingDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">安排训练日</h3>

            <div className="mb-4">
              <div className="font-medium">{schedulingDay.title}</div>
              <p className="text-sm text-gray-600 mt-1">{schedulingDay.description}</p>
            </div>

            <div className="space-y-2 mb-6">
              <div className="font-medium">推荐训练日期</div>
              {suggestedDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => confirmSchedule(schedulingDay.id, date)}
                  className="block w-full text-left p-3 border rounded-lg hover:bg-primary hover:bg-opacity-10 transition-colors"
                >
                  <div className="font-medium">{weekDayNames[date.getDay()]}</div>
                  <div className="text-sm text-gray-600">
                    {date.toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex space-x-3">
              <button onClick={cancelSchedule} className="btn btn-outline flex-1">
                取消
              </button>
              <input
                type="date"
                onChange={e => {
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

      {/* 创建自定义训练弹窗 */}
      {showCreateCustom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">创建自定义训练</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                训练时长 (分钟)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {trainingDurationOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setCustomDuration(option.value)}
                    className={`p-2 border rounded-lg text-center ${
                      customDuration === option.value
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <p className="text-sm text-gray-600 mt-2">
                系统将根据你选择的时长，自动生成适合的训练组合。
              </p>
            </div>

            {selectedDate && (
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700">安排日期</div>
                <div className="font-medium mt-1">
                  {selectedDate.toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                  })}
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button onClick={cancelSchedule} className="btn btn-outline flex-1">
                取消
              </button>

              <div className="flex-1 flex space-x-2">
                {!selectedDate && (
                  <input
                    type="date"
                    onChange={e => {
                      if (e.target.value) {
                        setSelectedDate(new Date(e.target.value));
                      }
                    }}
                    className="flex-1 border rounded-lg p-2"
                  />
                )}

                <button onClick={confirmCreateCustomTraining} className="btn btn-primary flex-1">
                  {selectedDate ? '创建并安排' : '仅创建'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPlanPage;
