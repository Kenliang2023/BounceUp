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
    description:
      '通过基础控球练习提高手眼协调能力，适合8岁儿童（含多动倾向）。短周期训练单元搭配明确视觉引导。',
    steps: [
      {
        id: 'step1',
        title: '原地换手拍球',
        description:
          '站立双脚与肩同宽，微微屈膝保持重心低，使用右手连续拍球10次后换左手。换手时眼睛看前方不看球，拍球高度控制在腰部以下。',
        duration: 3,
        videoUrl: '/assets/videos/parent_child_day1_1.mp4',
      },
      {
        id: 'step2',
        title: '走线拍球训练',
        description:
          '在地上画一条直线或放置瓶子当作路径，沿路径前进同时保持拍球不离手。可采用左右手交替拍球，如掉球要立即捡起继续保持节奏。',
        duration: 4,
        videoUrl: '/assets/videos/parent_child_day1_2.mp4',
      },
      {
        id: 'step3',
        title: '绕腿拍球练习',
        description:
          '先进行空手绕腿动作熟悉节奏，慢速一边拍球一边绕腿（顺时针/逆时针）。保持低位重心，双脚不动，尝试连续完成5次不掉球。',
        duration: 5,
        videoUrl: '/assets/videos/parent_child_day1_3.mp4',
      },
    ],
    keyPoints: [
      '保持膝盖微曲，重心稍低',
      '用指尖而非整个手掌控制球',
      '眼睛尽量看前方，减少盯着球',
      '动作要流畅，保持放松',
    ],
    tips: [
      '每次训练前先热身，活动手腕和手指',
      '训练间隔可以做简单拉伸',
      '多鼓励和赞美，不要过于苛求完美',
      '注意观察孩子注意力状态，适时调整节奏',
    ],
    commonErrors: [
      {
        error: '整个手掌拍打球',
        correction: '提醒"用指尖感受球"',
      },
      {
        error: '目光始终盯着球',
        correction: '逐步引导抬头，先看3秒其他地方',
      },
    ],
    rewards: {
      stars: 3,
      experience: 15,
    },
    imageUrls: {
      thumbnail: '/assets/images/parent_child/day1_thumb.png',
      steps: [
        '/assets/images/parent_child/day1_step1.png',
        '/assets/images/parent_child/day1_step2.png',
      ],
    },
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
        description:
          '原地双手交替拍球，高度交替：一个高一个低。高拍到肩膀高度，低拍控制在膝盖以下。注意节奏感与控制力，维持低重心，脚步不动。',
        duration: 4,
        videoUrl: '/assets/videos/parent_child_day2_1.mp4',
      },
      {
        id: 'step2',
        title: '控球走线拍球（弯道）',
        description:
          '用瓶子或绳子设置"S"形路线，手持球沿曲线路径拍球移动。左右手交替尝试，慢速为主，强调步伐平稳，球不能丢。',
        duration: 4,
        videoUrl: '/assets/videos/parent_child_day2_2.mp4',
      },
      {
        id: 'step3',
        title: '断球与追球游戏',
        description:
          '爸爸持球缓慢移动，孩子判断时机出手断球。爸爸滚球向远处，孩子追抢并带球回来。加入不同方向变化训练反应力，完成任务后可增加挑战难度。',
        duration: 4,
        videoUrl: '/assets/videos/parent_child_day2_3.mp4',
      },
    ],
    keyPoints: [
      '保持身体平衡，重心略低',
      '控球时手指分开，指尖控制',
      '变向时降低重心，保护好球',
      '追球时眼睛跟随球移动',
    ],
    tips: [
      '孩子注意力分散时可短暂休息',
      '每个练习间可以做小游戏放松',
      '爸爸要控制好难度，保持兴趣',
      '多表扬进步，不强调错误',
    ],
    commonErrors: [
      {
        error: '运球太高，容易失控',
        correction: '提醒"球的高度不超过腰部"',
      },
      {
        error: '追球时跑得太快失去平衡',
        correction: '鼓励"稳健前进，控制速度"',
      },
    ],
    rewards: {
      stars: 3,
      experience: 15,
    },
    imageUrls: {
      thumbnail: '/assets/images/parent_child/day2_thumb.png',
      steps: [
        '/assets/images/parent_child/day2_step1.png',
        '/assets/images/parent_child/day2_step2.png',
      ],
    },
  },
  {
    moduleId: 'parent_child_day3',
    category: 'shooting',
    title: '上篮专项与节奏控制',
    level: '基础',
    duration: 12,
    equipment: ['标准篮球', '计时器', '音乐播放器（可选）'],
    setup: '篮球场或有篮筐的场地',
    description:
      '学习基础上篮技巧和节奏控制，通过音乐辅助训练和计数挑战增强趣味性，适合注意力不集中的儿童。',
    steps: [
      {
        id: 'step1',
        title: '两步起跳上篮（模拟）',
        description:
          '第一步左脚，第二步右脚，随后起跳。右手上篮（反之亦然）。强调动作连贯性与节奏配合，起跳后尽量伸手向上模拟投篮。',
        duration: 5,
        videoUrl: '/assets/videos/parent_child_day3_1.mp4',
      },
      {
        id: 'step2',
        title: '原地节奏拍球训练',
        description:
          '播放轻快节奏音乐，跟随节拍拍球。尝试慢节奏和快节奏切换，可以加入拍手或转身动作。重点是感知节奏变化与动作一致。',
        duration: 3,
        videoUrl: '/assets/videos/parent_child_day3_2.mp4',
      },
      {
        id: 'step3',
        title: '十球挑战',
        description:
          '爸爸发球10次，孩子尽力完成10次上篮动作。不要求每次命中，鼓励完整动作完成。计数成功次数以激励进步，逐周记录挑战分数，看到进步。',
        duration: 4,
        videoUrl: '/assets/videos/parent_child_day3_3.mp4',
      },
    ],
    keyPoints: [
      '上篮步伐要协调：左-右-跳（右手上篮）',
      '保持眼睛注视篮筐',
      '音乐训练中注意倾听节奏',
      '十球挑战中重在完成动作，不求完美',
    ],
    tips: [
      '分步骤练习上篮动作，先不用篮球',
      '用语言提示来帮助记忆步骤',
      '十球挑战可记录成绩，下次挑战自己',
      '结束后给予具体的正面反馈',
    ],
    commonErrors: [
      {
        error: '上篮步伐混乱',
        correction: '口诀"左-右-跳"反复练习',
      },
      {
        error: '节奏训练中不能跟上',
        correction: '放慢速度，循序渐进增加',
      },
    ],
    rewards: {
      stars: 4,
      experience: 20,
    },
    imageUrls: {
      thumbnail: '/assets/images/parent_child/day3_thumb.png',
      steps: [
        '/assets/images/parent_child/day3_step1.png',
        '/assets/images/parent_child/day3_step2.png',
      ],
    },
  },
];

export default parentChildTrainings;
