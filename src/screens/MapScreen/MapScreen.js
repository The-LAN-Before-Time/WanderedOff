import React, {useState, useEffect, useRef, useContext} from 'react';
import {Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import {firebase} from '../../firebase/config';
import {Ionicons} from '@expo/vector-icons';
import haversine from 'haversine';
import {UserContext} from '../../../shared/UserContext';

export default function MapScreen({center, activeUsers, region, radius, loaded}) {
    if (!loaded) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Loading...</Text></View>
    }
    let mapRef = useRef(null);
    const userData = useContext(UserContext);
    const [mapReady, setMapReady] = useState(false);
    const colors = ['red', 'green', 'purple', 'orange'];
    const defaultPadding = {top: 20, right: 20, bottom: 20, left: 20};
    const userList = Object.values(activeUsers).sort((a, b) => a.index - b.index)
    const goToInitialRegion = () => {
        if (mapReady) {
            /* adds outer points of radius circle to fit to map */
            let coords = userList.map((user) => ({
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
            mapRef.current.fitToCoordinates(coords, {
                edgePadding: defaultPadding,
                animated: true,
            });
        }
    };

    useEffect(() => {
        goToInitialRegion();
    }, [mapReady]);

    return (
        <MapView
            style={{flex: 1}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followUserLocation={true}
            zoomEnabled={true}
            ref={mapRef}
            onMapReady={() => setMapReady(true)}
            initialRegion={region}
            screenOptions={{headerShown: false}}
        >
            {userList
                .filter((user) => user.userId !== userData.id)
                .map((user) => {
                    if (user.userId) {
                        return (
                            <Marker
                                key={user.userId}
                                coordinate={{
                                    latitude: user.location.latitude,
                                    longitude: user.location.longitude,
                                }}
                                title={`${user.fullName} \n Status: ${user.status} `}
                                pinColor={colors[user.index % colors.length]}
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
                                            color: colors[user.index % colors.length],
                                            textAlign: 'center',
                                        }}
                                    >
                                        {user.fullName
                                            .split(' ')
                                            .map((name) => name[0])
                                            .join('')}
                                    </Text>
                                    <Ionicons name='person-circle' size={24} color={colors[user.index % colors.length]}/>
                                </View>
                            </Marker>

                        );
                    }
                })}
            <Circle center={center} radius={radius} fillColor='rgba(20,20,240,0.1)'/>
        </MapView>
    );
}
