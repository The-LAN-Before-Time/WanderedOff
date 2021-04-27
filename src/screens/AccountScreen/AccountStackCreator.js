import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, SafeAreaView } from 'react-native';
import Account from './Account';
import styles from '../../styles/styles';
import Header from '../../../shared/Header';

const AccountStackCreator = ({ setUser }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: <Header />,
        headerStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name='Account'>
        {(props) => <Account {...props} setUser={setUser} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AccountStackCreator;
