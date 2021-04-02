import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import updateLocation from '../../../shared/UpdateLocation';
import queryLocations from '../../../shared/QueryLocations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../MapScreen/MapScreen';
import OptionsScreen from '../Options/OptionsScreen';
import { UserContext } from '../../../shared/UserContext';
// import LeaveSession from '../../../shared/LeaveSession';
import SessionStackCreator from '../SessionMgmt/SessionStackCreator';
import haversine from 'haversine';
import { firebase } from '../../firebase/config';
import { useNavigation } from '@react-navigation/native';
import Account from '../AccountScreen/Account';

const TabbedNavigation = (props) => {
  const userData = useContext(UserContext);
  // const [sessionId, setSessionId] = useState(props.route.params.session.id);
  const [sessionId, setSessionId] = useState(null);
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
  const navigation = useNavigation();
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

  const leaveSession = () => {
    const oldSessionId = sessionId;
    setSessionId('');
    setActiveUsers({
      list: {},
      loaded: false,
      center: {},
    });
    console.log('ATTEMPTING TO REMOVE ID', oldSessionId);
    const userLocationRef = firebase
      .firestore()
      .collection('sessionUsers')
      .doc(oldSessionId);

    setTimeout(() => {
      console.log('IN TIMEOUT');
      userLocationRef.update({
        [userData.id]: firebase.firestore.FieldValue.delete(),
      });
      console.log('USER LOCATION DELETED');
    }, 15000);
    navigation.navigate('Get Started');
    console.log('TIMEOUT SET');
  };

  /** Updates location on session */
  useEffect(() => {
    interval = setInterval(() => updateLocation(userData, sessionId), 3000);
    const unsubscribeToQuery = queryLocations(sessionId, setNewUsers);
    return () => {
      console.log('ATTEMPTING TO UNOUNT');
      clearInterval(interval);
      unsubscribeToQuery();
      console.log('UNMOUNT COMPLETED');
    };
  }, [sessionId]);

  /** Set initial region */
  useEffect(() => setInitialRegion(), []);

  /** Add new users */
  useEffect(() => {
    console.log('THIRD USEEFFECT');
    if (Object.keys(newUsers).length) {
      let max = 0;
      let lats = 0;
      let longs = 0;
      let center = {};

      /**
       *  Checks Active Users List and sets new users with the next index id
       *  and adds & sets inbound property
       *  */
      Object.entries(newUsers).forEach(([id, user]) => {
        lats += user.location.latitude;
        longs += user.location.longitude;

        if (!activeUsers.list[id]) {
          Object.values(activeUsers.list).forEach((userData) => {
            if (userData.index > max) {
              max = userData.index;
            }
          });
          max++;
          newUsers[id].index = max;
        } else {
          newUsers[id].index = activeUsers.list[id].index;
        }
      });

      /** Set Center Radius */
      center.latitude = lats / Object.keys(newUsers).length;
      center.longitude = longs / Object.keys(newUsers).length;
      Object.entries(newUsers).forEach(([id, user]) => {
        newUsers[id].inbounds = haversine(center, newUsers[id].location, {
          unit: 'meter',
          threshold: radius,
        });
        console.log(
          newUsers[id].fullName,
          ' is ',
          newUsers[id].inbounds ? 'inbounds' : 'out of bounds'
        );
        if (
          !newUsers[id].inbounds &&
          activeUsers.list[id] &&
          activeUsers.list[id].inbounds
        ) {
          props.notify({
            title: `${newUsers[id].fullName} has fallen out of range`,
            title: `Your friend, ${newUsers[id].fullName}, has fallen out of range. Please check to make sure they are not lost`,
          });
        }
      });

      setActiveUsers({ list: newUsers, loaded: true, center });
    }
  }, [newUsers]);

  // if (activeUsers.loaded) {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Sessions'>
        {() => (
          <SessionStackCreator
            setActiveUsers={setActiveUsers}
            activeUsers={activeUsers.list}
            setSessionId={setSessionId}
            sessionId={sessionId}
            leaveSession={leaveSession}
            screenOptions={{
          headerShown: false
              }}
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
            loaded={activeUsers.loaded}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name='Account'>
        {() => (
          <Account
            sessionId={sessionId}
            activeUsers={activeUsers.list}
            {...props}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
  //   } else {
  //     return (
  //       <View>
  //         <Text>Loading</Text>
  //       </View>
  //     );
  //  }
};

export default TabbedNavigation;

//stop running?
