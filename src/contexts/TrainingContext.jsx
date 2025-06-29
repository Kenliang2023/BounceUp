import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';

// 导入所有训练数据
import {
  dribblingTrainings,
  shootingTrainings,
  passingTrainings,
  movementTrainings,
  parentChildTrainings,
  findTrainingById,
  getAllTrainings,
} from '../data/allTrainings';

// 创建上下文
const TrainingContext = createContext(null);

// 默认技能进度
const defaultSkillProgress = {
  dribbling: 0,
  shooting: 0,
  passing: 0,
  movement: 0,
  parent_child: 0,
};

// 提供者组件
export const TrainingProvider = ({ children }) => {
  const { user, addStars } = useUser();
  const [skillProgress, setSkillProgress] = useState(defaultSkillProgress);
  const [trainingHistory, setTrainingHistory] = useState([]);
  const [currentTraining, setCurrentTraining] = useState(null);
  const [currentTrainingDay, setCurrentTrainingDay] = useState(null);
  const [currentTrainingIndex, setCurrentTrainingIndex] = useState(0);

  // 首次加载时从localStorage获取训练数据
  useEffect(() => {
    const storedProgress = localStorage.getItem('bounceup_skill_progress');
    const storedHistory = localStorage.getItem('bounceup_training_history');

    if (storedProgress) {
      try {
        setSkillProgress(JSON.parse(storedProgress));
      } catch (error) {
        console.error('Failed to parse skill progress:', error);
      }
    }

    if (storedHistory) {
      try {
        setTrainingHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error('Failed to parse training history:', error);
      }
    }

    // 调试信息，检查所有训练数据
    console.log('Training Context Initialized');
    console.log('Dribbling trainings:', dribblingTrainings?.length || 0);
    console.log('Shooting trainings:', shootingTrainings?.length || 0);
    console.log('Passing trainings:', passingTrainings?.length || 0);
    console.log('Movement trainings:', movementTrainings?.length || 0);
    console.log('Parent-Child trainings:', parentChildTrainings?.length || 0);
  }, []);

  // 当训练数据变化时保存到localStorage
  useEffect(() => {
    localStorage.setItem('bounceup_skill_progress', JSON.stringify(skillProgress));
  }, [skillProgress]);

  useEffect(() => {
    localStorage.setItem('bounceup_training_history', JSON.stringify(trainingHistory));
  }, [trainingHistory]);

  // ================= 原有训练系统功能 =================

  // 开始单个训练
  const startTraining = trainingId => {
    // 查找训练数据
    const training = findTrainingById(trainingId);

    if (!training) {
      throw new Error('训练不存在');
    }

    setCurrentTraining({
      ...training,
      startTime: new Date().toISOString(),
      progress: 0,
    });

    return training;
  };

  // 更新当前训练进度
  const updateTrainingProgress = progress => {
    if (!currentTraining) {
      throw new Error('没有正在进行的训练');
    }

    setCurrentTraining(prev => ({
      ...prev,
      progress: Math.min(100, Math.max(0, progress)),
    }));
  };

  // 完成单个训练
  const completeTraining = (score, feedback) => {
    if (!currentTraining) {
      throw new Error('没有正在进行的训练');
    }

    const trainingEndTime = new Date().toISOString();
    const durationMs = new Date(trainingEndTime) - new Date(currentTraining.startTime);
    const durationMinutes = Math.round(durationMs / (1000 * 60));

    // 计算获得的星星数（基于得分）
    const earnedStars = Math.max(1, Math.floor(score));

    // 创建训练记录
    const trainingRecord = {
      recordId: `record_${Date.now()}`,
      trainingId: currentTraining.moduleId,
      title: currentTraining.title,
      category: currentTraining.category,
      level: currentTraining.level,
      startTime: currentTraining.startTime,
      endTime: trainingEndTime,
      duration: durationMinutes,
      score,
      feedback,
      earnedStars,
      date: trainingEndTime,
      trainingDayId: currentTrainingDay?.id || null,
    };

    // 更新训练历史
    setTrainingHistory(prev => [trainingRecord, ...prev]);

    // 更新技能进度
    updateSkillProgress(currentTraining.category, score);

    // 如果不是训练计划模式，直接奖励星星
    if (!currentTrainingDay) {
      addStars(earnedStars);
    }

    const result = {
      record: trainingRecord,
      earnedStars,
    };

    // 如果是训练计划模式，检查是否完成了所有训练
    if (currentTrainingDay) {
      const nextIndex = currentTrainingIndex + 1;

      if (nextIndex < currentTrainingDay.trainings.length) {
        // 还有下一个训练，加载它
        setCurrentTrainingIndex(nextIndex);
        const nextTrainingId = currentTrainingDay.trainings[nextIndex].moduleId;
        const nextTraining = findTrainingById(nextTrainingId);

        setCurrentTraining({
          ...nextTraining,
          startTime: new Date().toISOString(),
          progress: 0,
        });

        result.hasNextTraining = true;
        result.nextTraining = nextTraining;
      } else {
        // 所有训练完成，重置当前训练
        setCurrentTraining(null);
        result.isTrainingDayCompleted = true;
      }
    } else {
      // 非训练计划模式，重置当前训练
      setCurrentTraining(null);
    }

    return result;
  };

  // 取消当前训练
  const cancelTraining = () => {
    setCurrentTraining(null);
    setCurrentTrainingDay(null);
    setCurrentTrainingIndex(0);
  };

  // ================= 新增训练计划系统功能 =================

  // 开始训练日训练
  const startTrainingDay = trainingDay => {
    if (!trainingDay || !trainingDay.trainings || trainingDay.trainings.length === 0) {
      throw new Error('训练日数据不完整或没有训练项目');
    }

    // 设置当前训练日
    setCurrentTrainingDay(trainingDay);
    setCurrentTrainingIndex(0);

    // 加载第一个训练
    const firstTrainingId = trainingDay.trainings[0].moduleId;
    return startTraining(firstTrainingId);
  };

  // 完成整个训练日
  const completeTrainingDay = () => {
    if (!currentTrainingDay) {
      throw new Error('没有正在进行的训练日');
    }

    // 计算训练日平均得分
    const dayRecords = trainingHistory.filter(
      record => record.trainingDayId === currentTrainingDay.id
    );

    const totalScore = dayRecords.reduce((sum, record) => sum + record.score, 0);
    const averageScore = dayRecords.length > 0 ? totalScore / dayRecords.length : 0;

    // 创建训练日记录（用于未来扩展）
    const trainingDayRecord = {
      id: `day_record_${Date.now()}`,
      trainingDayId: currentTrainingDay.id,
      title: currentTrainingDay.title,
      completedDate: new Date().toISOString(),
      averageScore,
      trainingRecords: dayRecords.map(record => record.recordId),
    };

    // 清除当前训练日状态
    setCurrentTrainingDay(null);
    setCurrentTrainingIndex(0);

    return {
      trainingDayRecord,
      averageScore,
    };
  };

  // 直接向训练历史添加训练记录（用于外部调用）
  const addTrainingToHistory = trainingRecord => {
    setTrainingHistory(prev => [trainingRecord, ...prev]);

    // 如果有类别信息，更新技能进度
    if (trainingRecord.category && trainingRecord.score !== undefined) {
      updateSkillProgress(trainingRecord.category, trainingRecord.score);
    }
  };

  // 更新技能进度
  const updateSkillProgress = (category, score) => {
    if (!category || score === undefined) return;

    // 每次训练完成后增加的进度（基于得分）
    const progressIncrement = Math.floor((score / 5) * 10); // 满分5分，最多增加10%

    setSkillProgress(prev => {
      // 限制最大进度为100%
      const newProgress = Math.min(100, (prev[category] || 0) + progressIncrement);

      return {
        ...prev,
        [category]: newProgress,
      };
    });
  };

  // 获取技能等级描述
  const getSkillLevelDescription = skillName => {
    const progress = skillProgress[skillName] || 0;

    if (progress < 20) return '初学者';
    if (progress < 40) return '基础';
    if (progress < 60) return '进阶';
    if (progress < 80) return '熟练';
    return '专家';
  };

  // 获取推荐训练
  const getRecommendedTrainings = (count = 3) => {
    // 根据用户进度，推荐适合的训练
    const recommendations = [];

    // 获取用户最弱的两个技能
    const skillEntries = Object.entries(skillProgress);
    const sortedSkills = skillEntries.sort((a, b) => a[1] - b[1]);
    const weakestSkills = sortedSkills.slice(0, 2).map(entry => entry[0]);

    // 为每个较弱的技能找到合适级别的训练
    for (const skill of weakestSkills) {
      const progress = skillProgress[skill] || 0;
      let recommendedLevel = '基础';

      if (progress < 30) {
        recommendedLevel = '基础';
      } else if (progress < 60) {
        recommendedLevel = '中级';
      } else {
        recommendedLevel = '高级';
      }

      // 根据技能类别获取对应训练
      let skillTrainings = [];
      switch (skill) {
        case 'dribbling':
          skillTrainings = dribblingTrainings || [];
          break;
        case 'shooting':
          skillTrainings = shootingTrainings || [];
          break;
        case 'passing':
          skillTrainings = passingTrainings || [];
          break;
        case 'movement':
          skillTrainings = movementTrainings || [];
          break;
        default:
          skillTrainings = [];
      }

      // 父子训练可以作为基础训练推荐
      if (recommendedLevel === '基础' && parentChildTrainings && parentChildTrainings.length > 0) {
        const relevantParentChildTrainings = parentChildTrainings.filter(t => t.category === skill);
        skillTrainings = [...skillTrainings, ...relevantParentChildTrainings];
      }

      // 从训练数据中筛选推荐的训练
      const matchingTrainings = skillTrainings.filter(t => t.level === recommendedLevel);

      // 添加到推荐列表
      if (matchingTrainings.length > 0) {
        recommendations.push(...matchingTrainings);
      }
    }

    // 如果推荐数量不足，添加父子训练
    if (recommendations.length < count && parentChildTrainings && parentChildTrainings.length > 0) {
      const missingCount = count - recommendations.length;
      const parentChildRecs = parentChildTrainings
        .filter(t => !recommendations.some(r => r.moduleId === t.moduleId))
        .slice(0, missingCount);

      recommendations.push(...parentChildRecs);
    }

    // 如果还是不足，添加任意训练
    if (recommendations.length < count) {
      const allTrainings = getAllTrainings();
      const remainingTrainings = allTrainings
        .filter(t => !recommendations.some(r => r.moduleId === t.moduleId))
        .slice(0, count - recommendations.length);

      recommendations.push(...remainingTrainings);
    }

    // 随机选择推荐数量的训练，或所有匹配的训练
    const shuffled = [...recommendations].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
  };

  // 获取近期训练历史
  const getRecentTrainingHistory = (count = 5) => {
    return trainingHistory.slice(0, count);
  };

  return (
    <TrainingContext.Provider
      value={{
        skillProgress,
        trainingHistory,
        currentTraining,
        currentTrainingDay,
        currentTrainingIndex,
        startTraining,
        updateTrainingProgress,
        completeTraining,
        cancelTraining,
        startTrainingDay,
        completeTrainingDay,
        addTrainingToHistory,
        getSkillLevelDescription,
        getRecommendedTrainings,
        getRecentTrainingHistory,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

// 自定义钩子
export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
};
