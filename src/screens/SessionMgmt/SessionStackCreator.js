import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../../../shared/Header';
import SessionCreateJoin from './SessionCreate-Join';
import CreateSession from './CreateSession';
import SessionTab from './SessionTab';
import ConfirmJoinSession from './ConfirmJoinSession';
import JoinSession from './JoinSession';
import ConfirmLeaveSession from './ConfirmLeaveSession';
import SessionOptions from './SessionOptions';
import StatusUpdate from './SessionStatus';

const SessionStackCreator = (props) => {
  const {
    setActiveUsers,
    activeUsers,
    setSessionId,
    leaveSession,
    setRadius,
    radius,
    sessionId,
    setStatus,
    status,
  } = props;
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={sessionId ? 'Sessions' : 'Get Started'}
      screenOptions={{
        headerShown: true,
        headerTitle: <Header />,
      }}
    >
      <Stack.Screen name='Get Started' component={SessionCreateJoin} />

      <Stack.Screen name='Create Session'>
        {(props) => <CreateSession {...props} setSessionId={setSessionId} />}
      </Stack.Screen>

      <Stack.Screen name='Join Session' component={JoinSession} />

      <Stack.Screen name='Confirm'>
        {(props) => (
          <ConfirmJoinSession {...props} setSessionId={setSessionId} />
        )}
      </Stack.Screen>

      <Stack.Screen name='Sessions'>
        {(props) => (
          <SessionTab
            {...props}
            setActiveUsers={setActiveUsers}
            activeUsers={activeUsers}
            setSessionId={setSessionId}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name='Confirm Leave Session'>
        {(props) => (
          <ConfirmLeaveSession {...props} leaveSession={leaveSession} />
        )}
      </Stack.Screen>
      <Stack.Screen name='Session Options'>
        {(props) => (
          <SessionOptions {...props} setRadius={setRadius} radius={radius} />
        )}
      </Stack.Screen>
      <Stack.Screen name='Update Status'>
        {(props) => (
          <StatusUpdate {...props} setStatus={setStatus} status={status} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default SessionStackCreator;
