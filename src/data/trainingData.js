// 运球训练数据
export const dribblingTrainings = [
  // 初级运球训练
  {
    id: 'dribble_basic_1',
    title: '基础运球技巧',
    description: '掌握基本运球姿势和手感，适合初学者',
    category: 'dribbling',
    level: 1,
    duration: 10,
    steps: [
      {
        id: 'step1',
        title: '热身',
        description: '原地慢速运球，感受球的触感',
        duration: 2,
        videoUrl: '/assets/videos/dribble_basic_1_1.mp4'
      },
      {
        id: 'step2',
        title: '右手运球',
        description: '用右手在原地做高、中、低位运球',
        duration: 3,
        videoUrl: '/assets/videos/dribble_basic_1_2.mp4'
      },
      {
        id: 'step3',
        title: '左手运球',
        description: '用左手在原地做高、中、低位运球',
        duration: 3,
        videoUrl: '/assets/videos/dribble_basic_1_3.mp4'
      },
      {
        id: 'step4',
        title: '交替运球',
        description: '左右手交替运球，保持节奏',
        duration: 2,
        videoUrl: '/assets/videos/dribble_basic_1_4.mp4'
      }
    ],
    tips: [
      '保持膝盖微曲，重心稍低',
      '用指尖而非整个手掌控制球',
      '眼睛看前方，不要盯着球',
      '保持放松，不要太过用力'
    ],
    rewards: {
      stars: 2,
      experience: 10
    }
  },
  {
    id: 'dribble_basic_2',
    title: '移动中运球',
    description: '学习在移动中控制球，提升基本协调能力',
    category: 'dribbling',
    level: 1,
    duration: 12,
    steps: [
      {
        id: 'step1',
        title: '直线慢跑运球',
        description: '慢跑前进的同时进行运球',
        duration: 3,
        videoUrl: '/assets/videos/dribble_basic_2_1.mp4'
      },
      {
        id: 'step2',
        title: '变速运球',
        description: '练习在不同速度下保持球的控制',
        duration: 3,
        videoUrl: '/assets/videos/dribble_basic_2_2.mp4'
      },
      {
        id: 'step3',
        title: '转身运球',
        description: '学习在转身过程中不丢失球的控制',
        duration: 3,
        videoUrl: '/assets/videos/dribble_basic_2_3.mp4'
      },
      {
        id: 'step4',
        title: '简单绕障碍',
        description: '绕过简单的障碍物进行运球',
        duration: 3,
        videoUrl: '/assets/videos/dribble_basic_2_4.mp4'
      }
    ],
    tips: [
      '移动时保持身体平衡',
      '运球时不要低头看球',
      '转身时保护好球',
      '尝试用左右手运球'
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  },
  
  // 中级运球训练
  {
    id: 'dribble_inter_1',
    title: '背后运球与胯下运球',
    description: '学习进阶运球技巧，提升球感和控制力',
    category: 'dribbling',
    level: 2,
    duration: 15,
    steps: [
      {
        id: 'step1',
        title: '胯下运球练习',
        description: '原地练习胯下运球技巧',
        duration: 4,
        videoUrl: '/assets/videos/dribble_inter_1_1.mp4'
      },
      {
        id: 'step2',
        title: '背后运球练习',
        description: '原地练习背后运球技巧',
        duration: 4,
        videoUrl: '/assets/videos/dribble_inter_1_2.mp4'
      },
      {
        id: 'step3',
        title: '组合运球练习',
        description: '将胯下和背后运球动作组合起来',
        duration: 4,
        videoUrl: '/assets/videos/dribble_inter_1_3.mp4'
      },
      {
        id: 'step4',
        title: '移动中使用',
        description: '在移动中尝试使用这些技巧',
        duration: 3,
        videoUrl: '/assets/videos/dribble_inter_1_4.mp4'
      }
    ],
    tips: [
      '动作要流畅，速度由慢到快',
      '背后传球时手腕要灵活',
      '胯下运球时降低身体重心',
      '尝试建立肌肉记忆，不要看球'
    ],
    rewards: {
      stars: 4,
      experience: 20
    }
  },
  {
    id: 'dribble_inter_2',
    title: '运球变向技巧',
    description: '练习快速变向，提升对抗能力',
    category: 'dribbling',
    level: 2,
    duration: 15,
    steps: [
      {
        id: 'step1',
        title: '十字交叉步',
        description: '练习运球时的十字交叉步变向',
        duration: 4,
        videoUrl: '/assets/videos/dribble_inter_2_1.mp4'
      },
      {
        id: 'step2',
        title: '单侧变向',
        description: '练习快速单侧变向技巧',
        duration: 4,
        videoUrl: '/assets/videos/dribble_inter_2_2.mp4'
      },
      {
        id: 'step3',
        title: '急停变向',
        description: '学习急停后快速变向的技巧',
        duration: 4,
        videoUrl: '/assets/videos/dribble_inter_2_3.mp4'
      },
      {
        id: 'step4',
        title: '组合变向练习',
        description: '将各种变向技巧组合起来练习',
        duration: 3,
        videoUrl: '/assets/videos/dribble_inter_2_4.mp4'
      }
    ],
    tips: [
      '变向前的减速很重要',
      '使用身体假动作增加欺骗性',
      '变向后迅速加速',
      '保持低重心，提高稳定性'
    ],
    rewards: {
      stars: 4,
      experience: 20
    }
  },
  
  // 高级运球训练
  {
    id: 'dribble_adv_1',
    title: '花式运球组合',
    description: '学习高级运球组合，提升球感和控制能力',
    category: 'dribbling',
    level: 3,
    duration: 20,
    steps: [
      {
        id: 'step1',
        title: '双手交替快速运球',
        description: '练习双手快速交替运球技巧',
        duration: 5,
        videoUrl: '/assets/videos/dribble_adv_1_1.mp4'
      },
      {
        id: 'step2',
        title: '连续变向运球',
        description: '练习在高速移动中连续变向',
        duration: 5,
        videoUrl: '/assets/videos/dribble_adv_1_2.mp4'
      },
      {
        id: 'step3',
        title: '高级组合技巧',
        description: '练习复杂的运球组合技巧',
        duration: 5,
        videoUrl: '/assets/videos/dribble_adv_1_3.mp4'
      },
      {
        id: 'step4',
        title: '实战应用',
        description: '在模拟防守下使用学到的技巧',
        duration: 5,
        videoUrl: '/assets/videos/dribble_adv_1_4.mp4'
      }
    ],
    tips: [
      '保持动作流畅和节奏感',
      '注意手腕和手指的力量控制',
      '眼睛始终看前方，不要盯着球',
      '在实战中，简单有效比花哨更重要'
    ],
    rewards: {
      stars: 5,
      experience: 30
    }
  },
  {
    id: 'dribble_adv_2',
    title: '防守压力下的运球',
    description: '学习在防守压力下保持控球能力',
    category: 'dribbling',
    level: 3,
    duration: 20,
    steps: [
      {
        id: 'step1',
        title: '单人防守下运球',
        description: '在单人防守下保持控球',
        duration: 5,
        videoUrl: '/assets/videos/dribble_adv_2_1.mp4'
      },
      {
        id: 'step2',
        title: '紧逼防守突破',
        description: '学习在紧逼防守下突破的技巧',
        duration: 5,
        videoUrl: '/assets/videos/dribble_adv_2_2.mp4'
      },
      {
        id: 'step3',
        title: '多人防守下运球',
        description: '在多人防守压力下保持控球',
        duration: 5,
        videoUrl: '/assets/videos/dribble_adv_2_3.mp4'
      },
      {
        id: 'step4',
        title: '实战运用',
        description: '在比赛情境中使用所学技巧',
        duration: 5,
        videoUrl: '/assets/videos/dribble_adv_2_4.mp4'
      }
    ],
    tips: [
      '保持低重心和身体平衡',
      '使用身体保护球',
      '随时准备传球或投篮',
      '在压力下保持冷静和控制'
    ],
    rewards: {
      stars: 5,
      experience: 30
    }
  }
];

// 投篮训练数据
export const shootingTrainings = [
  // 初级投篮训练
  {
    id: 'shooting_basic_1',
    title: '基础投篮姿势',
    description: '学习正确的投篮姿势和手法',
    category: 'shooting',
    level: 1,
    duration: 15,
    // 此处省略详细内容
  },
  // 更多投篮训练...
];

// 传球训练数据
export const passingTrainings = [
  // 初级传球训练
  {
    id: 'passing_basic_1',
    title: '基础传球技巧',
    description: '学习基本的传球方法和准确性',
    category: 'passing',
    level: 1,
    duration: 12,
    // 此处省略详细内容
  },
  // 更多传球训练...
];

// 移动训练数据
export const movementTrainings = [
  // 初级移动训练
  {
    id: 'movement_basic_1',
    title: '篮球基本脚步',
    description: '学习篮球中的基本移动方式和脚步',
    category: 'movement',
    level: 1,
    duration: 10,
    // 此处省略详细内容
  },
  // 更多移动训练...
]; 