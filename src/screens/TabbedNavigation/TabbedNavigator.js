import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import updateLocation from '../../../shared/UpdateLocation';
import queryLocations from '../../../shared/QueryLocations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../MapScreen/MapScreen';
import OptionsScreen from '../Options/OptionsScreen';
import { firebase } from '../../firebase/config';

const TabbedNavigation = (props) => {
  const [sessionId, setSessionId] = useState('123456');
  const [activeUsers, setActiveUsers] = useState({
    list: [],
    loaded: false,
    center: {},
  });
  const Tab = createBottomTabNavigator();
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [radius, setRadius] = useState("4000");

  const setInitialRegion = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 5,
          longitudeDelta: 5,
        });
      },
      (error) => console.log(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };

  const leaveSession = () => {
    setSessionId('');
    setActiveUsers({ list: [], loaded: true, center: {} });
    console.log("hello from leavesession")
    const userRef = firebase.firestore().collection('users').doc(props.extraData.id);

    userRef.update({
      sessionId: '',
    });
    console.log("LEAVING leavesession")
}

  useEffect(() => {
    const interval = setInterval(
      () => updateLocation(props.extraData.id, sessionId),
      3000
    );
    return () => {
        clearInterval(interval);
      };
  }, [sessionId]);

  useEffect(() => {
    if(sessionId !== '') {
      const unsubscribeToQuery = queryLocations(sessionId, setActiveUsers);
      return () => {
        unsubscribeToQuery();
      };
    }
  }, [sessionId]);

  useEffect(() => setInitialRegion());

  //if (activeUsers.loaded) {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Options'>
          {() => (
            <OptionsScreen
              {...props}
              setSessionId={setSessionId}
              sessionId={sessionId}
              radius={radius}
              setRadius={setRadius}
              leaveSession={leaveSession}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name='Map'>
          {() => (
            <MapScreen
              {...props}
              activeUsers={activeUsers.list}
              center={activeUsers.center}
              region={region}
              radius={radius}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    );
  // } else {
  //   return (
  //     <View>
  //       <Text>Loading</Text>
  //     </View>
    //);
  //}
};

export default TabbedNavigation;

//stop running?
