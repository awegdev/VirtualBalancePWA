// VAULT 서비스 워커
// 알림을 실제 기기 알림센터에 띄우기 위한 최소한의 서비스 워커입니다.
// (Notification 생성자 대신 registration.showNotification()을 쓰기 위해 필요)

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 알림을 탭하면 앱 창으로 포커스 이동
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});

// 페이지에서 postMessage로 알림 표시를 요청하면 이곳에서 showNotification 실행
self.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'SHOW_NOTIFICATION') return;
  const { title, options } = event.data;
  self.registration.showNotification(title, options);
});
