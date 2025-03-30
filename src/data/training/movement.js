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

export default movementTrainings;