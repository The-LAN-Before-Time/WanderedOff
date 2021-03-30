import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SessionCreateJoin from './SessionCreate-Join';
import CreateSession from './CreateSession';
import SessionTab from './SessionTab';
import ConfirmJoinSession from './ConfirmJoinSession';
import JoinSession from './JoinSession';
import TabbedNavigator from '../TabbedNavigation/TabbedNavigator'

const SessionStackCreator = (extraData, notify) => {
  const Stack = createStackNavigator();

  return (
      <Stack.Navigator>
        <Stack.Screen name="Get Started" component={SessionCreateJoin}/>
        <Stack.Screen name="Create Session" component={CreateSession}/>
        <Stack.Screen name="Join Session" component={JoinSession}/>
        <Stack.Screen name="Confirm" component={ConfirmJoinSession}/>
        <Stack.Screen name="Sessions" component={SessionTab}/>
        {/* <Stack.Screen name='Tabbed Nav' >
              {(props) => (
                <TabbedNavigator
                  {...props}
                  extraData={extraData}
                  notify={notify}
                />
              )}
        </Stack.Screen> */}
      </Stack.Navigator>
  )
}

export default SessionStackCreator;
