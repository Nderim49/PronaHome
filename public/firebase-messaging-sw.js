// This file must live at the ROOT of your deployed site, i.e.
// https://prona-home.vercel.app/firebase-messaging-sw.js
//
// In your project, that means placing it directly inside the `public/`
// folder (NOT inside public/static or any subfolder) so Vercel serves it
// from the domain root. Do not rename it — Firebase looks for this exact
// path by default.

importScripts("https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAmn37ud7dG-ATiNn54NhkhPsKUHkRvvrw",
  authDomain: "pronahome-c4c75.firebaseapp.com",
  projectId: "pronahome-c4c75",
  storageBucket: "pronahome-c4c75.firebasestorage.app",
  messagingSenderId: "427400967277",
  appId: "1:427400967277:web:906f4381f03ba5c53efb64",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "PronaHome";
  const options = {
    body: payload.notification?.body || "",
    icon: "/logo192.png",
    data: payload.data || {},
  };
  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
