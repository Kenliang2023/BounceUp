import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';

// 创建奖励系统上下文
const RewardContext = createContext(null);

// 预设奖励列表
const defaultRewards = [
  {
    id: 'reward1',
    name: '额外30分钟游戏时间',
    description: '完成训练后，获得额外30分钟的游戏时间',
    starCost: 10,
    available: true,
    category: 'screen',
    priority: 'medium',
  },
  {
    id: 'reward2',
    name: '选择一部电影观看',
    description: '可以选择一部父母允许的电影在周末观看',
    starCost: 20,
    available: true,
    category: 'screen',
    priority: 'medium',
  },
  {
    id: 'reward3',
    name: '去公园打篮球',
    description: '周末与父母一起去公园打篮球',
    starCost: 15,
    available: true,
    category: 'activity',
    priority: 'high',
  },
  {
    id: 'reward4',
    name: '篮球周边小物品',
    description: '可以获得一个篮球相关的小物品（手环、头带等）',
    starCost: 30,
    available: true,
    category: 'item',
    priority: 'medium',
  },
  {
    id: 'reward5',
    name: '特别奖励 - 篮球',
    description: '获得一个新篮球（需要完成特定挑战）',
    starCost: 100,
    available: false,
    category: 'special',
    priority: 'top',
  },
];

// 等级系统配置
const levelSystem = [
  { level: 1, name: '新手球员', minStars: 0 },
  { level: 2, name: '初级球员', minStars: 20 },
  { level: 3, name: '有潜力球员', minStars: 50 },
  { level: 4, name: '进阶球员', minStars: 100 },
  { level: 5, name: '熟练球员', minStars: 200 },
  { level: 6, name: '精英球员', minStars: 300 },
  { level: 7, name: '全明星球员', minStars: 500 },
  { level: 8, name: 'MVP球员', minStars: 800 },
];

export const RewardProvider = ({ children }) => {
  const { user, updateUser } = useUser();
  const [rewards, setRewards] = useState([]);
  const [redeemedRewards, setRedeemedRewards] = useState([]);

  // 分类选项
  const categoryOptions = [
    { value: 'default', label: '默认' },
    { value: 'screen', label: '屏幕时间' },
    { value: 'activity', label: '活动' },
    { value: 'item', label: '物品' },
    { value: 'special', label: '特别奖励' },
  ];

  // 优先级选项
  const priorityOptions = [
    { value: 'low', label: '低', color: 'blue' },
    { value: 'medium', label: '中', color: 'green' },
    { value: 'high', label: '高', color: 'orange' },
    { value: 'top', label: '最高', color: 'red' },
  ];

  // 初始化奖励系统
  useEffect(() => {
    // 从本地存储加载奖励数据，如果没有则使用默认值
    const storedRewards = localStorage.getItem('bounceup_rewards');
    const storedRedeemedRewards = localStorage.getItem('bounceup_redeemed_rewards');

    if (storedRewards) {
      setRewards(JSON.parse(storedRewards));
    } else {
      setRewards(defaultRewards);
    }

    if (storedRedeemedRewards) {
      setRedeemedRewards(JSON.parse(storedRedeemedRewards));
    }
  }, []);

  // 保存奖励数据到本地存储
  useEffect(() => {
    if (rewards.length > 0) {
      localStorage.setItem('bounceup_rewards', JSON.stringify(rewards));
    }

    if (redeemedRewards.length > 0) {
      localStorage.setItem('bounceup_redeemed_rewards', JSON.stringify(redeemedRewards));
    }
  }, [rewards, redeemedRewards]);

  // 计算用户当前等级
  useEffect(() => {
    if (!user.totalStars && user.totalStars !== 0) return;

    // 找到用户当前等级
    const currentLevel = [...levelSystem]
      .reverse()
      .find(level => user.totalStars >= level.minStars);

    if (currentLevel && (!user.level || user.level.level !== currentLevel.level)) {
      updateUser({
        ...user,
        level: currentLevel,
      });
    }
  }, [user.totalStars, updateUser, user]);

  // 获取下一个等级
  const getNextLevel = () => {
    if (!user.level) return levelSystem[0];

    const nextLevelIndex = levelSystem.findIndex(level => level.level === user.level.level) + 1;
    if (nextLevelIndex < levelSystem.length) {
      return levelSystem[nextLevelIndex];
    }
    return null;
  };

  // 根据类别获取奖励
  const getRewardsByCategory = category => {
    if (!category || category === 'all') {
      return rewards.filter(r => r.available);
    }

    return rewards.filter(r => r.available && r.category === category);
  };

  // 根据优先级获取奖励
  const getRewardsByPriority = priority => {
    if (!priority || priority === 'all') {
      return rewards.filter(r => r.available);
    }

    return rewards.filter(r => r.available && r.priority === priority);
  };

  // 获取类别标签
  const getCategoryLabel = categoryValue => {
    const category = categoryOptions.find(c => c.value === categoryValue);
    return category ? category.label : '默认';
  };

  // 获取优先级标签
  const getPriorityLabel = priorityValue => {
    const priority = priorityOptions.find(p => p.value === priorityValue);
    return priority ? priority.label : '中';
  };

  // 获取优先级颜色
  const getPriorityColor = priorityValue => {
    const priority = priorityOptions.find(p => p.value === priorityValue);
    return priority ? priority.color : 'green';
  };

  // 兑换奖励
  const redeemReward = rewardId => {
    const reward = rewards.find(r => r.id === rewardId);

    if (!reward) {
      throw new Error('奖励不存在');
    }

    if (!reward.available) {
      throw new Error('此奖励目前不可兑换');
    }

    if (user.totalStars < reward.starCost) {
      throw new Error('星星不足，无法兑换');
    }

    // 扣除星星
    const updatedUser = {
      ...user,
      totalStars: user.totalStars - reward.starCost,
    };

    // 添加到兑换历史
    const redemption = {
      id: `redemption_${Date.now()}`,
      rewardId: reward.id,
      rewardName: reward.name,
      cost: reward.starCost,
      category: reward.category,
      date: new Date().toISOString(),
    };

    // 更新状态
    updateUser(updatedUser);
    setRedeemedRewards([redemption, ...redeemedRewards]);

    return redemption;
  };

  // 添加新奖励
  const addReward = newReward => {
    setRewards([
      ...rewards,
      {
        id: `reward_${Date.now()}`,
        available: true,
        ...newReward,
      },
    ]);
  };

  // 更新奖励
  const updateReward = (rewardId, updatedData) => {
    setRewards(
      rewards.map(reward => (reward.id === rewardId ? { ...reward, ...updatedData } : reward))
    );
  };

  return (
    <RewardContext.Provider
      value={{
        rewards: rewards.filter(r => r.available),
        allRewards: rewards,
        redeemedRewards,
        redeemReward,
        addReward,
        updateReward,
        getNextLevel,
        levelSystem,
        categoryOptions,
        priorityOptions,
        getRewardsByCategory,
        getRewardsByPriority,
        getCategoryLabel,
        getPriorityLabel,
        getPriorityColor,
      }}
    >
      {children}
    </RewardContext.Provider>
  );
};

export const useReward = () => {
  const context = useContext(RewardContext);
  if (!context) {
    throw new Error('useReward must be used within a RewardProvider');
  }
  return context;
};
