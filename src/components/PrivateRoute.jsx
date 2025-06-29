import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated } = useUser();
  const location = useLocation();
  
  // 如果用户未认证，则重定向到登录页，并保留当前URL作为返回地址
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // 如果认证成功，则渲染传入的组件
  return children;
};

export default PrivateRoute; 