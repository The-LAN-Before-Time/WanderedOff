import { firebase } from '../src/firebase/config';

export default function (sessionId, setActiveUsers) {
  console.log('attempting query');

  const usersRef = firebase.firestore().collection('users');

  const query = usersRef.where('sessionId', '==', sessionId).onSnapshot(
    (querySnapshot) => {
      console.log('got snapshot');
      let lats = 0;
      let longs = 0;
      const activeUsers = [];
      let center = {};
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        user.id = doc.id;
        activeUsers.push(user);
        lats += user.location.latitude;
        longs += user.location.longitude;
      });
      // setUsersLoaded(true);
      center.latitude = lats / activeUsers.length;
      center.longitude = longs / activeUsers.length;
      setActiveUsers({ list: activeUsers, loaded: true, center });
    },
    (error) => {
      console.log(error.message);
    }
  );
  return query;
}
