import { firebase } from '../src/firebase/config';
import haversine from 'haversine'

export default function (sessionId, setNewUsers) {
  console.log('attempting query');
  if(sessionId) {
    const usersRef = firebase.firestore().collection('sessionUsers');
    const query = firebase.firestore().collection('sessionUsers').doc(sessionId).onSnapshot(
      (doc) => {
        console.log('got snapshot');
        console.log('If doc && OBj Key on doc.data length')
        if(doc.data() && Object.keys(doc.data()).length) {
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
