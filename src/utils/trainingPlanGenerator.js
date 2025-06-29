// 训练计划生成器
import {
  generateTrainingPlan,
  recommendTrainingTemplate,
  generateFocusedTraining,
  TEMPLATE_TYPES,
} from '../data/trainingTemplates';
import { getCurrentLevelByStars } from '../data/trainingPlan';

/**
 * 根据用户信息自动生成训练计划
 * @param {Object} user - 用户信息
 * @param {Object} preferences - 用户偏好设置
 * @param {number} daysAhead - 要生成计划的天数
 * @returns {Object} 生成的训练计划
 */
export const generateAutomaticTrainingPlan = (user, preferences = {}, daysAhead = 14) => {
  if (!user) return null;

  // 构建用户档案
  const userProfile = {
    level: user.level || 1,
    age: user.age || 8,
    totalStars: user.totalStars || 0,
    skillLevels: user.skillLevels || {
      dribbling: 1,
      shooting: 1,
      passing: 1,
      movement: 1,
    },
    interests: user.interests || [],
  };

  // 获取当前等级
  const currentLevel = getCurrentLevelByStars(user.totalStars || 0);
  userProfile.level = currentLevel.id;

  // 推荐最适合的训练模板
  const templateType = recommendTrainingTemplate(userProfile, preferences);

  // 生成训练计划
  return generateTrainingPlan(templateType, userProfile, preferences, daysAhead);
};

/**
 * 为用户的薄弱技能生成专项训练计划
 * @param {Object} user - 用户信息
 * @param {Object} preferences - 用户偏好设置
 * @param {number} daysAhead - 要生成计划的天数
 * @returns {Object} 生成的训练计划
 */
export const generateWeaknessTrainingPlan = (user, preferences = {}, daysAhead = 14) => {
  if (!user || !user.skillLevels) return null;

  // 找出最弱的技能
  const skillLevels = user.skillLevels;
  let weakestSkill = null;
  let lowestLevel = Infinity;

  Object.entries(skillLevels).forEach(([skill, level]) => {
    if (level < lowestLevel) {
      lowestLevel = level;
      weakestSkill = skill;
    }
  });

  // 如果找不到明显的弱项，使用平衡模板
  const templateType = weakestSkill ? getTemplateForSkill(weakestSkill) : TEMPLATE_TYPES.BALANCED;

  // 构建用户档案
  const userProfile = {
    level: user.level || 1,
    age: user.age || 8,
    totalStars: user.totalStars || 0,
    skillLevels,
    interests: user.interests || [],
  };

  // 获取当前等级
  const currentLevel = getCurrentLevelByStars(user.totalStars || 0);
  userProfile.level = currentLevel.id;

  // 在偏好中强制设置关注领域为弱项技能
  const enhancedPreferences = {
    ...preferences,
    focusAreas: [weakestSkill],
  };

  // 生成训练计划
  return generateTrainingPlan(templateType, userProfile, enhancedPreferences, daysAhead);
};

/**
 * 根据技能类型获取对应的训练模板
 * @param {string} skill - 技能类型
 * @returns {string} 训练模板类型
 */
const getTemplateForSkill = skill => {
  switch (skill) {
    case 'dribbling':
      return TEMPLATE_TYPES.DRIBBLING_FOCUS;
    case 'shooting':
      return TEMPLATE_TYPES.SHOOTING_FOCUS;
    case 'passing':
      return TEMPLATE_TYPES.PASSING_FOCUS;
    case 'movement':
      return TEMPLATE_TYPES.MOVEMENT_FOCUS;
    default:
      return TEMPLATE_TYPES.BALANCED;
  }
};

/**
 * 为用户生成今日建议训练
 * @param {Object} user - 用户信息
 * @param {number} duration - 训练时长
 * @returns {Object} 生成的训练内容
 */
export const generateTodayRecommendedTraining = (user, duration = 20) => {
  if (!user) return null;

  // 获取当前等级
  const currentLevel = getCurrentLevelByStars(user.totalStars || 0);
  const level = currentLevel.id;

  // 如果有技能数据，则为最弱技能生成专项训练
  if (user.skillLevels) {
    // 找出最弱的技能
    const skillLevels = user.skillLevels;
    let weakestSkill = null;
    let lowestLevel = Infinity;

    Object.entries(skillLevels).forEach(([skill, level]) => {
      if (level < lowestLevel) {
        lowestLevel = level;
        weakestSkill = skill;
      }
    });

    if (weakestSkill) {
      return generateFocusedTraining(weakestSkill, duration, level);
    }
  }

  // 默认生成平衡的训练
  return generateFocusedTraining('balanced', duration, level);
};

/**
 * 生成一周的推荐训练计划
 * @param {Object} user - 用户信息
 * @param {Object} preferences - 用户偏好设置
 * @returns {Array} 一周的训练计划
 */
export const generateWeeklyRecommendation = (user, preferences = {}) => {
  // 获取完整的训练计划
  const plan = generateAutomaticTrainingPlan(user, preferences, 7);

  if (!plan) return [];

  // 返回训练日列表
  return plan.trainingDays;
};

export default {
  generateAutomaticTrainingPlan,
  generateWeaknessTrainingPlan,
  generateTodayRecommendedTraining,
  generateWeeklyRecommendation,
};
