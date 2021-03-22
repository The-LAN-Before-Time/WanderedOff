import React, { Component, useState, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  AnimateRegion,
  Marker,
} from 'react-native-maps';
import * as Permission from 'expo-permissions';
import { firebase } from '../../firebase/config';

export default function MapScreen(props) {
  const sessionRef = firebase.firestore().collection('sessions');
  const usersRef = firebase.firestore().collection('users');
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [sessionUsers, setSessionUsers] = useState([]);
  const colors = ['red', 'green', 'purple'];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 5,
          longitudeDelta: 5,
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };
  const goToInitialRegion = () => {
    let initialRegion = Object.assign({}, region);
    initialRegion['latitudeDelta'] = 0.005;
    initialRegion['longitudeDelta'] = 0.005;
    mapView.animateToRegion(initialRegion, 2000);
  };
  const getSessionLocations = () => {
    usersRef.where('session', '==', '123456').onSnapshot(
      (querySnapshot) => {
        const activeUsers = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          activeUsers.push(user);
          console.log('session user: ', user);
        });
        setSessionUsers(activeUsers);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);
  useEffect(() => {
    getSessionLocations();
  }, []);
  return (
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      followUserLocation={true}
      zoomEnabled={true}
      // ref={(ref) => (this.mapView = ref)}
      // onMapReady={goToInitialRegion()}
      initialRegion={region}
    >
      {sessionUsers.map((user, idx) => {
        return (
          <Marker
            key={user.id}
            coordinate={{
              latitude: user.location.latitude,
              longitude: user.location.longitude,
            }}
            title={user.fullName}
            pinColor={colors[idx]}
          />
        );
      })}
    </MapView>
  );
}
