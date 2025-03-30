import { Link } from 'react-router-dom';
import dribblingTrainings from '../data/training/dribbling';
import shootingTrainings from '../data/training/shooting';
import passingTrainings from '../data/training/passing';
import movementTrainings from '../data/training/movement';
import parentChildTrainings from '../data/training/parentchild';

const TrainingSelectPage = () => {
  // 将新的父子训练数据添加到相应类别中
  const allDribblingTrainings = [
    ...dribblingTrainings,
    ...parentChildTrainings.filter(t => t.category === 'dribbling')
  ];
  
  const allShootingTrainings = [
    ...shootingTrainings,
    ...parentChildTrainings.filter(t => t.category === 'shooting')
  ];
  
  const categories = [
    { id: 'dribbling', name: '运球', emoji: '🏀', color: 'bg-blue-100', data: allDribblingTrainings },
    { id: 'shooting', name: '投篮', emoji: '🎯', color: 'bg-red-100', data: allShootingTrainings },
    { id: 'passing', name: '传球', emoji: '👐', color: 'bg-green-100', data: passingTrainings },
    { id: 'movement', name: '移动', emoji: '👟', color: 'bg-yellow-100', data: movementTrainings },
    { id: 'parent_child', name: '父子训练', emoji: '👨‍👦', color: 'bg-purple-100', data: parentChildTrainings }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">训练选择</h1>
      </div>
      
      {/* 类别选择 */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id}
            className={`card ${category.color} p-4 flex flex-col items-center justify-center`}
          >
            <div className="text-3xl mb-2">{category.emoji}</div>
            <div className="font-semibold">{category.name}</div>
            <div className="text-sm text-gray-600 mt-1">
              {category.data.length > 0 
                ? `${category.data.length} 个训练项目` 
                : '即将推出'}
            </div>
          </div>
        ))}
      </div>
      
      {/* 运球训练列表 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">运球训练</h2>
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
      </div>
      
      {/* 投篮训练列表 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">投篮训练</h2>
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
      </div>
      
      {/* 传球训练列表 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">传球训练</h2>
        {passingTrainings.length > 0 ? (
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
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">移动训练</h2>
        {movementTrainings.length > 0 ? (
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
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">父子训练手册</h2>
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
      </div>
    </div>
  );
};

export default TrainingSelectPage;