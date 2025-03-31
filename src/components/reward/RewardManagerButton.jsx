import { useState } from 'react';
import RewardManager from './RewardManager';

/**
 * 奖励管理器按钮组件
 * 父母可以点击此按钮打开奖励管理界面
 */
const RewardManagerButton = ({ className = '', buttonText = '管理奖励' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openManager = () => setIsOpen(true);
  const closeManager = () => setIsOpen(false);
  
  return (
    <>
      <button
        onClick={openManager}
        className={`flex items-center justify-center gap-2 ${className}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {buttonText}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <RewardManager onClose={closeManager} />
        </div>
      )}
    </>
  );
};

export default RewardManagerButton;