/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

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

  const notificationOptions = { body, icon: "/images/fav.svg" };

  self.registration.showNotification(title, notificationOptions);
});