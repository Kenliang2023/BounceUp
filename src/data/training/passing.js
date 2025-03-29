// 传球训练数据
const passingTrainings = [
  {
    moduleId: 'passing_1',
    category: 'passing',
    title: '基础传球技巧',
    level: '基础',
    duration: 8,
    equipment: ['标准篮球', '墙壁或训练伙伴'],
    setup: '场地：平坦场地，距离墙壁或伙伴3-4米',
    description: '学习基本的传球方法和准确性，提高传球的基本技能。',
    steps: [
      '练习胸前传球技巧，重点是双手平稳推出',
      '练习击地传球，球在接收者前方1.5米处弹地',
      '练习头顶传球，适合传递给内线队友',
      '结合移动练习不同传球方式',
      '每种传球方式练习15-20次'
    ],
    keyPoints: [
      '传球时手指分开控制方向',
      '手肘自然弯曲，不要锁直',
      '传球动作要干脆利落',
      '眼睛注视目标而非球'
    ],
    commonErrors: [
      {
        error: '传球无力或不准确',
        correction: '强调"从胸部发力，手臂跟随延伸"'
      },
      {
        error: '传球时跳起或失去平衡',
        correction: '练习"保持站稳，重心稍微前倾"'
      }
    ],
    metrics: [
      {
        name: '传球准确度',
        basic: '能完成基本传球动作，7/10次准确',
        intermediate: '传球动作流畅，8/10次准确',
        advanced: '各种传球方式准确度高，9/10次准确'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/passing/basic_pass_thumb.png',
      steps: [
        '/assets/images/passing/basic_pass_step1.png',
        '/assets/images/passing/basic_pass_step2.png'
      ]
    }
  },
  {
    moduleId: 'passing_2',
    category: 'passing',
    title: '移动中传球',
    level: '基础',
    duration: 10,
    equipment: ['标准篮球', '训练伙伴', '标记物'],
    setup: '场地：篮球场，设置传球路线',
    description: '学习在移动状态下完成准确传球，提高比赛中的传球效率。',
    steps: [
      '两人相距5-6米平行慢跑，进行传接球',
      '加快移动速度，保持传球准确性',
      '练习跑动中的传球后切入',
      '模拟比赛中的突破分球',
      '进行2对1传球训练，增加防守压力'
    ],
    keyPoints: [
      '传球前观察接球者的移动轨迹',
      '传到接球者的前进方向',
      '根据距离控制传球力度',
      '传球后继续移动，不要停顿'
    ],
    commonErrors: [
      {
        error: '传球到队友身后',
        correction: '提醒"预判移动方向，传向前方"'
      },
      {
        error: '传球时机不对',
        correction: '练习"等待空档，选择最佳时机"'
      }
    ],
    metrics: [
      {
        name: '移动传球效率',
        basic: '能在慢跑中完成基本传球',
        intermediate: '在不同速度下保持传球准确性',
        advanced: '在高速移动和防守压力下传球精准'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/passing/moving_pass_thumb.png',
      steps: [
        '/assets/images/passing/moving_pass_step1.png',
        '/assets/images/passing/moving_pass_step2.png'
      ]
    }
  },
  {
    moduleId: 'passing_3',
    category: 'passing',
    title: '高级传球技巧',
    level: '中级',
    duration: 12,
    equipment: ['标准篮球', '训练伙伴', '标记物'],
    setup: '场地：篮球场，模拟比赛情境',
    description: '学习比赛中常用的高级传球技巧，提高传球创造性和战术价值。',
    steps: [
      '练习单手传球技巧，包括直传和击地传球',
      '学习背后传球的基本动作',
      '练习传球假动作，扰乱防守',
      '进行3对3实战传球训练',
      '练习挡拆后的传球选择'
    ],
    keyPoints: [
      '高级传球前保证基础传球稳定',
      '保持对球场的全局视野',
      '传球动作简洁有效',
      '根据防守反应调整传球方式'
    ],
    commonErrors: [
      {
        error: '过度追求花哨，忽视实用性',
        correction: '强调"实用为主，准确第一"'
      },
      {
        error: '传球前过多运球或犹豫',
        correction: '练习"接球即看、即决定、即传"'
      }
    ],
    metrics: [
      {
        name: '传球创造性',
        basic: '能完成基本的单手传球',
        intermediate: '能在实战中使用多种传球方式',
        advanced: '能根据情况灵活选择最佳传球方式和时机'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/passing/advanced_pass_thumb.png',
      steps: [
        '/assets/images/passing/advanced_pass_step1.png',
        '/assets/images/passing/advanced_pass_step2.png'
      ]
    }
  }
];

export default passingTrainings; 