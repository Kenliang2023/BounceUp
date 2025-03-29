import { Link } from 'react-router-dom';
import dribblingTrainings from '../data/training/dribbling';
import shootingTrainings from '../data/training/shooting';
import passingTrainings from '../data/training/passing';
import movementTrainings from '../data/training/movement';

const TrainingSelectPage = () => {
  const categories = [
    { id: 'dribbling', name: '运球', emoji: '🏀', color: 'bg-blue-100', data: dribblingTrainings },
    { id: 'shooting', name: '投篮', emoji: '🎯', color: 'bg-red-100', data: shootingTrainings },
    { id: 'passing', name: '传球', emoji: '👐', color: 'bg-green-100', data: passingTrainings },
    { id: 'movement', name: '移动', emoji: '👟', color: 'bg-yellow-100', data: movementTrainings }
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
          {dribblingTrainings.map((training) => (
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
          {shootingTrainings.map((training) => (
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
      </div>
      
      {/* 移动训练列表 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">移动训练</h2>
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
      </div>
    </div>
  );
};

export default TrainingSelectPage; 