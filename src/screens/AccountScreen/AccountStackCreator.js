import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, SafeAreaView } from 'react-native';
import Header from '../SharedComponents/HeaderComponent';
import Account from './Account';
import styles from '../SessionMgmt/styles';

const AccountStackCreator = ({ setUser }) => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerBackground: () => (
            <Image
              source={require('../../../assets/headerlogo.png')}
              intensity={100}
              style={styles.headerImage}
            />
          ),
        }}
      >
        <Stack.Screen name='Account'>
          {(props) => <Account {...props} setUser={setUser} />}
        </Stack.Screen>
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AccountStackCreator;
