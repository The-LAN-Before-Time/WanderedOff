import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import headerLogo from '../assets/headerLogo.png';


const Header = () => {
  return (
    <View style={{ heigth: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={headerLogo}
        style={{ height: 40, width: 200, marginBottom: 15 }}
      />
    </View>

  )
}

export default Header;
