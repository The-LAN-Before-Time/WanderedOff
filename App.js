import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer', 'Remote debugger']);
LogBox.ignoreAllLogs();
import { decode, encode } from 'base-64';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { firebase } from './src/firebase/config';
import { UserContext } from './shared/UserContext';
import LoadingScreen from './shared/LoadingScreen';
import registerForPushNotificationsAsync from './shared/registerForPushNotifications';
import store, { rrfProps } from './src/store/index';
import HomeStack from './src/screens/HomeStack/HomeStackCreator';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [locationPermission, setLocationPermission] = useState(false);

  //keeps user signed
  // useEffect(() => {
  //   const usersRef = firebase.firestore().collection('users');
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data();
  //           setUser(userData);
  //           setLoading(false);
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //         });
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  //sets push notifcations permissions
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      } else {
        setLocationPermission(true);
      }
    })();
  }, []);
  // store.firebaseAuthIsReady.then(() => {
  if (loading || !locationPermission) {
    return <LoadingScreen name='app' />;
  }
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <HomeStack />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
  // });
}
