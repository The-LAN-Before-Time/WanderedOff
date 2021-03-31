import { firebase } from '../src/firebase/config';

export default function (sessionId, setActiveUsers) {
  console.log('attempting query');
  const usersRef = firebase.firestore().collection('sessionUsers');
  const query = firebase.firestore().collection('sessionUsers').doc(sessionId).onSnapshot(
    (doc) => {
      console.log('got snapshot');
      let lats = 0;
      let longs = 0;
      let center = {};

      let activeUsers = [];

      if(doc.data() && Object.keys(doc.data()).length ){
          activeUsers = Object.values(doc.data());
          console.log("-- Doc Data: ", doc.data());

          console.log("ACTIVE USERS MANGOS", activeUsers);
          activeUsers.forEach((user) => {
              // console.log("USER CHERRY LOCATION", user.location);

              lats += user.location.latitude;
              longs += user.location.longitude;

          });
          center.latitude = lats / activeUsers.length;
          center.longitude = longs / activeUsers.length;
          setActiveUsers({ list: activeUsers, loaded: true, center });
      }

      // querySnapshot.forEach((doc) => {
      //   console.log('DOC', doc.data())
        // const user = doc.data();
        // user.id = doc.id;
        // activeUsers.push(user);
        // lats += user.location.latitude;
        // longs += user.location.longitude;
      //});
      // // setUsersLoaded(true);
      // center.latitude = lats / activeUsers.length;
      // center.longitude = longs / activeUsers.length;
      // setActiveUsers({ list: activeUsers, loaded: true, center });
    },
    (error) => {
      console.log(error.message);
    }
  );
  return query;
}
