// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";

// import * as Location from "expo-location";
// import * as TaskManager from "expo-task-manager";
// import geohash from "ngeohash";
// import { firebase, firestore } from "../firebase";

// window.ReactNativeWebView.postMessage(
//     JSON.stringify({
//         action: "setUserID",
//         data: user.uid
//     })
// );

// <WebView
//   ref={(reference) => (webview = reference)}
//   onMessage={(event) => {
//     let message = JSON.parse(event.nativeEvent.data);
//     switch (message.action) {
//       case "setUserID":
//         let id = message.data;
//         break;
//       case "anotherAction":
//         //
//         break;
//     }
//   }}
// />;

// let location = JSON.stringify({ latitude: 36.742022, longitude: 3.103771 });
// webview.injectJavaScript(
//   window.injectData({
//     action: "setLocation",
//     data: JSON.stringify(`${location}`)
//   })
// );

// window.injectData = (message) => {
//     switch (message.action) {
//       case "setLocation":
//         let location = JSON.parse(message.data);
//         break;
//       case "anotherAction":
//         //
//         break;
//     }
//   };

// //Second snippet
// let USER_ID = null;
// let LOCATION_TASK = "background-location";

// let updateLocation = (location) => {
//   if (USER_ID) {
//     firestore
//       .collection("users")
//       .doc(USER_ID)
//       .update({
//         "d.location": new firebase.firestore.GeoPoint(
//           location.latitude,
//           location.longitude
//         ),
//         g: geohash.encode(location.latitude, location.longitude, 10),
//         l: new firebase.firestore.GeoPoint(
//           location.latitude,
//           location.longitude
//         ),
//       });
//   }
// };

// TaskManager.defineTask(LOCATION_TASK, ({ data, error }) => {
//   if (error) {
//     // Error occurred - check `error.message` for more details.
//     return;
//   }
//   if (data) {
//     const { locations } = data;

//     // Current position with latitude and longitude
//     currentLocation = {
//       latitude: locations[0].coords.latitude,
//       longitude: locations[0].coords.longitude,
//     };
//     updateLocation(currentLocation);
//   }
// });

// export default async function watchPosition(userid) {
//   // Set user ID
//   USER_ID = userid;

//   // Ask permissions for using GPS
//   const { status } = await Location.requestPermissionsAsync();
//   if (status === "granted") {
//     // watch position in background
//     await Location.startLocationUpdatesAsync(LOCATION_TASK, {
//       accuracy: Location.Accuracy.BestForNavigation,
//       distanceInterval: 10,
//       showsBackgroundLocationIndicator: true,
//       foregroundService: {
//         notificationTitle: "Title",
//         notificationBody: "Explanation",
//         notificationColor: "#FF650D",
//       },
//     });
//     // Watch position in foreground
//     await Location.watchPositionAsync(
//       {
//         accuracy: Location.Accuracy.BestForNavigation,
//         distanceInterval: 10,
//       },
//       (location) => {
//         let currentLocation = {
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         };
//         updateLocation(currentLocation);
//       }
//     );
//   } else {
//     // Location permission denied
//   }
// }


// //First snippet

// export const renderMapView = () => {
//     return (
// <MapView
//    style={mapStyle}
//    // Reference is useful for controlling the map like mapView.fitToCoordinates(...)
//    ref={(ref) => (mapView = ref)}
//    // For better performance, avoid using default map on iOS
//    provider={PROVIDER_GOOGLE}
//    // Show the blue dot that represents the current location on the map
//    showsUserLocation={true}
//    initialRegion={{
//    ...this.state.currentLocation,
//    latitudeDelta: LATITUDE_DELTA,
//    longitudeDelta: LONGITUDE_DELTA,
//    }}
//    /*
//    * Watch region change when the user moves the map
//    * for example, to get the address with reverse geocoding.
//    \*/
//    onRegionChangeComplete={(region) => {
//    console.log(
//        `Map center: latitude: ${region.latitude}${region.latitude}
//        longitude: ${region.latitude}${region.longitude}`
//    );
//    }}
//    // Map edge paddings
//    mapPadding={{
//    top: 20,
//    right: 20,
//    bottom: 20,
//    left: 20,
//    }}
// >
// {/* Render marker with custom icon \*/}
//    {this.state.marker && (
//    <Marker
//        title={this.state.marker.title}
//        coordinate={{
//        latitude: this.state.marker.latitude,
//        longitude: this.state.marker.longitude,
//        }}
//    >
//        <MaterialIcons name="place" size={40} color="green" />
//    </Marker>
//    )}

//  {/* Render multiple markers \*/}
//    {this.state.markers.map((marker, index) => {
//    return (
//        <Marker
//        key={index}
//        title={marker.address}
//        coordinate={{
//            latitude: marker.latitude,
//            longitude: marker.longitude,
//        }}
//        >
//        <MaterialIcons name="place" size={40} color="green" />
//        </Marker>
//    );
//    })}

//  {/* Render directions from array of points \*/}
//    {this.state.directions.length >= 2 && (
//    <MapViewDirections
//        origin={this.state.directions[0]}
//        destination={
//        this.state.directions[this.state.directions.length - 1]
//        }
//        waypoints={
//        this.state.directions.length > 2
//            ? this.state.directions.slice(1, -1)
//            : null
//        }
//        optimizeWaypoints={true}
//        apikey={GOOGLE_MAPS_APIKEY}
//        strokeWidth={5}
//        strokeColor="green"
//        onReady={(result) => {
//        console.log(
//            `Distance "${result.distance} km", "${result.duration} min"`
//        );
//        }}
//        onError={(errorMessage) => {
//        console.log(errorMessage);
//        }}
//    />
//    )}
// </MapView>
//     );
// };

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
export default
class GoogleMap extends React.Component {
    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            ></MapView>
        );
    }
}
