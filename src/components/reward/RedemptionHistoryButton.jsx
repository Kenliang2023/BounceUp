import { useState } from 'react';
import RedemptionHistory from './RedemptionHistory';

/**
 * 兑换历史记录按钮组件
 * 点击后打开兑换历史记录详情
 */
const RedemptionHistoryButton = ({ className = '', buttonText = '查看历史记录' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openHistory = () => setIsOpen(true);
  const closeHistory = () => setIsOpen(false);
  
  return (
    <>
      <button
        onClick={openHistory}
        className={`flex items-center justify-center gap-2 ${className}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {buttonText}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <RedemptionHistory onClose={closeHistory} />
        </div>
      )}
    </>
  );
};

export default RedemptionHistoryButton;