import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-5xl mb-6">🏀</div>
      <h1 className="text-3xl font-bold mb-3">页面不存在</h1>
      <p className="text-gray-600 mb-6">抱歉，你寻找的页面已经像篮球一样弹走了！</p>
      <Link to="/" className="btn bg-primary text-white hover:bg-primary-dark transition-colors">
        返回首页
      </Link>
    </div>
  );
};

export default NotFoundPage;
