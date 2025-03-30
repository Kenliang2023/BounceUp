// 导入所有训练数据
import dribblingTrainings from './dribbling.js';
import shootingTrainings from './shooting.js';
import passingTrainings from './passing.js';
import movementTrainings from './movement.js';
import parentChildTrainings from './parentchild.js';

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
  console.log("Loading all trainings from index.js");
  console.log("Dribbling:", dribblingTrainings.length);
  console.log("Shooting:", shootingTrainings.length);
  console.log("Passing:", passingTrainings.length);
  console.log("Movement:", movementTrainings.length);
  console.log("ParentChild:", parentChildTrainings.length);
  
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