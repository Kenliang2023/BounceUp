// 训练模板 - 用于自动生成适合不同用户的训练计划
import {
  dribblingTrainings,
  shootingTrainings,
  passingTrainings,
  movementTrainings,
  parentChildTrainings,
} from './allTrainings';
import { generateTrainingDayByDuration } from './trainingPlan';

// 训练计划模板类型
const TEMPLATE_TYPES = {
  BEGINNER: 'beginner', // 初学者
  INTERMEDIATE: 'intermediate', // 中级
  ADVANCED: 'advanced', // 高级
  DRIBBLING_FOCUS: 'dribbling_focus', // 运球专注
  SHOOTING_FOCUS: 'shooting_focus', // 投篮专注
  PASSING_FOCUS: 'passing_focus', // 传球专注
  MOVEMENT_FOCUS: 'movement_focus', // 移动专注
  PARENT_CHILD: 'parent_child', // 父子互动专注
  BALANCED: 'balanced', // 平衡全面
  QUICK: 'quick', // 快速训练
  INTENSIVE: 'intensive', // 强化训练
};

// 可用训练频率选项
const FREQUENCY_OPTIONS = [
  { value: 1, label: '每周1次', description: '适合课业繁忙或刚开始训练的儿童' },
  { value: 2, label: '每周2次', description: '适合有一定时间但不充裕的儿童' },
  { value: 3, label: '每周3次', description: '推荐频率，能够保持技能成长和兴趣' },
  { value: 4, label: '每周4次', description: '适合热爱篮球且有较多空闲时间的儿童' },
  { value: 5, label: '每周5次', description: '强化训练频率，适合有明确目标的儿童' },
  { value: 6, label: '每周6次', description: '准专业训练频率，需要高度投入' },
  { value: 7, label: '每天训练', description: '最密集的训练安排，需要充分的时间保障' },
];

// 训练时长选项 (分钟)
const DURATION_OPTIONS = [
  { value: 10, label: '10分钟', description: '超短训练，适合注意力非常有限的时候' },
  { value: 15, label: '15分钟', description: '短时训练，快速提升专注力' },
  { value: 20, label: '20分钟', description: '标准训练，平衡训练效果和注意力' },
  { value: 30, label: '30分钟', description: '完整训练，全面提升技能' },
  { value: 45, label: '45分钟', description: '延长训练，适合状态良好时' },
  { value: 60, label: '60分钟', description: '完整训练课，需要中间休息' },
];

// 根据不同的用户特征和需求创建不同的训练计划模板
const trainingTemplates = {
  // 初学者模板 - 着重基础运球和父子互动
  [TEMPLATE_TYPES.BEGINNER]: {
    name: '初学者训练计划',
    description: '适合没有篮球基础的孩子，注重培养兴趣和基本控球能力',
    recommendedFrequency: 2,
    recommendedDuration: 15,
    difficultyLevel: 1,
    focusAreas: ['dribbling', 'parent_child'],
    getTrainings: level => {
      return {
        // 周一 - 父子互动
        1: {
          trainings: [parentChildTrainings.find(t => t.moduleId === 'parent_child_day1')],
          title: '父子互动训练 - 控球与协调',
          description: '控球基础训练，由父亲引导完成，培养兴趣和基本技能',
        },
        // 周三 - 基础运球
        3: {
          trainings: [dribblingTrainings.find(t => t.moduleId === 'dribbling_1')],
          title: '基础运球技能',
          description: '巩固基础运球能力，提升手感和控球技巧',
        },
        // 周六 - 父子互动 + 简单投篮
        6: {
          trainings: [parentChildTrainings.find(t => t.moduleId === 'parent_child_day3')],
          title: '父子互动 - 上篮入门',
          description: '学习上篮基本步伐，培养球感和节奏感',
        },
      };
    },
  },

  // 运球专注模板 - 适合需要提高运球技能的用户
  [TEMPLATE_TYPES.DRIBBLING_FOCUS]: {
    name: '运球专项训练计划',
    description: '专注于提高运球技能，适合运球基础薄弱的孩子',
    recommendedFrequency: 3,
    recommendedDuration: 20,
    difficultyLevel: 2,
    focusAreas: ['dribbling'],
    getTrainings: level => {
      return {
        // 周一 - 基础运球
        1: {
          trainings: [
            dribblingTrainings.find(t => t.moduleId === 'dribbling_1'),
            dribblingTrainings.find(t => t.moduleId === 'dribbling_2'),
          ],
          title: '运球基础强化',
          description: '通过多种基础运球训练提高控球稳定性',
        },
        // 周三 - 变向运球
        3: {
          trainings: [dribblingTrainings.find(t => t.moduleId === 'dribbling_3')],
          title: '变向运球专项',
          description: '学习基本变向技巧，提高控球灵活性',
        },
        // 周五 - 运球组合
        5: {
          trainings: [
            dribblingTrainings.find(t => t.moduleId === 'dribbling_2'),
            dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
          ],
          title: '运球技能组合',
          description: '练习不同运球技巧的组合应用',
        },
      };
    },
  },

  // 投篮专注模板 - 适合需要提高投篮技能的用户
  [TEMPLATE_TYPES.SHOOTING_FOCUS]: {
    name: '投篮专项训练计划',
    description: '专注于提高投篮技能，适合投篮准确度低的孩子',
    recommendedFrequency: 3,
    recommendedDuration: 20,
    difficultyLevel: 2,
    focusAreas: ['shooting'],
    getTrainings: level => {
      return {
        // 周二 - 基础投篮
        2: {
          trainings: [shootingTrainings.find(t => t.moduleId === 'shooting_1')],
          title: '投篮基础训练',
          description: '学习正确的投篮姿势和手型',
        },
        // 周四 - 中距离投篮
        4: {
          trainings: [shootingTrainings.find(t => t.moduleId === 'shooting_2')],
          title: '中距离投篮训练',
          description: '练习中距离投篮技巧，提高准确性',
        },
        // 周六 - 组合投篮
        6: {
          trainings: [
            shootingTrainings.find(t => t.moduleId === 'shooting_1'),
            shootingTrainings.find(t => t.moduleId === 'shooting_2'),
          ],
          title: '组合投篮训练',
          description: '综合练习不同距离的投篮技巧',
        },
      };
    },
  },

  // 父子互动专注模板 - 适合需要加强父子互动的用户
  [TEMPLATE_TYPES.PARENT_CHILD]: {
    name: '父子互动训练计划',
    description: '专注于父子共同参与的训练，增强亲子关系的同时提高篮球技能',
    recommendedFrequency: 2,
    recommendedDuration: 25,
    difficultyLevel: 1,
    focusAreas: ['parent_child'],
    getTrainings: level => {
      return {
        // 周三 - 控球与协调
        3: {
          trainings: [parentChildTrainings.find(t => t.moduleId === 'parent_child_day1')],
          title: '父子互动 - 控球与协调',
          description: '父子共同完成的控球训练，增进互动的同时提高球感',
        },
        // 周六 - 控球专项与抢球
        6: {
          trainings: [parentChildTrainings.find(t => t.moduleId === 'parent_child_day2')],
          title: '父子互动 - 控球与抢断',
          description: '通过趣味性的抢球游戏提高控球能力和反应速度',
        },
        // 周日 - 上篮专项
        0: {
          trainings: [parentChildTrainings.find(t => t.moduleId === 'parent_child_day3')],
          title: '父子互动 - 上篮训练',
          description: '学习基本上篮技巧，配合父亲辅助完成',
        },
      };
    },
  },

  // 平衡全面模板 - 适合需要全面提高的用户
  [TEMPLATE_TYPES.BALANCED]: {
    name: '平衡全面训练计划',
    description: '平衡发展各项篮球技能，适合需要全面提高的孩子',
    recommendedFrequency: 4,
    recommendedDuration: 25,
    difficultyLevel: 3,
    focusAreas: ['dribbling', 'shooting', 'passing', 'movement'],
    getTrainings: level => {
      return {
        // 周一 - 运球训练
        1: {
          trainings: [dribblingTrainings.find(t => t.moduleId === 'dribbling_3')],
          title: '运球技能训练',
          description: '提高运球能力和控球技巧',
        },
        // 周三 - 投篮训练
        3: {
          trainings: [shootingTrainings.find(t => t.moduleId === 'shooting_2')],
          title: '投篮技能训练',
          description: '提高投篮准确度和稳定性',
        },
        // 周五 - 传球训练
        5: {
          trainings: [passingTrainings.find(t => t.moduleId === 'passing_1')],
          title: '传球技能训练',
          description: '学习基本传球技巧，提高传球准确性',
        },
        // 周六 - 移动训练
        6: {
          trainings: [movementTrainings.find(t => t.moduleId === 'movement_1')],
          title: '移动技能训练',
          description: '提高移动速度和灵活性，学习防守脚步',
        },
      };
    },
  },

  // 快速训练模板 - 适合时间有限的用户
  [TEMPLATE_TYPES.QUICK]: {
    name: '快速训练计划',
    description: '短时间高效训练，适合时间有限但想保持训练的孩子',
    recommendedFrequency: 5,
    recommendedDuration: 10,
    difficultyLevel: 2,
    focusAreas: ['dribbling', 'shooting'],
    getTrainings: level => {
      // 为每天创建一个快速训练
      const trainings = {};

      // 周一到周五的快速训练
      for (let i = 1; i <= 5; i++) {
        let trainingContent;

        // 基于周几分配不同的训练内容
        switch (i) {
          case 1: // 周一 - 运球快速训练
            trainingContent = {
              trainings: [dribblingTrainings.find(t => t.moduleId === 'dribbling_1')],
              title: '运球快速训练',
              description: '10分钟运球技能强化',
            };
            break;
          case 2: // 周二 - 投篮快速训练
            trainingContent = {
              trainings: [shootingTrainings.find(t => t.moduleId === 'shooting_1')],
              title: '投篮快速训练',
              description: '10分钟投篮技能强化',
            };
            break;
          case 3: // 周三 - 变向运球快速训练
            trainingContent = {
              trainings: [dribblingTrainings.find(t => t.moduleId === 'dribbling_3')],
              title: '变向运球快速训练',
              description: '10分钟变向运球技能强化',
            };
            break;
          case 4: // 周四 - 中距离投篮快速训练
            trainingContent = {
              trainings: [shootingTrainings.find(t => t.moduleId === 'shooting_2')],
              title: '中距离投篮快速训练',
              description: '10分钟中距离投篮技能强化',
            };
            break;
          case 5: // 周五 - 综合技能快速训练
            trainingContent = {
              trainings: [dribblingTrainings.find(t => t.moduleId === 'dribbling_2')],
              title: '综合技能快速训练',
              description: '10分钟综合技能强化',
            };
            break;
        }

        trainings[i] = trainingContent;
      }

      return trainings;
    },
  },
};

/**
 * 根据用户特征和偏好推荐合适的训练计划模板
 * @param {Object} userProfile - 用户档案信息
 * @param {number} userProfile.level - 用户当前等级
 * @param {number} userProfile.age - 用户年龄
 * @param {string[]} userProfile.interests - 用户兴趣领域
 * @param {Object} userProfile.skillLevels - 各项技能水平
 * @param {Object} preferences - 用户训练偏好
 * @param {number} preferences.frequency - 期望的训练频率
 * @param {number} preferences.duration - 期望的训练时长
 * @param {string[]} preferences.focusAreas - 希望重点提高的领域
 * @returns {string} 推荐的训练模板类型
 */
export const recommendTrainingTemplate = (userProfile, preferences) => {
  // 默认模板：平衡全面
  let recommendedTemplate = TEMPLATE_TYPES.BALANCED;

  // 基于等级的推荐
  if (userProfile.level <= 2) {
    recommendedTemplate = TEMPLATE_TYPES.BEGINNER;
  }

  // 基于技能水平的推荐 - 找出最弱的技能
  const skillLevels = userProfile.skillLevels || {};
  let weakestSkill = null;
  let lowestLevel = Infinity;

  Object.entries(skillLevels).forEach(([skill, level]) => {
    if (level < lowestLevel) {
      lowestLevel = level;
      weakestSkill = skill;
    }
  });

  // 基于最弱技能推荐专项训练
  if (weakestSkill) {
    switch (weakestSkill) {
      case 'dribbling':
        recommendedTemplate = TEMPLATE_TYPES.DRIBBLING_FOCUS;
        break;
      case 'shooting':
        recommendedTemplate = TEMPLATE_TYPES.SHOOTING_FOCUS;
        break;
      case 'passing':
        recommendedTemplate = TEMPLATE_TYPES.PASSING_FOCUS;
        break;
      case 'movement':
        recommendedTemplate = TEMPLATE_TYPES.MOVEMENT_FOCUS;
        break;
    }
  }

  // 考虑用户的偏好设置
  if (preferences) {
    // 基于偏好的焦点区域
    if (preferences.focusAreas && preferences.focusAreas.length > 0) {
      if (preferences.focusAreas.includes('parent_child')) {
        recommendedTemplate = TEMPLATE_TYPES.PARENT_CHILD;
      }
    }

    // 基于时间偏好
    if (preferences.frequency && preferences.duration) {
      // 时间有限但频率高的用户适合快速训练
      if (preferences.frequency >= 4 && preferences.duration <= 15) {
        recommendedTemplate = TEMPLATE_TYPES.QUICK;
      }
    }
  }

  return recommendedTemplate;
};

/**
 * 生成完整训练计划
 * @param {string} templateType - 训练模板类型
 * @param {Object} userProfile - 用户档案信息
 * @param {Object} preferences - 用户偏好设置(可选)
 * @param {number} daysToSchedule - 计划天数(默认14天)
 * @returns {Object} 生成的训练计划
 */
export const generateTrainingPlan = (
  templateType,
  userProfile,
  preferences = {},
  daysToSchedule = 14
) => {
  // 获取模板
  const template = trainingTemplates[templateType] || trainingTemplates[TEMPLATE_TYPES.BALANCED];

  // 确定训练频率和时长
  const frequency = preferences.frequency || template.recommendedFrequency;
  const duration = preferences.duration || template.recommendedDuration;

  // 获取模板的训练内容配置
  const templateTrainings = template.getTrainings(userProfile.level);

  // 创建从今天开始的日期数组
  const today = new Date();
  const scheduleDates = [];

  for (let i = 0; i < daysToSchedule; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    scheduleDates.push(date);
  }

  // 根据训练频率筛选合适的训练日期
  const trainingDates = scheduleDates.filter(date => {
    const dayOfWeek = date.getDay(); // 0-6, 0是周日

    // 检查这一天是否有训练内容
    return templateTrainings[dayOfWeek] !== undefined;
  });

  // 如果计划的训练日数量超过了频率，则进行裁剪
  const adjustedTrainingDates = trainingDates.slice(0, frequency);

  // 生成最终的训练计划
  const generatedPlan = {
    name: template.name,
    description: template.description,
    level: userProfile.level,
    frequency,
    duration,
    trainingDays: [],
  };

  // 为每个训练日创建详细内容
  adjustedTrainingDates.forEach((date, index) => {
    const dayOfWeek = date.getDay();
    const templateDay = templateTrainings[dayOfWeek];

    if (templateDay) {
      // 创建训练日对象
      const trainingDay = {
        id: `generated_training_${Date.now()}_${index}`,
        scheduledDate: date.toISOString(),
        title: templateDay.title,
        description: templateDay.description,
        trainings: templateDay.trainings,
        duration: templateDay.trainings.reduce((total, t) => total + (t.duration || 0), 0),
        starReward: Math.ceil(duration / 5), // 每5分钟1星
        isPending: true,
        isCompleted: false,
        isCustom: true,
        levelId: userProfile.level,
        weekId: 1,
        dayId: index + 1,
      };

      generatedPlan.trainingDays.push(trainingDay);
    }
  });

  return generatedPlan;
};

/**
 * 根据特定的重点项生成自定义训练内容
 * @param {string} focus - 训练重点 ('dribbling', 'shooting', 'passing', 'movement', 'parent_child')
 * @param {number} duration - 训练时长
 * @param {number} level - 用户等级
 * @returns {Object} 生成的训练内容
 */
export const generateFocusedTraining = (focus, duration, level) => {
  // 根据重点选择相应的训练内容
  let availableTrainings = [];
  let title = '';
  let description = '';

  switch (focus) {
    case 'dribbling':
      availableTrainings = dribblingTrainings;
      title = '运球专项训练';
      description = '专注提升运球技能和控球能力';
      break;
    case 'shooting':
      availableTrainings = shootingTrainings;
      title = '投篮专项训练';
      description = '专注提升投篮准确度和技巧';
      break;
    case 'passing':
      availableTrainings = passingTrainings;
      title = '传球专项训练';
      description = '专注提升传球准确性和技巧';
      break;
    case 'movement':
      availableTrainings = movementTrainings;
      title = '移动专项训练';
      description = '专注提升移动速度和灵活性';
      break;
    case 'parent_child':
      availableTrainings = parentChildTrainings;
      title = '父子互动训练';
      description = '与父亲一起完成的互动训练，增进亲子关系';
      break;
    default:
      // 混合所有训练类型
      availableTrainings = [
        ...dribblingTrainings,
        ...shootingTrainings,
        ...passingTrainings,
        ...movementTrainings,
      ];
      title = '综合能力训练';
      description = '全面提升各项篮球技能';
  }

  // 根据等级筛选适合的训练
  if (level <= 3) {
    // 低等级只用基础训练
    availableTrainings = availableTrainings.filter(t => t.level === '基础');
  } else if (level <= 7) {
    // 中等级可以用基础和中级训练
    availableTrainings = availableTrainings.filter(t => t.level === '基础' || t.level === '中级');
  }

  // 根据时长选择合适数量的训练
  const count = Math.max(1, Math.floor(duration / 15)); // 每个训练大约15分钟

  // 随机选择训练
  const shuffled = [...availableTrainings].sort(() => 0.5 - Math.random());
  const selectedTrainings = shuffled.slice(0, count);

  // 计算实际时长
  const actualDuration = selectedTrainings.reduce((total, t) => total + (t.duration || 0), 0);

  return {
    title: `${title} (${duration}分钟)`,
    description,
    trainings: selectedTrainings,
    duration: actualDuration,
    starReward: Math.ceil(duration / 5), // 每5分钟1星
  };
};

export { TEMPLATE_TYPES, FREQUENCY_OPTIONS, DURATION_OPTIONS, trainingTemplates };

export default {
  recommendTrainingTemplate,
  generateTrainingPlan,
  generateFocusedTraining,
  TEMPLATE_TYPES,
  FREQUENCY_OPTIONS,
  DURATION_OPTIONS,
};
