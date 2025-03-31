import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { 
  getTrainingPlanByLevel, 
  getCurrentLevelByStars,
  getNextLevel,
  defaultTrainingFrequency,
  weekDayNames
} from '../data/trainingPlan';

// 创建上下文
const TrainingPlanContext = createContext(null);

// 训练计划提供者组件
export const TrainingPlanProvider = ({ children }) => {
  const { user, addStars } = useUser();
  
  const [currentPlan, setCurrentPlan] = useState(null);
  const [trainingDays, setTrainingDays] = useState([]);
  const [frequency, setFrequency] = useState(defaultTrainingFrequency);
  const [nextTrainingDay, setNextTrainingDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // 根据用户星星数量加载对应等级的训练计划
  useEffect(() => {
    if (user && user.totalStars !== undefined) {
      const currentLevel = getCurrentLevelByStars(user.totalStars);
      loadTrainingPlan(currentLevel.id);
    }
  }, [user?.totalStars]);
  
  // 加载训练计划数据
  const loadTrainingPlan = (levelId) => {
    setIsLoading(true);
    
    try {
      // 获取指定等级的训练计划
      const plan = getTrainingPlanByLevel(levelId);
      
      // 从本地存储加载训练日数据
      const storedDays = localStorage.getItem('bounceup_training_days');
      let parsedDays = [];
      
      if (storedDays) {
        try {
          parsedDays = JSON.parse(storedDays);
          
          // 过滤仅保留当前等级计划的训练日
          parsedDays = parsedDays.filter(day => day.levelId === levelId);
        } catch (error) {
          console.error('Failed to parse training days:', error);
        }
      }
      
      // 如果没有存储数据，从计划模板创建训练日
      if (parsedDays.length === 0) {
        parsedDays = createTrainingDaysFromPlan(plan);
      }
      
      setCurrentPlan(plan);
      setTrainingDays(parsedDays);
      
      // 确定下一个训练日
      updateNextTrainingDay(parsedDays);
      
      // 从本地存储加载训练频率设置
      const storedFrequency = localStorage.getItem('bounceup_training_frequency');
      if (storedFrequency) {
        setFrequency(parseInt(storedFrequency, 10) || defaultTrainingFrequency);
      }
    } catch (error) {
      console.error('Failed to load training plan:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 从计划模板创建训练日
  const createTrainingDaysFromPlan = (plan) => {
    if (!plan || !plan.weeklyPlans) return [];
    
    const days = [];
    
    plan.weeklyPlans.forEach(week => {
      week.trainingDays.forEach(day => {
        days.push({
          id: `training_day_${plan.levelId}_${week.weekId}_${day.dayId}`,
          levelId: plan.levelId,
          weekId: week.weekId,
          dayId: day.dayId,
          title: day.title,
          trainings: day.trainings.map(t => ({ 
            moduleId: t.moduleId,
            title: t.title,
            category: t.category,
            duration: t.duration
          })),
          description: day.description,
          duration: day.duration,
          starReward: day.starReward,
          experienceReward: day.experienceReward,
          isCompleted: false,
          isPending: false,
          scheduledDate: null,
          isTest: day.isTest || false,
          completedDate: null,
          score: null
        });
      });
    });
    
    return days;
  };
  
  // 更新下一个训练日
  const updateNextTrainingDay = (days) => {
    // 找出未完成的训练日，按周和日排序
    const pendingDays = days
      .filter(day => !day.isCompleted && !day.isPending)
      .sort((a, b) => {
        if (a.weekId !== b.weekId) return a.weekId - b.weekId;
        return a.dayId - b.dayId;
      });
    
    setNextTrainingDay(pendingDays[0] || null);
  };
  
  // 保存训练日状态
  useEffect(() => {
    if (trainingDays.length > 0) {
      localStorage.setItem('bounceup_training_days', JSON.stringify(trainingDays));
      updateNextTrainingDay(trainingDays);
    }
  }, [trainingDays]);
  
  // 保存训练频率设置
  useEffect(() => {
    localStorage.setItem('bounceup_training_frequency', frequency.toString());
  }, [frequency]);
  
  // 安排训练日期
  const scheduleTrainingDay = (trainingDayId, date) => {
    setTrainingDays(prev => prev.map(day => {
      if (day.id === trainingDayId) {
        return {
          ...day,
          scheduledDate: date.toISOString(),
          isPending: true
        };
      }
      return day;
    }));
  };
  
  // 取消已安排的训练日
  const unscheduleTrainingDay = (trainingDayId) => {
    setTrainingDays(prev => prev.map(day => {
      if (day.id === trainingDayId) {
        return {
          ...day,
          scheduledDate: null,
          isPending: false
        };
      }
      return day;
    }));
  };
  
  // 开始训练日
  const startTrainingDay = (trainingDayId) => {
    const trainingDay = trainingDays.find(day => day.id === trainingDayId);
    
    if (!trainingDay) {
      throw new Error('训练日不存在');
    }
    
    return trainingDay;
  };
  
  // 完成训练日
  const completeTrainingDay = (trainingDayId, score, feedback) => {
    const trainingDay = trainingDays.find(day => day.id === trainingDayId);
    
    if (!trainingDay) {
      throw new Error('训练日不存在');
    }
    
    // 计算获得的星星数（基于得分和基础奖励）
    const earnedStars = Math.max(1, Math.floor(trainingDay.starReward * (score / 5)));
    
    // 更新训练日状态
    setTrainingDays(prev => prev.map(day => {
      if (day.id === trainingDayId) {
        return {
          ...day,
          isCompleted: true,
          isPending: false,
          completedDate: new Date().toISOString(),
          score
        };
      }
      return day;
    }));
    
    // 添加星星奖励
    addStars(earnedStars);
    
    // 如果是测试训练日，检查是否可以解锁下一级
    if (trainingDay.isTest && currentPlan) {
      const nextLevel = getNextLevel(currentPlan.levelId);
      
      if (nextLevel && score >= 4) {  // 测试分数达到4分或以上才能升级
        // 在此处可以触发升级事件或显示升级提示
        // 实际升级逻辑由useUser钩子处理，因为星星增加会触发等级更新
        console.log(`Testing passed! Next level available: ${nextLevel.name}`);
      }
    }
    
    // 返回结果
    return {
      earnedStars,
      isTest: trainingDay.isTest || false,
      testPassed: trainingDay.isTest && score >= 4
    };
  };
  
  // 修改训练频率
  const changeTrainingFrequency = (newFrequency) => {
    setFrequency(Math.max(1, Math.min(7, newFrequency))); // 限制在1-7之间
  };
  
  // 获取推荐的训练日期
  const getRecommendedTrainingDates = (startDate = new Date(), count = 3) => {
    const dates = [];
    const currentDate = new Date(startDate);
    
    // 根据训练频率，在未来7天内分配训练日
    // 例如，频率3表示周一、周三、周五或周二、周四、周六
    if (frequency <= 1) {
      // 频率1：下一个周末
      currentDate.setDate(currentDate.getDate() + (6 - currentDate.getDay()));
      dates.push(new Date(currentDate));
    } else if (frequency >= 7) {
      // 频率7：每天
      for (let i = 0; i < 7; i++) {
        currentDate.setDate(currentDate.getDate() + 1);
        dates.push(new Date(currentDate));
      }
    } else {
      // 其他频率：平均分布
      const step = Math.floor(7 / frequency);
      for (let i = 0; i < frequency; i++) {
        currentDate.setDate(currentDate.getDate() + step);
        if (currentDate.getDay() === 0) { // 跳过周日
          currentDate.setDate(currentDate.getDate() + 1);
        }
        dates.push(new Date(currentDate));
      }
    }
    
    return dates.slice(0, count);
  };
  
  // 按周获取训练日
  const getTrainingDaysByWeek = (weekId) => {
    if (!currentPlan) return [];
    
    return trainingDays.filter(day => day.weekId === weekId)
      .sort((a, b) => a.dayId - b.dayId);
  };
  
  // 获取指定训练日的详细信息
  const getTrainingDayDetails = (trainingDayId) => {
    return trainingDays.find(day => day.id === trainingDayId) || null;
  };
  
  // 获取用户当前进度
  const getCurrentProgress = () => {
    if (!currentPlan || !trainingDays.length) return 0;
    
    const totalDays = trainingDays.length;
    const completedDays = trainingDays.filter(day => day.isCompleted).length;
    
    return Math.round((completedDays / totalDays) * 100);
  };
  
  // 获取下一个要测试的训练日
  const getNextTestDay = () => {
    return trainingDays.find(day => !day.isCompleted && day.isTest) || null;
  };
  
  // 重置当前等级训练计划 (用于调试)
  const resetCurrentPlan = () => {
    if (!currentPlan) return;
    
    // 创建新的训练日数据
    const newDays = createTrainingDaysFromPlan(currentPlan);
    setTrainingDays(newDays);
    updateNextTrainingDay(newDays);
  };
  
  return (
    <TrainingPlanContext.Provider value={{
      currentPlan,
      trainingDays,
      nextTrainingDay,
      frequency,
      isLoading,
      loadTrainingPlan,
      scheduleTrainingDay,
      unscheduleTrainingDay,
      startTrainingDay,
      completeTrainingDay,
      changeTrainingFrequency,
      getRecommendedTrainingDates,
      getTrainingDaysByWeek,
      getTrainingDayDetails,
      getCurrentProgress,
      getNextTestDay,
      resetCurrentPlan,
      weekDayNames
    }}>
      {children}
    </TrainingPlanContext.Provider>
  );
};

// 自定义钩子
export const useTrainingPlan = () => {
  const context = useContext(TrainingPlanContext);
  if (!context) {
    throw new Error('useTrainingPlan must be used within a TrainingPlanProvider');
  }
  return context;
};