importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js");

firebase.initializeApp({ messagingSenderId: "590678578701" });

const initMessaging = firebase.messaging();
