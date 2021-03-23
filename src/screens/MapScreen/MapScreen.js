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
// import { AccountCircleIcon, CheckBoxIcon } from '@material-ui/icons';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen(props) {
  let mapRef = useRef(null);
  const sessionRef = firebase.firestore().collection('sessions');
  const [usersLoaded, setUsersLoaded] = useState(false);
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
  const [mapReady, setMapReady] = useState(false);

  const [userLocationFound, setUserLocationFound] = useState(false);
  const [radius, setRadius] = useState(15000);
  const [sessionUsers, setSessionUsers] = useState([]);
  const colors = ['red', 'green', 'purple'];
  const defaultPadding = {top: 20, right: 20, bottom: 20, left: 20 };

  const getCurrentLocation = () => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     setRegion({
    //       latitude: parseFloat(position.coords.latitude),
    //       longitude: parseFloat(position.coords.longitude),
    //       latitudeDelta: 5,
    //       longitudeDelta: 5,
    //     });
    //   },
    //   (error) => console.log(error),
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 20000,
    //     maximumAge: 1000,
    //   }
    // );
    let watchID = navigator.geolocation.watchPosition(position => {
      setRegion({
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 5,
          longitudeDelta: 5,
        });
      setUserLocationFound(true);
      //save new position to proxy db evey 5-10 seconds
      console.log("WATCH", region);
    }, error => console.log(error.message), {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  };

  const goToInitialRegion = () => {
    // console.log('mapRef: ', mapRef);
    let initialRegion = Object.assign({}, region);
    // setRegion({ ...region, latitudeDelta: 0.005, longitudeDelta: 0.005 });
    initialRegion['latitudeDelta'] = 0.005;
    initialRegion['longitudeDelta'] = 0.005;
    console.log('session users: ', sessionUsers);

    // console.log(
    //   'attempting animate: ',
    //   sessionUsers.map((user) => ({
    //     latitude: user.location.latitude,
    //     longitude: user.location.longitude,
    //   }))
    // );
    if(usersLoaded) {
      console.log("HI FROM MAPREADY")
      let coords = sessionUsers.map((user) => ({
          latitude: user.location.latitude,
          longitude: user.location.longitude,
        }));

      coords.push({
        latitude: center.latitude + radius * 0.0000089,
        longitude: center.longitude,
      })

      coords.push({
        latitude: center.latitude - radius * 0.0000089,
        longitude: center.longitude,
      })

      coords.push({
        latitude: center.latitude,
        longitude: center.longitude + radius * 0.0000089 / Math.cos(center.latitude * 0.018),
      })

      coords.push({
        latitude: center.latitude,
        longitude: center.longitude - radius * 0.0000089 / Math.cos(center.latitude * 0.018),
      })
      console.log("COORDS", coords);
      //mapRef.current.fitToElements(true);
      mapRef.current.fitToCoordinates(coords,
        { edgePadding: defaultPadding, animated: true }
      );
      console.log('animate complete');
    }
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
          // console.log('session user: ', user);
          lats += user.location.latitude;
          longs += user.location.longitude;
        });
        setSessionUsers(activeUsers);
        setUsersLoaded(true);
        let latAvg = lats / activeUsers.length;
        let longAvg = longs / activeUsers.length;
        setCenter({
          latitude: latAvg,
          longitude: longAvg,
        });
        //if (notZoomed) goToInitialRegion(activeUsers);
        setNotZoomed(false);
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

  useEffect(() => {
    goToInitialRegion();
  }, [mapReady])

  if(userLocationFound && usersLoaded) {
  return (
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      followUserLocation={true}
      zoomEnabled={true}
      ref={mapRef}
      // ref={(ref) => (mapRef = ref)}
      onMapReady={()=>setMapReady(true)}
      // onMapReady={() => {setTimeout(() => {goToInitialRegion()}, 2000)}}
      initialRegion={region}
      // onPress={goToInitialRegion}
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
            <View style={{ padding: 10, alignItems: "center" }}>
              <Text style={{ color: colors[idx], textAlign: "center" }}>
                {user.fullName
                  .split(' ')
                  .map((name) => name[0])
                  .join('')}
              </Text>
              <Ionicons name="person-circle" size={24} color={colors[idx]}/>
            </View>
          </Marker>
        );
      })}
      <Circle center={center} radius={radius} fillColor='rgba(20,20,240,0.1)' />
    </MapView>
  );
  } else {
    return (
      <View><Text>Loading</Text></View>
    )
  }
}
