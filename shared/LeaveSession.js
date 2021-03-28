import { firebase } from '../src/firebase/config';

export default function(userId, setSessionId, setActiveUsers) {
  console.log("hello from leavesession")
  const userRef = firebase.firestore().collection('users').doc(userId);

  userRef.update({
    sessionId: '',
  });
  setSessionId('');
  setActiveUsers({ list: [], loaded: true, center: {} });
  console.log("LEAVING leavesession")
}
