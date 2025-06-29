import { useState, useEffect, useRef } from 'react';

/**
 * 倒计时计时器组件
 * @param {Object} props
 * @param {number} props.minutes - 倒计时分钟数
 * @param {Function} props.onComplete - 倒计时结束时触发的回调
 * @param {Function} props.onMinuteChange - 当分钟变化时触发的回调
 * @param {boolean} props.isActive - 计时器是否处于活动状态
 */
const CountdownTimer = ({ minutes, onComplete, onMinuteChange, isActive }) => {
  // 将分钟转换为秒
  const totalSeconds = minutes * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(false);

  // 用于保存上一次的分钟值，用于检测分钟变化
  const prevMinuteRef = useRef(Math.ceil(totalSeconds / 60));

  // 闹钟音效
  const alarmSoundRef = useRef(null);
  const tickSoundRef = useRef(null);

  useEffect(() => {
    // 重置计时器
    if (!isActive) {
      setTimeLeft(totalSeconds);
      setIsPaused(false);
      return;
    }

    // 创建音频引用
    alarmSoundRef.current = new Audio('/sounds/alarm.mp3');
    tickSoundRef.current = new Audio('/sounds/tick.mp3');

    // 如果不是激活状态，不运行计时器
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          // 时间到，触发完成回调
          clearInterval(interval);
          if (onComplete) {
            onComplete();
          }

          // 播放闹钟声
          if (alarmSoundRef.current) {
            alarmSoundRef.current.play().catch(err => console.log('无法播放音频:', err));
          }

          return 0;
        }

        // 最后10秒播放滴答声
        if (prevTime <= 11 && tickSoundRef.current) {
          tickSoundRef.current.currentTime = 0;
          tickSoundRef.current.play().catch(err => console.log('无法播放滴答声:', err));
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);

      // 清理音频资源
      if (alarmSoundRef.current) {
        alarmSoundRef.current.pause();
        alarmSoundRef.current.currentTime = 0;
      }
      if (tickSoundRef.current) {
        tickSoundRef.current.pause();
        tickSoundRef.current.currentTime = 0;
      }
    };
  }, [isActive, isPaused, onComplete, totalSeconds]);

  // 检测分钟变化
  useEffect(() => {
    const currentMinute = Math.ceil(timeLeft / 60);

    // 如果分钟发生变化且不是初始状态
    if (currentMinute !== prevMinuteRef.current && isActive && timeLeft !== totalSeconds) {
      // 更新引用的分钟值
      prevMinuteRef.current = currentMinute;

      // 触发分钟变化回调
      if (onMinuteChange) {
        onMinuteChange(currentMinute);
      }

      // 播放分钟提醒声音
      if (currentMinute > 0 && alarmSoundRef.current) {
        alarmSoundRef.current.currentTime = 0;
        alarmSoundRef.current.play().catch(err => console.log('无法播放分钟提醒声:', err));
      }
    }
  }, [timeLeft, isActive, onMinuteChange, totalSeconds]);

  // 暂停/继续计时器
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // 格式化时间显示
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 计算圆形进度条角度
  const calculateProgress = () => {
    return ((totalSeconds - timeLeft) / totalSeconds) * 360;
  };

  // 确定颜色基于剩余时间
  const getTimerColor = () => {
    if (timeLeft <= 10) return 'text-red-500'; // 最后10秒红色
    if (timeLeft <= 60) return 'text-yellow-500'; // 最后一分钟黄色
    return 'text-primary'; // 默认蓝色
  };

  return (
    <div className="flex flex-col items-center">
      {/* 圆形倒计时 */}
      <div
        className={`relative w-20 h-20 rounded-full flex items-center justify-center border-4 ${getTimerColor()} mb-2`}
        style={{
          background: `conic-gradient(#4361EE ${calculateProgress()}deg, transparent ${calculateProgress()}deg)`,
        }}
        onClick={togglePause}
      >
        <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
          <span className={`text-lg font-bold ${getTimerColor()}`}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* 状态显示 */}
      <div className="text-xs text-gray-500">{isPaused ? '已暂停 (点击继续)' : '点击可暂停'}</div>
    </div>
  );
};

export default CountdownTimer;
