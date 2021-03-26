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

// import * as geofirex from 'geofirex';
// const geo = geofirex.init(firebase);

export default function LocationSharing(props) {
  const firestore = firebase.firestore();
  const userLocationRef = firestore.collection('sessionLocations');
  const lastPositionRef = userLocationRef
    .where('sessionId', '==', '123456')
    .orderBy('createdAt')
    .limit(5);
  // const geoQuery = geo.query(lastPositionRef)
  // geoQuery.subscribe(locations => {
  //   console.log('This is our subscription')
  //   console.log(locations)
  // })
  let subscribed = false;
  let myPosition = false;
  const [lastSent, setLastSent] = useState(1616612900920);
  const [running, toggle] = useState(true);
  const [locationSent, setLocationSent] = useState(false);
  console.log('page rendering');

  const sendLocation = () => {
    console.log('attempting to send location');
    console.log('my location: ', myPosition);
    if (myPosition) {
      // const point = geo.point(myPosition.latitude, myPosition.longitude)
      console.log('send ing');
      userLocationRef.add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        sessionId: '123456',
        userId: props.extraData.id,
        location: myPosition,
      });
      console.log('sent');
    }
  };

  function getPosition() {
    if (running) {
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
          // if (!subscribed) {
          //   geoQuery.within(geo.point(myPosition.latitude, myPosition.longitude), 100, 'position').subscribe(locations => {
          //     console.log('This is our subscription')
          //     console.log(locations)
          //   })
          // }
          sendLocation();
        },
        (error) => console.log(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
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

  useEffect(() => {
    const interval = setInterval(getPosition, 3000);
    return () => clearInterval(interval);
  }, []);

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
