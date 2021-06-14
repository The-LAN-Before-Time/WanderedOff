const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabbed Nav' }],
        });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_ERROR, err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
      });
  };
};

export const register = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        return firestore.collection('users').doc(resp.user.uid).set({
          fullName: newUser.fullName,
        });
      })
      .then(() => {
        dispatch({ type: REGISTRATION_SUCCESS });
      })
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabbed Nav' }],
        });
      })
      .catch((err) => {
        dispatch({ type: REGISTRATION_ERROR, err });
      });
  };
};

const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      console.log('login error: ', action.err);
      return { ...state, authError: 'Login failed' };
    case LOGIN_SUCCESS:
      return {
        authError: null,
      };
    case SIGNOUT_SUCCESS:
      return state;
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        authError: null,
      };

    case REGISTRATION_ERROR:
      return {
        ...state,
        authError: action.err.message,
      };
    default:
      return state;
  }
};

export default authReducer;
