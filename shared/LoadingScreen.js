import React from 'react';
import { Image, View, Text } from 'react-native';
import styles from '../src/styles/styles';

const LoadingScreen = (props) => {
  let name = props.name || 'next screen';
  return (
    <View style={styles.containerCenter}>
      <Text>Please wait...</Text>
      <Image style={styles.loadingScreen} source={require('../assets/WanderedOff_Loading.gif')} />
      <Text>Loading {name}</Text>
    </View>
  );
};

export default LoadingScreen;
