import React from 'react';
import { Text, View, Image, StyleSheet, ImageBackground } from 'react-native';
import styles from '../SessionMgmt/styles';

export default function Header(props) {
  console.log('here are the props: ', props);
  return (
    // <View style={styles.headerTitle}>
    //   <Image
    //     source={require('../../../assets/headerlogo.png')}
    //     style={styles.headerImage}
    //   />
    // </View>
    <ImageBackground
      source={require('../../../assets/headerlogo.png')}
      style={styles.header}
    ></ImageBackground>
  );
}
