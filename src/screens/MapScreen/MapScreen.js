import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { firebase } from '../../firebase/config';
import { Ionicons } from '@expo/vector-icons';
import haversine from 'haversine';
import { UserContext } from '../../../shared/UserContext';

export default function MapScreen({ center, activeUsers, region, radius }) {
  let mapRef = useRef(null);
  const userData = useContext(UserContext);
  const [mapReady, setMapReady] = useState(false);
  // const [radius, setRadius] = useState(4000);
  const colors = ['red', 'green', 'purple'];
  const defaultPadding = { top: 20, right: 20, bottom: 20, left: 20 };

  const goToInitialRegion = () => {
    if (mapReady) {
      /*
      adds outer points of radius circle to fit to map
      */
      console.log('HI FROM MAPREADY');
      let coords = activeUsers.map((user) => ({
        latitude: user.location.latitude,
        longitude: user.location.longitude,
      }));
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
      console.log('COORDS', coords);
      mapRef.current.fitToCoordinates(coords, {
        edgePadding: defaultPadding,
        animated: true,
      });
      console.log('animate complete');
    }
  };

  useEffect(() => {
    goToInitialRegion();
  }, [mapReady]);

console.log("CENTER GRAPES FROM MAP", center)
  // if (userLocationFound && usersLoaded) {
  return (
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      followUserLocation={true}
      zoomEnabled={true}
      ref={mapRef}
      onMapReady={() => setMapReady(true)}
      initialRegion={region}
    >
      {activeUsers
        .filter((user) => user.userId !== userData.id)
        // .filter((user) => {
        //   const date = new Date();
        //   return date.getTime() - user.lastUpdate.seconds > 300000;
        // })
        .map((user, idx) => {
          return (
            <Marker
              key={user.userId}
              coordinate={{
                latitude: user.location.latitude,
                longitude: user.location.longitude,
              }}
              title={user.fullName}
              pinColor={colors[idx % colors.length]}
            >
              <View
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'black',
                }}
              >
                <Text
                  style={{
                    color: colors[idx % colors.length],
                    textAlign: 'center',
                  }}
                >
                  {user.fullName
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </Text>
                <Ionicons name='person-circle' size={24} color={colors[idx]} />
              </View>
            </Marker>
          );
        })}
      <Circle center={center} radius={radius} fillColor='rgba(20,20,240,0.1)' />
    </MapView>
  );
}
