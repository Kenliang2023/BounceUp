import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTrainingPlan } from '../contexts/TrainingPlanContext';
import { useTraining } from '../contexts/TrainingContext';
import { findTrainingById } from '../data/allTrainings';

const TrainingDayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 检查是否是回顾模式
  const isReviewMode = location.pathname.includes('/review/');
  
  const { 
    getTrainingDayDetails, 
    completeTrainingDay, 
    unscheduleTrainingDay 
  } = useTrainingPlan();
  const { 
    startTrainingDay, 
    currentTraining, 
    currentTrainingIndex, 
    updateTrainingProgress, 
    completeTraining, 
    cancelTraining 
  } = useTraining();
  
  const [trainingDay, setTrainingDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(3);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);
  
  // 加载训练日数据
  useEffect(() => {
    if (id) {
      const dayDetails = getTrainingDayDetails(id);
      setTrainingDay(dayDetails);
      setIsLoading(false);
      
      // 如果是回顾模式，不需要检查是否已完成
      if (isReviewMode) {
        return;
      }
      
      // 如果训练日已完成，重定向到首页
      if (dayDetails && dayDetails.isCompleted && !isReviewMode) {
        navigate('/training-plan');
      }
    }
  }, [id, isReviewMode]);
  
  // 开始训练
  const handleStartTraining = () => {
    if (!trainingDay) return;
    
    try {
      // 开始训练日的第一个训练
      startTrainingDay(trainingDay);
      setIsStarted(true);
    } catch (error) {
      console.error('Failed to start training:', error);
    }
  };
  
  // 更新训练进度
  const handleUpdateProgress = (progress) => {
    updateTrainingProgress(progress);
  };
  
  // 完成当前训练
  const handleCompleteTraining = () => {
    if (!currentTraining) return;
    
    try {
      const result = completeTraining(score, feedback);
      
      if (result.isTrainingDayCompleted) {
        // 所有训练已完成，显示结果页面
        setIsCompleted(true);
        
        // 完成整个训练日
        const dayResult = completeTrainingDay(id);
        setResults({
          ...result,
          ...dayResult
        });
      } else if (result.hasNextTraining) {
        // 重置分数和反馈，准备下一个训练
        setScore(3);
        setFeedback('');
        setCurrentStep(0);
      }
    } catch (error) {
      console.error('Failed to complete training:', error);
    }
  };
  
  // 取消训练
  const handleCancelTraining = () => {
    cancelTraining();
    navigate('/training-plan');
  };
  
  // 重新安排训练
  const handleReschedule = () => {
    unscheduleTrainingDay(id);
    navigate('/training-plan');
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!trainingDay) {
    return (
      <div className="card p-6 text-center">
        <div className="text-3xl mb-3">⚠️</div>
        <p className="font-semibold">未找到训练日</p>
        <p className="text-gray-600 mt-2">
          无法找到该训练日数据，请返回训练计划页面
        </p>
        <button 
          onClick={() => navigate('/training-plan')}
          className="btn btn-primary mt-4"
        >
          返回训练计划
        </button>
      </div>
    );
  }
  
  // 如果是回顾模式，显示训练日详情
  if (isReviewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">训练回顾</h1>
        </div>
        
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{trainingDay.title}</h2>
              <p className="text-gray-600 mt-1">
                {trainingDay.description}
              </p>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <span className="bg-green-100 text-green-800 text-sm px-2 py-0.5 rounded-full">
                  已完成
                </span>
              </div>
              {trainingDay.completedDate && (
                <div className="text-sm text-gray-500 mt-1">
                  {new Date(trainingDay.completedDate).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex mt-4">
            <span className="text-sm bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5 flex items-center">
              <span>⭐</span>
              <span className="ml-1">{trainingDay.starReward}</span>
            </span>
            <span className="text-sm bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5 ml-2 flex items-center">
              <span>⏱️</span>
              <span className="ml-1">{trainingDay.duration}分钟</span>
            </span>
            {trainingDay.score && (
              <span className="text-sm bg-green-100 text-green-800 rounded-full px-2 py-0.5 ml-2 flex items-center">
                <span>📊</span>
                <span className="ml-1">得分: {trainingDay.score.toFixed(1)}</span>
              </span>
            )}
          </div>
        </div>
        
        <div className="card">
          <h3 className="font-semibold mb-3">训练内容</h3>
          <div className="space-y-3">
            {trainingDay.trainings.map((training, index) => {
              // 获取完整的训练信息
              const fullTraining = findTrainingById(training.moduleId);
              
              return (
                <div key={training.moduleId} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{index + 1}. {training.title || fullTraining?.title}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {fullTraining?.description || '训练描述'}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {training.duration || fullTraining?.duration || '?'}分钟
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/training-plan')}
          className="btn btn-primary w-full"
        >
          返回训练计划
        </button>
      </div>
    );
  }
  
  // 如果训练已完成，显示结果页面
  if (isCompleted && results) {
    return (
      <div className="space-y-6">
        <div className="card bg-green-50 p-6 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-xl font-bold mb-2">训练日完成！</h2>
          <p className="text-gray-600">
            你成功完成了 {trainingDay.title} 的所有训练项目
          </p>
          
          <div className="mt-6 bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2">获得奖励</div>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">⭐</div>
                <div className="text-xl font-bold">{results.earnedStars}</div>
                <div className="text-xs text-gray-500">星星</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">📈</div>
                <div className="text-xl font-bold">{results.averageScore?.toFixed(1) || '?'}</div>
                <div className="text-xs text-gray-500">平均分</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">🏆</div>
                <div className="text-xl font-bold">{trainingDay.trainings.length}</div>
                <div className="text-xs text-gray-500">完成训练</div>
              </div>
            </div>
          </div>
          
          {results.testPassed && (
            <div className="mt-4 bg-yellow-100 text-yellow-800 p-3 rounded-lg inline-block">
              恭喜！你通过了测试，解锁了下一级训练！
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => navigate('/training-plan')}
              className="btn btn-primary"
            >
              返回训练计划
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // 如果训练未开始，显示训练日详情
  if (!isStarted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">训练日详情</h1>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold">{trainingDay.title}</h2>
          <p className="text-gray-600 mt-2">
            {trainingDay.description}
          </p>
          
          <div className="flex mt-4">
            <span className="text-sm bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5 flex items-center">
              <span>⭐</span>
              <span className="ml-1">{trainingDay.starReward}</span>
            </span>
            <span className="text-sm bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5 ml-2 flex items-center">
              <span>⏱️</span>
              <span className="ml-1">{trainingDay.duration}分钟</span>
            </span>
            {trainingDay.isTest && (
              <span className="text-sm bg-purple-100 text-purple-800 rounded-full px-2 py-0.5 ml-2 flex items-center">
                <span>🔍</span>
                <span className="ml-1">测试</span>
              </span>
            )}
          </div>
        </div>
        
        <div className="card">
          <h3 className="font-semibold mb-3">训练内容</h3>
          <div className="space-y-3">
            {trainingDay.trainings.map((training, index) => {
              // 获取完整的训练信息
              const fullTraining = findTrainingById(training.moduleId);
              
              return (
                <div key={training.moduleId} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{index + 1}. {training.title || fullTraining?.title}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {fullTraining?.description || '训练描述'}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {training.duration || fullTraining?.duration || '?'}分钟
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={handleReschedule}
            className="btn btn-outline flex-1"
          >
            重新安排
          </button>
          <button 
            onClick={handleStartTraining}
            className="btn btn-primary flex-1"
          >
            开始训练
          </button>
        </div>
      </div>
    );
  }
  
  // 如果当前没有训练数据（可能是中间状态），显示加载中
  if (!currentTraining) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // 训练进行中，显示当前训练
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {currentTraining.title} 
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({currentTrainingIndex + 1}/{trainingDay.trainings.length})
          </span>
        </h1>
      </div>
      
      {/* 训练内容 */}
      <div className="card">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">训练描述</div>
          <p>{currentTraining.description}</p>
        </div>
        
        {/* 训练步骤 */}
        {currentTraining.steps && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="font-medium">步骤 {currentStep + 1}/{currentTraining.steps.length}</div>
              <div className="text-sm text-gray-500">
                {currentTraining.steps[currentStep]?.duration || '?'}分钟
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="font-medium">{currentTraining.steps[currentStep]?.title}</div>
              <p className="text-gray-600 mt-2">
                {currentTraining.steps[currentStep]?.description}
              </p>
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="btn btn-sm btn-outline disabled:opacity-50"
              >
                上一步
              </button>
              <button 
                onClick={() => setCurrentStep(Math.min(currentTraining.steps.length - 1, currentStep + 1))}
                disabled={currentStep === currentTraining.steps.length - 1}
                className="btn btn-sm btn-primary disabled:opacity-50"
              >
                下一步
              </button>
            </div>
          </div>
        )}
        
        {/* 训练要点 */}
        {currentTraining.keyPoints && (
          <div className="mt-6">
            <div className="font-medium mb-2">训练要点</div>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {currentTraining.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* 训练进度条 */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-1">
            <span>训练进度</span>
            <span>{currentTraining.progress || 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary rounded-full h-2.5 transition-all duration-300" 
              style={{ width: `${currentTraining.progress || 0}%` }}
            ></div>
          </div>
        </div>
        
        {/* 进度控制按钮 */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((progress) => (
            <button
              key={progress}
              onClick={() => handleUpdateProgress(progress)}
              className={`btn btn-sm ${
                (currentTraining.progress || 0) >= progress
                ? 'btn-primary'
                : 'btn-outline'
              }`}
            >
              {progress}%
            </button>
          ))}
        </div>
      </div>
      
      {/* 训练完成表单 */}
      <div className="card">
        <h3 className="font-semibold mb-3">完成训练</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            评分 (1-5)
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setScore(value)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  score === value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            训练反馈 (可选)
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="记录训练感受和注意事项..."
            className="w-full p-2 border rounded-lg h-24"
          ></textarea>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={handleCancelTraining}
            className="btn btn-outline flex-1"
          >
            取消训练
          </button>
          <button 
            onClick={handleCompleteTraining}
            disabled={(currentTraining.progress || 0) < 100}
            className="btn btn-primary flex-1 disabled:opacity-50"
          >
            {currentTrainingIndex < trainingDay.trainings.length - 1 ? '下一个训练' : '完成所有训练'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingDayPage;