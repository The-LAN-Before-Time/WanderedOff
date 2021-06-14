import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { firebase } from '../firebase/config';
import RNFirebase from 'react-native-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import userReducer from './auth';

firebase.firestore(); // <- needed if using firestore

const appReducer = combineReducers({
  auth: userReducer,
  //token
  //currentSession
  //sessionUsers
  // firestore: firestoreReducer,
  // firebase: firebaseReducer,
});

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

const initialState = {};

const middlewares = [
  thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
];
const store = createStore(
  appReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
  // // reactReduxFirebase(firebase, {
  // //   userProfile: 'users',
  // //   useFirestoreForProfile: true,
  // //   attachAuthIsReady: true,
  // // }), // redux binding for firebase
  // // reduxFirestore(firebase) // redux bindings for firestore
);

export const rrfProps = {
  firebase: RNFirebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

export default store;
