import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../../../shared/UserContext';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/styles';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

function MapScreen(props) {
  const { activeUsers, region, radius, loaded } = props;
  const { userLocations, center } = props;
  const navigation = useNavigation();
  let mapRef = useRef(null);
  const userData = useContext(UserContext);
  const [mapReady, setMapReady] = useState(false);
  const colors = ['red', 'green', 'purple', 'orange'];
  const defaultPadding = { top: 20, right: 20, bottom: 20, left: 20 };
  const userList = Object.values(activeUsers);

  const goToInitialRegion = () => {
    if (mapReady && loaded) {
      /* adds outer points of radius circle to fit to map */
      let coords = Object.values(userLocations);
      coords.push({
        latitude: center.latitude + radius * 0.0000089,
        longitude: center.longitude,
      });
      coords.push({
        latitude: center.latitude - radius * 0.0000089,
        longitude: center.longitude,
      });
      coords.push({
        latitude: center.latitude,
        longitude:
          center.longitude +
          (radius * 0.0000089) / Math.cos(center.latitude * 0.018),
      });
      coords.push({
        latitude: center.latitude,
        longitude:
          center.longitude -
          (radius * 0.0000089) / Math.cos(center.latitude * 0.018),
      });
      mapRef.current.fitToCoordinates(coords, {
        edgePadding: defaultPadding,
        animated: true,
      });
    }
  };

  useEffect(() => {
    goToInitialRegion();
  }, [mapReady]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      goToInitialRegion();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followUserLocation={true}
        zoomEnabled={true}
        ref={mapRef}
        onMapReady={() => setMapReady(true)}
        initialRegion={region}
        screenOptions={{ headerShown: false }}
        showsMyLocationButton={false}
      >
        {userList
          .filter(
            (user) => user.userId !== userData.id && userLocations[user.id]
          )
          .map((user) => {
            if (user.userId) {
              return (
                <Marker
                  key={user.userId}
                  coordinate={{
                    latitude: userLocations[user.id].location.latitude,
                    longitude: userLocations[user.id].location.longitude,
                  }}
                  title={`${user.fullName} (${user.status})`}
                >
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'black',
                    }}
                  >
                    <Avatar
                      rounded
                      title={user.fullName
                        .split(' ')
                        .map((name) => name[0])
                        .join('')}
                      overlayContainerStyle={{
                        backgroundColor: colors[user.index % colors.length],
                      }}
                    />
                  </View>
                </Marker>
              );
            }
          })}
        {loaded ? (
          <Circle
            center={center}
            radius={radius}
            fillColor='rgba(20,20,240,0.1)'
          />
        ) : (
          <></>
        )}
      </MapView>
      <View style={styles.mapRecenterIcon}>
        <Ionicons name='locate-outline' size={30} onPress={goToInitialRegion} />
      </View>
      <Image
        source={require('../../../assets/logoHeader.png')}
        style={styles.mapHeader}
      />
      {loaded ? (
        <></>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('Get Started')}
          style={styles.mapButton}
        >
          <Text style={styles.buttonText}>Push To Start Session</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const mapState = (state) => ({
  userLocations: state.userLocations.list,
  userList: state.activeUsers.userList,
  center: state.userLocations.center,
  loaded: state.userLocations.loaded && state.activeUsers.loaded,
});

export default connect(mapState)(MapScreen);
