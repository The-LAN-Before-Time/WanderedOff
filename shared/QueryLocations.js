import { firebase } from '../src/firebase/config';
import store from '../src/store/index';
import { setActiveUsers } from '../src/store/activeUsers';

export default function (sessionId) {
  // console.log('attempting query');
  if (sessionId) {
    const query = firebase
      .firestore()
      .collection('sessionUsers')
      .doc(sessionId)
      .onSnapshot(
        (doc) => {
          if (doc.data() && Object.keys(doc.data()).length) {
            store.dispatch(setActiveUsers(doc.data()));
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
