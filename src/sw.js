// 这是一个自定义的 Service Worker 文件
// 用于处理缓存和更新策略

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { setCacheNameDetails } from 'workbox-core';

// 使用应用版本号作为缓存名称的一部分
setCacheNameDetails({
  prefix: 'bounceup',
  suffix: 'v0.1.1',
});

// 声明客户端控制权
clientsClaim();

// 清理旧缓存
cleanupOutdatedCaches();

// 预缓存 Workbox 管理的资源
precacheAndRoute(self.__WB_MANIFEST);

// 处理 HTML 请求的策略 - 优先使用网络，失败时才使用缓存
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'bounceup-html-cache-v0.1.1',
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24, // 1 天
      }),
    ],
  })
);

// API 请求策略 - 优先使用网络，回退到缓存
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'bounceup-api-cache-v0.1.1',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60, // 1 小时
      }),
    ],
  })
);

// 静态资源策略 - 优先使用缓存，同时在后台更新
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'bounceup-static-cache-v0.1.1',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 天
      }),
    ],
  })
);

// 字体资源策略 - 优先使用缓存
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'bounceup-fonts-cache-v0.1.1',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 年
      }),
    ],
  })
);

// 监听 SKIP_WAITING 消息
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Service Worker 激活时触发客户端更新
self.addEventListener('activate', event => {
  event.waitUntil(
    self.clients.claim().then(() => {
      // 向所有客户端广播更新消息
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'SW_ACTIVATED' });
        });
      });
    })
  );
});
