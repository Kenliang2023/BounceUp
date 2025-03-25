import { useTraining } from '../contexts/TrainingContext';

const ProgressPage = () => {
  const { skillProgress, trainingHistory } = useTraining();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">训练进度</h1>
      </div>
      
      {/* 技能进度 */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">技能进度</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>运球</span>
              <span>{skillProgress.dribbling}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary rounded-full h-2.5" 
                style={{ width: `${skillProgress.dribbling}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>投篮</span>
              <span>{skillProgress.shooting}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary rounded-full h-2.5" 
                style={{ width: `${skillProgress.shooting}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>传球</span>
              <span>{skillProgress.passing}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary rounded-full h-2.5" 
                style={{ width: `${skillProgress.passing}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>移动</span>
              <span>{skillProgress.movement}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary rounded-full h-2.5" 
                style={{ width: `${skillProgress.movement}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 训练历史 */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">训练历史</h2>
        
        {trainingHistory.length > 0 ? (
          <div className="space-y-4">
            {trainingHistory.map((record) => (
              <div key={record.recordId} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{record.title || '训练记录'}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(record.date).toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary font-bold">{record.score}</span>
                    <span className="text-xs text-gray-500 ml-1">/ 5</span>
                  </div>
                </div>
                
                <div className="mt-1">
                  <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5">
                    {record.category === 'dribbling' ? '运球' : 
                     record.category === 'shooting' ? '投篮' : 
                     record.category === 'passing' ? '传球' : 
                     record.category === 'movement' ? '移动' : '其他'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">暂无训练记录</div>
            <p className="text-sm text-gray-600 mt-1">
              完成训练后，您的进度将显示在这里
            </p>
          </div>
        )}
      </div>
      
      {/* 数据可视化 (占位) */}
      <div className="card bg-gray-50 p-6 flex flex-col items-center justify-center">
        <div className="text-3xl mb-3">📈</div>
        <div className="font-semibold">更详细的数据分析</div>
        <p className="text-sm text-gray-600 text-center mt-2">
          技能雷达图、进步趋势图等高级功能即将推出，敬请期待！
        </p>
      </div>
    </div>
  );
};

export default ProgressPage; 