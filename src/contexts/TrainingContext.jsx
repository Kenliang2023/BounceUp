import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';

// 导入所有训练数据
import dribblingTrainings from '../data/training/dribbling';
import shootingTrainings from '../data/training/shooting';
import passingTrainings from '../data/training/passing';
import movementTrainings from '../data/training/movement';
import parentChildTrainings from '../data/training/parentchild';

// 创建上下文
const TrainingContext = createContext(null);

// 默认技能进度
const defaultSkillProgress = {
  dribbling: 0,
  shooting: 0,
  passing: 0,
  movement: 0,
  parent_child: 0
};

// 提供者组件
export const TrainingProvider = ({ children }) => {
  const { user, addStars } = useUser();
  const [skillProgress, setSkillProgress] = useState(defaultSkillProgress);
  const [trainingHistory, setTrainingHistory] = useState([]);
  const [currentTraining, setCurrentTraining] = useState(null);
  
  // 合并所有训练数据
  const allTrainings = [
    ...dribblingTrainings,
    ...shootingTrainings,
    ...passingTrainings,
    ...movementTrainings,
    ...parentChildTrainings
  ];
  
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
  }, []);
  
  // 当训练数据变化时保存到localStorage
  useEffect(() => {
    localStorage.setItem('bounceup_skill_progress', JSON.stringify(skillProgress));
  }, [skillProgress]);
  
  useEffect(() => {
    localStorage.setItem('bounceup_training_history', JSON.stringify(trainingHistory));
  }, [trainingHistory]);
  
  // 开始训练
  const startTraining = (trainingId) => {
    // 查找训练数据
    const training = allTrainings.find(t => t.moduleId === trainingId);
    
    if (!training) {
      throw new Error('训练不存在');
    }
    
    setCurrentTraining({
      ...training,
      startTime: new Date().toISOString(),
      progress: 0
    });
    
    return training;
  };
  
  // 更新当前训练进度
  const updateTrainingProgress = (progress) => {
    if (!currentTraining) {
      throw new Error('没有正在进行的训练');
    }
    
    setCurrentTraining(prev => ({
      ...prev,
      progress: Math.min(100, Math.max(0, progress))
    }));
  };
  
  // 完成训练
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
      date: trainingEndTime
    };
    
    // 更新训练历史
    setTrainingHistory(prev => [trainingRecord, ...prev]);
    
    // 更新技能进度
    updateSkillProgress(currentTraining.category, score);
    
    // 添加星星奖励
    addStars(earnedStars);
    
    // 重置当前训练
    setCurrentTraining(null);
    
    return {
      record: trainingRecord,
      earnedStars
    };
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
        [category]: newProgress
      };
    });
  };
  
  // 获取技能等级描述
  const getSkillLevelDescription = (skillName) => {
    const progress = skillProgress[skillName] || 0;
    
    if (progress < 20) return '初学者';
    if (progress < 40) return '基础';
    if (progress < 60) return '进阶';
    if (progress < 80) return '熟练';
    return '专家';
  };
  
  // 取消当前训练
  const cancelTraining = () => {
    setCurrentTraining(null);
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
      let recommendedLevel;
      
      if (progress < 30) {
        recommendedLevel = '基础';
      } else if (progress < 60) {
        recommendedLevel = '中级';
      } else {
        recommendedLevel = '高级';
      }
      
      // 根据技能找到对应的训练数据
      let skillTrainings = [];
      if (skill === 'dribbling') {
        skillTrainings = [...dribblingTrainings, ...parentChildTrainings.filter(t => t.category === 'dribbling')];
      } else if (skill === 'shooting') {
        skillTrainings = [...shootingTrainings, ...parentChildTrainings.filter(t => t.category === 'shooting')];
      } else if (skill === 'passing') {
        skillTrainings = passingTrainings;
      } else if (skill === 'movement') {
        skillTrainings = movementTrainings;
      } else if (skill === 'parent_child') {
        skillTrainings = parentChildTrainings;
      }
      
      // 从训练数据中筛选推荐的训练
      const matchingTrainings = skillTrainings.filter(
        t => t.level === recommendedLevel
      );
      
      // 添加到推荐列表
      if (matchingTrainings.length > 0) {
        recommendations.push(...matchingTrainings);
      }
    }
    
    // 如果推荐数量不足，添加一些父子训练
    if (recommendations.length < count) {
      const missingCount = count - recommendations.length;
      const parentChildRecs = parentChildTrainings
        .filter(t => !recommendations.includes(t))
        .slice(0, missingCount);
      
      recommendations.push(...parentChildRecs);
    }
    
    // 随机选择推荐数量的训练，或所有匹配的训练
    const shuffled = [...recommendations].sort(() => 0.5 - Math.random());
    
    return shuffled.slice(0, count);
  };
  
  return (
    <TrainingContext.Provider
      value={{
        skillProgress,
        trainingHistory,
        currentTraining,
        startTraining,
        updateTrainingProgress,
        completeTraining,
        cancelTraining,
        getSkillLevelDescription,
        getRecommendedTrainings
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