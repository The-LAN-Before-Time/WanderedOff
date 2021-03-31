import React from 'react';
import { View, Button, Text } from 'react-native';

const SessionTab = ({ exitSession }) => {


  return (
    <View>
      <Text>Hello</Text>
      <Button title="Exit Session" onPress={exitSession}/>
    </View>
  )
}

export default SessionTab;
