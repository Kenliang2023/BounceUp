import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useTraining } from '../../contexts/TrainingContext';

/**
 * 数据管理组件：提供数据导出和导入功能
 */
const DataManagement = () => {
  const { user } = useUser();
  const { skillProgress, trainingHistory } = useTraining();
  
  const [importStatus, setImportStatus] = useState('');
  const [importError, setImportError] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [importData, setImportData] = useState(null);
  
  // 导出所有数据
  const exportAllData = () => {
    try {
      // 收集所有本地存储的数据
      const userData = JSON.parse(localStorage.getItem('bounceup_user') || '{}');
      const skillProgressData = JSON.parse(localStorage.getItem('bounceup_skill_progress') || '{}');
      const trainingHistoryData = JSON.parse(localStorage.getItem('bounceup_training_history') || '[]');
      const starsData = userData.totalStars || 0;
      
      // 准备导出的数据结构
      const exportData = {
        version: '0.1.1',
        exportDate: new Date().toISOString(),
        user: {
          name: userData.name,
          age: userData.age,
          level: userData.level,
          totalStars: starsData
        },
        skillProgress: skillProgressData,
        trainingHistory: trainingHistoryData
      };
      
      // 转换为JSON字符串
      const jsonData = JSON.stringify(exportData, null, 2);
      
      // 创建Blob对象
      const blob = new Blob([jsonData], { type: 'application/json' });
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // 使用用户名和当前日期作为文件名
      const username = userData.name || 'user';
      const date = new Date().toISOString().split('T')[0]; // 格式化日期为YYYY-MM-DD
      link.download = `bounceup_${username}_${date}.json`;
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      
      // 清理
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // 显示成功消息
      setImportStatus('数据导出成功！');
      setTimeout(() => setImportStatus(''), 3000);
    } catch (error) {
      console.error('导出数据错误:', error);
      setImportError(`导出失败: ${error.message}`);
      setTimeout(() => setImportError(''), 3000);
    }
  };
  
  // 处理文件选择
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsedData = JSON.parse(e.target.result);
        
        // 验证数据结构
        if (!parsedData.version || !parsedData.user || !parsedData.skillProgress) {
          throw new Error('无效的数据格式');
        }
        
        // 存储导入的数据并显示确认对话框
        setImportData(parsedData);
        setShowConfirmDialog(true);
      } catch (error) {
        console.error('读取文件错误:', error);
        setImportError(`导入失败: ${error.message}`);
        setTimeout(() => setImportError(''), 3000);
      }
    };
    
    reader.onerror = () => {
      setImportError('读取文件时出错');
      setTimeout(() => setImportError(''), 3000);
    };
    
    reader.readAsText(file);
    
    // 重置文件输入，允许重新选择同一个文件
    event.target.value = '';
  };
  
  // 确认导入数据
  const confirmImport = () => {
    try {
      if (!importData) return;
      
      // 保存用户数据
      const currentUser = JSON.parse(localStorage.getItem('bounceup_user') || '{}');
      const updatedUser = {
        ...currentUser,
        totalStars: importData.user.totalStars || currentUser.totalStars || 0
      };
      
      // 保留当前的用户名和PIN码
      if (currentUser.name) {
        updatedUser.name = currentUser.name;
      }
      if (currentUser.pin) {
        updatedUser.pin = currentUser.pin;
      }
      
      // 更新本地存储
      localStorage.setItem('bounceup_user', JSON.stringify(updatedUser));
      localStorage.setItem('bounceup_skill_progress', JSON.stringify(importData.skillProgress));
      localStorage.setItem('bounceup_training_history', JSON.stringify(importData.trainingHistory));
      
      // 关闭确认对话框
      setShowConfirmDialog(false);
      setImportData(null);
      
      // 显示成功消息
      setImportStatus('数据导入成功！请刷新页面以加载更新。');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('导入数据错误:', error);
      setImportError(`导入失败: ${error.message}`);
      setShowConfirmDialog(false);
      setTimeout(() => setImportError(''), 3000);
    }
  };
  
  // 取消导入
  const cancelImport = () => {
    setShowConfirmDialog(false);
    setImportData(null);
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">数据管理</h2>
      
      {/* 导出数据 */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">导出训练数据</h3>
        <p className="text-sm text-gray-600 mb-3">
          将您的训练记录、进度和星星导出为文件，便于备份或转移到其他设备。
        </p>
        <button 
          onClick={exportAllData}
          className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
        >
          导出数据
        </button>
      </div>
      
      {/* 导入数据 */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">导入训练数据</h3>
        <p className="text-sm text-gray-600 mb-3">
          从之前导出的文件中恢复您的训练记录、进度和星星。
        </p>
        <label className="w-full block">
          <div className="w-full bg-green-500 text-white rounded-md py-2 text-center hover:bg-green-600 transition-colors cursor-pointer">
            选择文件导入
          </div>
          <input 
            type="file" 
            accept=".json" 
            onChange={handleFileSelect}
            className="hidden" 
          />
        </label>
      </div>
      
      {/* 状态消息 */}
      {importStatus && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md">
          {importStatus}
        </div>
      )}
      
      {/* 错误消息 */}
      {importError && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md">
          {importError}
        </div>
      )}
      
      {/* 导入确认对话框 */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4">确认导入数据</h3>
            
            <p className="text-gray-700 mb-4">
              导入将覆盖您当前的训练记录和进度数据。是否继续？
            </p>
            
            {importData && (
              <div className="bg-gray-50 p-3 rounded-md mb-4 text-sm">
                <p><strong>用户名:</strong> {importData.user.name || '未设置'}</p>
                <p><strong>星星总数:</strong> {importData.user.totalStars || 0}</p>
                <p><strong>训练记录数:</strong> {importData.trainingHistory?.length || 0}</p>
                <p><strong>导出日期:</strong> {new Date(importData.exportDate).toLocaleString()}</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={cancelImport}
                className="btn-outline"
              >
                取消
              </button>
              <button 
                onClick={confirmImport}
                className="btn bg-green-600 text-white hover:bg-green-700"
              >
                确认导入
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement;