import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTraining } from '../contexts/TrainingContext';
import { findTrainingById } from '../data/allTrainings';
import CountdownTimer from '../components/training/CountdownTimer';
import audioManager from '../utils/audioManager';

const TrainingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startTraining, currentTraining, completeTraining } = useTraining();

  const [training, setTraining] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTrainingActive, setIsTrainingActive] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [error, setError] = useState(null);
  const [showTimerAlert, setShowTimerAlert] = useState(false);
  const [timerMessage, setTimerMessage] = useState('');
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  // 预加载音频资源
  useEffect(() => {
    audioManager.preloadAllTrainingAudio();

    // 组件卸载时停止所有音频
    return () => {
      audioManager.stop();
    };
  }, []);

  // 获取训练数据
  useEffect(() => {
    setIsLoading(true);

    try {
      // 使用统一的查找方法获取训练
      const foundTraining = findTrainingById(id);
      console.log('Training search result for ID:', id, foundTraining ? 'Found' : 'Not found');

      if (foundTraining) {
        setTraining(foundTraining);
      } else {
        // 如果没找到，重定向到训练列表页
        console.error(`Training with ID ${id} not found`);
        setError(`未找到ID为${id}的训练`);
        setTimeout(() => {
          navigate('/training');
        }, 3000);
      }
    } catch (err) {
      console.error('Error finding training:', err);
      setError(`加载训练时出错: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  // 开始训练
  const handleStartTraining = () => {
    try {
      // 由于Context中的startTraining函数仍使用旧的数据结构，
      // 这里暂时采用本地状态管理训练
      //startTraining(id);
      setIsTrainingActive(true);
      setCurrentStep(0);
      setIsCountdownActive(true);

      // 播放开始训练的音频
      if (training.category === 'dribbling') {
        audioManager.play('dribbling_start');
      } else if (training.category === 'shooting') {
        // 投篮训练先播放技巧提示
        audioManager.play('shooting_tips');
      } else {
        audioManager.play('welcome');
      }
    } catch (error) {
      console.error('开始训练失败:', error);
      setError(`开始训练失败: ${error.message}`);
    }
  };

  // 下一步
  const handleNextStep = () => {
    // 重置计时器状态
    setIsCountdownActive(false);

    if (currentStep < training.steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
      // 播放鼓励音频
      audioManager.play('encouragement');
      // 切换到下一步骤后重新激活计时器
      setTimeout(() => setIsCountdownActive(true), 100);
    } else {
      // 最后一步，显示完成模态框
      setShowCompletionModal(true);
    }
  };

  // 计时器完成回调
  const handleTimerComplete = () => {
    // 当计时器完成时，显示时间到提示
    setTimerMessage('本步时间已到，请点击下一步继续');
    setShowTimerAlert(true);

    // 3秒后自动隐藏提示
    setTimeout(() => {
      setShowTimerAlert(false);
    }, 3000);
  };

  // 分钟变化回调
  const handleMinuteChange = minutesLeft => {
    // 当分钟变化时，显示提示
    setTimerMessage(`还剩 ${minutesLeft} 分钟`);
    setShowTimerAlert(true);

    // 如果只剩1分钟，播放休息提醒
    if (minutesLeft === 1) {
      audioManager.play('rest_reminder');
    }

    // 2秒后自动隐藏提示
    setTimeout(() => {
      setShowTimerAlert(false);
    }, 2000);
  };

  // 完成训练
  const handleCompleteTraining = () => {
    try {
      // 由于Context中的completeTraining函数仍使用旧的数据结构，
      // 这里暂时采用本地状态管理
      //const result = completeTraining(score, feedback);

      // 根据得分计算星星数
      const earnedStarsCount = Math.max(1, Math.floor(score));

      // 设置获得的星星数，用于显示
      setEarnedStars(earnedStarsCount);

      // 重置训练状态
      setIsTrainingActive(false);
      setCurrentStep(0);
      setShowCompletionModal(false);

      // 播放训练完成音频
      audioManager.play('training_complete');

      // 跳转到进度页面
      setTimeout(() => {
        navigate('/progress');
      }, 3000);
    } catch (error) {
      console.error('完成训练失败:', error);
      setError(`完成训练失败: ${error.message}`);
    }
  };

  // 评分按钮
  const renderScoreButtons = () => {
    const scores = [1, 2, 3, 4, 5];

    return (
      <div className="flex justify-center space-x-2 my-4">
        {scores.map(value => (
          <button
            key={value}
            className={`w-10 h-10 rounded-full ${
              score === value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setScore(value)}
          >
            {value}
          </button>
        ))}
      </div>
    );
  };

  // 获取训练分类的中文名称
  const getCategoryName = category => {
    const categoryMap = {
      dribbling: '运球',
      shooting: '投篮',
      passing: '传球',
      movement: '移动',
      parent_child: '父子训练',
    };

    return categoryMap[category] || '基础训练';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="text-center">
          <div className="loading-spinner mb-4"></div>
          <p>加载训练内容...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="text-center">
          <div className="text-3xl mb-4">⚠️</div>
          <p className="text-red-500 font-bold">{error}</p>
          <p className="mt-4">正在返回训练选择页面...</p>
        </div>
      </div>
    );
  }

  if (!training) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="text-center">
          <div className="text-3xl mb-4">😕</div>
          <p>未找到训练内容</p>
          <Link to="/training" className="btn btn-primary mt-4">
            返回训练选择
          </Link>
        </div>
      </div>
    );
  }

  const currentStepData = isTrainingActive ? training.steps[currentStep] : null;
  const tips = training.tips || training.keyPoints || [];

  return (
    <div className="space-y-6">
      {/* 计时器提示 */}
      {showTimerAlert && (
        <div className="fixed top-16 left-0 right-0 flex justify-center z-40">
          <div className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg animate-fadeInDown">
            {timerMessage}
          </div>
        </div>
      )}
      {/* 训练详情 */}
      {!isTrainingActive && (
        <div className="card">
          <div className="mb-4">
            <Link to="/training" className="text-primary text-sm">
              ← 返回训练列表
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-2">{training.title}</h1>
          <p className="text-gray-600 mb-4">{training.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs bg-primary bg-opacity-10 text-primary rounded-full px-3 py-1">
              {getCategoryName(training.category)}
            </span>

            <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-3 py-1">
              {training.level}
            </span>

            <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-3 py-1">
              {training.duration}分钟
            </span>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">训练内容</h2>
            <ul className="space-y-2">
              {training.steps.map((step, index) => (
                <li key={step.id} className="flex">
                  <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-xs">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{step.title}</div>
                    <div className="text-sm text-gray-600">{step.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">训练技巧</h2>
            <ul className="space-y-1 list-disc list-inside text-sm text-gray-700">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">完成可获得</h2>
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">⭐</span>
                <span className="font-medium">
                  {training.rewards ? training.rewards.stars : 3} 颗星星
                </span>
              </div>
            </div>
          </div>

          <button onClick={handleStartTraining} className="btn btn-primary w-full">
            开始训练
          </button>
        </div>
      )}

      {/* 训练进行中 */}
      {isTrainingActive && currentStepData && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">训练：{training.title}</h1>
            <div className="text-sm">
              {currentStep + 1}/{training.steps.length}
            </div>
          </div>

          <div className="relative mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2"
                style={{ width: `${((currentStep + 1) / training.steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{currentStepData.title}</h2>
            <p className="text-gray-600 mb-4">{currentStepData.description}</p>

            <div className="bg-gray-100 rounded-lg p-4 mb-4 text-center">
              <div className="flex justify-center mb-3">
                <CountdownTimer
                  minutes={currentStepData.duration}
                  onComplete={handleTimerComplete}
                  onMinuteChange={handleMinuteChange}
                  isActive={isCountdownActive}
                />
              </div>
              <p className="text-sm text-gray-700">训练时长: {currentStepData.duration}分钟</p>
              <div className="text-xs text-gray-500 mt-1">
                完成当前步骤后，点击&quot;下一步&quot;
              </div>
            </div>
          </div>

          <button onClick={handleNextStep} className="btn btn-primary w-full">
            {currentStep < training.steps.length - 1 ? '下一步' : '完成训练'}
          </button>
        </div>
      )}

      {/* 完成训练模态框 */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4">训练完成！</h3>

            <p className="text-gray-700 mb-4">你对这次训练的表现打几分？</p>

            {renderScoreButtons()}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                训练感受 (可选)
              </label>
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="分享你的训练感受..."
                rows="3"
              ></textarea>
            </div>

            <button
              onClick={handleCompleteTraining}
              className="btn btn-primary w-full"
              disabled={score === 0}
            >
              提交评分
            </button>
          </div>
        </div>
      )}

      {/* 获得星星提示 */}
      {earnedStars > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">恭喜完成训练！</h3>
            <div className="flex justify-center items-center my-4">
              <div className="text-yellow-500 text-2xl mr-2">⭐</div>
              <div className="text-2xl font-bold">+{earnedStars}</div>
            </div>
            <p className="text-gray-600 mb-4">你已经获得了{earnedStars}颗星星作为奖励！</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPage;
