// 投篮训练数据
const shootingTrainings = [
  {
    moduleId: 'shooting_1',
    category: 'shooting',
    title: '基础投篮姿势',
    level: '基础',
    duration: 8,
    equipment: ['标准篮球', '篮框'],
    setup: '场地：篮球场，靠近篮筐位置',
    description: '学习正确的投篮姿势和手法，建立良好的投篮基础。',
    steps: [
      '站在离篮筐2-3米的位置',
      '练习正确的投篮手型与握球方式，不投篮',
      '低位投篮练习，重点感受手腕发力',
      '中位投篮练习，增加手臂发力',
      '完整投篮动作练习，协调下肢和上肢力量'
    ],
    keyPoints: [
      '投篮手放在球的中心略上方',
      '另一只手扶在球侧面',
      '手肘在球的正下方，保持垂直',
      '投篮时手腕自然下弯，形成"鹅颈"姿势'
    ],
    commonErrors: [
      {
        error: '手肘外展，不在正下方',
        correction: '提醒"手肘朝向篮筐，在球的正下方"'
      },
      {
        error: '投篮动作僵硬，过度用力',
        correction: '强调"放松手腕，感受自然弧线"'
      }
    ],
    metrics: [
      {
        name: '投篮姿势',
        basic: '能保持正确的手型和手肘位置',
        intermediate: '动作协调，有稳定的投篮节奏',
        advanced: '姿势标准，动作流畅，命中率高'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/shooting/basic_form_thumb.png',
      steps: [
        '/assets/images/shooting/basic_form_step1.png',
        '/assets/images/shooting/basic_form_step2.png'
      ]
    }
  },
  {
    moduleId: 'shooting_2',
    category: 'shooting',
    title: '罚球线投篮',
    level: '基础',
    duration: 10,
    equipment: ['标准篮球', '篮框', '计时器'],
    setup: '场地：篮球场，罚球线位置',
    description: '掌握中距离罚球线投篮技巧，提高比赛中的罚球成功率。',
    steps: [
      '站在罚球线，找到舒适站姿',
      '练习投篮前的准备动作和呼吸节奏',
      '进行连续10次罚球，注意保持一致的动作',
      '休息30秒',
      '再次进行10次罚球，调整之前的错误',
      '最后进行10次"压力罚球"（每次限时5秒）'
    ],
    keyPoints: [
      '建立固定的罚球前准备动作',
      '保持专注，目视篮筐前沿',
      '全身协调发力，尤其是腿部力量',
      '保持一致的投篮节奏'
    ],
    commonErrors: [
      {
        error: '每次准备动作不一致',
        correction: '强调"建立固定习惯，每次保持一致"'
      },
      {
        error: '投篮弧度太平或太高',
        correction: '调整"中等弧度，瞄准篮筐前沿"'
      }
    ],
    metrics: [
      {
        name: '罚球命中率',
        basic: '30次罚球中命中15个以上',
        intermediate: '30次罚球中命中20个以上',
        advanced: '30次罚球中命中25个以上'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/shooting/free_throw_thumb.png',
      steps: [
        '/assets/images/shooting/free_throw_step1.png',
        '/assets/images/shooting/free_throw_step2.png'
      ]
    }
  },
  {
    moduleId: 'shooting_3',
    category: 'shooting',
    title: '移动中跳投',
    level: '中级',
    duration: 12,
    equipment: ['标准篮球', '篮框', '计时器'],
    setup: '场地：篮球场，中距离位置',
    description: '学习在移动后停下并完成跳投的技巧，是比赛中最常用的进攻手段。',
    steps: [
      '从三分线外开始，向篮筐移动',
      '在中距离位置进行急停',
      '完成标准跳投动作',
      '分别练习向左、向右和正面突破后的跳投',
      '每个方向练习10次',
      '结合变速变向动作进行实战模拟练习'
    ],
    keyPoints: [
      '急停时保持身体平衡',
      '跳起时身体垂直上升',
      '在最高点释放球',
      '投篮后保持手势跟随（跟手）'
    ],
    commonErrors: [
      {
        error: '停下时身体不平衡',
        correction: '练习"控制停步速度，降低重心"'
      },
      {
        error: '跳投时身体前倾或后仰',
        correction: '强调"垂直跳起，保持身体中立"'
      }
    ],
    metrics: [
      {
        name: '移动跳投质量',
        basic: '能完成基本动作，命中率30%',
        intermediate: '动作协调流畅，命中率40%',
        advanced: '动作快速稳定，命中率50%以上'
      }
    ],
    imageUrls: {
      thumbnail: '/assets/images/shooting/pull_up_thumb.png',
      steps: [
        '/assets/images/shooting/pull_up_step1.png',
        '/assets/images/shooting/pull_up_step2.png'
      ]
    }
  }
];

export default shootingTrainings; 