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
        videoUrl: '/assets/videos/passing_1_1.mp4',
      },
      {
        id: 'step2',
        title: '地板传球',
        description: '学习准确的地板弹传技巧',
        duration: 4,
        videoUrl: '/assets/videos/passing_1_2.mp4',
      },
      {
        id: 'step3',
        title: '头上传球',
        description: '练习头上双手传球技巧',
        duration: 4,
        videoUrl: '/assets/videos/passing_1_3.mp4',
      },
    ],
    keyPoints: [
      '传球时眼睛注视目标',
      '手指分开控制球的方向',
      '双脚站稳，保持平衡',
      '根据距离控制传球力度',
    ],
    tips: [
      '每种传球方式先进行10-15次练习',
      '注重精准度而非速度',
      '先定点练习，再尝试移动中传球',
      '注意观察孩子的手腕力量，适当调整距离',
    ],
    rewards: {
      stars: 3,
      experience: 15,
    },
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
        videoUrl: '/assets/videos/passing_2_1.mp4',
      },
      {
        id: 'step2',
        title: '接球后快速传球',
        description: '练习接球后快速完成下一次传球',
        duration: 5,
        videoUrl: '/assets/videos/passing_2_2.mp4',
      },
      {
        id: 'step3',
        title: '变向后传球',
        description: '练习在变向后迅速找到传球目标',
        duration: 5,
        videoUrl: '/assets/videos/passing_2_3.mp4',
      },
    ],
    keyPoints: [
      '移动中注意观察队友位置',
      '传球前可使用眼神假动作',
      '传球后迅速调整位置',
      '根据队友移动预判传球点',
    ],
    tips: [
      '先慢速练习掌握要领，再逐渐加快',
      '父子互动传球时，爸爸要适当控制力度',
      '鼓励孩子在传球前抬头观察',
      '可设置简单游戏增加趣味性',
    ],
    rewards: {
      stars: 3,
      experience: 15,
    },
  },
];

export default passingTrainings;
