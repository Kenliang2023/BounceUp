// 运球训练数据
const dribblingTrainings = [
  {
    moduleId: 'dribbling_1',
    category: 'dribbling',
    title: '原地控球训练',
    level: '基础',
    duration: 5,
    equipment: ['标准篮球', '计时器'],
    setup: '场地：任何平坦场地，需标记一个1米直径的圆圈',
    description: '通过原地运球练习提高基础控球能力和手感，是所有运球技巧的基础。',
    steps: [
      {
        id: 'step1',
        title: '准备姿势',
        description: '站在圆圈中央，双脚与肩同宽',
        duration: 1,
        videoUrl: '/assets/videos/dribbling_1_1.mp4'
      },
      {
        id: 'step2',
        title: '右手运球',
        description: '右手运球30秒，保持球的高度在腰部位置',
        duration: 1,
        videoUrl: '/assets/videos/dribbling_1_2.mp4'
      },
      {
        id: 'step3',
        title: '左手运球',
        description: '左手运球30秒，同样保持在腰部位置',
        duration: 1,
        videoUrl: '/assets/videos/dribbling_1_3.mp4'
      },
      {
        id: 'step4',
        title: '双手交替运球',
        description: '双手交替运球30秒（右-左-右-左）',
        duration: 2,
        videoUrl: '/assets/videos/dribbling_1_4.mp4'
      }
    ],
    keyPoints: [
      '指尖触球，不是整个手掌',
      '手腕放松有弹性，像弹簧一样',
      '手肘微弯，不要锁死',
      '膝盖略微弯曲，保持平衡姿势'
    ],
    commonErrors: [
      {
        error: '整个手掌拍打球',
        correction: '提醒"用指尖感受球"'
      },
      {
        error: '目光始终盯着球',
        correction: '逐渐抬头，先看5秒其他地方'
      }
    ],
    metrics: [
      {
        name: '连续运球次数',
        basic: '连续运球20次不丢球',
        intermediate: '连续运球30次不丢球且能抬头看前方5秒',
        advanced: '连续运球30次不丢球且全程能看其他地方'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/dribbling/stationary_thumb.png',
      steps: [
        '/assets/images/dribbling/stationary_step1.png',
        '/assets/images/dribbling/stationary_step2.png'
      ]
    },
    rewards: {
      stars: 2,
      experience: 10
    }
  },
  {
    moduleId: 'dribbling_2',
    category: 'dribbling',
    title: '8字型运球',
    level: '基础',
    duration: 7,
    equipment: ['标准篮球', '计时器'],
    setup: '场地：平坦场地，两个相距60厘米的标记点',
    description: '通过8字形路线绕过标记点训练，提高手眼协调能力和运球灵活性。',
    steps: [
      {
        id: 'step1',
        title: '设置标记点',
        description: '在地面上放置两个标记点，相距约60厘米',
        duration: 1,
        videoUrl: '/assets/videos/dribbling_2_1.mp4'
      },
      {
        id: 'step2',
        title: '右手8字运球',
        description: '以8字形路线绕过标记点，右手运球1分钟',
        duration: 2,
        videoUrl: '/assets/videos/dribbling_2_2.mp4'
      },
      {
        id: 'step3',
        title: '左手8字运球',
        description: '以8字形路线绕过标记点，左手运球1分钟',
        duration: 2,
        videoUrl: '/assets/videos/dribbling_2_3.mp4'
      },
      {
        id: 'step4',
        title: '双手交替8字运球',
        description: '以8字形路线绕过标记点，交替使用左右手运球1分钟',
        duration: 2,
        videoUrl: '/assets/videos/dribbling_2_4.mp4'
      }
    ],
    keyPoints: [
      '保持低重心，膝盖弯曲',
      '目光前视，不要盯着球',
      '运球时保持球在身体侧面',
      '变换速度，逐渐加快'
    ],
    commonErrors: [
      {
        error: '运球过高，容易失控',
        correction: '提醒"球的高度不超过腰部"'
      },
      {
        error: '移动时步伐不协调',
        correction: '先放慢速度，强调"运球与步伐配合"'
      }
    ],
    metrics: [
      {
        name: '完成质量',
        basic: '能够完成1分钟8字运球，不丢球超过2次',
        intermediate: '能够完成1分钟8字运球，不丢球且保持抬头',
        advanced: '能够快速完成1分钟8字运球，不丢球且全程抬头'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/dribbling/figure8_thumb.png',
      steps: [
        '/assets/images/dribbling/figure8_step1.png',
        '/assets/images/dribbling/figure8_step2.png'
      ]
    },
    rewards: {
      stars: 3,
      experience: 15
    }
  },
  {
    moduleId: 'dribbling_3',
    category: 'dribbling',
    title: '变向运球训练',
    level: '中级',
    duration: 6,
    equipment: ['标准篮球', '计时器', '障碍物（可选）'],
    setup: '场地：平坦场地，可以设置几个障碍物作为变向点',
    description: '学习基本的变向运球技巧，提高控球能力和方向变换速度。',
    steps: [
      {
        id: 'step1',
        title: '变向准备',
        description: '直线快速运球5米，然后急停并变向',
        duration: 1,
        videoUrl: '/assets/videos/dribbling_3_1.mp4'
      },
      {
        id: 'step2',
        title: '前侧变向',
        description: '练习前侧变向（Crossover）10次',
        duration: 1.5,
        videoUrl: '/assets/videos/dribbling_3_2.mp4'
      },
      {
        id: 'step3',
        title: '背后变向',
        description: '练习背后变向（Behind the back）10次',
        duration: 1.5,
        videoUrl: '/assets/videos/dribbling_3_3.mp4'
      },
      {
        id: 'step4',
        title: '胯下变向',
        description: '练习胯下变向（Between the legs）10次',
        duration: 1,
        videoUrl: '/assets/videos/dribbling_3_4.mp4'
      },
      {
        id: 'step5',
        title: '组合变向',
        description: '结合三种变向技巧自由练习1分钟',
        duration: 1,
        videoUrl: '/assets/videos/dribbling_3_5.mp4'
      }
    ],
    keyPoints: [
      '变向前降低重心',
      '变向动作要快而有力',
      '变向后迅速加速',
      '保持头部稳定，视线前方'
    ],
    commonErrors: [
      {
        error: '变向前没有降低重心',
        correction: '提醒"先蹲下再变向"'
      },
      {
        error: '变向动作太大，容易被抢断',
        correction: '强调"动作紧凑，球靠近身体"'
      }
    ],
    metrics: [
      {
        name: '变向质量',
        basic: '能完成三种基本变向，但速度较慢',
        intermediate: '能流畅完成三种变向，并能保持一定速度',
        advanced: '能快速精准完成三种变向，并迅速加速离开'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/dribbling/direction_change_thumb.png',
      steps: [
        '/assets/images/dribbling/direction_change_step1.png',
        '/assets/images/dribbling/direction_change_step2.png'
      ]
    },
    rewards: {
      stars: 4,
      experience: 20
    }
  }
];

// 投篮训练数据
const shootingTrainings = [
  {
    moduleId: 'shooting_1',
    category: 'shooting',
    title: '基础投篮姿势',
    level: '基础',
    duration: 8,
    equipment: ['标准篮球', '篮筐'],
    setup: '平坦场地或篮球场',
    description: '学习正确的投篮姿势和手法，掌握基本的投篮基础。',
    steps: [
      {
        id: 'step1',
        title: '投篮手型',
        description: '练习正确的手型和握球方式',
        duration: 3,
        videoUrl: '/assets/videos/shooting_1_1.mp4'
      },
      {
        id: 'step2',
        title: '投篮姿势',
        description: '练习标准的投篮姿势和发力方式',
        duration: 3,
        videoUrl: '/assets/videos/shooting_1_2.mp4'
      },
      {
        id: 'step3',
        title: '近距离投篮',
        description: '在篮下进行近距离投篮练习',
        duration: 2,
        videoUrl: '/assets/videos/shooting_1_3.mp4'
      }
    ],
    keyPoints: [
      '投篮时手肘保持垂直',
      '用指尖而非整个手掌控制球',
      '投篮过程中眼睛注视篮筐',
      '手腕跟随动作自然下弯'
    ],
    tips: [
      '每次训练前先热身，活动手腕和手指',
      '训练间隔可以做简单拉伸',
      '多鼓励和赞美，不要过于苛求完美',
      '注意观察孩子注意力状态，适时调整节奏'
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  },
  {
    moduleId: 'shooting_2',
    category: 'shooting',
    title: '罚球线投篮',
    level: '基础',
    duration: 10,
    equipment: ['标准篮球', '篮筐', '计时器'],
    setup: '平坦场地或篮球场罚球线位置',
    description: '掌握中距离罚球线投篮技巧，提高稳定性和准确度。',
    steps: [
      {
        id: 'step1',
        title: '罚球前准备',
        description: '学习罚球前的正确站姿和心理准备',
        duration: 3,
        videoUrl: '/assets/videos/shooting_2_1.mp4'
      },
      {
        id: 'step2',
        title: '投篮节奏',
        description: '练习罚球的固定节奏和呼吸方式',
        duration: 3,
        videoUrl: '/assets/videos/shooting_2_2.mp4'
      },
      {
        id: 'step3',
        title: '连续罚球',
        description: '进行连续的罚球线投篮练习',
        duration: 4,
        videoUrl: '/assets/videos/shooting_2_3.mp4'
      }
    ],
    keyPoints: [
      '建立固定的罚球前习惯',
      '保持投篮弧度一致',
      '专注于篮筐前沿',
      '保持身体平衡和稳定'
    ],
    tips: [
      '每次训练前先热身，活动手腕和手指',
      '训练间隔可以做简单拉伸',
      '多鼓励和赞美，不要过于苛求完美',
      '注意观察孩子注意力状态，适时调整节奏'
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  }
];

// 传球训练数据
const passingTrainings = [
  {
    moduleId: 'passing_1',
    category: 'passing',
    title: '基础传球技巧',
    level: '基础',
    duration: 12,
    equipment: ['标准篮球', '墙壁或训练伙伴'],
    setup: '平坦场地，距墙2-3米或与训练伙伴相对站立',
    description: '学习基本的传球方法和准确性，提高手眼协调能力。',
    steps: [
      {
        id: 'step1',
        title: '胸前传球',
        description: '练习基础的胸前双手传球技巧',
        duration: 4,
        videoUrl: '/assets/videos/passing_1_1.mp4'
      },
      {
        id: 'step2',
        title: '地板传球',
        description: '学习准确的地板弹传技巧',
        duration: 4,
        videoUrl: '/assets/videos/passing_1_2.mp4'
      },
      {
        id: 'step3',
        title: '头上传球',
        description: '练习头上双手传球技巧',
        duration: 4,
        videoUrl: '/assets/videos/passing_1_3.mp4'
      }
    ],
    keyPoints: [
      '传球时眼睛注视目标',
      '手指分开控制球的方向',
      '双脚站稳，保持平衡',
      '根据距离控制传球力度'
    ],
    tips: [
      '每种传球方式先进行10-15次练习',
      '注重精准度而非速度',
      '先定点练习，再尝试移动中传球',
      '注意观察孩子的手腕力量，适当调整距离'
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  },
  {
    moduleId: 'passing_2',
    category: 'passing',
    title: '移动中传球',
    level: '基础',
    duration: 15,
    equipment: ['标准篮球', '训练伙伴', '标记物（如锥桶）'],
    setup: '平坦场地，设置简单路线',
    description: '学习在移动状态下保持传球准确性，提高移动协调能力。',
    steps: [
      {
        id: 'step1',
        title: '行进间传球',
        description: '练习在跑动中完成准确传球',
        duration: 5,
        videoUrl: '/assets/videos/passing_2_1.mp4'
      },
      {
        id: 'step2',
        title: '接球后快速传球',
        description: '练习接球后快速完成下一次传球',
        duration: 5,
        videoUrl: '/assets/videos/passing_2_2.mp4'
      },
      {
        id: 'step3',
        title: '变向后传球',
        description: '练习在变向后迅速找到传球目标',
        duration: 5,
        videoUrl: '/assets/videos/passing_2_3.mp4'
      }
    ],
    keyPoints: [
      '移动中注意观察队友位置',
      '传球前可使用眼神假动作',
      '传球后迅速调整位置',
      '根据队友移动预判传球点'
    ],
    tips: [
      '先慢速练习掌握要领，再逐渐加快',
      '父子互动传球时，爸爸要适当控制力度',
      '鼓励孩子在传球前抬头观察',
      '可设置简单游戏增加趣味性'
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  }
];

// 移动训练数据
const movementTrainings = [
  {
    moduleId: 'movement_1',
    category: 'movement',
    title: '篮球基本脚步',
    level: '基础',
    duration: 10,
    equipment: ['标准篮球', '计时器', '标记物（如锥桶）'],
    setup: '平坦场地，可设置简单路径',
    description: '学习篮球中的基本移动方式和脚步，提高移动灵活性和速度。',
    steps: [
      {
        id: 'step1',
        title: '防守姿势',
        description: '学习基本的防守站姿和移动准备',
        duration: 2,
        videoUrl: '/assets/videos/movement_1_1.mp4'
      },
      {
        id: 'step2',
        title: '侧身滑步',
        description: '练习防守中的侧身滑步移动',
        duration: 4,
        videoUrl: '/assets/videos/movement_1_2.mp4'
      },
      {
        id: 'step3',
        title: '前后移动',
        description: '学习篮球中的前后快速移动技巧',
        duration: 4,
        videoUrl: '/assets/videos/movement_1_3.mp4'
      }
    ],
    keyPoints: [
      '保持膝盖弯曲，重心下沉',
      '移动时保持身体平衡',
      '小步快速移动比大步更有效',
      '眼睛始终注视前方'
    ],
    tips: [
      '训练前做足热身，尤其是腿部和脚踝',
      '分解动作，从慢到快逐渐提高速度',
      '注意正确姿势，防止运动伤害',
      '短时间、高质量的训练比长时间低效率训练更有效'
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  },
  {
    moduleId: 'movement_2',
    category: 'movement',
    title: '起跳与落地技巧',
    level: '基础',
    duration: 12,
    equipment: ['标准篮球', '计时器', '软垫（可选）'],
    setup: '平坦柔软的场地，避免硬质地面',
    description: '学习篮球中安全高效的起跳和落地技巧，减少受伤风险。',
    steps: [
      {
        id: 'step1',
        title: '基础垂直起跳',
        description: '练习双脚平衡垂直起跳技巧',
        duration: 4,
        videoUrl: '/assets/videos/movement_2_1.mp4'
      },
      {
        id: 'step2',
        title: '单脚起跳',
        description: '学习单脚起跳的技巧和平衡',
        duration: 4,
        videoUrl: '/assets/videos/movement_2_2.mp4'
      },
      {
        id: 'step3',
        title: '安全落地',
        description: '练习跳跃后的安全落地姿势',
        duration: 4,
        videoUrl: '/assets/videos/movement_2_3.mp4'
      }
    ],
    keyPoints: [
      '起跳前先下蹲蓄力',
      '落地时膝盖微屈缓冲冲击',
      '保持身体平衡和控制',
      '双脚起跳更稳定，单脚起跳更快速'
    ],
    tips: [
      '训练前做足热身，保护膝盖和脚踝',
      '逐步增加跳跃高度，不要操之过急',
      '关注落地缓冲，这是减少伤害的关键',
      '训练间注意休息，避免过度疲劳'
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  }
];

// 父子篮球训练数据
const parentChildTrainings = [
  {
    moduleId: 'parent_child_day1',
    category: 'dribbling',
    title: '控球与协调基础训练',
    level: '基础',
    duration: 12,
    equipment: ['标准篮球', '计时器', '路径标记物（瓶子或绳子）'],
    setup: '平坦场地，可设置简单路径',
    description: '通过基础控球练习提高手眼协调能力，适合8岁儿童（含多动倾向）。短周期训练单元搭配明确视觉引导。',
    steps: [
      {
        id: 'step1',
        title: '原地换手拍球',
        description: '站立双脚与肩同宽，微微屈膝保持重心低，使用右手连续拍球10次后换左手。换手时眼睛看前方不看球，拍球高度控制在腰部以下。',
        duration: 3,
        videoUrl: '/assets/videos/parent_child_day1_1.mp4'
      },
      {
        id: 'step2',
        title: '走线拍球训练',
        description: '在地上画一条直线或放置瓶子当作路径，沿路径前进同时保持拍球不离手。可采用左右手交替拍球，如掉球要立即捡起继续保持节奏。',
        duration: 4,
        videoUrl: '/assets/videos/parent_child_day1_2.mp4'
      },
      {
        id: 'step3',
        title: '绕腿拍球练习',
        description: '先进行空手绕腿动作熟悉节奏，慢速一边拍球一边绕腿（顺时针/逆时针）。保持低位重心，双脚不动，尝试连续完成5次不掉球。',
        duration: 5,
        videoUrl: '/assets/videos/parent_child_day1_3.mp4'
      }
    ],
    keyPoints: [
      '保持膝盖微曲，重心稍低',
      '用指尖而非整个手掌控制球',
      '眼睛尽量看前方，减少盯着球',
      '动作要流畅，保持放松'
    ],
    tips: [
      '每次训练前先热身，活动手腕和手指',
      '训练间隔可以做简单拉伸',
      '多鼓励和赞美，不要过于苛求完美',
      '注意观察孩子注意力状态，适时调整节奏'
    ],
    commonErrors: [
      {
        error: '整个手掌拍打球',
        correction: '提醒"用指尖感受球"'
      },
      {
        error: '目光始终盯着球',
        correction: '逐步引导抬头，先看3秒其他地方'
      }
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  },
  {
    moduleId: 'parent_child_day2',
    category: 'dribbling',
    title: '控球专项与抢球意识',
    level: '基础',
    duration: 12,
    equipment: ['标准篮球', '计时器', '路径标记物（瓶子或绳子）'],
    setup: '平坦场地，可设置S形路线',
    description: '提升控球能力与基础防守意识，通过高低交替和曲线运球增强协调性，适合父子互动训练。',
    steps: [
      {
        id: 'step1',
        title: '高低拍球交替练习',
        description: '原地双手交替拍球，高度交替：一个高一个低。高拍到肩膀高度，低拍控制在膝盖以下。注意节奏感与控制力，维持低重心，脚步不动。',
        duration: 4,
        videoUrl: '/assets/videos/parent_child_day2_1.mp4'
      },
      {
        id: 'step2',
        title: '控球走线拍球（弯道）',
        description: '用瓶子或绳子设置"S"形路线，手持球沿曲线路径拍球移动。左右手交替尝试，慢速为主，强调步伐平稳，球不能丢。',
        duration: 4,
        videoUrl: '/assets/videos/parent_child_day2_2.mp4'
      },
      {
        id: 'step3',
        title: '断球与追球游戏',
        description: '爸爸持球缓慢移动，孩子判断时机出手断球。爸爸滚球向远处，孩子追抢并带球回来。加入不同方向变化训练反应力，完成任务后可增加挑战难度。',
        duration: 4,
        videoUrl: '/assets/videos/parent_child_day2_3.mp4'
      }
    ],
    keyPoints: [
      '保持身体平衡，重心略低',
      '控球时手指分开，指尖控制',
      '变向时降低重心，保护好球',
      '追球时眼睛跟随球移动'
    ],
    tips: [
      '孩子注意力分散时可短暂休息',
      '每个练习间可以做小游戏放松',
      '爸爸要控制好难度，保持兴趣',
      '多表扬进步，不强调错误'
    ],
    commonErrors: [
      {
        error: '运球太高，容易失控',
        correction: '提醒"球的高度不超过腰部"'
      },
      {
        error: '追球时跑得太快失去平衡',
        correction: '鼓励"稳健前进，控制速度"'
      }
    ],
    rewards: {
      stars: 3,
      experience: 15
    }
  },
  {
    moduleId: 'parent_child_day3',
    category: 'shooting',
    title: '上篮专项与节奏控制',
    level: '基础',
    duration: 12,
    equipment: ['标准篮球', '计时器', '音乐播放器（可选）'],
    setup: '篮球场或有篮筐的场地',
    description: '学习基础上篮技巧和节奏控制，通过音乐辅助训练和计数挑战增强趣味性，适合注意力不集中的儿童。',
    steps: [
      {
        id: 'step1',
        title: '两步起跳上篮（模拟）',
        description: '第一步左脚，第二步右脚，随后起跳。右手上篮（反之亦然）。强调动作连贯性与节奏配合，起跳后尽量伸手向上模拟投篮。',
        duration: 5,
        videoUrl: '/assets/videos/parent_child_day3_1.mp4'
      },
      {
        id: 'step2',
        title: '原地节奏拍球训练',
        description: '播放轻快节奏音乐，跟随节拍拍球。尝试慢节奏和快节奏切换，可以加入拍手或转身动作。重点是感知节奏变化与动作一致。',
        duration: 3,
        videoUrl: '/assets/videos/parent_child_day3_2.mp4'
      },
      {
        id: 'step3',
        title: '十球挑战',
        description: '爸爸发球10次，孩子尽力完成10次上篮动作。不要求每次命中，鼓励完整动作完成。计数成功次数以激励进步，逐周记录挑战分数，看到进步。',
        duration: 4,
        videoUrl: '/assets/videos/parent_child_day3_3.mp4'
      }
    ],
    keyPoints: [
      '上篮步伐要协调：左-右-跳（右手上篮）',
      '保持眼睛注视篮筐',
      '音乐训练中注意倾听节奏',
      '十球挑战中重在完成动作，不求完美'
    ],
    tips: [
      '分步骤练习上篮动作，先不用篮球',
      '用语言提示来帮助记忆步骤',
      '十球挑战可记录成绩，下次挑战自己',
      '结束后给予具体的正面反馈'
    ],
    commonErrors: [
      {
        error: '上篮步伐混乱',
        correction: '口诀"左-右-跳"反复练习'
      },
      {
        error: '节奏训练中不能跟上',
        correction: '放慢速度，循序渐进增加'
      }
    ],
    rewards: {
      stars: 4,
      experience: 20
    }
  }
];

// 获取所有训练数据的数组
const getAllTrainings = () => {
  return [
    ...dribblingTrainings,
    ...shootingTrainings,
    ...passingTrainings,
    ...movementTrainings,
    ...parentChildTrainings
  ];
};

// 根据ID查找训练
const findTrainingById = (id) => {
  return getAllTrainings().find(training => training.moduleId === id);
};

// 根据类别获取训练
const getTrainingsByCategory = (category) => {
  return getAllTrainings().filter(training => training.category === category);
};

export {
  dribblingTrainings,
  shootingTrainings, 
  passingTrainings,
  movementTrainings,
  parentChildTrainings,
  getAllTrainings,
  findTrainingById,
  getTrainingsByCategory
};