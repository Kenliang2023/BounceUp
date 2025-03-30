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

export default dribblingTrainings;