// 用于清除缓存的辅助脚本

// 清除所有缓存
async function clearAllCaches() {
  // 清除缓存存储
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      for (const name of cacheNames) {
        console.log(`正在删除缓存: ${name}`);
        await caches.delete(name);
      }
      console.log('所有缓存已清除!');
    } catch (err) {
      console.error('清除缓存错误:', err);
    }
  } else {
    console.warn('当前浏览器不支持缓存API');
  }
}

// 注销Service Worker
async function unregisterServiceWorkers() {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        console.log('正在注销Service Worker:', registration);
        await registration.unregister();
      }
      console.log('所有Service Worker已注销!');
    } catch (err) {
      console.error('注销Service Worker错误:', err);
    }
  } else {
    console.warn('当前浏览器不支持Service Worker');
  }
}

// 清除本地存储
function clearLocalStorage() {
  try {
    // 保存登录信息
    const bounceup_authenticated = sessionStorage.getItem('bounceup_authenticated');
    const bounceup_pin = localStorage.getItem('bounceup_pin');
    const bounceup_user = localStorage.getItem('bounceup_user');
    
    // 清除所有存储
    localStorage.clear();
    sessionStorage.clear();
    
    // 恢复登录信息
    if (bounceup_authenticated) {
      sessionStorage.setItem('bounceup_authenticated', bounceup_authenticated);
    }
    if (bounceup_pin) {
      localStorage.setItem('bounceup_pin', bounceup_pin);
    }
    if (bounceup_user) {
      localStorage.setItem('bounceup_user', bounceup_user);
    }
    
    console.log('本地存储已清除 (保留登录信息)');
  } catch (err) {
    console.error('清除本地存储错误:', err);
  }
}

// 执行清理操作
async function performCleanup() {
  document.body.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: sans-serif;
      padding: 2rem;
    ">
      <h1 style="color: #4361EE; margin-bottom: 1rem;">BounceUp 正在刷新</h1>
      <div id="message" style="margin-bottom: 2rem; text-align: center;">正在清除缓存和刷新应用...</div>
      <div style="
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #4361EE;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      "></div>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
  
  const messageElement = document.getElementById('message');
  
  try {
    // 清除缓存
    messageElement.textContent = '正在清除浏览器缓存...';
    await clearAllCaches();
    
    // 注销Service Worker
    messageElement.textContent = '正在重置Service Worker...';
    await unregisterServiceWorkers();
    
    // 清除除登录外的本地存储
    messageElement.textContent = '正在清除应用数据...';
    clearLocalStorage();
    
    // 完成
    messageElement.textContent = '清理完成，即将刷新应用...';
    
    // 延迟2秒后刷新
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  } catch (error) {
    messageElement.textContent = `清理过程中出错: ${error.message}`;
    console.error('清理过程中出错:', error);
    
    // 添加重试按钮
    const retryButton = document.createElement('button');
    retryButton.textContent = '重试';
    retryButton.style = `
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background-color: #4361EE;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    retryButton.onclick = () => window.location.reload();
    document.body.appendChild(retryButton);
    
    // 添加返回按钮
    const backButton = document.createElement('button');
    backButton.textContent = '返回应用';
    backButton.style = `
      margin-top: 1rem;
      margin-left: 1rem;
      padding: 0.5rem 1rem;
      background-color: #f3f3f3;
      color: #333;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    backButton.onclick = () => window.location.href = '/';
    document.body.appendChild(backButton);
  }
}

// 执行清理
window.onload = performCleanup;
