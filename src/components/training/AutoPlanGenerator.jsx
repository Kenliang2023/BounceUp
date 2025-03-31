import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrainingPlan } from '../../contexts/TrainingPlanContext';
import { FREQUENCY_OPTIONS, DURATION_OPTIONS } from '../../data/trainingTemplates';

/**
 * 自动训练计划生成器组件
 * 允许用户选择参数并生成自动训练计划
 */
const AutoPlanGenerator = ({ onClose }) => {
  const navigate = useNavigate();
  const { 
    frequency, 
    preferredDuration, 
    generateAutoPlan, 
    generateWeaknessPlan,
    changeTrainingFrequency,
    changePreferredDuration
  } = useTrainingPlan();
  
  const [selectedFrequency, setSelectedFrequency] = useState(frequency);
  const [selectedDuration, setSelectedDuration] = useState(preferredDuration);
  const [daysAhead, setDaysAhead] = useState(14);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [planType, setPlanType] = useState('auto'); // 'auto' 或 'weakness'
  
  // 处理频率变化
  const handleFrequencyChange = (e) => {
    setSelectedFrequency(parseInt(e.target.value, 10));
  };
  
  // 处理时长变化
  const handleDurationChange = (e) => {
    setSelectedDuration(parseInt(e.target.value, 10));
  };
  
  // 处理天数变化
  const handleDaysAheadChange = (e) => {
    setDaysAhead(parseInt(e.target.value, 10));
  };
  
  // 处理计划类型变化
  const handlePlanTypeChange = (e) => {
    setPlanType(e.target.value);
  };
  
  // 生成训练计划
  const handleGeneratePlan = () => {
    setIsGenerating(true);
    
    // 更新用户首选设置
    changeTrainingFrequency(selectedFrequency);
    changePreferredDuration(selectedDuration);
    
    // 生成计划
    const preferences = {
      frequency: selectedFrequency,
      duration: selectedDuration
    };
    
    let count = 0;
    if (planType === 'auto') {
      count = generateAutoPlan(preferences, daysAhead);
    } else {
      count = generateWeaknessPlan(preferences, daysAhead);
    }
    
    setGeneratedCount(count);
    setGenerated(true);
    setIsGenerating(false);
  };
  
  // 前往训练计划页面
  const goToTrainingPlan = () => {
    navigate('/training-plan');
    if (onClose) onClose();
  };
  
  // 继续使用应用
  const handleContinue = () => {
    if (onClose) onClose();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 max-w-md w-full">
      <h2 className="text-xl font-semibold text-center mb-4">
        自动训练计划生成器
      </h2>
      
      {!generated ? (
        <>
          <p className="text-gray-600 mb-4">
            系统将根据你的能力水平、年龄和训练需求，自动为你生成个性化的训练计划。
          </p>
          
          {/* 计划类型选择 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              计划类型
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="planType" 
                  value="auto" 
                  checked={planType === 'auto'} 
                  onChange={handlePlanTypeChange}
                  className="mr-2"
                />
                <span>平衡计划</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="planType" 
                  value="weakness" 
                  checked={planType === 'weakness'} 
                  onChange={handlePlanTypeChange}
                  className="mr-2"
                />
                <span>弱项强化</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {planType === 'auto' 
                ? '全面平衡的训练计划，综合提高各项技能' 
                : '专注于你最薄弱技能的强化训练计划'}
            </p>
          </div>
          
          {/* 训练频率选择 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              训练频率
            </label>
            <select 
              value={selectedFrequency} 
              onChange={handleFrequencyChange}
              className="w-full p-2 border rounded-lg focus:ring-primary focus:border-primary"
            >
              {FREQUENCY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>
          
          {/* 训练时长选择 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              训练时长
            </label>
            <select 
              value={selectedDuration} 
              onChange={handleDurationChange}
              className="w-full p-2 border rounded-lg focus:ring-primary focus:border-primary"
            >
              {DURATION_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>
          
          {/* 计划天数选择 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              计划天数
            </label>
            <select 
              value={daysAhead} 
              onChange={handleDaysAheadChange}
              className="w-full p-2 border rounded-lg focus:ring-primary focus:border-primary"
            >
              <option value={7}>一周（7天）</option>
              <option value={14}>两周（14天）</option>
              <option value={30}>一个月（30天）</option>
            </select>
          </div>
          
          {/* 按钮区 */}
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleGeneratePlan}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              disabled={isGenerating}
            >
              {isGenerating ? '生成中...' : '生成计划'}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              计划生成成功！
            </h3>
            
            <p className="text-gray-600">
              已成功生成 {generatedCount} 天的训练计划。
              {planType === 'weakness' && ' 这些训练专注于提高你的薄弱技能。'}
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={goToTrainingPlan}
              className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              查看训练计划
            </button>
            
            <button
              onClick={handleContinue}
              className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              继续
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AutoPlanGenerator;