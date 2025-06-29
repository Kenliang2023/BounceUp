import { useState, useEffect, useRef } from "react";

const PinProtection = ({ onAuthenticate }) => {
  const [pin, setPin] = useState('');
  const [storedPin, setStoredPin] = useState('');
  const [error, setError] = useState('');
  const [isSettingPin, setIsSettingPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // 从localStorage获取PIN码
    const savedPin = localStorage.getItem('bounceup_pin');
    setStoredPin(savedPin);
    
    // 如果没有设置PIN码，进入设置模式
    if (!savedPin) {
      setIsSettingPin(true);
    }
    
    // 自动聚焦输入框
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handlePinChange = (e) => {
    const value = e.target.value;
    // 只允许数字，最多6位
    if (/^\d{0,6}$/.test(value)) {
      setPin(value);
      setError('');
    }
  };

  const handleConfirmPinChange = (e) => {
    const value = e.target.value;
    // 只允许数字，最多6位
    if (/^\d{0,6}$/.test(value)) {
      setConfirmPin(value);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSettingPin) {
      // 设置新PIN码
      if (pin.length < 4) {
        setError('PIN码至少需要4位数字');
        return;
      }
      
      if (pin !== confirmPin) {
        setError('两次输入的PIN码不一致');
        return;
      }
      
      localStorage.setItem('bounceup_pin', pin);
      onAuthenticate();
    } else {
      // 验证PIN码
      if (pin === storedPin) {
        onAuthenticate();
      } else {
        setError('PIN码错误，请重试');
        setPin('');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-card shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">BounceUp</h1>
          <p className="text-gray-600">
            {isSettingPin ? '请设置PIN码以保护您的数据' : '请输入PIN码访问应用'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isSettingPin ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  设置PIN码 (至少4位数字)
                </label>
                <input
                  ref={inputRef}
                  type="password"
                  value={pin}
                  onChange={handlePinChange}
                  className="form-input text-center text-xl tracking-widest"
                  placeholder="输入PIN码"
                  inputMode="numeric"
                  autoComplete="new-password"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  确认PIN码
                </label>
                <input
                  type="password"
                  value={confirmPin}
                  onChange={handleConfirmPinChange}
                  className="form-input text-center text-xl tracking-widest"
                  placeholder="再次输入PIN码"
                  inputMode="numeric"
                  autoComplete="new-password"
                />
              </div>
            </>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PIN码
              </label>
              <input
                ref={inputRef}
                type="password"
                value={pin}
                onChange={handlePinChange}
                className="form-input text-center text-xl tracking-widest"
                placeholder="输入PIN码"
                inputMode="numeric"
                autoComplete="current-password"
              />
            </div>
          )}

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full btn btn-primary py-3"
          >
            {isSettingPin ? '保存PIN码' : '解锁应用'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PinProtection; 