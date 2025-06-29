import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import {
  getTrainingPlanByLevel,
  getCurrentLevelByStars,
  getNextLevel,
  defaultTrainingFrequency,
  weekDayNames,
  trainingDurationOptions,
  generateTrainingDayByDuration,
} from '../data/trainingPlan';
import {
  generateAutomaticTrainingPlan,
  generateWeaknessTrainingPlan,
  generateTodayRecommendedTraining,
} from '../utils/trainingPlanGenerator';

// 创建上下文
const TrainingPlanContext = createContext(null);

// 训练计划提供者组件
export const TrainingPlanProvider = ({ children }) => {
  const { user, addStars } = useUser();

  const [currentPlan, setCurrentPlan] = useState(null);
  const [trainingDays, setTrainingDays] = useState([]);
  const [customTrainingDays, setCustomTrainingDays] = useState([]);
  const [frequency, setFrequency] = useState(defaultTrainingFrequency);
  const [nextTrainingDay, setNextTrainingDay] = useState(null);
  const [preferredDuration, setPreferredDuration] = useState(20); // 默认时长20分钟
  const [isLoading, setIsLoading] = useState(true);

  // 根据用户星星数量加载对应等级的训练计划
  useEffect(() => {
    if (user && user.totalStars !== undefined) {
      const currentLevel = getCurrentLevelByStars(user.totalStars);
      loadTrainingPlan(currentLevel.id);
    }
  }, [user?.totalStars]);

  // 加载训练计划数据
  const loadTrainingPlan = levelId => {
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

      // 加载自定义训练日
      const storedCustomDays = localStorage.getItem('bounceup_custom_training_days');
      let parsedCustomDays = [];

      if (storedCustomDays) {
        try {
          parsedCustomDays = JSON.parse(storedCustomDays);

          // 过滤仅保留当前等级计划的训练日
          parsedCustomDays = parsedCustomDays.filter(day => day.levelId === levelId);
        } catch (error) {
          console.error('Failed to parse custom training days:', error);
        }
      }

      setCurrentPlan(plan);
      setTrainingDays(parsedDays);
      setCustomTrainingDays(parsedCustomDays);

      // 确定下一个训练日
      updateNextTrainingDay([...parsedDays, ...parsedCustomDays]);

      // 从本地存储加载训练频率和时长设置
      const storedFrequency = localStorage.getItem('bounceup_training_frequency');
      if (storedFrequency) {
        setFrequency(parseInt(storedFrequency, 10) || defaultTrainingFrequency);
      }

      const storedDuration = localStorage.getItem('bounceup_preferred_duration');
      if (storedDuration) {
        setPreferredDuration(parseInt(storedDuration, 10) || 20);
      }
    } catch (error) {
      console.error('Failed to load training plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 从计划模板创建训练日
  const createTrainingDaysFromPlan = plan => {
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
            duration: t.duration,
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
          score: null,
          isCustom: false,
        });
      });
    });

    return days;
  };

  // 更新下一个训练日
  const updateNextTrainingDay = days => {
    // 找出已安排但未完成的训练日，按日期排序
    const pendingDays = days
      .filter(day => !day.isCompleted && day.isPending && day.scheduledDate)
      .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));

    // 如果有已安排的训练日，选择最近的
    if (pendingDays.length > 0) {
      setNextTrainingDay(pendingDays[0]);
      return;
    }

    // 如果没有已安排的训练日，找出未完成且未安排的训练日，按周和日排序
    const availableDays = days
      .filter(day => !day.isCompleted && !day.isPending)
      .sort((a, b) => {
        // 普通训练优先于测试训练
        if (a.isTest !== b.isTest) return a.isTest ? 1 : -1;

        // 按计划排序
        if (a.weekId !== b.weekId) return a.weekId - b.weekId;
        return a.dayId - b.dayId;
      });

    setNextTrainingDay(availableDays[0] || null);
  };

  // 保存训练日状态
  useEffect(() => {
    if (trainingDays.length > 0) {
      localStorage.setItem('bounceup_training_days', JSON.stringify(trainingDays));
      updateNextTrainingDay([...trainingDays, ...customTrainingDays]);
    }
  }, [trainingDays]);

  // 保存自定义训练日状态
  useEffect(() => {
    if (customTrainingDays.length > 0) {
      localStorage.setItem('bounceup_custom_training_days', JSON.stringify(customTrainingDays));
      updateNextTrainingDay([...trainingDays, ...customTrainingDays]);
    }
  }, [customTrainingDays]);

  // 保存训练频率设置
  useEffect(() => {
    localStorage.setItem('bounceup_training_frequency', frequency.toString());
  }, [frequency]);

  // 保存首选训练时长
  useEffect(() => {
    localStorage.setItem('bounceup_preferred_duration', preferredDuration.toString());
  }, [preferredDuration]);

  // 安排训练日期
  const scheduleTrainingDay = (trainingDayId, date) => {
    // 检查是否是自定义训练日
    const customDay = customTrainingDays.find(day => day.id === trainingDayId);

    if (customDay) {
      setCustomTrainingDays(prev =>
        prev.map(day => {
          if (day.id === trainingDayId) {
            return {
              ...day,
              scheduledDate: date.toISOString(),
              isPending: true,
            };
          }
          return day;
        })
      );
    } else {
      setTrainingDays(prev =>
        prev.map(day => {
          if (day.id === trainingDayId) {
            return {
              ...day,
              scheduledDate: date.toISOString(),
              isPending: true,
            };
          }
          return day;
        })
      );
    }
  };

  // 取消已安排的训练日
  const unscheduleTrainingDay = trainingDayId => {
    // 检查是否是自定义训练日
    const customDay = customTrainingDays.find(day => day.id === trainingDayId);

    if (customDay) {
      setCustomTrainingDays(prev =>
        prev.map(day => {
          if (day.id === trainingDayId) {
            return {
              ...day,
              scheduledDate: null,
              isPending: false,
            };
          }
          return day;
        })
      );
    } else {
      setTrainingDays(prev =>
        prev.map(day => {
          if (day.id === trainingDayId) {
            return {
              ...day,
              scheduledDate: null,
              isPending: false,
            };
          }
          return day;
        })
      );
    }
  };

  // 创建自定义训练日
  const createCustomTrainingDay = (duration = null, date = null) => {
    if (!currentPlan) return null;

    const trainingDuration = duration || preferredDuration;
    const currentLevel = getCurrentLevelByStars(user.totalStars);

    // 生成唯一ID
    const id = `custom_training_day_${Date.now()}`;

    // 创建自定义训练日
    const customDay = generateTrainingDayByDuration(currentLevel.id, trainingDuration);

    const newTrainingDay = {
      ...customDay,
      id,
      scheduledDate: date ? date.toISOString() : null,
      isPending: date !== null,
      isCustom: true,
    };

    // 添加到自定义训练日列表
    setCustomTrainingDays(prev => [...prev, newTrainingDay]);

    return newTrainingDay;
  };

  // 删除自定义训练日
  const deleteCustomTrainingDay = trainingDayId => {
    setCustomTrainingDays(prev => prev.filter(day => day.id !== trainingDayId));
  };

  // 开始训练日
  const startTrainingDay = trainingDayId => {
    // 检查是否是自定义训练日
    const customDay = customTrainingDays.find(day => day.id === trainingDayId);
    const trainingDay = customDay || trainingDays.find(day => day.id === trainingDayId);

    if (!trainingDay) {
      throw new Error('训练日不存在');
    }

    return trainingDay;
  };

  // 完成训练日
  const completeTrainingDay = (trainingDayId, score, feedback) => {
    // 检查是否是自定义训练日
    const customDay = customTrainingDays.find(day => day.id === trainingDayId);
    const trainingDay = customDay
      ? customTrainingDays.find(day => day.id === trainingDayId)
      : trainingDays.find(day => day.id === trainingDayId);

    if (!trainingDay) {
      throw new Error('训练日不存在');
    }

    // 计算获得的星星数（基于得分和基础奖励）
    const earnedStars = Math.max(1, Math.floor(trainingDay.starReward * (score / 5)));

    // 更新训练日状态
    if (customDay) {
      setCustomTrainingDays(prev =>
        prev.map(day => {
          if (day.id === trainingDayId) {
            return {
              ...day,
              isCompleted: true,
              isPending: false,
              completedDate: new Date().toISOString(),
              score,
            };
          }
          return day;
        })
      );
    } else {
      setTrainingDays(prev =>
        prev.map(day => {
          if (day.id === trainingDayId) {
            return {
              ...day,
              isCompleted: true,
              isPending: false,
              completedDate: new Date().toISOString(),
              score,
            };
          }
          return day;
        })
      );
    }

    // 添加星星奖励
    addStars(earnedStars);

    // 如果是测试训练日，检查是否可以解锁下一级
    if (trainingDay.isTest && currentPlan) {
      const nextLevel = getNextLevel(currentPlan.levelId);

      if (nextLevel && score >= 4) {
        // 测试分数达到4分或以上才能升级
        // 在此处可以触发升级事件或显示升级提示
        // 实际升级逻辑由useUser钩子处理，因为星星增加会触发等级更新
        console.log(`Testing passed! Next level available: ${nextLevel.name}`);
      }
    }

    // 返回结果
    return {
      earnedStars,
      isTest: trainingDay.isTest || false,
      testPassed: trainingDay.isTest && score >= 4,
    };
  };

  // 修改训练频率
  const changeTrainingFrequency = newFrequency => {
    setFrequency(Math.max(1, Math.min(7, newFrequency))); // 限制在1-7之间
  };

  // 修改首选训练时长
  const changePreferredDuration = newDuration => {
    setPreferredDuration(Math.max(10, Math.min(60, newDuration))); // 限制在10-60分钟之间
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
        if (currentDate.getDay() === 0) {
          // 跳过周日
          currentDate.setDate(currentDate.getDate() + 1);
        }
        dates.push(new Date(currentDate));
      }
    }

    return dates.slice(0, count);
  };

  // 获取所有训练日
  const getAllTrainingDays = () => {
    return [...trainingDays, ...customTrainingDays].sort((a, b) => {
      // 已安排的按日期排序
      if (a.scheduledDate && b.scheduledDate) {
        return new Date(a.scheduledDate) - new Date(b.scheduledDate);
      }

      // 已安排的优先于未安排的
      if (a.scheduledDate && !b.scheduledDate) return -1;
      if (!a.scheduledDate && b.scheduledDate) return 1;

      // 自定义训练在最后
      if (a.isCustom && !b.isCustom) return 1;
      if (!a.isCustom && b.isCustom) return -1;

      // 未安排的按周和日排序
      if (a.weekId !== b.weekId) return a.weekId - b.weekId;
      return a.dayId - b.dayId;
    });
  };

  // 按周获取训练日
  const getTrainingDaysByWeek = weekId => {
    if (!currentPlan) return [];

    return trainingDays.filter(day => day.weekId === weekId).sort((a, b) => a.dayId - b.dayId);
  };

  // 获取指定训练日的详细信息
  const getTrainingDayDetails = trainingDayId => {
    // 先在标准训练日中查找
    let trainingDay = trainingDays.find(day => day.id === trainingDayId);

    // 如果没找到，在自定义训练日中查找
    if (!trainingDay) {
      trainingDay = customTrainingDays.find(day => day.id === trainingDayId);
    }

    return trainingDay || null;
  };

  // 获取用户当前进度
  const getCurrentProgress = () => {
    if (!currentPlan || !trainingDays.length) return 0;

    // 只计算标准训练日的进度
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

    // 保留自定义训练日
    updateNextTrainingDay([...newDays, ...customTrainingDays]);
  };

  // 获取今天安排的训练日
  const getTodayTrainings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return getAllTrainingDays().filter(day => {
      if (!day.scheduledDate) return false;

      const scheduledDate = new Date(day.scheduledDate);
      scheduledDate.setHours(0, 0, 0, 0);

      return scheduledDate.getTime() === today.getTime();
    });
  };

  // 获取今日推荐训练
  const getTodayRecommendedTraining = (duration = preferredDuration) => {
    return generateTodayRecommendedTraining(user, duration);
  };

  // 生成自动训练计划
  const generateAutoPlan = (preferences = {}, daysAhead = 14) => {
    // 默认使用当前频率和时长
    const defaultPreferences = {
      frequency: frequency,
      duration: preferredDuration,
      ...preferences,
    };

    // 生成计划
    const plan = generateAutomaticTrainingPlan(user, defaultPreferences, daysAhead);

    if (plan && plan.trainingDays && plan.trainingDays.length > 0) {
      // 添加生成的训练日到自定义训练中
      const newCustomDays = [...customTrainingDays];

      plan.trainingDays.forEach(day => {
        // 确保ID是唯一的
        day.id = `auto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        newCustomDays.push(day);
      });

      setCustomTrainingDays(newCustomDays);
      return plan.trainingDays.length;
    }

    return 0;
  };

  // 生成针对弱项技能的训练计划
  const generateWeaknessPlan = (preferences = {}, daysAhead = 14) => {
    // 默认使用当前频率和时长
    const defaultPreferences = {
      frequency: frequency,
      duration: preferredDuration,
      ...preferences,
    };

    // 生成计划
    const plan = generateWeaknessTrainingPlan(user, defaultPreferences, daysAhead);

    if (plan && plan.trainingDays && plan.trainingDays.length > 0) {
      // 添加生成的训练日到自定义训练中
      const newCustomDays = [...customTrainingDays];

      plan.trainingDays.forEach(day => {
        // 确保ID是唯一的
        day.id = `weakness_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        newCustomDays.push(day);
      });

      setCustomTrainingDays(newCustomDays);
      return plan.trainingDays.length;
    }

    return 0;
  };

  // 获取一段时间范围内的训练天数统计
  const getTrainingStatsByDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const allDays = getAllTrainingDays();

    // 计算完成的训练天数
    const completedCount = allDays.filter(day => {
      if (!day.completedDate) return false;

      const completedDate = new Date(day.completedDate);
      return completedDate >= start && completedDate <= end;
    }).length;

    // 计算安排但未完成的训练天数
    const scheduledCount = allDays.filter(day => {
      if (!day.scheduledDate || day.isCompleted) return false;

      const scheduledDate = new Date(day.scheduledDate);
      scheduledDate.setHours(0, 0, 0, 0);

      return scheduledDate >= start && scheduledDate <= end;
    }).length;

    // 计算总星星数
    const totalStars = allDays
      .filter(day => {
        if (!day.completedDate) return false;

        const completedDate = new Date(day.completedDate);
        return completedDate >= start && completedDate <= end;
      })
      .reduce((sum, day) => sum + day.starReward, 0);

    return {
      completedCount,
      scheduledCount,
      totalStars,
    };
  };

  return (
    <TrainingPlanContext.Provider
      value={{
        currentPlan,
        trainingDays,
        customTrainingDays,
        nextTrainingDay,
        frequency,
        preferredDuration,
        isLoading,
        loadTrainingPlan,
        scheduleTrainingDay,
        unscheduleTrainingDay,
        createCustomTrainingDay,
        deleteCustomTrainingDay,
        startTrainingDay,
        completeTrainingDay,
        changeTrainingFrequency,
        changePreferredDuration,
        getRecommendedTrainingDates,
        getAllTrainingDays,
        getTrainingDaysByWeek,
        getTrainingDayDetails,
        getCurrentProgress,
        getNextTestDay,
        resetCurrentPlan,
        getTodayTrainings,
        getTodayRecommendedTraining,
        generateAutoPlan,
        generateWeaknessPlan,
        getTrainingStatsByDateRange,
        weekDayNames,
        trainingDurationOptions,
      }}
    >
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
