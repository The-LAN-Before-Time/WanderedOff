import { firebase } from '../src/firebase/config';

export default function (user, sessionId) {
  if (!user.id || !sessionId) return;
  const userLocationRef = firebase.firestore().collection('sessionUsers').doc(sessionId);
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('new position: ', position.coords);
      const location = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
      };
      console.log('position set, attempting send');
      if (location) {
        console.log('sending');
        userLocationRef.update({
          [user.id]: {lastUpdate: firebase.firestore.FieldValue.serverTimestamp(), location, name: user.fullName, status: user.status || 'active'},
        });
        console.log('sent');
      }
    },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}
