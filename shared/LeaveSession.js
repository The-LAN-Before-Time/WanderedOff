import { Navigation } from '@material-ui/icons';
import { firebase } from '../src/firebase/config';
// import { useNavigation } from '@react-navigation/native';

// const LeaveSession = (sessionId, setSessionId, userId) => {
//   const navigation = useNavigation();
//   setSessionId('');
//   const userLocationRef = firebase.firestore().collection('sessionUsers').doc(sessionId);

//   setTimeout(() => {
//     userLocationRef.update({
//       [userId]: firebase.firestore.FieldValue.delete(),
//     })
//   }, 15000);

//   navigation.navigate('Get Started')
// }

// export default LeaveSession;
