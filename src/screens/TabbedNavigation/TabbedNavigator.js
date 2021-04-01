import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import updateLocation from '../../../shared/UpdateLocation';
import queryLocations from '../../../shared/QueryLocations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../MapScreen/MapScreen';
import OptionsScreen from '../Options/OptionsScreen';
import SessionTab from '../SessionMgmt/SessionTab';
import { UserContext } from '../../../shared/UserContext';
// import LeaveSession from '../../../shared/LeaveSession';

const TabbedNavigation = (props) => {
  const userData = useContext(UserContext);
  const [sessionId, setSessionId] = useState(props.route.params.session.id);
  const [activeUsers, setActiveUsers] = useState({
    list: {},
    loaded: false,
    center: {},
  });
  const [newUsers, setNewUsers] = useState({});
  const Tab = createBottomTabNavigator();
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [radius, setRadius] = useState(4000);
  let interval;

  /** Set the initial region on user */
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

  /** Updates location on session */
  useEffect(() => {
      interval = setInterval(
        () => updateLocation(userData, sessionId),
        3000
      );
      const unsubscribeToQuery = queryLocations(sessionId, setNewUsers);
      return () => {
        console.log('ATTEMPTING TO UNOUNT')
        clearInterval(interval);
        unsubscribeToQuery();
        console.log('UNMOUNT COMPLETED')
      };
  }, [sessionId]);

  //  const exitSession = () => {
  //   console.log("EXITING SESSION");
  //   LeaveSession(sessionId, setSessionId, userData.id);
  //   clearInterval(interval);
  // }

  /** Set initial region */
  useEffect(() => setInitialRegion(),[]);

  /** Add new users */
  useEffect(() => {
    console.log('THIRD USEEFFECT')
    if(Object.keys(newUsers).length) {
      let max = 0;
      let lats = 0;
      let longs = 0;
      let center = {};

      /**
       *  Checks Active Users List and sets new users with the next index id
       *  and adds & sets inbound property
       *  */
      Object.entries(newUsers).forEach( ([id, user]) => {
        lats += user.location.latitude;
        longs += user.location.longitude;

        if(!activeUsers.list[id]) {
            Object.values(activeUsers.list).forEach( userData => {
                if(userData.index > max ){
                    max = userData.index;
                }
            })
            max++;
            newUsers[id].index = max;
            newUsers[id].inbounds = true;
        } else {
            newUsers[id].index = activeUsers.list[id].index;
            newUsers[id].inbounds = activeUsers.list[id].inbounds;
        }
      })

        /** Set Center Radius */
      center.latitude = lats / Object.keys(newUsers).length;
      center.longitude = longs / Object.keys(newUsers).length;
      setActiveUsers({ list: newUsers, loaded: true, center });
    }
  }, [newUsers]);

  if (activeUsers.loaded) {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Sessions'>
          {() => (
            <SessionTab
            // exitSession={exitSession}
            sessionInfo={props.route.params.session}
            activeUsers={activeUsers.list}
            setSessionId={setSessionId}
            sessionId={sessionId}
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
