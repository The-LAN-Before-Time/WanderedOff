import React, { Component, useState, useEffect, useRef } from 'react';
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
  Circle,
} from 'react-native-maps';
import * as Permission from 'expo-permissions';
import { firebase } from '../../firebase/config';

export default function MapScreen(props) {
  let mapRef = useRef(null);
  const sessionRef = firebase.firestore().collection('sessions');
  const usersRef = firebase.firestore().collection('users');
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [center, setCenter] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [notZoomed, setNotZoomed] = useState(true);
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
    console.log('current region: ', region);
  };
  const goToInitialRegion = () => {
    // console.log('mapRef: ', mapRef);
    let initialRegion = Object.assign({}, region);
    // setRegion({ ...region, latitudeDelta: 0.005, longitudeDelta: 0.005 });
    initialRegion['latitudeDelta'] = 0.005;
    initialRegion['longitudeDelta'] = 0.005;
    console.log('session users: ', sessionUsers);
    console.log(
      'attempting animate: ',
      sessionUsers.map((user) => ({
        latitude: user.location.latitude,
        longitude: user.location.longitude,
      }))
    );
    mapRef.current.fitToCoordinates(
      sessionUsers.map((user) => ({
        latitude: user.location.latitude,
        longitude: user.location.longitude,
      })),
      { animated: true }
    );
    console.log('animate complete');
  };
  const getSessionLocations = () => {
    usersRef.where('session', '==', '123456').onSnapshot(
      (querySnapshot) => {
        const activeUsers = [];
        let lats = 0;
        let longs = 0;
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          activeUsers.push(user);
          console.log('session user: ', user);
          lats += user.location.latitude;
          longs += user.location.longitude;
        });
        setSessionUsers(activeUsers);
        let latAvg = lats / activeUsers.length;
        let longAvg = longs / activeUsers.length;
        setCenter({
          latitude: latAvg,
          longitude: longAvg,
        });
        if (notZoomed) goToInitialRegion(activeUsers);
        setNotZoomed(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    getCurrentLocation();
  }, [region, mapRef]);
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
      ref={mapRef}
      // ref={(ref) => (mapRef = ref)}
      // onMapReady={mapReady}
      initialRegion={region}
      onPress={goToInitialRegion}
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
          >
            <View style={{ padding: 10 }}>
              <Text style={{ color: colors[idx] }}>
                {user.fullName
                  .split(' ')
                  .map((name) => name[0])
                  .join('')}
              </Text>
            </View>
          </Marker>
        );
      })}
      <Circle center={center} radius={15000} fillColor='rgba(20,20,240,0.1)' />
    </MapView>
  );
}
