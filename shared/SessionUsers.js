import { firebase } from '../src/firebase/config';

export default function (setSessionUsers, sessionId) {
  if(sessionId) {
    const usersRef = firebase.firestore().collection('users');
    const sessionUsers = usersRef
      .where('session', '==', sessionId)
      .onSnapshot((querySnapshot) => {
        const activeUsers = {};
        querySnapshot.forEach(
          (doc) => {
            const user = doc.data();
            user.id = doc.id;
            activeUsers[user.id] = { id: doc.id, fullName: doc.fullName };
            console.log('adding user: ', doc.fullName);
          },
          (error) => {
            console.log(error.message);
          }
        );
        setSessionUsers({ list: activeUsers, loaded: true });
      });
    return sessionUsers();
  }
}
