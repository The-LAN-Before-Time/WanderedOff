import React, { useState, useEffect, useContext } from 'react';
import updateLocation from '../../../shared/UpdateLocation';
import queryLocations from '../../../shared/QueryLocations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../MapScreen/MapScreen';
import { UserContext } from '../../../shared/UserContext';
// import LeaveSession from '../../../shared/LeaveSession';
import SessionStackCreator from '../SessionMgmt/SessionStackCreator';
import haversine from 'haversine';
import { firebase } from '../../firebase/config';
import { useNavigation } from '@react-navigation/native';
import AccountStackCreator from '../AccountScreen/AccountStackCreator';
import { Ionicons } from '@expo/vector-icons';
import notify from '../../../shared/notify';
import icon from '../../../assets/icon.png';
import iconGreyed from '../../../assets/icon-greyed.png';
import { Image } from 'react-native'

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
  const [status, setStatus] = useState({ status: 'Active', notify: false });

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
    // navigation.navigate('Get Started');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Get Started' }],
    });
    console.log('TIMEOUT SET');
  };

  /** Updates location on session */
  useEffect(() => {
    interval = setInterval(
      () => updateLocation(sessionId, userData, status),
      3000
    );
    const unsubscribeToQuery = queryLocations(sessionId, setNewUsers);
    return () => {
      console.log('ATTEMPTING TO UNMOUNT');
      clearInterval(interval);
      unsubscribeToQuery();
    };
  }, [sessionId, userData, status]);

  /** Set initial region */
  useEffect(() => setInitialRegion(), []);

  /** Add new users */
  useEffect(() => {
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
          if (activeUsers.loaded && id !== userData.id) {
            notify(
              {
                title: `${newUsers[id].fullName} has joined!`,
                body: `Your friend, ${newUsers[id].fullName}, has joined your session`,
              },
              props.token
            );
          }

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
        if (
          !newUsers[id].inbounds &&
          activeUsers.list[id] &&
          activeUsers.list[id].inbounds
        ) {
          notify(
            {
              title:
                userData.id === id
                  ? `You have fallen out of range`
                  : `${newUsers[id].fullName} has fallen out of range`,
              body:
                userData.id === id
                  ? `Please move back into range`
                  : `Please check to make sure they are not lost`,
            },
            props.token
          );
        }
        if (
          newUsers[id].notify &&
          activeUsers.list[id] &&
          activeUsers.list[id].status !== newUsers[id].status &&
          id !== userData.id
        ) {
          notify(
            {
              title: `${newUsers[id].fullName} is ${activeUsers.list[id].status}`,
              body: `Your friend, ${newUsers[id].fullName}, would like you to know their status has changed and they are currently ${newUsers[id].status}`,
            },
            props.token
          );
        }
      });
      setActiveUsers({ list: newUsers, loaded: true, center });
    }
  }, [newUsers]);

  // if (activeUsers.loaded) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Sessions') {
            // iconName = focused ? 'people-outline' : 'people-outline';
            iconName = 'people-outline';
            size = 31
          } else if (route.name === 'Account') {
            // iconName = focused ? 'person-outline' : 'person-outline';
            iconName = 'person-outline';
          } else {
            // iconName = focused ? 'navigate-outline' : 'navigate-outline';
            return focused ? <Image source={icon} style={{ height: 41, width: 41, marginTop: 4.11 }} /> : <Image source={iconGreyed} style={{ height: 41, width: 41, marginTop: 4.11, opacity: 0.54 }} />
          }
          return <Ionicons name={iconName} size={size} color={color} style={{ marginTop: 6 }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0061b2',
        inactiveTintColor: 'gray',
        style: {
          height: 83,
          borderTopWidth: 1.1,
          borderColor: "#000000",
          shadowColor: '#000000',
          shadowOpacity: 0.035,
          shadowOffset: { width: 0, height: -3},
        },
      }}
    >
      <Tab.Screen name='Sessions'>
        {() => (
          <SessionStackCreator
            setActiveUsers={setActiveUsers}
            activeUsers={activeUsers.list}
            setSessionId={setSessionId}
            sessionId={sessionId}
            leaveSession={leaveSession}
            setRadius={setRadius}
            radius={radius}
            setStatus={setStatus}
            status={status}
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
            sessionId={sessionId}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name='Account'
        options={{
          headerTitle: (props) => <Header {...props} title='Wandered Off' />,
        }}
      >
        {() => (
          <AccountStackCreator
            setUser={props.setUser}
            sessionId={sessionId}
            activeUsers={activeUsers.list}
            {...props}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabbedNavigation;
