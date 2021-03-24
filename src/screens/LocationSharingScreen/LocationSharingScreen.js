import React, { Component, useState, useEffect, useRef } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Button,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  AnimateRegion,
  Marker,
  Circle,
} from 'react-native-maps';
import * as Permission from 'expo-permissions';
import { firebase } from '../../firebase/config';
// import { AccountCircleIcon, CheckBoxIcon } from '@material-ui/icons';
import { Ionicons } from '@expo/vector-icons';
import haversine from 'haversine';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

export default function LocationSharing(props) {
  const firestore = firebase.firestore();
  const userLocationRef = firestore.collection('sessionLocations');
  let myPosition = false;
  const [lastSent, setLastSent] = useState(1616612900920);
  const [running, toggle] = useState(true);
  const [locationSent, setLocationSent] = useState(false);
  console.log('page rendering');
  // const sendLocation = async () => {
  //   console.log('attempting to send location');
  //   const locationData = {
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     sessionId: '123456',
  //     userId: props.extraData.id,
  //     location: {},
  //   };
  //   console.log('setup base data');
  //   new Promise(function (resolve, reject) {
  //     navigator.geolocation.getCurrentPosition(resolve, reject);
  //   })
  //     .then((position) => {
  //       console.log('here is our position: ', position);
  //       locationData.location.latitude = parseFloat(position.coords.latitude);
  //       locationData.location.longitude = parseFloat(position.coords.longitude);
  //       console.log('got current location');
  //       console.log('data to send: ', locationData);
  //       userLocationRef.add(locationData);
  //       console.log('data sent');
  //     })
  //     .catch((err) => {
  //       console.error(err.message);
  //     });
  // };
  const sendLocation = () => {
    console.log('attempting to send location');
    console.log('my location: ', myPosition);
    if (myPosition) {
      console.log('send ing');
      userLocationRef.add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        sessionId: '123456',
        userId: props.extraData.id,
        location: myPosition,
      });
      console.log('sent');
      setLocationSent(true);
    }
  };

  function getPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('new position: ', position);
        // console.log(
        //   'distance: ',
        //   haversine(myPosition, position.coords, { unit: 'meter' }),
        //   ' meters'
        // );
        myPosition = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
        };
        console.log('position set');
        sendLocation();
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  // let watchID = navigator.geolocation.watchPosition(
  //   (position) => {
  //     console.log('new position: ', position);
  //     console.log(
  //       'distance: ',
  //       haversine(myPosition, position.coords, { unit: 'meter' }),
  //       ' meters'
  //     );
  //     myPosition = position.coords;
  //   },
  //   (error) => console.log(error.message),
  //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  // );
  if (running) {
    const timeout = setTimeout(getPosition, 3000);
  }
  function toggleRunning(status) {
    // if (!status) getPosition();
    toggle(!status);
  }
  // useEffect(() => sendLocation(), [myPosition]);

  return (
    <View>
      <Button
        onPress={() => toggleRunning(running)}
        title={running ? 'running' : 'stopped'}
        color='blue'
      />
    </View>
  );
}
