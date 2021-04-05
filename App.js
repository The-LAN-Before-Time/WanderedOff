import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LoginScreen,
  RegistrationScreen,
  TabbedNavigator,
} from './src/screens';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer', 'Remote debugger']);
import { decode, encode } from 'base-64';
import registerForPushNotificationsAsync from './Utilities/refisterForNotifications';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { firebase } from './src/firebase/config';
import { UserContext } from './shared/UserContext';
import LoadingScreen from './shared/LoadingScreen';
import { Provider } from 'react-redux';
import store from './src/store/index';
import { updateLocation } from './src/store/userLocations';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    // console.log('NOTIFYING:', notification);
    // console.log('alert:', notification.request.content.data.notify);
    console.log('received notification: ', notification.data);
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
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
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  //sets push notifcations permissions
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .then(() => {
        console.log('token established');
      });
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { data } = notification.request.content;
        console.log('notification action: ', data.action);
        if (data.action === 'UPDATE_LOCATION') {
          store.dispatch(updateLocation(data));
        }
        if (!notification.request.content.data.notify) {
          console.log('skipping notification');
        } else {
          console.log('notifying');
        }
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

  if (loading || !locationPermission) {
    return <LoadingScreen name='app' />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer test='test'>
        <UserContext.Provider value={user}>
          <Stack.Navigator
            initialRouteName={user ? 'Tabbed Nav' : 'Login'}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name='Tabbed Nav'
              options={{
                headerLeft: () => {
                  return null;
                },
              }}
            >
              {(props) => (
                <TabbedNavigator
                  {...props}
                  setUser={setUser}
                  token={expoPushToken}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name='Login'>
              {(props) => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name='Registration'>
              {(props) => <RegistrationScreen {...props} setUser={setUser} />}
            </Stack.Screen>
          </Stack.Navigator>
        </UserContext.Provider>
      </NavigationContainer>
    </Provider>
  );
}
