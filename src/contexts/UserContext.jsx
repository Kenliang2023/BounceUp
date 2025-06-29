import { createContext, useContext, useState, useEffect } from 'react';

// 创建上下文
const UserContext = createContext(null);

// 默认用户数据
const defaultUser = {
  id: null,
  name: '',
  age: null,
  totalStars: 0,
  level: { level: 1, name: '新手球员', minStars: 0 },
  preferences: {
    theme: 'light',
    soundEnabled: true, // 默认开启音频
  },
};

// 提供者组件
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 第一次加载时，从localStorage获取用户数据
  useEffect(() => {
    const storedUser = localStorage.getItem('bounceup_user');
    const storedAuth = localStorage.getItem('bounceup_auth');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }

    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  // 当用户数据变化时，保存到localStorage
  useEffect(() => {
    if (user !== defaultUser) {
      localStorage.setItem('bounceup_user', JSON.stringify(user));
    }
  }, [user]);

  // 登录
  const login = async (username, password) => {
    // 简单的演示登录逻辑
    if (username === 'demo' && password === 'password') {
      const demoUser = {
        id: 'demo1',
        name: '小明',
        age: 8,
        totalStars: 25,
        level: { level: 2, name: '初级球员', minStars: 20 },
        preferences: {
          theme: 'light',
          soundEnabled: true,
        },
      };

      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('bounceup_auth', 'true');

      return demoUser;
    } else {
      throw new Error('用户名或密码错误');
    }
  };

  // 注销
  const logout = () => {
    setUser(defaultUser);
    setIsAuthenticated(false);
    localStorage.removeItem('bounceup_auth');
  };

  // 重置所有数据
  const resetAllData = () => {
    // 清除所有应用数据
    localStorage.clear();
    setUser(defaultUser);
    setIsAuthenticated(false);
  };

  // 更新用户信息
  const updateUser = userData => {
    setUser(userData);
  };

  // 添加星星
  const addStars = amount => {
    setUser(prevUser => ({
      ...prevUser,
      totalStars: prevUser.totalStars + amount,
    }));
  };

  // 使用星星
  const useStars = amount => {
    if (user.totalStars < amount) {
      throw new Error('星星不足');
    }

    setUser(prevUser => ({
      ...prevUser,
      totalStars: prevUser.totalStars - amount,
    }));

    return user.totalStars - amount;
  };

  // 检查是否有足够的星星
  const hasEnoughStars = amount => {
    return user.totalStars >= amount;
  };

  // 更新用户偏好设置
  const updatePreferences = preferences => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        ...preferences,
      },
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        resetAllData,
        updateUser,
        addStars,
        useStars,
        hasEnoughStars,
        updatePreferences,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 自定义钩子
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
