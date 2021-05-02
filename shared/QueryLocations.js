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
            setNewUsers(doc.data());
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
