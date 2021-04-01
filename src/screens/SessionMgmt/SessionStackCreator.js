import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SessionCreateJoin from './SessionCreate-Join';
import CreateSession from './CreateSession';
import SessionTab from './SessionTab';
import ConfirmJoinSession from './ConfirmJoinSession';
import JoinSession from './JoinSession';

const SessionStackCreator = ({setActiveUsers, extraData, notify, activeUsers, setSessionId, sessionId}) => {
  const Stack = createStackNavigator();

  return (
      <Stack.Navigator>
        <Stack.Screen name="Get Started" component={SessionCreateJoin}/>

        <Stack.Screen name="Create Session">
          {(props) => (
            <CreateSession
            {...props}
            setSessionId={setSessionId}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Join Session" component={JoinSession}/>

        <Stack.Screen name="Confirm">
        {(props) => (
            <ConfirmJoinSession
            {...props}
            setSessionId={setSessionId}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Sessions">
          {(props) => (
            <SessionTab
            {...props}
            setActiveUsers={setActiveUsers}
            activeUsers={activeUsers}
            setSessionId={setSessionId}
            />
          )}
          </Stack.Screen>

      </Stack.Navigator>
  )
}

export default SessionStackCreator;
