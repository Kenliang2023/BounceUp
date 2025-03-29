// 移动训练数据
const movementTrainings = [
  {
    moduleId: 'movement_1',
    category: 'movement',
    title: '篮球基本脚步',
    level: '基础',
    duration: 7,
    equipment: ['标记物', '计时器'],
    setup: '场地：平坦场地，可设置标记点',
    description: '学习篮球中的基本移动方式和脚步，提高移动灵活性和防守能力。',
    steps: [
      '练习防守基本姿势，膝盖弯曲，重心下沉',
      '进行侧身滑步练习，保持重心稳定',
      '练习前后移动，快速变换方向',
      '结合侧身和前后移动进行组合练习',
      '设置标记点进行移动路线训练'
    ],
    keyPoints: [
      '保持重心低，膝盖弯曲',
      '步伐小而快，不要交叉脚',
      '身体重心放在前脚掌',
      '眼睛保持平视前方'
    ],
    commonErrors: [
      {
        error: '重心过高，易失去平衡',
        correction: '提醒"膝盖弯曲，降低重心"'
      },
      {
        error: '移动时重心不稳',
        correction: '练习"核心绷紧，脚步平稳"'
      }
    ],
    metrics: [
      {
        name: '移动灵活性',
        basic: '能保持基本姿势完成简单移动',
        intermediate: '移动速度加快，方向变换流畅',
        advanced: '快速移动中保持身体平衡和防守姿势'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/movement/basic_footwork_thumb.png',
      steps: [
        '/assets/images/movement/basic_footwork_step1.png',
        '/assets/images/movement/basic_footwork_step2.png'
      ]
    }
  },
  {
    moduleId: 'movement_2',
    category: 'movement',
    title: '起跳与落地技巧',
    level: '基础',
    duration: 8,
    equipment: ['标准篮球', '标记物'],
    setup: '场地：平坦场地，最好有软垫',
    description: '学习安全有效的起跳和落地技巧，减少伤病风险，提高跳跃效率。',
    steps: [
      '练习双脚起跳的基本技巧',
      '学习单脚起跳动作和平衡',
      '练习安全的落地缓冲姿势',
      '进行连续跳跃练习，强调落地后立即起跳',
      '结合篮球进行跳跃中控球练习'
    ],
    keyPoints: [
      '起跳前下蹲蓄力，膝盖弯曲',
      '手臂摆动配合增加跳跃高度',
      '落地时脚掌全面着地，膝盖弯曲缓冲',
      '保持核心稳定，避免落地不稳'
    ],
    commonErrors: [
      {
        error: '落地时膝盖伸直',
        correction: '强调"落地时膝盖弯曲吸收冲击"'
      },
      {
        error: '落地姿势不稳定',
        correction: '练习"控制落点，保持平衡"'
      }
    ],
    metrics: [
      {
        name: '跳跃质量',
        basic: '能完成基本跳跃动作，落地稳定',
        intermediate: '连续跳跃流畅，起落协调',
        advanced: '各种跳跃方式转换自如，保持良好控制'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/movement/jump_landing_thumb.png',
      steps: [
        '/assets/images/movement/jump_landing_step1.png',
        '/assets/images/movement/jump_landing_step2.png'
      ]
    }
  },
  {
    moduleId: 'movement_3',
    category: 'movement',
    title: '快速启动与急停',
    level: '中级',
    duration: 10,
    equipment: ['标准篮球', '标记物', '计时器'],
    setup: '场地：篮球场，设置起点和终点',
    description: '提升篮球中的启动加速和急停技巧，提高控制能力和比赛中的移动效率。',
    steps: [
      '练习爆发力启动技巧，从静止到全速',
      '学习不同急停方式：跳步急停和跨步急停',
      '练习启动-急停-启动的连续变速动作',
      '进行变向急停后投篮或传球练习',
      '设置路线进行全场启停训练'
    ],
    keyPoints: [
      '启动时身体前倾，重心转移',
      '急停时降低重心，脚步有力',
      '保持身体平衡，随时准备下一动作',
      '使用手臂配合增加启动速度'
    ],
    commonErrors: [
      {
        error: '急停时失去平衡',
        correction: '练习"控制速度，降低重心"'
      },
      {
        error: '启动不够爆发',
        correction: '强调"第一步要果断，身体前倾"'
      }
    ],
    metrics: [
      {
        name: '启停控制能力',
        basic: '能基本完成启动和急停动作',
        intermediate: '启停流畅，保持良好平衡',
        advanced: '高速启停自如，随时可进行下一动作'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/movement/start_stop_thumb.png',
      steps: [
        '/assets/images/movement/start_stop_step1.png',
        '/assets/images/movement/start_stop_step2.png'
      ]
    }
  }
];

export default movementTrainings; 