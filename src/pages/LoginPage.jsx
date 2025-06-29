import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // 如果用户已登录，则重定向到首页或来源页面
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('用户名和密码不能为空');
      return;
    }

    try {
      setError('');
      setIsLoading(true);

      // 调用登录方法
      await login(username, password);

      // 登录成功后会通过上面的useEffect重定向
    } catch (err) {
      setError(err.message || '登录失败，请检查用户名和密码');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏀</div>
          <h1 className="text-3xl font-bold text-primary">BounceUp</h1>
          <p className="text-gray-600 mt-2">儿童篮球训练助手</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</div>}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                用户名
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="输入用户名"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="输入密码"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md font-medium text-white bg-primary hover:bg-primary-dark transition-colors ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              作为演示，您可以使用以下账号：
              <br />
              用户名: <span className="font-medium">demo</span>
              <br />
              密码: <span className="font-medium">password</span>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>© 2023 BounceUp - 专为儿童设计的篮球训练应用</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
