import { useState } from 'react';
import AutoPlanGenerator from './AutoPlanGenerator';

/**
 * 自动训练计划生成按钮
 * 用于首页和训练计划页面，点击后弹出生成器对话框
 */
const AutoPlanButton = ({ className = '', buttonText = '自动生成计划' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openGenerator = () => setIsOpen(true);
  const closeGenerator = () => setIsOpen(false);
  
  return (
    <>
      <button
        onClick={openGenerator}
        className={`flex items-center justify-center gap-2 bg-primary text-white rounded-lg ${className}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        {buttonText}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <AutoPlanGenerator onClose={closeGenerator} />
        </div>
      )}
    </>
  );
};

export default AutoPlanButton;