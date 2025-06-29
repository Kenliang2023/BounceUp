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
        videoUrl: '/assets/videos/shooting_1_1.mp4',
      },
      {
        id: 'step2',
        title: '投篮姿势',
        description: '练习标准的投篮姿势和发力方式',
        duration: 3,
        videoUrl: '/assets/videos/shooting_1_2.mp4',
      },
      {
        id: 'step3',
        title: '近距离投篮',
        description: '在篮下进行近距离投篮练习',
        duration: 2,
        videoUrl: '/assets/videos/shooting_1_3.mp4',
      },
    ],
    keyPoints: [
      '投篮时手肘保持垂直',
      '用指尖而非整个手掌控制球',
      '投篮过程中眼睛注视篮筐',
      '手腕跟随动作自然下弯',
    ],
    tips: [
      '每次训练前先热身，活动手腕和手指',
      '训练间隔可以做简单拉伸',
      '多鼓励和赞美，不要过于苛求完美',
      '注意观察孩子注意力状态，适时调整节奏',
    ],
    rewards: {
      stars: 3,
      experience: 15,
    },
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
        videoUrl: '/assets/videos/shooting_2_1.mp4',
      },
      {
        id: 'step2',
        title: '投篮节奏',
        description: '练习罚球的固定节奏和呼吸方式',
        duration: 3,
        videoUrl: '/assets/videos/shooting_2_2.mp4',
      },
      {
        id: 'step3',
        title: '连续罚球',
        description: '进行连续的罚球线投篮练习',
        duration: 4,
        videoUrl: '/assets/videos/shooting_2_3.mp4',
      },
    ],
    keyPoints: ['建立固定的罚球前习惯', '保持投篮弧度一致', '专注于篮筐前沿', '保持身体平衡和稳定'],
    tips: [
      '每次训练前先热身，活动手腕和手指',
      '训练间隔可以做简单拉伸',
      '多鼓励和赞美，不要过于苛求完美',
      '注意观察孩子注意力状态，适时调整节奏',
    ],
    rewards: {
      stars: 3,
      experience: 15,
    },
  },
];

export default shootingTrainings;
