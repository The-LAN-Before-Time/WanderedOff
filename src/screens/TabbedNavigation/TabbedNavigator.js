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
import notify from '../../../Utilities/notify';

const TabbedNavigation = (props) => {
  console.log('here is the current locations ', props.userLocations);
  const userData = useContext(UserContext);
  // const [sessionId, setSessionId] = useState(props.route.params.session.id);
  const [sessionId, setSessionId] = useState(null);
  const [activeUsers, setActiveUsers] = useState({
    userList: {},
    loaded: false,
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
  console.log('RADIUS', radius);
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
      userList: {},
      loaded: false,
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
    // navigation.navigate('Get Started');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Get Started' }],
    });
    console.log('TIMEOUT SET');
  };

  /** Updates location on session */
  useEffect(() => {
    console.log('USERNAME:', userData.fullName);
    interval = setInterval(() =>
      updateLocation(
        sessionId,
        userData,
        Object.values(activeUsers.userList).map((user) => user.token),
        3000
      )
    );
    const unsubscribeToQuery = queryLocations(sessionId, setNewUsers);
    return () => {
      console.log('ATTEMPTING TO UNOUNT');
      clearInterval(interval);
      unsubscribeToQuery();
      console.log('UNMOUNT COMPLETED');
    };
  }, [sessionId, userData, activeUsers]);

  /** Set initial region */
  useEffect(() => setInitialRegion(), []);

  /** Add new users */
  useEffect(() => {
    if (Object.keys(newUsers).length) {
      let max = 0;
      /**
       *  Checks Active Users List and sets new users with the next index id
       *  and adds & sets inbound property
       *  */
      Object.entries(newUsers).forEach(([id, user]) => {
        if (!activeUsers.userList[id]) {
          if (activeUsers.loaded && id !== userData.id) {
            notify({
              title: `${newUsers[id].fullName} has joined!`,
              body: `Your friend, ${newUsers[id].fullName}, has joined your session`,
              data: { notify: newUsers[id] !== userData.id },
            });
          }
          Object.values(activeUsers.userList).forEach((userData) => {
            if (userData.index > max) {
              max = userData.index;
            }
          });
          max++;
          newUsers[id].index = max;
        } else {
          newUsers[id].index = activeUsers.userList[id].index;
        }
      });

      // Object.entries(newUsers).forEach(([id, user]) => {
      //   newUsers[id].inbounds = haversine(center, newUsers[id].location, {
      //     unit: 'meter',
      //     threshold: radius,
      //   });
      //   if (
      //     !newUsers[id].inbounds &&
      //     activeUsers.list[id] &&
      //     activeUsers.list[id].inbounds
      //   ) {
      //     notify({
      //       title:
      //         userData.id === id
      //           ? `You have fallen out of range`
      //           : `${newUsers[id].fullName} has fallen out of range`,
      //       body:
      //         userData.id === id
      //           ? `Please move back into range`
      //           : `Please check to make sure they are not lost`,
      //     });
      //   }
      //   if (
      //     newUsers[id].notify &&
      //     activeUsers.list[id] &&
      //     activeUsers.list[id].status !== newUsers[id].status
      //   ) {
      //     notify({
      //       title: `${newUsers[id].fullName} is ${activeUsers.list[id].status}`,
      //       body: `Your friend, ${newUsers[id].fullName}, would like you to know their status has changed and they are currently ${activeUsers.list[id].status}`,
      //     });
      //   }
      // });

      setActiveUsers({ userList: newUsers, loaded: true });
    }
  }, [newUsers]);

  // if (activeUsers.loaded) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Sessions') {
            iconName = focused ? 'people-circle-outline' : 'people-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person-circle-outline' : 'person-outline';
          } else {
            iconName = focused ? 'navigate-circle-outline' : 'navigate-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0061b2',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Sessions'>
        {() => (
          <SessionStackCreator
            setActiveUsers={setActiveUsers}
            activeUsers={activeUsers.userList}
            setSessionId={setSessionId}
            sessionId={sessionId}
            leaveSession={leaveSession}
            setRadius={setRadius}
            radius={radius}
            setStatus={setStatus}
            status={status}
            notify={notify}
            token={props.token}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name='Map'>
        {() => (
          <MapScreen
            {...props}
            activeUsers={activeUsers.userList}
            userLocations={props.userLocations.list}
            center={props.userLocations.center}
            region={region}
            radius={radius}
            loaded={activeUsers.loaded && props.userLocations.loaded}
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
            activeUsers={activeUsers.userList}
            {...props}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabbedNavigation;
