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
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import * as geofirex from 'geofirex';
// import Geolocation from "@react-native-community/geolocation";

const geo = geofirex.init(firebase);

export default function LocationSharing(props) {
  const firestore = firebase.firestore();
  const userLocationRef = firestore.collection('sessionLocations');
  const lastPositionRef = userLocationRef
    .where('sessionId', '==', '123457')
    .orderBy('createdAt', 'desc')
    .limit(5);

  const geoQuery = geo.query(lastPositionRef);
  const selfLocation = lastPositionRef.where('userId', "==", props.extraData.id);

  // geoQuery.subscribe(locations => {
  //   console.log('This is our subscription')
  //   console.log(locations)
  // })
  let [subscribed, setSubscribed] = useState(false);
  let myPosition = false;
  // const [myPosition, setMyPosition] = useState(null);
  const [lastSent, setLastSent] = useState(1616612900920);
  const [running, toggle] = useState(true);
  const [locationSent, setLocationSent] = useState(false);

  console.log('page rendering');


  const sendLocation = () => {
    console.log('attempting to send location');
    console.log('my location: ', myPosition);
    if (myPosition) {
      //const point = geo.point(myPosition.latitude, myPosition.longitude);
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

  // function getPosition() {
  //   if (running) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log('new position: ', position);
  //         // console.log(
  //         //   'distance: ',
  //         //   haversine(myPosition, position.coords, { unit: 'meter' }),
  //         //   ' meters'
  //         // );
  //         myPosition = {
  //           latitude: parseFloat(position.coords.latitude),
  //           longitude: parseFloat(position.coords.longitude),
  //         };
  //         //userLocationRef.setPoint("5iPi91px6uRxI6fezwSu", myPosition.latitude, myPosition.longitude);
  //         const point = geo.point(myPosition.latitude, myPosition.longitude);
  //         // geo.query(selfLocation).setDoc('myLocation', { point: point.data, userId: props.extraData.id, sessionId: "1234567", createdAt: firebase.firestore.FieldValue.serverTimestamp() });
  //         console.log('position set');
  //         // if (!subscribed) {
  //         console.log("setting up subscription")
  //         // const observer = lastPositionRef.onSnapshot(querySnapshot => {console.log("OBSERVER", querySnapshot.size)}, err => { console.log("err:", err) });
  //           // geoQuery
  //           //   .within(
  //           //     geo.point(myPosition.latitude, myPosition.longitude),
  //           //     1000,
  //           //     'point', { log: true }
  //           //   )
  //           //   .subscribe((locations) => {
  //           //     console.log('This is our subscription');
  //           //     console.log(locations);
  //           //   });
  //         //     setSubscribed(true);
  //         // }
  //         //sendLocation();
  //       },
  //       (error) => console.log(error.message),
  //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //     );
  //   }
  // }

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

  // useEffect(() => {
  //   const observer = lastPositionRef.onSnapshot(querySnapshot => {console.log("OBSERVER", querySnapshot.size)}, err => { console.log("err:", err) });
  //   // const interval = setInterval(getPosition, 3000);
  //   // return () => clearInterval(interval);
  //   return () => observer();
  // }, []);

 useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      pos => {
        console.log("WATCH POSITION", pos)
        if(myPosition) {
          console.log(
            'distance: ',
            haversine(myPosition, pos.coords, { unit: 'meter' }),
            ' meters'
          );
        }
        myPosition = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        sendLocation();
      },
      e => console.log(e.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 0 }
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  // useEffect(() => {
  //   sendLocation();
  // }, [myPosition])



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
