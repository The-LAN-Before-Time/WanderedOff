import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import updateLocation from '../../../shared/UpdateLocation';
import queryLocations from '../../../shared/QueryLocations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../MapScreen/MapScreen';
import OptionsScreen from '../Options/OptionsScreen';
import SessionTab from '../SessionMgmt/SessionTab';
import { UserContext } from '../../../shared/UserContext';

const TabbedNavigation = (props) => {
  // console.log('These are the props on TabbedNavigation, mangos', props.route.params)
  const userData = useContext(UserContext);
  // console.log("CONTEXT", userData)
  const [sessionId, setSessionId] = useState(props.route.params.session.id);
  const [activeUsers, setActiveUsers] = useState({
    list: {},
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
  const [radius, setRadius] = useState(4000);

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

  useEffect(() => {
      const interval = setInterval(
        () => updateLocation(userData, sessionId),
        3000
      );
      const unsubscribeToQuery = queryLocations(sessionId, setActiveUsers, activeUsers, radius);
      return () => {
        clearInterval(interval);
        unsubscribeToQuery();
      };
  }, [sessionId]);

  useEffect(() => setInitialRegion());

  if (activeUsers.loaded) {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Sessions'>
          {() => (
            <SessionTab/>
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
        <Tab.Screen name='Options'>
          {() => (
            <OptionsScreen
              setSessionId={setSessionId}
              sessionId={sessionId}
              radius={radius}
              setRadius={setRadius}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
};

export default TabbedNavigation;

//stop running?
