import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import headerLogo from '../assets/headerLogo.png';

const Header = () => {
  return (
    <View>
      <Image
        source={headerLogo}
      />
    </View>

  )
}

export default Header;
