import { firebase } from '../src/firebase/config';

export default function (sessionId, setNewUsers) {
  if (sessionId) {
    const query = firebase
      .firestore()
      .collection('sessionUsers')
      .doc(sessionId)
      .onSnapshot(
        (doc) => {
          if (doc.data() && Object.keys(doc.data()).length) {
            let sessionUsers = doc.data();
            let activeUsers = {};
            for(let user in sessionUsers) {
              if(sessionUsers[user].active) {
                activeUsers[user] = sessionUsers[user];
              }
            }
            console.log("OOOOOOOOOOOOOO", activeUsers)
            // setNewUsers(doc.data());
            setNewUsers(activeUsers);
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
    return query;
  } else {
    return console.log;
  }
}
