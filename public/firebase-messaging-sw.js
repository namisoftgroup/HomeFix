/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDEYa6bBTMLfJxj9oyZ16NcGLea15XcyvE",
  authDomain: "homefix-7223e.firebaseapp.com",
  projectId: "homefix-7223e",
  storageBucket: "homefix-7223e.firebasestorage.app",
  messagingSenderId: "585797706379",
  appId: "1:585797706379:web:09db821743b3836ec22a8e",
  measurementId: "G-VYZMWH30VP",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const { title, body } = payload.notification;
  const notificationOptions = {
    body,
    icon: "/images/fav.svg",
    data: payload.data,
    tag: "notification",
    requireInteraction: true,
    actions: [
      {
        action: "open",
        title: "Open",
      },
    ],
  };

  return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const urlToOpen = new URL("/", self.location.origin).href;

  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
