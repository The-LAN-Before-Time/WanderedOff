import { firebase } from '../src/firebase/config';
import haversine from 'haversine'

export default function (sessionId, setActiveUsers, activeUsers, radius) {
  console.log('attempting query');
  const usersRef = firebase.firestore().collection('sessionUsers');
  const query = firebase.firestore().collection('sessionUsers').doc(sessionId).onSnapshot(
    (doc) => {
      console.log('got snapshot');
      let lats = 0;
      let longs = 0;
      let center = {};

      let newUsers = {};
        console.log('If doc && OBj Key on doc.data length')
      if(doc.data() && Object.keys(doc.data()).length ){
          newUsers = doc.data();
          let max = 0;
          console.log("ACTIVE USERS MANGOS", newUsers);
          Object.entries(newUsers).forEach( ([id, user]) => {
              lats += user.location.latitude;
              longs += user.location.longitude;
              if(!activeUsers.list[id]) {
                  Object.values(activeUsers.list).forEach( userData => {
                      console.log('user Index: ', userData.index);
                      if(userData.index > max ){
                          max = userData.index
                      }
                  })
                  max++
                  newUsers[id].index = max;
                  newUsers[id].inbounds = true;
              }

          })
          center.latitude = lats / Object.keys(newUsers).length;
          center.longitude = longs / Object.keys(newUsers).length;
          setActiveUsers({ list: newUsers, loaded: true, center });
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
