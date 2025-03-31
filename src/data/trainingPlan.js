import { 
  dribblingTrainings, 
  shootingTrainings, 
  passingTrainings, 
  movementTrainings,
  parentChildTrainings,
  findTrainingById
} from './allTrainings';

// 训练计划数据结构
// 采用按等级、周和训练日组织的方式
// 每个训练日包含多个训练模块组合

// 星期映射表（用于前端显示）
export const weekDayNames = [
  '周日', '周一', '周二', '周三', '周四', '周五', '周六'
];

// 训练难度等级定义
export const trainingLevels = [
  { 
    id: 1, 
    name: '初学者', 
    description: '基础篮球入门，适合完全没有篮球基础的孩子',
    requiredStars: 0
  },
  { 
    id: 2, 
    name: '新手篮球手', 
    description: '掌握基本的篮球控制和移动技能',
    requiredStars: 20
  },
  { 
    id: 3, 
    name: '进阶球员', 
    description: '能够执行基础的篮球技术组合动作',
    requiredStars: 50
  },
  { 
    id: 4, 
    name: '熟练球手', 
    description: '展示更高级的篮球技能和比赛意识',
    requiredStars: 100
  },
  { 
    id: 5, 
    name: '小小球星', 
    description: '全面掌握儿童篮球技能，展现出色的比赛表现',
    requiredStars: 200
  }
];

// 默认训练频率：每周3次
export const defaultTrainingFrequency = 3;

// 生成训练日标题
const generateTrainingDayTitle = (levelId, weekId, dayId) => {
  const level = trainingLevels.find(l => l.id === levelId) || trainingLevels[0];
  return `${level.name} - 第${weekId}周 训练日${dayId}`;
};

// 生成训练日描述
const generateTrainingDayDescription = (levelId, trainings) => {
  const level = trainingLevels.find(l => l.id === levelId) || trainingLevels[0];
  const categories = [...new Set(trainings.map(t => t.category))];
  
  const categoryNames = {
    dribbling: '运球',
    shooting: '投篮',
    passing: '传球',
    movement: '移动'
  };
  
  const categoryList = categories
    .map(cat => categoryNames[cat] || cat)
    .join('、');
  
  return `${level.name}阶段训练，包含${categoryList}等技能练习，提升综合篮球能力。`;
};

// 计算训练日持续时间
const calculateDuration = (trainings) => {
  return trainings.reduce((total, training) => total + (training.duration || 0), 0);
};

/**
 * 根据等级获取训练计划
 * @param {number} levelId - 训练计划等级ID
 * @return {object} 训练计划
 */
export const getTrainingPlanByLevel = (levelId) => {
  // 确保levelId有效
  const validLevelId = Number(levelId) || 1;
  const level = trainingLevels.find(l => l.id === validLevelId) || trainingLevels[0];
  
  // 根据等级构建训练计划
  // 初学者阶段：着重基础运球和投篮
  // 新手阶段：增加传球和更多运球
  // 进阶阶段：增加移动训练和组合训练
  // 熟练阶段：更复杂的训练组合
  // 小小球星阶段：全面训练
  
  switch (validLevelId) {
    case 1: // 初学者
      return buildLevel1Plan();
    case 2: // 新手篮球手
      return buildLevel2Plan();
    case 3: // 进阶球员
      return buildLevel3Plan();
    case 4: // 熟练球手
      return buildLevel4Plan();
    case 5: // 小小球星
      return buildLevel5Plan();
    default:
      return buildLevel1Plan();
  }
};

// 等级1：初学者训练计划
const buildLevel1Plan = () => {
  // 等级1应该优先父子训练和基础运球训练
  const plan = {
    levelId: 1,
    levelName: trainingLevels[0].name,
    description: trainingLevels[0].description,
    requiredStars: trainingLevels[0].requiredStars,
    nextLevelId: 2,
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(1, 1, 1),
            trainings: [
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day1')
            ],
            duration: 12, // 父子训练日1的持续时间
            description: '初次篮球体验，从控球与协调能力训练开始。父子互动训练，激发篮球兴趣。',
            starReward: 3,
            experienceReward: 15,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(1, 1, 2),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_1')
            ],
            duration: 5, // 运球训练1的持续时间
            description: '巩固基础运球能力，提升手感和控球技巧。重点训练指尖控球和低位运球。',
            starReward: 2,
            experienceReward: 10,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          {
            dayId: 3,
            title: generateTrainingDayTitle(1, 1, 3),
            trainings: [
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day2')
            ],
            duration: 12, // 父子训练日2的持续时间
            description: '控球专项训练与防守意识培养。通过父子互动提高球感和防守基础。',
            starReward: 3,
            experienceReward: 15,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          }
        ]
      },
      {
        weekId: 2,
        weekName: '第2周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(1, 2, 1),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_2')
            ],
            duration: 7, // 运球训练2的持续时间
            description: '进阶运球练习，8字型运球提高手眼协调能力。增强变向控球能力。',
            starReward: 3,
            experienceReward: 15,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(1, 2, 2),
            trainings: [
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day3')
            ],
            duration: 12, // 父子训练日3的持续时间
            description: '上篮专项与节奏控制训练。掌握基础上篮步伐，培养篮球节奏感。',
            starReward: 4,
            experienceReward: 20,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          {
            dayId: 3,
            title: generateTrainingDayTitle(1, 2, 3),
            trainings: [
              shootingTrainings.find(t => t.moduleId === 'shooting_1')
            ],
            duration: 8, // 投篮训练1的持续时间
            description: '学习基础投篮姿势，掌握正确手型和发力方式。从近距离开始练习投篮。',
            starReward: 3,
            experienceReward: 15,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          }
        ]
      },
      {
        weekId: 3,
        weekName: '第3周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(1, 3, 1),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_1'),
              shootingTrainings.find(t => t.moduleId === 'shooting_1')
            ],
            duration: 13, // 运球1(5) + 投篮1(8)
            description: '运球和投篮技能组合训练。巩固基础技能，同时开始培养技能组合能力。',
            starReward: 5,
            experienceReward: 25,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(1, 3, 2),
            trainings: [
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day1'),
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day3')
            ],
            duration: 24, // 父子训练1(12) + 父子训练3(12)
            description: '父子联合训练日。结合控球和上篮技能，强化基础技能掌握。',
            starReward: 7,
            experienceReward: 35,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          {
            dayId: 3,
            title: generateTrainingDayTitle(1, 3, 3),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_2'),
              shootingTrainings.find(t => t.moduleId === 'shooting_1')
            ],
            duration: 15, // 运球2(7) + 投篮1(8)
            description: '综合技能提升训练。结合8字运球和基础投篮，提高技能连贯性。',
            starReward: 6,
            experienceReward: 30,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          }
        ]
      },
      {
        weekId: 4,
        weekName: '第4周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(1, 4, 1),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3')
            ],
            duration: 6, // 运球训练3的持续时间
            description: '变向运球专项训练。学习基本变向技巧，提高控球灵活性和方向变换速度。',
            starReward: 4,
            experienceReward: 20,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(1, 4, 2),
            trainings: [
              shootingTrainings.find(t => t.moduleId === 'shooting_2')
            ],
            duration: 10, // 投篮训练2的持续时间
            description: '罚球线投篮训练。掌握中距离投篮技巧，提高投篮稳定性和节奏感。',
            starReward: 3,
            experienceReward: 15,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          {
            dayId: 3,
            title: '初学者阶段测试',
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_2'),
              shootingTrainings.find(t => t.moduleId === 'shooting_1')
            ],
            duration: 15, // 运球2(7) + 投篮1(8)
            description: '初学者阶段技能综合测试。检验运球和投篮基础技能掌握程度，通过后晋级新手篮球手！',
            starReward: 8,
            experienceReward: 40,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
            isTest: true
          }
        ]
      }
    ]
  };
  
  return plan;
};

// 等级2：新手篮球手训练计划
const buildLevel2Plan = () => {
  // 等级2增加传球和更多运球训练
  const plan = {
    levelId: 2,
    levelName: trainingLevels[1].name,
    description: trainingLevels[1].description,
    requiredStars: trainingLevels[1].requiredStars,
    nextLevelId: 3,
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(2, 1, 1),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              passingTrainings.find(t => t.moduleId === 'passing_1')
            ],
            duration: 18, // 运球3(6) + 传球1(12)
            description: '变向运球与基础传球组合。开始学习基本传球技巧，同时提高变向运球能力。',
            starReward: 7,
            experienceReward: 35,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(2, 1, 2),
            trainings: [
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day3')
            ],
            duration: 22, // 投篮2(10) + 父子训练3(12)
            description: '投篮技巧提升训练。结合罚球线投篮和上篮技巧，全面提高得分能力。',
            starReward: 7,
            experienceReward: 35,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          {
            dayId: 3,
            title: generateTrainingDayTitle(2, 1, 3),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_2'),
              passingTrainings.find(t => t.moduleId === 'passing_1')
            ],
            duration: 19, // 运球2(7) + 传球1(12)
            description: '8字运球与传球结合训练。提高手眼协调能力，增强球感和传球准确性。',
            starReward: 6,
            experienceReward: 30,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          }
        ]
      },
      // 更多周计划内容可以继续添加...
    ]
  };
  
  return plan;
};

// 等级3：进阶球员训练计划
const buildLevel3Plan = () => {
  // 等级3增加移动训练和组合训练
  const plan = {
    levelId: 3,
    levelName: trainingLevels[2].name,
    description: trainingLevels[2].description,
    requiredStars: trainingLevels[2].requiredStars,
    nextLevelId: 4,
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(3, 1, 1),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              movementTrainings.find(t => t.moduleId === 'movement_1')
            ],
            duration: 16, // 运球3(6) + 移动1(10)
            description: '高级运球与防守脚步训练。提高变向运球能力，同时学习基本防守脚步移动。',
            starReward: 7,
            experienceReward: 35,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          // 更多训练日内容...
        ]
      },
      // 更多周计划内容...
    ]
  };
  
  return plan;
};

// 等级4：熟练球手训练计划
const buildLevel4Plan = () => {
  // 等级4包含更复杂的训练组合
  const plan = {
    levelId: 4,
    levelName: trainingLevels[3].name,
    description: trainingLevels[3].description,
    requiredStars: trainingLevels[3].requiredStars,
    nextLevelId: 5,
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(4, 1, 1),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
              movementTrainings.find(t => t.moduleId === 'movement_1')
            ],
            duration: 26, // 运球3(6) + 投篮2(10) + 移动1(10)
            description: '综合技术训练日。结合高级运球、中距离投篮和防守移动技术，提高比赛实战能力。',
            starReward: 10,
            experienceReward: 50,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          // 更多训练日内容...
        ]
      },
      // 更多周计划内容...
    ]
  };
  
  return plan;
};

// 等级5：小小球星训练计划
const buildLevel5Plan = () => {
  // 等级5应该是全面训练
  const plan = {
    levelId: 5,
    levelName: trainingLevels[4].name,
    description: trainingLevels[4].description,
    requiredStars: trainingLevels[4].requiredStars,
    nextLevelId: null, // 最高等级
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(5, 1, 1),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
              passingTrainings.find(t => t.moduleId === 'passing_2'),
              movementTrainings.find(t => t.moduleId === 'movement_2')
            ],
            duration: 43, // 运球3(6) + 投篮2(10) + 传球2(15) + 移动2(12)
            description: '全面技术挑战训练。整合所有核心篮球技能，模拟比赛情境，全面提升球场表现。',
            starReward: 15,
            experienceReward: 75,
            isCompleted: false,
            isPending: false,
            scheduledDate: null
          },
          // 更多训练日内容...
        ]
      },
      // 更多周计划内容...
    ]
  };
  
  return plan;
};

// 获取所有训练等级
export const getAllTrainingLevels = () => {
  return trainingLevels;
};

// 根据星星数量获取当前等级
export const getCurrentLevelByStars = (stars) => {
  const sortedLevels = [...trainingLevels].sort((a, b) => b.requiredStars - a.requiredStars);
  for (const level of sortedLevels) {
    if (stars >= level.requiredStars) {
      return level;
    }
  }
  return trainingLevels[0]; // 默认返回第一个等级
};

// 获取指定等级的下一个等级
export const getNextLevel = (currentLevelId) => {
  const currentIndex = trainingLevels.findIndex(level => level.id === currentLevelId);
  if (currentIndex >= 0 && currentIndex < trainingLevels.length - 1) {
    return trainingLevels[currentIndex + 1];
  }
  return null; // 如果当前是最高等级，则返回null
};

// 获取训练日完成后奖励的星星数量
export const getTrainingDayReward = (levelId, trainings) => {
  // 基础奖励：等级 × 1星
  const baseReward = levelId || 1;
  
  // 训练模块数量奖励：每个模块1星
  const moduleReward = trainings?.length || 0;
  
  // 总时长奖励：每10分钟1星
  const durationReward = Math.floor((calculateDuration(trainings || []) || 0) / 10);
  
  return baseReward + moduleReward + durationReward;
};

// 导出主要功能
export default {
  getTrainingPlanByLevel,
  getCurrentLevelByStars,
  getNextLevel,
  getAllTrainingLevels,
  trainingLevels,
  weekDayNames,
  defaultTrainingFrequency
};
