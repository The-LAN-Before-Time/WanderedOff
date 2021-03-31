import { firebase } from '../src/firebase/config';

const LeaveSession = (sessionId, setSessionId, userId) => {
  setSessionId('');
  const userLocationRef = firebase.firestore().collection('sessionUsers').doc(sessionId);

  setTimeout(() => {
    userLocationRef.update({
      [userId]: firebase.firestore.FieldValue.delete(),
    })
  }, 8000);
}

export default LeaveSession;
