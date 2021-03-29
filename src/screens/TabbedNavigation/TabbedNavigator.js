import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import updateLocation from '../../../shared/UpdateLocation';
import queryLocations from '../../../shared/QueryLocations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../MapScreen/MapScreen';
import OptionsScreen from '../Options/OptionsScreen';
// import SessionMgmtStack from '../../routes/SessionMgmt';
import SessionHome from '../SessionMgmt/SessionHome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const TabbedNavigation = (props) => {
  const [sessionId, setSessionId] = useState('123456');
  const [activeUsers, setActiveUsers] = useState({
    list: [],
    loaded: false,
    center: {},
  });
  const [running, setRunning] = useState(true);
  const Tab = createBottomTabNavigator();
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [radius, setRadius] = useState(4000);
  const Stack = createStackNavigator();

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

  // const handleSessionChange = (code, runningStatus = running) => {
  //   setRunning(false);
  //   setSessionId(code);
  //   setRunning(runningStatus);
  // };

  useEffect(() => {
    if (running) {
      const interval = setInterval(
        () => updateLocation(props.extraData.id, sessionId),
        3000
      );
      const unsubscribeToQuery = queryLocations(sessionId, setActiveUsers);
      return () => {
        clearInterval(interval);
        unsubscribeToQuery();
      };
    }
  }, [sessionId, running]);

  useEffect(() => setInitialRegion());

  if (activeUsers.loaded) {
    return (
      <Tab.Navigator>
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
        <Tab.Screen name='Sessions'>
          {() => (
            <SessionHome/>
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
