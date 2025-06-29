import {
  dribblingTrainings,
  shootingTrainings,
  passingTrainings,
  movementTrainings,
  parentChildTrainings,
  findTrainingById,
  getAllTrainings,
} from './allTrainings';

// 训练计划数据结构
// 采用按等级、周和训练日组织的方式
// 每个训练日包含多个训练模块组合

// 星期映射表（用于前端显示）
export const weekDayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

// 训练难度等级定义 - 扩展更多等级，更细化的进步阶梯
export const trainingLevels = [
  {
    id: 1,
    name: '初学者',
    description: '基础篮球入门，适合完全没有篮球基础的孩子',
    requiredStars: 0,
    icon: '🏀',
    color: 'blue',
    reward: {
      name: '篮球小助手徽章',
      description: '你获得了第一个徽章！这是开启篮球之旅的第一步',
    },
  },
  {
    id: 2,
    name: '运球新手',
    description: '掌握基本的篮球控制和原地运球技能',
    requiredStars: 15,
    icon: '👆',
    color: 'green',
    reward: {
      name: '运球小能手证书',
      description: '恭喜你掌握了基本运球技能！',
    },
  },
  {
    id: 3,
    name: '投篮学徒',
    description: '学习基础投篮姿势和技巧',
    requiredStars: 30,
    icon: '🎯',
    color: 'red',
    reward: {
      name: '投篮学徒勋章',
      description: '你的投篮技术正在进步！',
    },
  },
  {
    id: 4,
    name: '传球能手',
    description: '练习各种传球技巧和准确性',
    requiredStars: 45,
    icon: '👐',
    color: 'purple',
    reward: {
      name: '传球小专家玩偶',
      description: '你可以获得一个篮球传球小专家玩偶！',
    },
  },
  {
    id: 5,
    name: '敏捷球员',
    description: '提高移动速度和灵活性，学习防守脚步',
    requiredStars: 60,
    icon: '👟',
    color: 'orange',
    reward: {
      name: '敏捷运动员墙贴',
      description: '可以在你的房间贴上这个特殊的墙贴，展示你的进步！',
    },
  },
  {
    id: 6,
    name: '技巧组合手',
    description: '开始练习技能组合，运球+投篮、运球+传球等',
    requiredStars: 75,
    icon: '🔄',
    color: 'teal',
    reward: {
      name: '技巧小球星徽章',
      description: '你的技巧越来越全面了！',
    },
  },
  {
    id: 7,
    name: '比赛观察员',
    description: '培养比赛意识，观察场上情况，做出正确决策',
    requiredStars: 90,
    icon: '👀',
    color: 'indigo',
    reward: {
      name: '观察小鹰证书',
      description: '你的比赛观察力得到了认可！',
    },
  },
  {
    id: 8,
    name: '团队合作者',
    description: '学习团队配合，与父亲或朋友一起训练',
    requiredStars: 110,
    icon: '👨‍👦',
    color: 'yellow',
    reward: {
      name: '团队合作小书包',
      description: '这个特别的小书包是给懂得团队合作的队员的！',
    },
  },
  {
    id: 9,
    name: '小小比赛手',
    description: '参与简单比赛，实践所学技能',
    requiredStars: 130,
    icon: '🏆',
    color: 'amber',
    reward: {
      name: '比赛小英雄奖杯',
      description: '你的第一个小小比赛奖杯！',
    },
  },
  {
    id: 10,
    name: '篮球小达人',
    description: '全面掌握儿童篮球技能，展现出色的比赛表现',
    requiredStars: 150,
    icon: '⭐',
    color: 'gold',
    reward: {
      name: '篮球小达人套装',
      description: '恭喜你！完成了所有训练，获得终极奖励：篮球小达人特别礼盒！',
    },
  },
];

// 默认训练频率：每周3次
export const defaultTrainingFrequency = 3;

// 训练时长选项（分钟）
export const trainingDurationOptions = [
  { value: 10, label: '10分钟', description: '超短训练，适合注意力非常有限的时候' },
  { value: 15, label: '15分钟', description: '短时训练，快速提升专注力' },
  { value: 20, label: '20分钟', description: '标准训练，平衡训练效果和注意力' },
  { value: 30, label: '30分钟', description: '完整训练，全面提升技能' },
  { value: 45, label: '45分钟', description: '延长训练，适合状态良好时' },
  { value: 60, label: '60分钟', description: '完整训练课，需要中间休息' },
];

// 根据时长和训练类型获取合适的训练数量
export const getTrainingCountByDuration = duration => {
  if (duration <= 10) return 1;
  if (duration <= 20) return 2;
  if (duration <= 30) return 3;
  if (duration <= 45) return 4;
  return 5; // 60分钟
};

// 获取适合指定时长的训练组合
export const getTrainingsForDuration = (allTrainings, duration, level) => {
  const count = getTrainingCountByDuration(duration);

  // 按等级过滤训练
  let filteredTrainings = allTrainings;
  if (level <= 3) {
    // 低等级只用基础训练
    filteredTrainings = allTrainings.filter(t => t.level === '基础');
  } else if (level <= 7) {
    // 中等级可以用基础和中级训练
    filteredTrainings = allTrainings.filter(t => t.level === '基础' || t.level === '中级');
  }

  // 选择训练，尽量让总时长接近但不超过指定时长
  let selectedTrainings = [];
  let currentDuration = 0;

  // 随机打乱训练列表，确保多样性
  const shuffled = [...filteredTrainings].sort(() => 0.5 - Math.random());

  for (const training of shuffled) {
    if (selectedTrainings.length >= count) break;

    const newDuration = currentDuration + (training.duration || 0);
    if (newDuration <= duration) {
      selectedTrainings.push(training);
      currentDuration = newDuration;
    }
  }

  return selectedTrainings;
};

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
    movement: '移动',
  };

  const categoryList = categories.map(cat => categoryNames[cat] || cat).join('、');

  return `${level.name}阶段训练，包含${categoryList}等技能练习，提升综合篮球能力。`;
};

// 计算训练日持续时间
const calculateDuration = trainings => {
  return trainings.reduce((total, training) => total + (training.duration || 0), 0);
};

/**
 * 根据等级获取训练计划
 * @param {number} levelId - 训练计划等级ID
 * @return {object} 训练计划
 */
export const getTrainingPlanByLevel = levelId => {
  // 确保levelId有效
  const validLevelId = Number(levelId) || 1;
  const level = trainingLevels.find(l => l.id === validLevelId) || trainingLevels[0];

  // 根据等级构建训练计划
  // 初学者阶段：着重基础运球和投篮
  // 逐级提升，增加更多技能组合

  switch (validLevelId) {
    case 1: // 初学者
      return buildLevel1Plan();
    case 2: // 运球新手
      return buildLevel2Plan();
    case 3: // 投篮学徒
      return buildLevel3Plan();
    case 4: // 传球能手
      return buildLevel4Plan();
    case 5: // 敏捷球员
      return buildLevel5Plan();
    case 6: // 技巧组合手
      return buildLevel6Plan();
    case 7: // 比赛观察员
      return buildLevel7Plan();
    case 8: // 团队合作者
      return buildLevel8Plan();
    case 9: // 小小比赛手
      return buildLevel9Plan();
    case 10: // 篮球小达人
      return buildLevel10Plan();
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
    reward: trainingLevels[0].reward,
    icon: trainingLevels[0].icon,
    color: trainingLevels[0].color,
    nextLevelId: 2,
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(1, 1, 1),
            trainings: [parentChildTrainings.find(t => t.moduleId === 'parent_child_day1')],
            duration: 12, // 父子训练日1的持续时间
            description: '初次篮球体验，从控球与协调能力训练开始。父子互动训练，激发篮球兴趣。',
            starReward: 3,
            experienceReward: 15,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(1, 1, 2),
            trainings: [dribblingTrainings.find(t => t.moduleId === 'dribbling_1')],
            duration: 5, // 运球训练1的持续时间
            description: '巩固基础运球能力，提升手感和控球技巧。重点训练指尖控球和低位运球。',
            starReward: 2,
            experienceReward: 10,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 3,
            title: generateTrainingDayTitle(1, 1, 3),
            trainings: [parentChildTrainings.find(t => t.moduleId === 'parent_child_day2')],
            duration: 12, // 父子训练日2的持续时间
            description: '控球专项训练与防守意识培养。通过父子互动提高球感和防守基础。',
            starReward: 3,
            experienceReward: 15,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
        ],
      },
      {
        weekId: 2,
        weekName: '第2周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(1, 2, 1),
            trainings: [dribblingTrainings.find(t => t.moduleId === 'dribbling_2')],
            duration: 7, // 运球训练2的持续时间
            description: '进阶运球练习，8字型运球提高手眼协调能力。增强变向控球能力。',
            starReward: 3,
            experienceReward: 15,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(1, 2, 2),
            trainings: [parentChildTrainings.find(t => t.moduleId === 'parent_child_day3')],
            duration: 12, // 父子训练日3的持续时间
            description: '上篮专项与节奏控制训练。掌握基础上篮步伐，培养篮球节奏感。',
            starReward: 4,
            experienceReward: 20,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 3,
            title: generateTrainingDayTitle(1, 2, 3),
            trainings: [shootingTrainings.find(t => t.moduleId === 'shooting_1')],
            duration: 8, // 投篮训练1的持续时间
            description: '学习基础投篮姿势，掌握正确手型和发力方式。从近距离开始练习投篮。',
            starReward: 3,
            experienceReward: 15,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
        ],
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
              shootingTrainings.find(t => t.moduleId === 'shooting_1'),
            ],
            duration: 13, // 运球1(5) + 投篮1(8)
            description: '运球和投篮技能组合训练。巩固基础技能，同时开始培养技能组合能力。',
            starReward: 5,
            experienceReward: 25,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(1, 3, 2),
            trainings: [
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day1'),
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day3'),
            ],
            duration: 24, // 父子训练1(12) + 父子训练3(12)
            description: '父子联合训练日。结合控球和上篮技能，强化基础技能掌握。',
            starReward: 7,
            experienceReward: 35,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 3,
            title: generateTrainingDayTitle(1, 3, 3),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_2'),
              shootingTrainings.find(t => t.moduleId === 'shooting_1'),
            ],
            duration: 15, // 运球2(7) + 投篮1(8)
            description: '综合技能提升训练。结合8字运球和基础投篮，提高技能连贯性。',
            starReward: 6,
            experienceReward: 30,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
        ],
      },
      {
        weekId: 4,
        weekName: '第4周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(1, 4, 1),
            trainings: [dribblingTrainings.find(t => t.moduleId === 'dribbling_3')],
            duration: 6, // 运球训练3的持续时间
            description: '变向运球专项训练。学习基本变向技巧，提高控球灵活性和方向变换速度。',
            starReward: 4,
            experienceReward: 20,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(1, 4, 2),
            trainings: [shootingTrainings.find(t => t.moduleId === 'shooting_2')],
            duration: 10, // 投篮训练2的持续时间
            description: '罚球线投篮训练。掌握中距离投篮技巧，提高投篮稳定性和节奏感。',
            starReward: 3,
            experienceReward: 15,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 3,
            title: '初学者阶段测试',
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_2'),
              shootingTrainings.find(t => t.moduleId === 'shooting_1'),
            ],
            duration: 15, // 运球2(7) + 投篮1(8)
            description:
              '初学者阶段技能综合测试。检验运球和投篮基础技能掌握程度，通过后晋级运球新手！',
            starReward: 8,
            experienceReward: 40,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
            isTest: true,
          },
        ],
      },
    ],
  };

  return plan;
};

// 等级2：运球新手训练计划
const buildLevel2Plan = () => {
  // 等级2增加更多运球训练和基础传球
  const plan = {
    levelId: 2,
    levelName: trainingLevels[1].name,
    description: trainingLevels[1].description,
    requiredStars: trainingLevels[1].requiredStars,
    reward: trainingLevels[1].reward,
    icon: trainingLevels[1].icon,
    color: trainingLevels[1].color,
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
              dribblingTrainings.find(t => t.moduleId === 'dribbling_1'),
            ],
            duration: 11, // 运球3(6) + 运球1(5)
            description: '进阶运球技巧训练。提高变向和基础控球能力。',
            starReward: 5,
            experienceReward: 25,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(2, 1, 2),
            trainings: [
              shootingTrainings.find(t => t.moduleId === 'shooting_1'),
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day3'),
            ],
            duration: 20, // 投篮1(8) + 父子训练3(12)
            description: '投篮与上篮组合训练。既练习定点投篮，又练习移动上篮技巧。',
            starReward: 6,
            experienceReward: 30,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 3,
            title: generateTrainingDayTitle(2, 1, 3),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_2'),
              passingTrainings.find(t => t.moduleId === 'passing_1'),
            ],
            duration: 19, // 运球2(7) + 传球1(12)
            description: '运球与传球结合训练。掌握8字运球技巧，同时学习基础传球方法。',
            starReward: 6,
            experienceReward: 30,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
        ],
      },
      // 更多周计划可以继续添加...
      {
        weekId: 2,
        weekName: '第2周',
        trainingDays: [
          {
            dayId: 1,
            title: '运球新手阶段测试',
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              dribblingTrainings.find(t => t.moduleId === 'dribbling_2'),
              passingTrainings.find(t => t.moduleId === 'passing_1'),
            ],
            duration: 25, // 运球3(6) + 运球2(7) + 传球1(12)
            description: '运球新手阶段测试。检验你的运球和传球能力，完成测试晋级为投篮学徒！',
            starReward: 9,
            experienceReward: 45,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
            isTest: true,
          },
        ],
      },
    ],
  };

  return plan;
};

// 等级3：投篮学徒训练计划
const buildLevel3Plan = () => {
  // 投篮学徒阶段，重点增加投篮训练
  const plan = {
    levelId: 3,
    levelName: trainingLevels[2].name,
    description: trainingLevels[2].description,
    requiredStars: trainingLevels[2].requiredStars,
    reward: trainingLevels[2].reward,
    icon: trainingLevels[2].icon,
    color: trainingLevels[2].color,
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
              shootingTrainings.find(t => t.moduleId === 'shooting_1'),
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
            ],
            duration: 18, // 投篮1(8) + 投篮2(10)
            description: '投篮专项训练。结合基础投篮和中距离投篮练习，全面提升投篮能力。',
            starReward: 6,
            experienceReward: 30,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(3, 1, 2),
            trainings: [
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day3'),
              shootingTrainings.find(t => t.moduleId === 'shooting_1'),
            ],
            duration: 20, // 父子训练3(12) + 投篮1(8)
            description: '上篮与投篮结合训练。通过父子互动提高上篮和投篮技巧。',
            starReward: 7,
            experienceReward: 35,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 3,
            title: generateTrainingDayTitle(3, 1, 3),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_2'),
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
            ],
            duration: 17, // 运球2(7) + 投篮2(10)
            description: '运球后投篮训练。学习运球后迅速进入投篮动作的连贯性。',
            starReward: 6,
            experienceReward: 30,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
        ],
      },
      {
        weekId: 2,
        weekName: '第2周',
        trainingDays: [
          {
            dayId: 1,
            title: '投篮学徒阶段测试',
            trainings: [
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              shootingTrainings.find(t => t.moduleId === 'shooting_1'),
            ],
            duration: 24, // 投篮2(10) + 运球3(6) + 投篮1(8)
            description: '投篮学徒阶段测试。检验你的投篮准确性和技巧，通过后晋级为传球能手！',
            starReward: 9,
            experienceReward: 45,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
            isTest: true,
          },
        ],
      },
    ],
  };

  return plan;
};

// 等级4：传球能手训练计划
const buildLevel4Plan = () => {
  // 传球能手阶段，重点增加传球训练
  const plan = {
    levelId: 4,
    levelName: trainingLevels[3].name,
    description: trainingLevels[3].description,
    requiredStars: trainingLevels[3].requiredStars,
    reward: trainingLevels[3].reward,
    icon: trainingLevels[3].icon,
    color: trainingLevels[3].color,
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
              passingTrainings.find(t => t.moduleId === 'passing_1'),
              passingTrainings.find(t => t.moduleId === 'passing_2'),
            ],
            duration: 27, // 传球1(12) + 传球2(15)
            description: '传球专项训练。学习各种传球技巧，提高传球准确性和力度控制。',
            starReward: 8,
            experienceReward: 40,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(4, 1, 2),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              passingTrainings.find(t => t.moduleId === 'passing_1'),
            ],
            duration: 18, // 运球3(6) + 传球1(12)
            description: '运球与传球结合训练。练习运球后迅速完成传球的衔接。',
            starReward: 6,
            experienceReward: 30,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 3,
            title: '传球能手阶段测试',
            trainings: [
              passingTrainings.find(t => t.moduleId === 'passing_1'),
              passingTrainings.find(t => t.moduleId === 'passing_2'),
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
            ],
            duration: 33, // 传球1(12) + 传球2(15) + 运球3(6)
            description: '传球能手阶段测试。检验你的各种传球技巧和准确性，通过后晋级为敏捷球员！',
            starReward: 10,
            experienceReward: 50,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
            isTest: true,
          },
        ],
      },
    ],
  };

  return plan;
};

// 等级5：敏捷球员训练计划
const buildLevel5Plan = () => {
  // 敏捷球员阶段，重点增加移动训练
  const plan = {
    levelId: 5,
    levelName: trainingLevels[4].name,
    description: trainingLevels[4].description,
    requiredStars: trainingLevels[4].requiredStars,
    reward: trainingLevels[4].reward,
    icon: trainingLevels[4].icon,
    color: trainingLevels[4].color,
    nextLevelId: 6,
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(5, 1, 1),
            trainings: [
              movementTrainings.find(t => t.moduleId === 'movement_1'),
              movementTrainings.find(t => t.moduleId === 'movement_2'),
            ],
            duration: 22, // 移动1(10) + 移动2(12)
            description: '移动专项训练。学习篮球基本脚步和起跳落地技巧，提高移动速度和灵活性。',
            starReward: 8,
            experienceReward: 40,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(5, 1, 2),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              movementTrainings.find(t => t.moduleId === 'movement_1'),
            ],
            duration: 16, // 运球3(6) + 移动1(10)
            description: '移动中运球训练。练习在移动中控制篮球，提高协调性。',
            starReward: 6,
            experienceReward: 30,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 3,
            title: '敏捷球员阶段测试',
            trainings: [
              movementTrainings.find(t => t.moduleId === 'movement_1'),
              movementTrainings.find(t => t.moduleId === 'movement_2'),
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
            ],
            duration: 28, // 移动1(10) + 移动2(12) + 运球3(6)
            description: '敏捷球员阶段测试。检验你的移动能力和灵活性，通过后晋级为技巧组合手！',
            starReward: 10,
            experienceReward: 50,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
            isTest: true,
          },
        ],
      },
    ],
  };

  return plan;
};

// 等级6：技巧组合手训练计划
const buildLevel6Plan = () => {
  // 技巧组合手阶段，重点增加技能组合训练
  const plan = {
    levelId: 6,
    levelName: trainingLevels[5].name,
    description: trainingLevels[5].description,
    requiredStars: trainingLevels[5].requiredStars,
    reward: trainingLevels[5].reward,
    icon: trainingLevels[5].icon,
    color: trainingLevels[5].color,
    nextLevelId: 7,
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(6, 1, 1),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
            ],
            duration: 16, // 运球3(6) + 投篮2(10)
            description: '运球后投篮组合训练。提高运球到投篮的转换速度和流畅度。',
            starReward: 6,
            experienceReward: 30,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: generateTrainingDayTitle(6, 1, 2),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              passingTrainings.find(t => t.moduleId === 'passing_2'),
            ],
            duration: 21, // 运球3(6) + 传球2(15)
            description: '运球后传球组合训练。练习运球后快速传球的时机和准确性。',
            starReward: 7,
            experienceReward: 35,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 3,
            title: generateTrainingDayTitle(6, 1, 3),
            trainings: [
              movementTrainings.find(t => t.moduleId === 'movement_1'),
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
            ],
            duration: 20, // 移动1(10) + 投篮2(10)
            description: '移动后投篮组合训练。练习在移动后迅速站稳并完成投篮。',
            starReward: 7,
            experienceReward: 35,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
        ],
      },
      {
        weekId: 2,
        weekName: '第2周',
        trainingDays: [
          {
            dayId: 1,
            title: '技巧组合手阶段测试',
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
              passingTrainings.find(t => t.moduleId === 'passing_2'),
              movementTrainings.find(t => t.moduleId === 'movement_1'),
            ],
            duration: 41, // 运球3(6) + 投篮2(10) + 传球2(15) + 移动1(10)
            description: '技巧组合手阶段测试。检验你的各项技能组合能力，通过后晋级为比赛观察员！',
            starReward: 12,
            experienceReward: 60,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
            isTest: true,
          },
        ],
      },
    ],
  };

  return plan;
};

// 等级7：比赛观察员训练计划
const buildLevel7Plan = () => {
  const plan = {
    levelId: 7,
    levelName: trainingLevels[6].name,
    description: trainingLevels[6].description,
    requiredStars: trainingLevels[6].requiredStars,
    reward: trainingLevels[6].reward,
    icon: trainingLevels[6].icon,
    color: trainingLevels[6].color,
    nextLevelId: 8,
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(7, 1, 1),
            trainings: [
              // 这里可以加观察训练，暂时用现有训练代替
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              passingTrainings.find(t => t.moduleId === 'passing_2'),
            ],
            duration: 21,
            description: '场上观察力训练。提高对场上情况的观察和判断能力。',
            starReward: 7,
            experienceReward: 35,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: '比赛观察员阶段测试',
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              passingTrainings.find(t => t.moduleId === 'passing_2'),
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
            ],
            duration: 31,
            description:
              '比赛观察员阶段测试。测试你的比赛观察能力和决策能力，通过后晋级为团队合作者！',
            starReward: 12,
            experienceReward: 60,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
            isTest: true,
          },
        ],
      },
    ],
  };

  return plan;
};

// 等级8：团队合作者训练计划
const buildLevel8Plan = () => {
  const plan = {
    levelId: 8,
    levelName: trainingLevels[7].name,
    description: trainingLevels[7].description,
    requiredStars: trainingLevels[7].requiredStars,
    reward: trainingLevels[7].reward,
    icon: trainingLevels[7].icon,
    color: trainingLevels[7].color,
    nextLevelId: 9,
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(8, 1, 1),
            trainings: [
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day1'),
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day2'),
            ],
            duration: 24,
            description: '父子配合训练。提高与队友（父亲）的配合能力和默契。',
            starReward: 8,
            experienceReward: 40,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: '团队合作者阶段测试',
            trainings: [
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day1'),
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day3'),
              passingTrainings.find(t => t.moduleId === 'passing_2'),
            ],
            duration: 39,
            description: '团队合作者阶段测试。检验你的团队合作能力，通过后晋级为小小比赛手！',
            starReward: 12,
            experienceReward: 60,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
            isTest: true,
          },
        ],
      },
    ],
  };

  return plan;
};

// 等级9：小小比赛手训练计划
const buildLevel9Plan = () => {
  const plan = {
    levelId: 9,
    levelName: trainingLevels[8].name,
    description: trainingLevels[8].description,
    requiredStars: trainingLevels[8].requiredStars,
    reward: trainingLevels[8].reward,
    icon: trainingLevels[8].icon,
    color: trainingLevels[8].color,
    nextLevelId: 10,
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: generateTrainingDayTitle(9, 1, 1),
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
              passingTrainings.find(t => t.moduleId === 'passing_2'),
            ],
            duration: 31,
            description: '全面技能综合训练。在比赛情境中运用所有技能。',
            starReward: 10,
            experienceReward: 50,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
          },
          {
            dayId: 2,
            title: '小小比赛手阶段测试',
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
              passingTrainings.find(t => t.moduleId === 'passing_2'),
              movementTrainings.find(t => t.moduleId === 'movement_2'),
            ],
            duration: 43,
            description: '小小比赛手阶段测试。测试你在比赛环境中的表现，通过后晋级为篮球小达人！',
            starReward: 15,
            experienceReward: 75,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
            isTest: true,
          },
        ],
      },
    ],
  };

  return plan;
};

// 等级10：篮球小达人训练计划
const buildLevel10Plan = () => {
  const plan = {
    levelId: 10,
    levelName: trainingLevels[9].name,
    description: trainingLevels[9].description,
    requiredStars: trainingLevels[9].requiredStars,
    reward: trainingLevels[9].reward,
    icon: trainingLevels[9].icon,
    color: trainingLevels[9].color,
    nextLevelId: null, // 最高等级
    weeklyPlans: [
      {
        weekId: 1,
        weekName: '第1周',
        trainingDays: [
          {
            dayId: 1,
            title: '篮球小达人终极挑战',
            trainings: [
              dribblingTrainings.find(t => t.moduleId === 'dribbling_3'),
              shootingTrainings.find(t => t.moduleId === 'shooting_2'),
              passingTrainings.find(t => t.moduleId === 'passing_2'),
              movementTrainings.find(t => t.moduleId === 'movement_2'),
              parentChildTrainings.find(t => t.moduleId === 'parent_child_day3'),
            ],
            duration: 55,
            description: '篮球小达人终极挑战。展示你所有的篮球技能！完成后获得终极奖励！',
            starReward: 20,
            experienceReward: 100,
            isCompleted: false,
            isPending: false,
            scheduledDate: null,
            isTest: true,
          },
        ],
      },
    ],
  };

  return plan;
};

// 获取所有训练等级
export const getAllTrainingLevels = () => {
  return trainingLevels;
};

// 根据星星数量获取当前等级
export const getCurrentLevelByStars = stars => {
  const sortedLevels = [...trainingLevels].sort((a, b) => b.requiredStars - a.requiredStars);
  for (const level of sortedLevels) {
    if (stars >= level.requiredStars) {
      return level;
    }
  }
  return trainingLevels[0]; // 默认返回第一个等级
};

// 获取指定等级的下一个等级
export const getNextLevel = currentLevelId => {
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

// 根据用户选择的时长动态生成训练日
export const generateTrainingDayByDuration = (level, preferredDuration, dayId = 1, weekId = 1) => {
  // 获取当前等级对应的训练类型集合
  let availableTrainings = [];

  // 根据等级选择适合的训练类型
  if (level <= 2) {
    // 初学者到运球新手
    availableTrainings = [
      ...dribblingTrainings,
      ...parentChildTrainings.filter(t => t.category === 'dribbling'),
    ];
  } else if (level <= 3) {
    // 投篮学徒
    availableTrainings = [
      ...dribblingTrainings,
      ...shootingTrainings,
      ...parentChildTrainings.filter(t => t.category === 'shooting'),
    ];
  } else if (level <= 4) {
    // 传球能手
    availableTrainings = [...dribblingTrainings, ...shootingTrainings, ...passingTrainings];
  } else if (level <= 5) {
    // 敏捷球员
    availableTrainings = [
      ...dribblingTrainings,
      ...shootingTrainings,
      ...passingTrainings,
      ...movementTrainings,
    ];
  } else {
    // 高级别
    availableTrainings = getAllTrainings();
  }

  // 根据时长选择适当数量的训练
  const selectedTrainings = getTrainingsForDuration(availableTrainings, preferredDuration, level);

  // 实际总时长
  const actualDuration = calculateDuration(selectedTrainings);

  // 生成训练日
  return {
    dayId,
    title: `自定义训练 - ${preferredDuration}分钟`,
    trainings: selectedTrainings,
    duration: actualDuration,
    description: `根据你的时间安排（${preferredDuration}分钟）定制的训练内容，实际时长${actualDuration}分钟。`,
    starReward: Math.ceil(preferredDuration / 5), // 每5分钟1星
    experienceReward: preferredDuration * 2,
    isCompleted: false,
    isPending: false,
    scheduledDate: null,
    isCustom: true,
    levelId: level,
    weekId,
  };
};

// 导出主要功能
export default {
  getTrainingPlanByLevel,
  getCurrentLevelByStars,
  getNextLevel,
  getAllTrainingLevels,
  trainingLevels,
  weekDayNames,
  defaultTrainingFrequency,
  trainingDurationOptions,
  getTrainingCountByDuration,
  getTrainingsForDuration,
  generateTrainingDayByDuration,
};
