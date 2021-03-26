import { firebase } from '../../firebase/config';

export default function (sessionId, setActiveUsers, setCenter) {
  const usersRef = firebase.firestore().collection('users');
  const center = {};
  const activeUsers = [];
  const query = usersRef.where('session', '==', sessionId).onSnapshot(
    (querySnapshot) => {
      let lats = 0;
      let longs = 0;
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        user.id = doc.id;
        activeUsers.push(user);
        console.log('session user: ', user);
        lats += user.location.latitude;
        longs += user.location.longitude;
      });
      // setUsersLoaded(true);
      center.latitude = lats / activeUsers.length;
      center.longitude = longs / activeUsers.length;
      setActiveUsers(activeUsers);
      setCenter(center);
    },
    (error) => {
      console.log(error);
    }
  );
  return query;
}
