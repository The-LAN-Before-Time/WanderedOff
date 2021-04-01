import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SessionCreateJoin = (props) => {
console.log('IN GET STARTED')
const navigation = useNavigation();
  return (
    <View>
      <View>
        <Button title='Create Session' onPress={() => navigation.navigate('Create Session')}/>
      </View>
      <View>
        <Button title='Join Session'onPress={() => navigation.navigate('Join Session')}/>
      </View>
    </View>
  )
}

export default SessionCreateJoin;
