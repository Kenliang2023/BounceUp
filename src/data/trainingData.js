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
    steps: [
      {
        id: 'step1',
        title: '投篮手型',
        description: '练习正确的投篮手型和握球方式',
        duration: 3,
        videoUrl: '/assets/videos/shooting_basic_1_1.mp4'
      },
      {
        id: 'step2',
        title: '投篮姿势',
        description: '练习标准的投篮姿势和发力方式',
        duration: 4,
        videoUrl: '/assets/videos/shooting_basic_1_2.mp4'
      },
      {
        id: 'step3',
        title: '近距离投篮',
        description: '在篮下进行近距离投篮练习',
        duration: 4,
        videoUrl: '/assets/videos/shooting_basic_1_3.mp4'
      },
      {
        id: 'step4',
        title: '短距离跳投',
        description: '练习短距离的跳投技巧',
        duration: 4,
        videoUrl: '/assets/videos/shooting_basic_1_4.mp4'
      }
    ],
    tips: [
      '投篮时手肘保持垂直',
      '用指尖而非整个手掌控制球',
      '投篮过程中眼睛注视篮筐',
      '手腕跟随动作自然下弯'
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  },
  {
    id: 'shooting_basic_2',
    title: '罚球线投篮',
    description: '掌握中距离罚球线投篮技巧',
    category: 'shooting',
    level: 1,
    duration: 15,
    steps: [
      {
        id: 'step1',
        title: '罚球前准备',
        description: '学习罚球前的正确站姿和心理准备',
        duration: 3,
        videoUrl: '/assets/videos/shooting_basic_2_1.mp4'
      },
      {
        id: 'step2',
        title: '投篮节奏',
        description: '练习罚球的固定节奏和呼吸方式',
        duration: 4,
        videoUrl: '/assets/videos/shooting_basic_2_2.mp4'
      },
      {
        id: 'step3',
        title: '连续罚球',
        description: '进行连续的罚球线投篮练习',
        duration: 4,
        videoUrl: '/assets/videos/shooting_basic_2_3.mp4'
      },
      {
        id: 'step4',
        title: '压力下罚球',
        description: '在模拟比赛压力下进行罚球练习',
        duration: 4,
        videoUrl: '/assets/videos/shooting_basic_2_4.mp4'
      }
    ],
    tips: [
      '建立固定的罚球前习惯',
      '保持投篮弧度一致',
      '专注于篮筐前沿',
      '保持身体平衡和稳定'
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  },
  
  // 中级投篮训练
  {
    id: 'shooting_inter_1',
    title: '三分线投篮',
    description: '学习远距离三分球投射技巧',
    category: 'shooting',
    level: 2,
    duration: 20,
    steps: [
      {
        id: 'step1',
        title: '三分线投篮姿势',
        description: '调整远距离投篮的姿势和发力',
        duration: 5,
        videoUrl: '/assets/videos/shooting_inter_1_1.mp4'
      },
      {
        id: 'step2',
        title: '定点三分练习',
        description: '在不同角度进行定点三分投篮',
        duration: 5,
        videoUrl: '/assets/videos/shooting_inter_1_2.mp4'
      },
      {
        id: 'step3',
        title: '接球后投篮',
        description: '练习接球后迅速完成三分投篮',
        duration: 5,
        videoUrl: '/assets/videos/shooting_inter_1_3.mp4'
      },
      {
        id: 'step4',
        title: '移动中三分',
        description: '练习移动中接球完成三分投篮',
        duration: 5,
        videoUrl: '/assets/videos/shooting_inter_1_4.mp4'
      }
    ],
    tips: [
      '增加腿部力量在远投中的运用',
      '保持投篮动作的一致性',
      '投远距离球时弧度要更高',
      '注意投篮后的跟随手势'
    ],
    rewards: {
      stars: 4,
      experience: 20
    }
  },
  {
    id: 'shooting_inter_2',
    title: '中距离跳投',
    description: '掌握比赛中常用的中距离跳投',
    category: 'shooting',
    level: 2,
    duration: 20,
    steps: [
      {
        id: 'step1',
        title: '基础跳投技巧',
        description: '学习标准的跳投姿势和节奏',
        duration: 5,
        videoUrl: '/assets/videos/shooting_inter_2_1.mp4'
      },
      {
        id: 'step2',
        title: '急停跳投',
        description: '练习行进中急停后完成跳投',
        duration: 5,
        videoUrl: '/assets/videos/shooting_inter_2_2.mp4'
      },
      {
        id: 'step3',
        title: '后撤步跳投',
        description: '学习后撤步创造空间后的跳投',
        duration: 5,
        videoUrl: '/assets/videos/shooting_inter_2_3.mp4'
      },
      {
        id: 'step4',
        title: '挡拆后跳投',
        description: '练习挡拆后接球完成跳投',
        duration: 5,
        videoUrl: '/assets/videos/shooting_inter_2_4.mp4'
      }
    ],
    tips: [
      '跳起与投篮要协调一致',
      '保持身体垂直上升',
      '在最高点释放球',
      '落地时保持平衡'
    ],
    rewards: {
      stars: 4,
      experience: 20
    }
  },
  
  // 高级投篮训练
  {
    id: 'shooting_adv_1',
    title: '高难度投篮技巧',
    description: '学习比赛中的高难度投篮技巧',
    category: 'shooting',
    level: 3,
    duration: 25,
    steps: [
      {
        id: 'step1',
        title: '侧身跳投',
        description: '练习侧身创造空间后的跳投',
        duration: 6,
        videoUrl: '/assets/videos/shooting_adv_1_1.mp4'
      },
      {
        id: 'step2',
        title: '转身跳投',
        description: '学习背身转身后的中距离跳投',
        duration: 6,
        videoUrl: '/assets/videos/shooting_adv_1_2.mp4'
      },
      {
        id: 'step3',
        title: '漂移跳投',
        description: '练习横向漂移中保持平衡的跳投',
        duration: 6,
        videoUrl: '/assets/videos/shooting_adv_1_3.mp4'
      },
      {
        id: 'step4',
        title: '高难度三分',
        description: '练习防守干扰下的高难度三分球',
        duration: 7,
        videoUrl: '/assets/videos/shooting_adv_1_4.mp4'
      }
    ],
    tips: [
      '高难度投篮前先掌握基础',
      '注意身体平衡和核心控制',
      '投篮前的节奏变化很重要',
      '比赛中优先选择高效率投篮'
    ],
    rewards: {
      stars: 5,
      experience: 30
    }
  }
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
    steps: [
      {
        id: 'step1',
        title: '胸前传球',
        description: '练习基础的胸前双手传球技巧',
        duration: 3,
        videoUrl: '/assets/videos/passing_basic_1_1.mp4'
      },
      {
        id: 'step2',
        title: '地板传球',
        description: '学习准确的地板弹传技巧',
        duration: 3,
        videoUrl: '/assets/videos/passing_basic_1_2.mp4'
      },
      {
        id: 'step3',
        title: '头上传球',
        description: '练习头上双手传球技巧',
        duration: 3,
        videoUrl: '/assets/videos/passing_basic_1_3.mp4'
      },
      {
        id: 'step4',
        title: '传球组合练习',
        description: '将不同传球方式组合进行练习',
        duration: 3,
        videoUrl: '/assets/videos/passing_basic_1_4.mp4'
      }
    ],
    tips: [
      '传球时眼睛注视目标',
      '手指分开控制球的方向',
      '双脚站稳，保持平衡',
      '根据距离控制传球力度'
    ],
    rewards: {
      stars: 2,
      experience: 10
    }
  },
  {
    id: 'passing_basic_2',
    title: '移动中传球',
    description: '学习在移动状态下保持传球准确性',
    category: 'passing',
    level: 1,
    duration: 15,
    steps: [
      {
        id: 'step1',
        title: '行进间传球',
        description: '练习在跑动中完成准确传球',
        duration: 4,
        videoUrl: '/assets/videos/passing_basic_2_1.mp4'
      },
      {
        id: 'step2',
        title: '接球后快速传球',
        description: '练习接球后快速完成下一次传球',
        duration: 4,
        videoUrl: '/assets/videos/passing_basic_2_2.mp4'
      },
      {
        id: 'step3',
        title: '跳起传球',
        description: '学习在跳起状态下完成传球',
        duration: 3,
        videoUrl: '/assets/videos/passing_basic_2_3.mp4'
      },
      {
        id: 'step4',
        title: '突破分球',
        description: '练习突破后向外线队友分球',
        duration: 4,
        videoUrl: '/assets/videos/passing_basic_2_4.mp4'
      }
    ],
    tips: [
      '移动中注意观察队友位置',
      '传球前可使用眼神假动作',
      '传球后迅速调整位置',
      '根据队友移动预判传球点'
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  },
  
  // 中级传球训练
  {
    id: 'passing_inter_1',
    title: '单手传球技巧',
    description: '学习单手传球技巧和应用场景',
    category: 'passing',
    level: 2,
    duration: 15,
    steps: [
      {
        id: 'step1',
        title: '单手直传',
        description: '练习单手直线传球的准确性',
        duration: 4,
        videoUrl: '/assets/videos/passing_inter_1_1.mp4'
      },
      {
        id: 'step2',
        title: '单手击地传球',
        description: '学习单手地板弹传技巧',
        duration: 4,
        videoUrl: '/assets/videos/passing_inter_1_2.mp4'
      },
      {
        id: 'step3',
        title: '肩上单手传球',
        description: '练习棒球式单手传球技巧',
        duration: 4,
        videoUrl: '/assets/videos/passing_inter_1_3.mp4'
      },
      {
        id: 'step4',
        title: '单手背后传球',
        description: '学习基础的单手背后传球技巧',
        duration: 3,
        videoUrl: '/assets/videos/passing_inter_1_4.mp4'
      }
    ],
    tips: [
      '单手传球前先掌握双手传球',
      '手指和手腕控制方向和旋转',
      '合理使用身体来掩护传球',
      '注意传球的时机和节奏'
    ],
    rewards: {
      stars: 4,
      experience: 20
    }
  },
  {
    id: 'passing_inter_2',
    title: '挡拆配合传球',
    description: '学习挡拆配合中的各种传球技巧',
    category: 'passing',
    level: 2,
    duration: 20,
    steps: [
      {
        id: 'step1',
        title: '挡拆后分球',
        description: '练习挡拆后向挡人者传球的技巧',
        duration: 5,
        videoUrl: '/assets/videos/passing_inter_2_1.mp4'
      },
      {
        id: 'step2',
        title: '突破分球',
        description: '学习突破吸引防守后分球技巧',
        duration: 5,
        videoUrl: '/assets/videos/passing_inter_2_2.mp4'
      },
      {
        id: 'step3',
        title: '空切传球',
        description: '练习识别空切机会并完成传球',
        duration: 5,
        videoUrl: '/assets/videos/passing_inter_2_3.mp4'
      },
      {
        id: 'step4',
        title: '挡拆战术应用',
        description: '在简单战术中应用挡拆传球技巧',
        duration: 5,
        videoUrl: '/assets/videos/passing_inter_2_4.mp4'
      }
    ],
    tips: [
      '保持对场上所有队友的视野',
      '传球前观察防守位置',
      '利用眼神和假动作制造空间',
      '传球时机比传球技巧更重要'
    ],
    rewards: {
      stars: 4,
      experience: 20
    }
  },
  
  // 高级传球训练
  {
    id: 'passing_adv_1',
    title: '高级花式传球',
    description: '学习比赛中的高级花式传球技巧',
    category: 'passing',
    level: 3,
    duration: 20,
    steps: [
      {
        id: 'step1',
        title: '背后传球进阶',
        description: '练习不同角度和情境的背后传球',
        duration: 5,
        videoUrl: '/assets/videos/passing_adv_1_1.mp4'
      },
      {
        id: 'step2',
        title: '胯下传球技巧',
        description: '学习行进中的胯下传球技巧',
        duration: 5,
        videoUrl: '/assets/videos/passing_adv_1_2.mp4'
      },
      {
        id: 'step3',
        title: '空中变向传球',
        description: '练习跳起后空中变向传球技巧',
        duration: 5,
        videoUrl: '/assets/videos/passing_adv_1_3.mp4'
      },
      {
        id: 'step4',
        title: '创造性传球应用',
        description: '在模拟比赛中应用创造性传球',
        duration: 5,
        videoUrl: '/assets/videos/passing_adv_1_4.mp4'
      }
    ],
    tips: [
      '花式传球以实用为主，不要盲目追求华丽',
      '高级传球前保证基础传球的稳定性',
      '训练中逐步增加难度和强度',
      '比赛中选择最有效的传球方式'
    ],
    rewards: {
      stars: 5,
      experience: 25
    }
  }
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
    steps: [
      {
        id: 'step1',
        title: '防守姿势',
        description: '学习基本的防守站姿和移动准备',
        duration: 2,
        videoUrl: '/assets/videos/movement_basic_1_1.mp4'
      },
      {
        id: 'step2',
        title: '侧身滑步',
        description: '练习防守中的侧身滑步移动',
        duration: 3,
        videoUrl: '/assets/videos/movement_basic_1_2.mp4'
      },
      {
        id: 'step3',
        title: '前后移动',
        description: '学习篮球中的前后快速移动技巧',
        duration: 3,
        videoUrl: '/assets/videos/movement_basic_1_3.mp4'
      },
      {
        id: 'step4',
        title: '移动组合',
        description: '将不同方向的移动组合练习',
        duration: 2,
        videoUrl: '/assets/videos/movement_basic_1_4.mp4'
      }
    ],
    tips: [
      '保持膝盖弯曲，重心下沉',
      '移动时保持身体平衡',
      '小步快速移动比大步更有效',
      '眼睛始终注视对手的胸部位置'
    ],
    rewards: {
      stars: 2,
      experience: 10
    }
  },
  {
    id: 'movement_basic_2',
    title: '起跳与落地技巧',
    description: '学习篮球中安全高效的起跳和落地技巧',
    category: 'movement',
    level: 1,
    duration: 12,
    steps: [
      {
        id: 'step1',
        title: '基础垂直起跳',
        description: '练习双脚平衡垂直起跳技巧',
        duration: 3,
        videoUrl: '/assets/videos/movement_basic_2_1.mp4'
      },
      {
        id: 'step2',
        title: '单脚起跳',
        description: '学习单脚起跳的技巧和平衡',
        duration: 3,
        videoUrl: '/assets/videos/movement_basic_2_2.mp4'
      },
      {
        id: 'step3',
        title: '安全落地',
        description: '练习跳跃后的安全落地姿势',
        duration: 3,
        videoUrl: '/assets/videos/movement_basic_2_3.mp4'
      },
      {
        id: 'step4',
        title: '跳跃中控球',
        description: '学习在跳跃状态下控制球的技巧',
        duration: 3,
        videoUrl: '/assets/videos/movement_basic_2_4.mp4'
      }
    ],
    tips: [
      '起跳前先下蹲蓄力',
      '落地时膝盖微屈缓冲冲击',
      '保持身体平衡和控制',
      '双脚起跳更稳定，单脚起跳更快速'
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  },
  
  // 中级移动训练
  {
    id: 'movement_inter_1',
    title: '快速启动与急停',
    description: '提升篮球中的启动加速和急停技巧',
    category: 'movement',
    level: 2,
    duration: 15,
    steps: [
      {
        id: 'step1',
        title: '爆发力启动',
        description: '练习从静止到快速启动的爆发力',
        duration: 4,
        videoUrl: '/assets/videos/movement_inter_1_1.mp4'
      },
      {
        id: 'step2',
        title: '变速启动',
        description: '学习变速启动突破防守的技巧',
        duration: 4,
        videoUrl: '/assets/videos/movement_inter_1_2.mp4'
      },
      {
        id: 'step3',
        title: '一步急停',
        description: '练习高速移动中的一步急停技巧',
        duration: 4,
        videoUrl: '/assets/videos/movement_inter_1_3.mp4'
      },
      {
        id: 'step4',
        title: '跳步急停',
        description: '学习跳步急停并保持平衡的技巧',
        duration: 3,
        videoUrl: '/assets/videos/movement_inter_1_4.mp4'
      }
    ],
    tips: [
      '启动时身体略微前倾',
      '急停时降低重心增加稳定性',
      '利用手臂配合提升启动速度',
      '急停后保持多种进攻选择'
    ],
    rewards: {
      stars: 4,
      experience: 20
    }
  },
  {
    id: 'movement_inter_2',
    title: '篮球移动步伐进阶',
    description: '学习比赛中的进阶移动步伐和技巧',
    category: 'movement',
    level: 2,
    duration: 15,
    steps: [
      {
        id: 'step1',
        title: '交叉步突破',
        description: '学习使用交叉步快速突破防守',
        duration: 4,
        videoUrl: '/assets/videos/movement_inter_2_1.mp4'
      },
      {
        id: 'step2',
        title: '转身技巧',
        description: '练习前转身和背转身技巧',
        duration: 4,
        videoUrl: '/assets/videos/movement_inter_2_2.mp4'
      },
      {
        id: 'step3',
        title: '步伐假动作',
        description: '学习用脚步制造假动作的技巧',
        duration: 4,
        videoUrl: '/assets/videos/movement_inter_2_3.mp4'
      },
      {
        id: 'step4',
        title: '组合步伐应用',
        description: '在模拟防守中应用组合步伐',
        duration: 3,
        videoUrl: '/assets/videos/movement_inter_2_4.mp4'
      }
    ],
    tips: [
      '步伐移动要简洁有效',
      '保持低重心增加稳定性',
      '转身时保护好球',
      '通过变化节奏增加突破效果'
    ],
    rewards: {
      stars: 4,
      experience: 20
    }
  },
  
  // 高级移动训练
  {
    id: 'movement_adv_1',
    title: '高级对抗性移动',
    description: '学习在高强度对抗中的移动技巧',
    category: 'movement',
    level: 3,
    duration: 20,
    steps: [
      {
        id: 'step1',
        title: '对抗中保持平衡',
        description: '练习在身体对抗中保持移动平衡',
        duration: 5,
        videoUrl: '/assets/videos/movement_adv_1_1.mp4'
      },
      {
        id: 'step2',
        title: '强对抗下摆脱',
        description: '学习在强对抗防守下的摆脱技巧',
        duration: 5,
        videoUrl: '/assets/videos/movement_adv_1_2.mp4'
      },
      {
        id: 'step3',
        title: '防守移动反应',
        description: '提高防守中的移动反应速度',
        duration: 5,
        videoUrl: '/assets/videos/movement_adv_1_3.mp4'
      },
      {
        id: 'step4',
        title: '实战移动应用',
        description: '在实战模拟中应用高级移动技巧',
        duration: 5,
        videoUrl: '/assets/videos/movement_adv_1_4.mp4'
      }
    ],
    tips: [
      '增强核心力量提高对抗稳定性',
      '利用身体创造接触和空间',
      '保持低重心和宽基础提高平衡',
      '对抗中保持冷静和控制'
    ],
    rewards: {
      stars: 5,
      experience: 30
    }
  }
]; 