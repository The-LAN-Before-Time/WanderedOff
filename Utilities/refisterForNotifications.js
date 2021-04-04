import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

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

export default registerForPushNotificationsAsync;
