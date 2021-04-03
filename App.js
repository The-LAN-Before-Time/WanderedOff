import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LoginScreen,
  RegistrationScreen,
  TabbedNavigator,
} from './src/screens';
import { Text, Platform, LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer', 'Remote debugger']);

import { decode, encode } from 'base-64';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import SessionStackCreator from './src/screens/SessionMgmt/SessionStackCreator';
import { firebase } from './src/firebase/config';
import { UserContext } from './shared/UserContext';
import Header from './shared/Header';



if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

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
        sendPushNotification({
          title: 'test',
          body: 'heres the body',
          data: '',
        });
      });
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

  async function sendPushNotification(content) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: content.title,
      body: content.body,
      data: { data: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  if (loading || !locationPermission) {
    return (
      <>
        <Text>Loading</Text>
      </>
    );
  }

  return (
    <NavigationContainer test='test'>
      <UserContext.Provider value={user}>
        <Stack.Navigator
            screenOptions={{
          headerShown: true
              }}
            initialRouteName={user ? "Tabbed Nav" : "Login"}>

              <Stack.Screen name='Tabbed Nav'
              options={{
                title: 'Wandered Off',
                headerLeft: () => {
                  return null;
              }}}>
                {(props) => (
                  <TabbedNavigator {...props} notify={sendPushNotification} setUser={setUser} />
                )}
              </Stack.Screen>
              <Stack.Screen name='Login'>
                {(props) => (
                  <LoginScreen
                    {...props}
                    setUser={setUser}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name='Registration'>
                {(props) => (
                  <RegistrationScreen
                    {...props}
                    setUser={setUser}
                  />
                )}
              </Stack.Screen>

        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

async function sendPushNotification(expoPushToken) {
  console.log('in outside scope notification function');
  console.log('ZZ token: ', expoPushToken);
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: "You've got mail! 📬",
    body: 'Here is the notification body',
    data: { data: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
async function registerForPushNotificationsAsync() {
  console.log('registering');
  let token;
  if (Constants.isDevice) {
    console.log('its a device');
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    console.log('got permissions');
    console.log('existing status: ', existingStatus);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      console.log('permissions ungranted');
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    console.log('attempting to retreve token');
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('token recieved: ', token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    console.log('its an android');
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  console.log('XXX token:', token);
  // sendPushNotification(token);
  return token;
}
