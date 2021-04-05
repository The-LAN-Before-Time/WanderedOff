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
import { connect } from 'react-redux';
import { resetUsers } from '../../store/activeUsers';

const TabbedNavigation = (props) => {
  const { activeUsers, loaded } = props;
  const userData = useContext(UserContext);
  // const [sessionId, setSessionId] = useState(props.route.params.session.id);
  const [sessionId, setSessionId] = useState(null);
  const [newUsers, setNewUsers] = useState({});
  const Tab = createBottomTabNavigator();
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [radius, setRadius] = useState(4000);
  // console.log('RADIUS', radius);
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
    resetActiveUsers();
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
    interval = setInterval(() => updateLocation(sessionId, userData), 10000);
    const unsubscribeToQuery = queryLocations(sessionId, setNewUsers);
    return () => {
      console.log('ATTEMPTING TO UNOUNT');
      clearInterval(interval);
      unsubscribeToQuery();
      console.log('UNMOUNT COMPLETED');
    };
  }, [sessionId, userData]);

  /** Set initial region */
  useEffect(() => setInitialRegion(), []);

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
        {() => <MapScreen {...props} region={region} radius={radius} />}
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
            {...props}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const mapState = (state) => ({
  activeUsers: state.activeUsers.userList,
  loaded: state.activeUsers.loaded,
});

const mapDispatch = (dispatch) => ({
  resetActiveUsers: () => dispatch(resetUsers),
});
export default connect(mapState)(TabbedNavigation);
