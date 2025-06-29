// 成就系统数据模型

// 成就类别
export const achievementCategories = {
  TRAINING: 'training', // 训练相关成就
  SKILLS: 'skills', // 技能相关成就
  STREAK: 'streak', // 连续训练相关成就
  SPECIAL: 'special', // 特殊成就
};

// 成就稀有度
export const achievementRarity = {
  COMMON: 'common', // 普通成就
  UNCOMMON: 'uncommon', // 少见成就
  RARE: 'rare', // 稀有成就
  EPIC: 'epic', // 史诗成就
  LEGENDARY: 'legendary', // 传奇成就
};

// 成就图标与颜色
export const rarityConfig = {
  [achievementRarity.COMMON]: {
    color: 'gray',
    icon: '🏆',
    starReward: 5,
  },
  [achievementRarity.UNCOMMON]: {
    color: 'green',
    icon: '🏅',
    starReward: 10,
  },
  [achievementRarity.RARE]: {
    color: 'blue',
    icon: '🥇',
    starReward: 20,
  },
  [achievementRarity.EPIC]: {
    color: 'purple',
    icon: '👑',
    starReward: 30,
  },
  [achievementRarity.LEGENDARY]: {
    color: 'gold',
    icon: '⭐',
    starReward: 50,
  },
};

// 成就列表
const achievements = [
  // 训练相关成就
  {
    id: 'first_training',
    title: '第一步',
    description: '完成你的第一次训练',
    category: achievementCategories.TRAINING,
    rarity: achievementRarity.COMMON,
    condition: stats => stats.totalCompletedTrainings >= 1,
    progressDescription: stats => `${Math.min(stats.totalCompletedTrainings, 1)}/1 次训练`,
    progressValue: stats => Math.min(stats.totalCompletedTrainings / 1, 1),
    reward: {
      type: 'stars',
      value: 5,
    },
  },
  {
    id: 'training_beginner',
    title: '训练新手',
    description: '完成5次训练',
    category: achievementCategories.TRAINING,
    rarity: achievementRarity.COMMON,
    condition: stats => stats.totalCompletedTrainings >= 5,
    progressDescription: stats => `${Math.min(stats.totalCompletedTrainings, 5)}/5 次训练`,
    progressValue: stats => Math.min(stats.totalCompletedTrainings / 5, 1),
    reward: {
      type: 'stars',
      value: 10,
    },
  },
  {
    id: 'training_enthusiast',
    title: '训练热爱者',
    description: '完成15次训练',
    category: achievementCategories.TRAINING,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => stats.totalCompletedTrainings >= 15,
    progressDescription: stats => `${Math.min(stats.totalCompletedTrainings, 15)}/15 次训练`,
    progressValue: stats => Math.min(stats.totalCompletedTrainings / 15, 1),
    reward: {
      type: 'stars',
      value: 15,
    },
  },
  {
    id: 'training_master',
    title: '训练大师',
    description: '完成30次训练',
    category: achievementCategories.TRAINING,
    rarity: achievementRarity.RARE,
    condition: stats => stats.totalCompletedTrainings >= 30,
    progressDescription: stats => `${Math.min(stats.totalCompletedTrainings, 30)}/30 次训练`,
    progressValue: stats => Math.min(stats.totalCompletedTrainings / 30, 1),
    reward: {
      type: 'stars',
      value: 25,
    },
  },
  {
    id: 'training_legend',
    title: '训练传奇',
    description: '完成50次训练',
    category: achievementCategories.TRAINING,
    rarity: achievementRarity.EPIC,
    condition: stats => stats.totalCompletedTrainings >= 50,
    progressDescription: stats => `${Math.min(stats.totalCompletedTrainings, 50)}/50 次训练`,
    progressValue: stats => Math.min(stats.totalCompletedTrainings / 50, 1),
    reward: {
      type: 'stars',
      value: 40,
    },
  },

  // 技能相关成就
  {
    id: 'dribbling_rookie',
    title: '运球新手',
    description: '运球技能达到25%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.COMMON,
    condition: stats => stats.skillProgress.dribbling >= 25,
    progressDescription: stats => `${Math.min(stats.skillProgress.dribbling, 25)}/25%`,
    progressValue: stats => Math.min(stats.skillProgress.dribbling / 25, 1),
    reward: {
      type: 'stars',
      value: 5,
    },
  },
  {
    id: 'dribbling_pro',
    title: '运球达人',
    description: '运球技能达到50%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => stats.skillProgress.dribbling >= 50,
    progressDescription: stats => `${Math.min(stats.skillProgress.dribbling, 50)}/50%`,
    progressValue: stats => Math.min(stats.skillProgress.dribbling / 50, 1),
    reward: {
      type: 'stars',
      value: 10,
    },
  },
  {
    id: 'dribbling_master',
    title: '运球大师',
    description: '运球技能达到75%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.RARE,
    condition: stats => stats.skillProgress.dribbling >= 75,
    progressDescription: stats => `${Math.min(stats.skillProgress.dribbling, 75)}/75%`,
    progressValue: stats => Math.min(stats.skillProgress.dribbling / 75, 1),
    reward: {
      type: 'stars',
      value: 20,
    },
  },
  {
    id: 'shooting_rookie',
    title: '投篮新手',
    description: '投篮技能达到25%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.COMMON,
    condition: stats => stats.skillProgress.shooting >= 25,
    progressDescription: stats => `${Math.min(stats.skillProgress.shooting, 25)}/25%`,
    progressValue: stats => Math.min(stats.skillProgress.shooting / 25, 1),
    reward: {
      type: 'stars',
      value: 5,
    },
  },
  {
    id: 'shooting_pro',
    title: '投篮达人',
    description: '投篮技能达到50%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => stats.skillProgress.shooting >= 50,
    progressDescription: stats => `${Math.min(stats.skillProgress.shooting, 50)}/50%`,
    progressValue: stats => Math.min(stats.skillProgress.shooting / 50, 1),
    reward: {
      type: 'stars',
      value: 10,
    },
  },
  {
    id: 'shooting_master',
    title: '投篮大师',
    description: '投篮技能达到75%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.RARE,
    condition: stats => stats.skillProgress.shooting >= 75,
    progressDescription: stats => `${Math.min(stats.skillProgress.shooting, 75)}/75%`,
    progressValue: stats => Math.min(stats.skillProgress.shooting / 75, 1),
    reward: {
      type: 'stars',
      value: 20,
    },
  },
  {
    id: 'passing_rookie',
    title: '传球新手',
    description: '传球技能达到25%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.COMMON,
    condition: stats => stats.skillProgress.passing >= 25,
    progressDescription: stats => `${Math.min(stats.skillProgress.passing, 25)}/25%`,
    progressValue: stats => Math.min(stats.skillProgress.passing / 25, 1),
    reward: {
      type: 'stars',
      value: 5,
    },
  },
  {
    id: 'passing_pro',
    title: '传球达人',
    description: '传球技能达到50%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => stats.skillProgress.passing >= 50,
    progressDescription: stats => `${Math.min(stats.skillProgress.passing, 50)}/50%`,
    progressValue: stats => Math.min(stats.skillProgress.passing / 50, 1),
    reward: {
      type: 'stars',
      value: 10,
    },
  },
  {
    id: 'passing_master',
    title: '传球大师',
    description: '传球技能达到75%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.RARE,
    condition: stats => stats.skillProgress.passing >= 75,
    progressDescription: stats => `${Math.min(stats.skillProgress.passing, 75)}/75%`,
    progressValue: stats => Math.min(stats.skillProgress.passing / 75, 1),
    reward: {
      type: 'stars',
      value: 20,
    },
  },
  {
    id: 'movement_rookie',
    title: '移动新手',
    description: '移动技能达到25%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.COMMON,
    condition: stats => stats.skillProgress.movement >= 25,
    progressDescription: stats => `${Math.min(stats.skillProgress.movement, 25)}/25%`,
    progressValue: stats => Math.min(stats.skillProgress.movement / 25, 1),
    reward: {
      type: 'stars',
      value: 5,
    },
  },
  {
    id: 'movement_pro',
    title: '移动达人',
    description: '移动技能达到50%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => stats.skillProgress.movement >= 50,
    progressDescription: stats => `${Math.min(stats.skillProgress.movement, 50)}/50%`,
    progressValue: stats => Math.min(stats.skillProgress.movement / 50, 1),
    reward: {
      type: 'stars',
      value: 10,
    },
  },
  {
    id: 'movement_master',
    title: '移动大师',
    description: '移动技能达到75%',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.RARE,
    condition: stats => stats.skillProgress.movement >= 75,
    progressDescription: stats => `${Math.min(stats.skillProgress.movement, 75)}/75%`,
    progressValue: stats => Math.min(stats.skillProgress.movement / 75, 1),
    reward: {
      type: 'stars',
      value: 20,
    },
  },
  {
    id: 'all_skills_25',
    title: '全能球员',
    description: '所有技能均达到25%以上',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => {
      return (
        stats.skillProgress.dribbling >= 25 &&
        stats.skillProgress.shooting >= 25 &&
        stats.skillProgress.passing >= 25 &&
        stats.skillProgress.movement >= 25
      );
    },
    progressDescription: stats => {
      const count = [
        stats.skillProgress.dribbling >= 25,
        stats.skillProgress.shooting >= 25,
        stats.skillProgress.passing >= 25,
        stats.skillProgress.movement >= 25,
      ].filter(Boolean).length;
      return `${count}/4 项技能达到 25%`;
    },
    progressValue: stats => {
      const count = [
        stats.skillProgress.dribbling >= 25,
        stats.skillProgress.shooting >= 25,
        stats.skillProgress.passing >= 25,
        stats.skillProgress.movement >= 25,
      ].filter(Boolean).length;
      return count / 4;
    },
    reward: {
      type: 'stars',
      value: 15,
    },
  },
  {
    id: 'all_skills_50',
    title: '篮球全才',
    description: '所有技能均达到50%以上',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.RARE,
    condition: stats => {
      return (
        stats.skillProgress.dribbling >= 50 &&
        stats.skillProgress.shooting >= 50 &&
        stats.skillProgress.passing >= 50 &&
        stats.skillProgress.movement >= 50
      );
    },
    progressDescription: stats => {
      const count = [
        stats.skillProgress.dribbling >= 50,
        stats.skillProgress.shooting >= 50,
        stats.skillProgress.passing >= 50,
        stats.skillProgress.movement >= 50,
      ].filter(Boolean).length;
      return `${count}/4 项技能达到 50%`;
    },
    progressValue: stats => {
      const count = [
        stats.skillProgress.dribbling >= 50,
        stats.skillProgress.shooting >= 50,
        stats.skillProgress.passing >= 50,
        stats.skillProgress.movement >= 50,
      ].filter(Boolean).length;
      return count / 4;
    },
    reward: {
      type: 'stars',
      value: 30,
    },
  },
  {
    id: 'all_skills_75',
    title: '篮球大师',
    description: '所有技能均达到75%以上',
    category: achievementCategories.SKILLS,
    rarity: achievementRarity.EPIC,
    condition: stats => {
      return (
        stats.skillProgress.dribbling >= 75 &&
        stats.skillProgress.shooting >= 75 &&
        stats.skillProgress.passing >= 75 &&
        stats.skillProgress.movement >= 75
      );
    },
    progressDescription: stats => {
      const count = [
        stats.skillProgress.dribbling >= 75,
        stats.skillProgress.shooting >= 75,
        stats.skillProgress.passing >= 75,
        stats.skillProgress.movement >= 75,
      ].filter(Boolean).length;
      return `${count}/4 项技能达到 75%`;
    },
    progressValue: stats => {
      const count = [
        stats.skillProgress.dribbling >= 75,
        stats.skillProgress.shooting >= 75,
        stats.skillProgress.passing >= 75,
        stats.skillProgress.movement >= 75,
      ].filter(Boolean).length;
      return count / 4;
    },
    reward: {
      type: 'stars',
      value: 50,
    },
  },

  // 连续训练相关成就
  {
    id: 'streak_2',
    title: '热身阶段',
    description: '连续2天完成训练',
    category: achievementCategories.STREAK,
    rarity: achievementRarity.COMMON,
    condition: stats => stats.currentStreak >= 2,
    progressDescription: stats => `${Math.min(stats.currentStreak, 2)}/2 天`,
    progressValue: stats => Math.min(stats.currentStreak / 2, 1),
    reward: {
      type: 'stars',
      value: 5,
    },
  },
  {
    id: 'streak_5',
    title: '坚持不懈',
    description: '连续5天完成训练',
    category: achievementCategories.STREAK,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => stats.currentStreak >= 5,
    progressDescription: stats => `${Math.min(stats.currentStreak, 5)}/5 天`,
    progressValue: stats => Math.min(stats.currentStreak / 5, 1),
    reward: {
      type: 'stars',
      value: 15,
    },
  },
  {
    id: 'streak_7',
    title: '习惯养成',
    description: '连续7天完成训练',
    category: achievementCategories.STREAK,
    rarity: achievementRarity.RARE,
    condition: stats => stats.currentStreak >= 7,
    progressDescription: stats => `${Math.min(stats.currentStreak, 7)}/7 天`,
    progressValue: stats => Math.min(stats.currentStreak / 7, 1),
    reward: {
      type: 'stars',
      value: 25,
    },
  },
  {
    id: 'streak_14',
    title: '训练达人',
    description: '连续14天完成训练',
    category: achievementCategories.STREAK,
    rarity: achievementRarity.EPIC,
    condition: stats => stats.currentStreak >= 14,
    progressDescription: stats => `${Math.min(stats.currentStreak, 14)}/14 天`,
    progressValue: stats => Math.min(stats.currentStreak / 14, 1),
    reward: {
      type: 'stars',
      value: 40,
    },
  },
  {
    id: 'streak_30',
    title: '训练传奇',
    description: '连续30天完成训练',
    category: achievementCategories.STREAK,
    rarity: achievementRarity.LEGENDARY,
    condition: stats => stats.currentStreak >= 30,
    progressDescription: stats => `${Math.min(stats.currentStreak, 30)}/30 天`,
    progressValue: stats => Math.min(stats.currentStreak / 30, 1),
    reward: {
      type: 'stars',
      value: 100,
    },
  },

  // 特殊成就
  {
    id: 'perfect_score',
    title: '完美训练',
    description: '获得5分满分评价',
    category: achievementCategories.SPECIAL,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => stats.perfectScores >= 1,
    progressDescription: stats => `${Math.min(stats.perfectScores, 1)}/1 次满分`,
    progressValue: stats => Math.min(stats.perfectScores / 1, 1),
    reward: {
      type: 'stars',
      value: 10,
    },
  },
  {
    id: 'multiple_perfect',
    title: '完美主义者',
    description: '获得5次5分满分评价',
    category: achievementCategories.SPECIAL,
    rarity: achievementRarity.RARE,
    condition: stats => stats.perfectScores >= 5,
    progressDescription: stats => `${Math.min(stats.perfectScores, 5)}/5 次满分`,
    progressValue: stats => Math.min(stats.perfectScores / 5, 1),
    reward: {
      type: 'stars',
      value: 25,
    },
  },
  {
    id: 'level_5',
    title: '初级篮球手',
    description: '达到等级5',
    category: achievementCategories.SPECIAL,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => stats.currentLevel >= 5,
    progressDescription: stats => `等级 ${Math.min(stats.currentLevel, 5)}/5`,
    progressValue: stats => Math.min(stats.currentLevel / 5, 1),
    reward: {
      type: 'stars',
      value: 20,
    },
  },
  {
    id: 'level_10',
    title: '篮球小达人',
    description: '达到最高等级10',
    category: achievementCategories.SPECIAL,
    rarity: achievementRarity.LEGENDARY,
    condition: stats => stats.currentLevel >= 10,
    progressDescription: stats => `等级 ${Math.min(stats.currentLevel, 10)}/10`,
    progressValue: stats => Math.min(stats.currentLevel / 10, 1),
    reward: {
      type: 'stars',
      value: 50,
    },
  },
  {
    id: 'parent_child',
    title: '亲子互动',
    description: '完成5次父子互动训练',
    category: achievementCategories.SPECIAL,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => stats.parentChildTrainings >= 5,
    progressDescription: stats => `${Math.min(stats.parentChildTrainings, 5)}/5 次训练`,
    progressValue: stats => Math.min(stats.parentChildTrainings / 5, 1),
    reward: {
      type: 'stars',
      value: 15,
    },
  },
  {
    id: 'parent_child_master',
    title: '亲子篮球达人',
    description: '完成15次父子互动训练',
    category: achievementCategories.SPECIAL,
    rarity: achievementRarity.RARE,
    condition: stats => stats.parentChildTrainings >= 15,
    progressDescription: stats => `${Math.min(stats.parentChildTrainings, 15)}/15 次训练`,
    progressValue: stats => Math.min(stats.parentChildTrainings / 15, 1),
    reward: {
      type: 'stars',
      value: 30,
    },
  },
  {
    id: 'custom_trainings',
    title: '定制训练',
    description: '完成5次自定义时长训练',
    category: achievementCategories.SPECIAL,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => stats.customTrainings >= 5,
    progressDescription: stats => `${Math.min(stats.customTrainings, 5)}/5 次训练`,
    progressValue: stats => Math.min(stats.customTrainings / 5, 1),
    reward: {
      type: 'stars',
      value: 15,
    },
  },
  {
    id: 'star_collector',
    title: '星星收集者',
    description: '累计获得100颗星星',
    category: achievementCategories.SPECIAL,
    rarity: achievementRarity.UNCOMMON,
    condition: stats => stats.totalStars >= 100,
    progressDescription: stats => `${Math.min(stats.totalStars, 100)}/100 颗星星`,
    progressValue: stats => Math.min(stats.totalStars / 100, 1),
    reward: {
      type: 'stars',
      value: 20,
    },
  },
  {
    id: 'star_hoarder',
    title: '星星囤积者',
    description: '累计获得300颗星星',
    category: achievementCategories.SPECIAL,
    rarity: achievementRarity.RARE,
    condition: stats => stats.totalStars >= 300,
    progressDescription: stats => `${Math.min(stats.totalStars, 300)}/300 颗星星`,
    progressValue: stats => Math.min(stats.totalStars / 300, 1),
    reward: {
      type: 'stars',
      value: 30,
    },
  },
  {
    id: 'star_millionaire',
    title: '星星大亨',
    description: '累计获得500颗星星',
    category: achievementCategories.SPECIAL,
    rarity: achievementRarity.EPIC,
    condition: stats => stats.totalStars >= 500,
    progressDescription: stats => `${Math.min(stats.totalStars, 500)}/500 颗星星`,
    progressValue: stats => Math.min(stats.totalStars / 500, 1),
    reward: {
      type: 'stars',
      value: 50,
    },
  },
];

export default achievements;
