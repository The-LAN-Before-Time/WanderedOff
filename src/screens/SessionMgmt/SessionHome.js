import React, { useState } from 'react';
import SessionCreateJoin from './SessionCreate-Join';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const SessionHome = () => {

  return (
      <Stack.Navigator>
        <Stack.Screen name='Session Mgmt'>
          {(props) => (
            <SessionCreateJoin
            {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
  )
}

export default SessionHome;
