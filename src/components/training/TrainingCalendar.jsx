import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrainingPlan } from '../../contexts/TrainingPlanContext';
import { weekDayNames } from '../../data/trainingPlan';

const TrainingCalendar = () => {
  const navigate = useNavigate();
  const { trainingDays } = useTrainingPlan();
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  
  // 生成当月的日历数据
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // 当月第一天是星期几
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // 当月的天数
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // 上个月的天数
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // 上个月的日期（填充前面的空格）
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
        trainings: []
      });
    }
    
    // 当月的日期
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateTodayFix = new Date(date);
      dateTodayFix.setHours(0, 0, 0, 0);
      
      // 查找这一天的训练
      const dayTrainings = trainingDays.filter(day => {
        if (!day.scheduledDate) return false;
        
        const scheduledDate = new Date(day.scheduledDate);
        scheduledDate.setHours(0, 0, 0, 0);
        
        return scheduledDate.getTime() === dateTodayFix.getTime();
      });
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday: new Date().toDateString() === date.toDateString(),
        trainings: dayTrainings
      });
    }
    
    // 下个月的日期（填充后面的空格，确保总行数为6）
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        trainings: []
      });
    }
    
    setCalendarDays(days);
  }, [currentMonth, trainingDays]);
  
  // 切换到上个月
  const goToPrevMonth = () => {
    setCurrentMonth(prevMonth => {
      const year = prevMonth.getFullYear();
      const month = prevMonth.getMonth();
      return new Date(year, month - 1, 1);
    });
  };
  
  // 切换到下个月
  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const year = prevMonth.getFullYear();
      const month = prevMonth.getMonth();
      return new Date(year, month + 1, 1);
    });
  };
  
  // 切换到今天所在的月份
  const goToToday = () => {
    setCurrentMonth(new Date());
  };
  
  // 查看某一天的训练
  const viewDayTrainings = (day) => {
    setSelectedDay(day);
    
    if (day.trainings.length > 0 && !selectedDay) {
      navigate(`/training-day/${day.trainings[0].id}`);
    }
  };
  
  // 关闭日期详情
  const closeDetailView = () => {
    setSelectedDay(null);
  };
  
  // 点击训练项目
  const handleTrainingClick = (trainingId) => {
    navigate(`/training-day/${trainingId}`);
    closeDetailView();
  };
  
  // 格式化日期
  const formatDate = (date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* 日历头部 */}
      <div className="flex justify-between items-center p-4 border-b bg-primary bg-opacity-5">
        <h2 className="text-lg font-semibold">
          {currentMonth.toLocaleString('zh-CN', { year: 'numeric', month: 'long' })}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={goToPrevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="上个月"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={goToToday}
            className="px-3 py-1 rounded bg-primary text-white text-sm font-medium"
            aria-label="今天"
          >
            今天
          </button>
          <button 
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="下个月"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 星期标题 */}
      <div className="grid grid-cols-7 bg-gray-50">
        {weekDayNames.map((day, index) => (
          <div 
            key={index}
            className="text-center py-2 font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* 日历格子 - 减少行距，优化显示效果 */}
      <div className="grid grid-cols-7 auto-rows-auto">
        {calendarDays.map((day, index) => (
          <div 
            key={index}
            onClick={() => viewDayTrainings(day)}
            className={`
              border-b border-r min-h-14 p-1.5
              ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}
              ${day.isToday ? 'bg-blue-50' : ''}
              ${day.trainings.length > 0 ? 'cursor-pointer hover:bg-blue-50' : ''}
              ${selectedDay?.date.toDateString() === day.date.toDateString() ? 'ring-2 ring-primary' : ''}
            `}
          >
            <div className="flex flex-col h-full">
              {/* 日期显示 */}
              <div className={`
                text-right font-medium text-sm
                ${day.isToday ? 'text-blue-600' : ''}
              `}>
                {day.date.getDate()}
              </div>
              
              {/* 训练指示器，简化显示方式 */}
              {day.trainings.length > 0 && (
                <div className="mt-1 flex justify-end">
                  <div className={`
                    flex items-center justify-center 
                    w-6 h-6 rounded-full
                    ${day.trainings.some(t => t.isCompleted) 
                      ? 'bg-green-500 text-white' 
                      : 'bg-primary text-white'}
                  `}>
                    {day.trainings.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* 图例说明 */}
      <div className="flex justify-center p-3 bg-gray-50 border-t text-sm">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 rounded-full bg-primary mr-1.5"></div>
          <span>已安排</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>
          <span>已完成</span>
        </div>
      </div>
      
      {/* 选中日期的详情弹窗 */}
      {selectedDay && selectedDay.trainings.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {formatDate(selectedDay.date)}
              </h3>
              <button 
                onClick={closeDetailView}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {selectedDay.trainings.map(training => (
                <div 
                  key={training.id}
                  onClick={() => handleTrainingClick(training.id)}
                  className={`
                    border rounded-lg p-3 cursor-pointer 
                    hover:border-primary transition-colors
                    ${training.isCompleted ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-primary'}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{training.title}</div>
                      <p className="text-sm text-gray-600 mt-1">
                        {training.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-sm">
                        <span className="bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5">
                          ⭐ {training.starReward}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {training.duration}分钟
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-end">
                    <span className={`
                      text-sm font-medium
                      ${training.isCompleted ? 'text-green-600' : 'text-primary'}
                    `}>
                      {training.isCompleted ? '已完成 ✓' : '开始训练 →'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                onClick={closeDetailView}
                className="btn btn-primary"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCalendar;