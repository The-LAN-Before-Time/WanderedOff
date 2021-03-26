import { firebase } from '../src/firebase/config';
export default function (userId, sessionId) {
  if (!userId || !sessionId) return;
  const userLocationRef = firebase.firestore().collection('users').doc(userId);
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
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
          location,
          sessionId,
        });
        console.log('sent');
      }
    },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}
