  const scrollToCategory = (categoryId) => {
    let ref;
    switch(categoryId) {
      case 'dribbling':
        ref = dribblingRef;
        break;
      case 'shooting':
        ref = shootingRef;
        break;
      case 'passing':
        ref = passingRef;
        break;
      case 'movement':
        ref = movementRef;
        break;
      case 'parent_child':
        ref = parentChildRef;
        break;
      default:
        return;
    }
    
    if (ref && ref.current) {
      // 滚动到元素并增加一点偏移量，考虑到顶部导航栏
      window.scrollTo({
        top: ref.current.offsetTop - 70, // 减去导航栏高度和一点空间
        behavior: 'smooth'
      });
    }
  };
  import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  dribblingTrainings, 
  shootingTrainings, 
  passingTrainings, 
  movementTrainings,
  parentChildTrainings 
} from '../data/allTrainings';

const TrainingSelectPage = () => {
  // 创建引用用于滚动
  const dribblingRef = useRef(null);
  const shootingRef = useRef(null);
  const passingRef = useRef(null);
  const movementRef = useRef(null);
  const parentChildRef = useRef(null);
  
  const [debug, setDebug] = useState({
    dribbling: 0,
    shooting: 0,
    passing: 0,
    movement: 0,
    parentChild: 0
  });

  useEffect(() => {
    // 页面加载时记录训练数据的长度，用于调试
    console.log("Training data loaded:");
    console.log("Dribbling:", dribblingTrainings?.length || 0);
    console.log("Shooting:", shootingTrainings?.length || 0);
    console.log("Passing:", passingTrainings?.length || 0);
    console.log("Movement:", movementTrainings?.length || 0);
    console.log("ParentChild:", parentChildTrainings?.length || 0);
    
    setDebug({
      dribbling: dribblingTrainings?.length || 0,
      shooting: shootingTrainings?.length || 0,
      passing: passingTrainings?.length || 0,
      movement: movementTrainings?.length || 0,
      parentChild: parentChildTrainings?.length || 0
    });
  }, []);

  // 滚动到指定类别的函数
  const scrollToCategory = (categoryId) => {
    let ref;
    switch(categoryId) {
      case 'dribbling':
        ref = dribblingRef;
        break;
      case 'shooting':
        ref = shootingRef;
        break;
      case 'passing':
        ref = passingRef;
        break;
      case 'movement':
        ref = movementRef;
        break;
      case 'parent_child':
        ref = parentChildRef;
        break;
      default:
        return;
    }
    
    if (ref && ref.current) {
      // 滚动到元素并增加一点偏移量，考虑到顶部导航栏
      window.scrollTo({
        top: ref.current.offsetTop - 70, // 减去导航栏高度和一点空间
        behavior: 'smooth'
      });
    }
  };

  // 将父子训练数据添加到相应类别中
  const allDribblingTrainings = dribblingTrainings && parentChildTrainings ? 
    [...dribblingTrainings, ...parentChildTrainings.filter(t => t.category === 'dribbling')] :
    dribblingTrainings || [];
  
  const allShootingTrainings = shootingTrainings && parentChildTrainings ?
    [...shootingTrainings, ...parentChildTrainings.filter(t => t.category === 'shooting')] :
    shootingTrainings || [];

  const categories = [
    { id: 'dribbling', name: '运球', emoji: '🏀', color: 'bg-blue-100', data: allDribblingTrainings },
    { id: 'shooting', name: '投篮', emoji: '🎯', color: 'bg-red-100', data: allShootingTrainings },
    { id: 'passing', name: '传球', emoji: '👐', color: 'bg-green-100', data: passingTrainings || [] },
    { id: 'movement', name: '移动', emoji: '👟', color: 'bg-yellow-100', data: movementTrainings || [] },
    { id: 'parent_child', name: '父子训练', emoji: '👨‍👦', color: 'bg-purple-100', data: parentChildTrainings || [] }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">训练选择</h1>
      </div>
      
      {/* 调试信息 - 仅在开发环境显示 */}
      {import.meta.env.DEV && (
        <div className="card bg-yellow-50 p-2 text-xs">
          <p>调试信息：</p>
          <p>运球: {debug.dribbling}, 投篮: {debug.shooting}</p>
          <p>传球: {debug.passing}, 移动: {debug.movement}</p>
          <p>父子训练: {debug.parentChild}</p>
        </div>
      )}
      
      {/* 类别选择 */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id}
            className={`card ${category.color} p-4 flex flex-col items-center justify-center cursor-pointer transform transition-transform hover:scale-105 active:scale-95`}
            onClick={() => scrollToCategory(category.id)}
          >
            <div className="text-3xl mb-2">{category.emoji}</div>
            <div className="font-semibold">{category.name}</div>
            <div className="text-sm text-gray-600 mt-1">
              {Array.isArray(category.data) && category.data.length > 0 
                ? `${category.data.length} 个训练项目` 
                : '即将推出'}
            </div>
            <div className="text-xs text-primary mt-2">点击查看详情 →</div>
          </div>
        ))}
      </div>
      
      {/* 运球训练列表 */}
      <div className="mt-8" ref={dribblingRef}>
        <h2 className="text-xl font-semibold mb-4">运球训练</h2>
        {Array.isArray(allDribblingTrainings) && allDribblingTrainings.length > 0 ? (
          <div className="space-y-4">
            {allDribblingTrainings.map((training) => (
              <div key={training.moduleId} className="card">
                <div className="font-semibold">{training.title}</div>
                <div className="flex items-center mt-1 mb-2">
                  <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5">
                    {training.level}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {training.duration} 分钟
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{training.description}</p>
                <Link to={`/training/${training.moduleId}`} className="btn btn-primary text-sm">
                  开始训练
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">⚠️</div>
            <p className="text-gray-600">加载训练数据中...</p>
          </div>
        )}
      </div>
      
      {/* 投篮训练列表 */}
      <div className="mt-8" ref={shootingRef}>
        <h2 className="text-xl font-semibold mb-4">投篮训练</h2>
        {Array.isArray(allShootingTrainings) && allShootingTrainings.length > 0 ? (
          <div className="space-y-4">
            {allShootingTrainings.map((training) => (
              <div key={training.moduleId} className="card">
                <div className="font-semibold">{training.title}</div>
                <div className="flex items-center mt-1 mb-2">
                  <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5">
                    {training.level}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {training.duration} 分钟
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{training.description}</p>
                <Link to={`/training/${training.moduleId}`} className="btn btn-primary text-sm">
                  开始训练
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">🔜</div>
            <p className="text-gray-600">新的投篮训练项目即将推出，敬请期待！</p>
          </div>
        )}
      </div>
      
      {/* 传球训练列表 */}
      <div className="mt-8" ref={passingRef}>
        <h2 className="text-xl font-semibold mb-4">传球训练</h2>
        {Array.isArray(passingTrainings) && passingTrainings.length > 0 ? (
          <div className="space-y-4">
            {passingTrainings.map((training) => (
              <div key={training.moduleId} className="card">
                <div className="font-semibold">{training.title}</div>
                <div className="flex items-center mt-1 mb-2">
                  <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5">
                    {training.level}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {training.duration} 分钟
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{training.description}</p>
                <Link to={`/training/${training.moduleId}`} className="btn btn-primary text-sm">
                  开始训练
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">🔜</div>
            <p className="text-gray-600">新的传球训练项目即将推出，敬请期待！</p>
          </div>
        )}
      </div>
      
      {/* 移动训练列表 */}
      <div className="mt-8" ref={movementRef}>
        <h2 className="text-xl font-semibold mb-4">移动训练</h2>
        {Array.isArray(movementTrainings) && movementTrainings.length > 0 ? (
          <div className="space-y-4">
            {movementTrainings.map((training) => (
              <div key={training.moduleId} className="card">
                <div className="font-semibold">{training.title}</div>
                <div className="flex items-center mt-1 mb-2">
                  <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5">
                    {training.level}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {training.duration} 分钟
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{training.description}</p>
                <Link to={`/training/${training.moduleId}`} className="btn btn-primary text-sm">
                  开始训练
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">🔜</div>
            <p className="text-gray-600">新的移动训练项目即将推出，敬请期待！</p>
          </div>
        )}
      </div>
      
      {/* 父子训练手册 */}
      <div className="mt-8" ref={parentChildRef}>
        <h2 className="text-xl font-semibold mb-4">父子训练手册</h2>
        {Array.isArray(parentChildTrainings) && parentChildTrainings.length > 0 ? (
          <div className="space-y-4">
            {parentChildTrainings.map((training) => (
              <div key={training.moduleId} className="card">
                <div className="font-semibold">{training.title}</div>
                <div className="flex items-center mt-1 mb-2">
                  <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5">
                    {training.level}
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-700 rounded-full px-2 py-0.5 ml-2">
                    父子互动
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {training.duration} 分钟
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{training.description}</p>
                <Link to={`/training/${training.moduleId}`} className="btn btn-primary text-sm">
                  开始训练
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">🔜</div>
            <p className="text-gray-600">父子训练手册正在加载中，敬请期待！</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingSelectPage;