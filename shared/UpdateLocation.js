import notify from '../Utilities/notify';
import store from '../src/store/index';
// import {useContext} from 'react';
// import { UserContext } from './UserContext';

export default function (sessionId, user) {
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
        console.log(
          'sending to ',
          Object.values(store.getState().activeUsers.userList).map(
            (user) => user.token
          )
        );
        const message = {
          data: {
            location,
            action: 'UPDATE_LOCATION',
            userId: user.id,
            notify: false,
            lastUpdated: new Date(),
          },
        };
        console.log('sending message: ', message);
        notify(
          message,
          Object.values(store.getState().activeUsers).map((user) => user.token)
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
