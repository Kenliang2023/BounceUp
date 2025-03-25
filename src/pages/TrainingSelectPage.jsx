import { Link } from 'react-router-dom';
import dribblingTrainings from '../data/training/dribbling';

const TrainingSelectPage = () => {
  const categories = [
    { id: 'dribbling', name: '运球', emoji: '🏀', color: 'bg-blue-100', data: dribblingTrainings },
    { id: 'shooting', name: '投篮', emoji: '🎯', color: 'bg-red-100', data: [] },
    { id: 'passing', name: '传球', emoji: '👐', color: 'bg-green-100', data: [] },
    { id: 'movement', name: '移动', emoji: '👟', color: 'bg-yellow-100', data: [] }
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
      
      {/* 其他训练类别（占位） */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">更多训练</h2>
        <div className="card bg-gray-50 p-6 flex flex-col items-center justify-center">
          <div className="text-3xl mb-3">🚧</div>
          <div className="font-semibold">更多训练正在开发中</div>
          <p className="text-sm text-gray-600 text-center mt-2">
            投篮、传球和移动训练即将推出，敬请期待！
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainingSelectPage; 