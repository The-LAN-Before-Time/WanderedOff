import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion } from 'react-native-maps';
import * as Permission from 'expo-permissions';
export default class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    // this.goToInitialRegion = this.goToInitialRegion.bind(this);
  }
  // async getPermissions() {
  //     try {
  //         const { status } = await Permission.askAsync(Permission.LOCATION)
  //         this.setState({permissionStatus: true})
  //     } catch (err) {
  //         console.error(err)
  //     }
  // }
  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 5,
          longitudeDelta: 5,
        };
        this.setState({
          initialRegion: region,
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }
  goToInitialRegion() {
    let initialRegion = Object.assign({}, this.state.initialRegion);
    initialRegion['latitudeDelta'] = 0.005;
    initialRegion['longitudeDelta'] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
  }
  componentDidMount() {
    this.getCurrentLocation();
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followUserLocation={true}
        zoomEnabled={true}
        ref={(ref) => (this.mapView = ref)}
        onMapReady={this.goToInitialRegion.bind(this)}
        initialRegion={this.state.initialRegion}
      ></MapView>
    );
  }
}
