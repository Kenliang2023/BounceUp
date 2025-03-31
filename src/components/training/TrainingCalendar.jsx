import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrainingPlan } from '../../contexts/TrainingPlanContext';
import { weekDayNames } from '../../data/trainingPlan';

const TrainingCalendar = () => {
  const navigate = useNavigate();
  const { trainingDays } = useTrainingPlan();
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  
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
    if (day.trainings.length > 0) {
      navigate(`/training-day/${day.trainings[0].id}`);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* 日历头部 */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">
          {currentMonth.toLocaleString('zh-CN', { year: 'numeric', month: 'long' })}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={goToPrevMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={goToToday}
            className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            今天
          </button>
          <button 
            onClick={goToNextMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 星期标题 */}
      <div className="grid grid-cols-7 border-b">
        {weekDayNames.map((day, index) => (
          <div 
            key={index}
            className="text-center py-2 text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* 日历格子 */}
      <div className="grid grid-cols-7 grid-rows-6">
        {calendarDays.map((day, index) => (
          <div 
            key={index}
            className={`aspect-auto border-b border-r p-1 min-h-12 ${
              !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 
              day.isToday ? 'bg-blue-50' : ''
            }`}
            onClick={() => viewDayTrainings(day)}
          >
            <div className="flex flex-col h-full">
              <div className={`text-right text-sm ${
                day.isToday ? 'font-bold text-blue-600' : ''
              }`}>
                {day.date.getDate()}
              </div>
              
              <div className="flex-grow mt-1">
                {day.trainings.map(training => (
                  <div 
                    key={training.id}
                    className={`text-xs rounded px-1 py-0.5 mb-1 truncate ${
                      training.isCompleted 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {training.isCompleted ? '✓ ' : ''}
                    {training.title.length > 10 
                      ? training.title.substring(0, 8) + '...' 
                      : training.title
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingCalendar;