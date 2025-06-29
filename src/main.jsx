import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/globals.css';
import { checkForAppUpdate } from './utils/versionCheck.js';

// 注册Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
      // 每次加载时检查更新
      checkForAppUpdate();
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}

// 页面加载完成后检查更新
window.addEventListener('load', () => {
  // 延时检查，避免影响页面加载
  setTimeout(() => {
    checkForAppUpdate();
  }, 3000);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
