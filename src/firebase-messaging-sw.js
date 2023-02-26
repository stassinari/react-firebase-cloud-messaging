import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// just for demo
self.addEventListener("install", (event) => {
  console.log("Service worker installed", event);
});
self.addEventListener("activate", (event) => {
  console.log("Service worker activated", event);
});

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

// reload prompt config
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyD6JMHGubBYsowdKtU4E2SU9t581nDv6bc",
  authDomain: "react-firebase-cloud-mes-8332a.firebaseapp.com",
  projectId: "react-firebase-cloud-mes-8332a",
  storageBucket: "react-firebase-cloud-mes-8332a.appspot.com",
  messagingSenderId: "195062336675",
  appId: "1:195062336675:web:328d6f2e1fef9685bc0316",
  measurementId: "G-TNECM35R39",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// handle background notification
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
