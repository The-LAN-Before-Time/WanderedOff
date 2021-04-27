import { firebase } from '../src/firebase/config';

export default function (sessionId, user, status) {
  if (!user.id || !sessionId) return;
  const userLocationRef = firebase
    .firestore()
    .collection('sessionUsers')
    .doc(sessionId);
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
      };
      if (location) {
        userLocationRef.update({
          [user.id]: {
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
            location,
            fullName: user.fullName,
            status: status.status || 'active',
            userId: user.id,
            notify: status.notify,
            active: true,
          },
        });
      }
    },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}
