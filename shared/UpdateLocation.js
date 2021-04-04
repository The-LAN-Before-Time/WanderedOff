import notify from '../Utilities/notify';
// import {useContext} from 'react';
// import { UserContext } from './UserContext';

export default function (sessionId, user, tokens) {
  if (!user.id || !sessionId) return;
  // const userLocationRef = firebase
  //   .firestore()
  //   .collection('sessionUsers')
  //   .doc(sessionId);
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
      };
      console.log('position set, attempting send');
      if (location) {
        console.log('sending');
        notify(
          {
            data: {
              location,
              action: 'UPDATE_LOCATION',
              userId: user.id,
              notify: false,
              lastUpdated: new Date(),
            },
          },
          tokens
        );
        // userLocationRef.update({
        //   [user.id]: {
        //     lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        //     location,
        //   },
        // });
        console.log('sent');
      }
    },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}
