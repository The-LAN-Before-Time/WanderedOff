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

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

export default function LocationSharing(props) {
  const firestore = firebase.firestore();
  const userLocationRef = firestore.collection('sessionLocations');
  const sendLocation = async () => {
    console.log('attempting to send location');
    const locationData = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      sessionId: '123456',
      userId: props.extraData.id,
      location: {},
    };
    console.log('setup base data');
    new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
      .then((position) => {
        console.log('here is our position: ', position);
        locationData.location.latitude = parseFloat(position.coords.latitude);
        locationData.location.longitude = parseFloat(position.coords.longitude);
        console.log('got current location');
        console.log('data to send: ', locationData);
        userLocationRef.add(locationData);
        console.log('data sent');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <View>
      <Button onPress={sendLocation} title='Send Location' color='blue' />
    </View>
  );
}
