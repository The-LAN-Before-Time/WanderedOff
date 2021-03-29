import React, { useState } from 'react';
import { View, Button } from 'react-native';

const SessionCreateJoin = (props) => {
  return (
    <View>
      <View>
        <Button title='Create Session'/>
      </View>
      <View>
        <Button title='Join Session'/>
      </View>
    </View>
  )
}

export default SessionCreateJoin;
