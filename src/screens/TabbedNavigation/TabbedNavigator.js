import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import updateLocation from '../../../shared/UpdateLocation';
import queryLocations from '../../../shared/QueryLocations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../MapScreen/MapScreen';

const TabbedNavigation = (props) => {
  const [sessionId, setSessionId] = useState('123456');
  const [activeUsers, setActiveUsers] = useState({ list: [], loaded: false });
  const [center, setCenter] = useState(false);
  const Tab = createBottomTabNavigator();
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
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
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };
  useEffect(() => {
    const interval = setInterval(
      () => updateLocation(props.extraData.id, sessionId),
      3000
    );
    const unsubscribeToQuery = queryLocations(
      sessionId,
      setActiveUsers,
      setCenter
    );
    return () => {
      clearInterval(interval);
      unsubscribeToQuery();
    };
  }, [sessionId]);
  useEffect(() => setInitialRegion());
  if (activeUsers.loaded) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Map'
          component={MapScreen}
          activeUsers={activeUsers.list}
          center={center}
          region={region}
        />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
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
