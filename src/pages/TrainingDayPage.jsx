import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTrainingPlan } from '../contexts/TrainingPlanContext';
import { useTraining } from '../contexts/TrainingContext';
import { findTrainingById } from '../data/allTrainings';
import CountdownTimer from '../components/training/CountdownTimer'; // 如果有这个组件

const TrainingDayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 检查是否是回顾模式
  const isReviewMode = location.pathname.includes('/review/');

  const { getTrainingDayDetails, completeTrainingDay, unscheduleTrainingDay } = useTrainingPlan();
  const {
    startTrainingDay,
    currentTraining,
    currentTrainingIndex,
    updateTrainingProgress,
    completeTraining,
    cancelTraining,
  } = useTraining();

  const [trainingDay, setTrainingDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(3);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [showTrainingSummary, setShowTrainingSummary] = useState(false);

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
  const handleUpdateProgress = progress => {
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
          ...dayResult,
        });
      } else if (result.hasNextTraining) {
        // 重置分数和反馈，准备下一个训练
        setScore(3);
        setFeedback('');
        setCurrentStep(0);
        // 显示简短的完成提示
        setShowTrainingSummary(true);
        setTimeout(() => setShowTrainingSummary(false), 3000);
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
      <div className="flex justify-center items-center h-full p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!trainingDay) {
    return (
      <div className="card p-6 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="font-bold text-xl mb-2">未找到训练日</p>
        <p className="text-gray-600 mb-6">无法找到该训练日数据，请返回训练计划页面</p>
        <button onClick={() => navigate('/training-plan')} className="btn btn-primary">
          返回训练计划
        </button>
      </div>
    );
  }

  // 如果是回顾模式，显示训练日详情
  if (isReviewMode) {
    return (
      <div className="space-y-6">
        {/* 顶部导航栏 */}
        <div className="sticky top-0 bg-white z-10 py-3 border-b mb-4">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate('/training-plan')}
              className="flex items-center text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              返回
            </button>
            <h1 className="text-xl font-bold">训练回顾</h1>
            <div className="w-10"></div> {/* 为了保持标题居中 */}
          </div>
        </div>

        {/* 训练日卡片 */}
        <div className="card bg-gradient-to-br from-primary to-primary-dark text-white p-5">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{trainingDay.title}</h2>
              <p className="text-white text-opacity-90 mt-1">{trainingDay.description}</p>
            </div>

            <div className="flex flex-col items-end">
              <div className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-full text-sm">
                已完成
              </div>
              {trainingDay.completedDate && (
                <div className="text-sm text-white text-opacity-90 mt-1">
                  {new Date(trainingDay.completedDate).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex mt-4 space-x-3">
            <div className="bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 text-sm flex items-center">
              <span className="mr-1">⭐</span>
              <span>{trainingDay.starReward}</span>
            </div>
            <div className="bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 text-sm flex items-center">
              <span className="mr-1">⏱️</span>
              <span>{trainingDay.duration}分钟</span>
            </div>
            {trainingDay.score && (
              <div className="bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 text-sm flex items-center">
                <span className="mr-1">📊</span>
                <span>得分: {trainingDay.score.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* 训练内容列表 */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">训练内容</h3>
          <div className="space-y-4">
            {trainingDay.trainings.map((training, index) => {
              // 获取完整的训练信息
              const fullTraining = findTrainingById(training.moduleId);

              return (
                <div key={training.moduleId} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <div className="font-medium">{training.title || fullTraining?.title}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {training.duration || fullTraining?.duration || '?'}分钟
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-gray-600 text-sm">
                      {fullTraining?.description || '训练描述'}
                    </p>

                    {training.score && (
                      <div className="mt-3 flex items-center justify-end">
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                          得分: {training.score.toFixed(1)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部按钮 */}
        <button onClick={() => navigate('/training-plan')} className="btn btn-primary w-full">
          返回训练计划
        </button>
      </div>
    );
  }

  // 如果训练已完成，显示结果页面
  if (isCompleted && results) {
    return (
      <div className="space-y-6">
        <div className="card bg-gradient-to-br from-green-400 to-green-600 text-white p-6 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-2xl font-bold mb-3">训练成功完成！</h2>
          <p className="text-white text-opacity-90 text-lg mb-6">
            你成功完成了 {trainingDay.title} 的所有训练项目
          </p>

          <div className="bg-white rounded-lg p-5 text-gray-800 shadow-lg">
            <div className="text-sm text-gray-500 mb-3 font-medium">训练成果</div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-1">⭐</div>
                <div className="text-2xl font-bold">{results.earnedStars}</div>
                <div className="text-xs text-gray-500">获得星星</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-1">📈</div>
                <div className="text-2xl font-bold">{results.averageScore?.toFixed(1) || '?'}</div>
                <div className="text-xs text-gray-500">平均分</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-1">🏆</div>
                <div className="text-2xl font-bold">{trainingDay.trainings.length}</div>
                <div className="text-xs text-gray-500">完成训练数</div>
              </div>
            </div>
          </div>

          {results.testPassed && (
            <div className="mt-6 bg-yellow-300 text-yellow-900 p-4 rounded-lg inline-block">
              <div className="font-bold mb-1">恭喜！</div>
              <div>你通过了测试，解锁了下一级训练！</div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/training-plan')}
              className="btn bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-bold shadow-lg"
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
        {/* 顶部导航栏 */}
        <div className="sticky top-0 bg-white z-10 py-3 border-b mb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/training-plan')}
              className="flex items-center text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              返回
            </button>
            <h1 className="text-xl font-bold">训练日详情</h1>
            <div className="w-10"></div> {/* 为了保持标题居中 */}
          </div>
        </div>

        {/* 训练日卡片 */}
        <div className="card bg-gradient-to-br from-primary to-primary-dark text-white p-5">
          <h2 className="text-xl font-bold">{trainingDay.title}</h2>
          <p className="text-white text-opacity-90 mt-2 mb-4">{trainingDay.description}</p>

          <div className="flex space-x-3">
            <div className="bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 text-sm flex items-center">
              <span className="mr-1">⭐</span>
              <span>{trainingDay.starReward}</span>
            </div>
            <div className="bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 text-sm flex items-center">
              <span className="mr-1">⏱️</span>
              <span>{trainingDay.duration}分钟</span>
            </div>
            {trainingDay.isTest && (
              <div className="bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 text-sm flex items-center">
                <span className="mr-1">🔍</span>
                <span>测试</span>
              </div>
            )}
          </div>
        </div>

        {/* 训练内容预览 */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">训练内容</h3>
            <span className="text-sm text-gray-500">
              共{trainingDay.trainings.length}个训练项目
            </span>
          </div>

          <div className="space-y-3">
            {trainingDay.trainings.map((training, index) => {
              // 获取完整的训练信息
              const fullTraining = findTrainingById(training.moduleId);

              return (
                <div key={training.moduleId} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <div className="font-medium">{training.title || fullTraining?.title}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {training.duration || fullTraining?.duration || '?'}分钟
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {fullTraining?.description || '训练描述'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 开始训练按钮 */}
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <div className="flex space-x-3">
            <button onClick={handleReschedule} className="btn btn-outline flex-1">
              重新安排
            </button>
            <button onClick={handleStartTraining} className="btn btn-primary flex-1">
              开始训练
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 如果当前没有训练数据（可能是中间状态），显示加载中
  if (!currentTraining) {
    return (
      <div className="flex justify-center items-center h-full p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // 训练进行中，显示当前训练
  return (
    <div className="pb-24">
      {' '}
      {/* 增加底部空间，防止内容被底部控制栏遮挡 */}
      {/* 训练进度顶部栏 */}
      <div className="sticky top-0 bg-white z-10 py-3 border-b">
        <div className="flex items-center justify-between mb-2">
          <button onClick={handleCancelTraining} className="text-gray-500">
            取消
          </button>
          <div className="font-bold">
            训练 {currentTrainingIndex + 1}/{trainingDay.trainings.length}
          </div>
          <div className="w-10"></div> {/* 占位，保持标题居中 */}
        </div>

        {/* 整体进度条 */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary rounded-full h-2.5 transition-all duration-300"
            style={{
              width: `${
                (currentTrainingIndex / trainingDay.trainings.length) * 100 +
                (currentTraining.progress || 0) / trainingDay.trainings.length
              }%`,
            }}
          ></div>
        </div>
      </div>
      {/* 训练标题与时间 */}
      <div className="p-4 bg-primary bg-opacity-5 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{currentTraining.title}</h2>
          <div className="bg-primary text-white px-2 py-1 rounded-lg text-sm">
            {currentTraining.duration || '?'}分钟
          </div>
        </div>
        <p className="text-gray-600 mt-1">{currentTraining.description}</p>
      </div>
      {/* 主要训练内容区域 */}
      <div className="p-4">
        {/* 步骤导航 */}
        {currentTraining.steps && (
          <div className="mb-6">
            {/* 步骤指示器 */}
            <div className="flex justify-between mb-4">
              {currentTraining.steps.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`
                    flex-1 h-2 mx-0.5 rounded-full cursor-pointer
                    ${index <= currentStep ? 'bg-primary' : 'bg-gray-200'}
                  `}
                ></div>
              ))}
            </div>

            {/* 当前步骤标题与时间 */}
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium">
                第 {currentStep + 1} 步（共 {currentTraining.steps.length} 步）
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {currentTraining.steps[currentStep]?.duration || '?'} 分钟
              </div>
            </div>

            {/* 当前步骤内容 */}
            <div className="bg-primary bg-opacity-5 rounded-xl p-4 mb-4">
              <div className="font-medium text-lg mb-2">
                {currentTraining.steps[currentStep]?.title}
              </div>
              <p className="text-gray-700">{currentTraining.steps[currentStep]?.description}</p>
            </div>

            {/* 步骤导航按钮 */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className={`
                  flex items-center px-3 py-2 rounded-lg
                  ${
                    currentStep === 0
                      ? 'text-gray-400 bg-gray-100'
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                上一步
              </button>
              <button
                onClick={() =>
                  setCurrentStep(Math.min(currentTraining.steps.length - 1, currentStep + 1))
                }
                disabled={currentStep === currentTraining.steps.length - 1}
                className={`
                  flex items-center px-3 py-2 rounded-lg
                  ${
                    currentStep === currentTraining.steps.length - 1
                      ? 'text-gray-400 bg-gray-100'
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }
                `}
              >
                下一步
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* 训练要点 */}
        {currentTraining.keyPoints && (
          <div className="mb-6">
            <div className="font-medium mb-3">训练要点</div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <ul className="space-y-2">
                {currentTraining.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-2 mt-0.5">•</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 训练完成进度 */}
        <div className="mb-6">
          <div className="font-medium mb-3">训练完成进度</div>
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between text-sm mb-2">
              <span>当前进度</span>
              <span className="font-medium">{currentTraining.progress || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-primary rounded-full h-3 transition-all duration-300"
                style={{ width: `${currentTraining.progress || 0}%` }}
              ></div>
            </div>

            {/* 进度控制按钮 */}
            <div className="grid grid-cols-4 gap-3">
              {[25, 50, 75, 100].map(progress => (
                <button
                  key={progress}
                  onClick={() => handleUpdateProgress(progress)}
                  className={`
                    py-2 rounded-lg text-center text-sm font-medium
                    ${
                      (currentTraining.progress || 0) >= progress
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {progress}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 训练评分与反馈 */}
        <div className="mb-4">
          <div className="font-medium mb-3">训练评分</div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-gray-600 mb-3">给这次训练的表现评分 (1-5)</div>
            <div className="flex justify-center space-x-4 mb-6">
              {[1, 2, 3, 4, 5].map(value => (
                <button
                  key={value}
                  onClick={() => setScore(value)}
                  className={`
                    w-12 h-12 rounded-full text-lg flex items-center justify-center
                    ${
                      score === value
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {value}
                </button>
              ))}
            </div>

            <div className="text-sm text-gray-600 mb-2">训练反馈 (可选)</div>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="记录训练感受、遇到的困难或需要改进的地方..."
              className="w-full p-3 border rounded-lg h-24 text-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
            ></textarea>
          </div>
        </div>
      </div>
      {/* 底部固定操作区 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-10">
        <div className="flex space-x-3">
          <button onClick={handleCancelTraining} className="btn btn-outline flex-1">
            取消训练
          </button>
          <button
            onClick={handleCompleteTraining}
            disabled={(currentTraining.progress || 0) < 100}
            className={`
              btn flex-1 relative overflow-hidden
              ${
                (currentTraining.progress || 0) >= 100
                  ? 'btn-primary'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <span className="relative z-10">
              {currentTrainingIndex < trainingDay.trainings.length - 1
                ? '下一个训练'
                : '完成所有训练'}
            </span>
            {(currentTraining.progress || 0) < 100 && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                <span className="text-gray-600">请先完成100%</span>
              </div>
            )}
          </button>
        </div>
      </div>
      {/* 完成训练提示弹窗 */}
      {showTrainingSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-semibold mb-2">训练完成！</h3>
            <p className="text-gray-600 mb-4">很棒！继续下一个训练项目</p>
            <div className="animate-pulse font-medium text-primary">正在准备下一个训练...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingDayPage;
