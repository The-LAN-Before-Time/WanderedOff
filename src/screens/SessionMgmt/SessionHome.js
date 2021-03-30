import React, { useState } from 'react';
import SessionTab from './SessionCreate-Join';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const SessionHome = () => {

  return (
      <Stack.Navigator>
        <Stack.Screen name='Sessions'>
          {(props) => (
            <SessionTab
            {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
  )
}

export default SessionHome;
