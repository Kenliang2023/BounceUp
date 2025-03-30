// 导入所有训练数据
import dribblingTrainings from './dribbling';
import shootingTrainings from './shooting';
import passingTrainings from './passing';
import movementTrainings from './movement';
import parentChildTrainings from './parentchild';

// 导出所有训练数据
export {
  dribblingTrainings,
  shootingTrainings, 
  passingTrainings,
  movementTrainings,
  parentChildTrainings
};

// 获取所有训练数据的数组
export const getAllTrainings = () => {
  return [
    ...dribblingTrainings,
    ...shootingTrainings,
    ...passingTrainings,
    ...movementTrainings,
    ...parentChildTrainings
  ];
};

// 根据ID查找训练
export const findTrainingById = (id) => {
  return getAllTrainings().find(training => training.moduleId === id);
};

// 根据类别获取训练
export const getTrainingsByCategory = (category) => {
  return getAllTrainings().filter(training => training.category === category);
};