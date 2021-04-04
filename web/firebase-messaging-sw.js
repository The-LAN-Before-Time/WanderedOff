importScripts('https://www.gstatic.com/firebasejs/7.22.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.22.1/firebase-messaging.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/7.22.1/firebase-analytics.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyBUMluW2z9Zsga1pkecFk2F04DNofGGHLc',
  authDomain: 'wandered-off.firebaseapp.com',
  projectId: 'wandered-off',
  storageBucket: 'wandered-off.appspot.com',
  messagingSenderId: '188616078574',
  appId: '1:188616078574:web:4c4f4870b1aafdea986fff',
  measurementId: 'G-X0V5SWXKX8',
});

const messaging = firebase.messaging();
