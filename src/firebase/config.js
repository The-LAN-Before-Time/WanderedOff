import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
// import '@firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBUMluW2z9Zsga1pkecFk2F04DNofGGHLc',
  authDomain: 'wandered-off.firebaseapp.com',
  projectId: 'wandered-off',
  storageBucket: 'wandered-off.appspot.com',
  messagingSenderId: '188616078574',
  appId: '1:188616078574:web:4c4f4870b1aafdea986fff',
  measurementId: 'G-X0V5SWXKX8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// firebase.initializeApp(firebaseConfig);

export { firebase };
