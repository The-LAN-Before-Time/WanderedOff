import React, { useState } from 'react';
import { View, Button, Text, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';

const ConfirmJoinSession = (props) => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    props.setSessionId(props.route.params.session.id)
    navigation.navigate("Sessions", props.route.params);
  }

  return (
    <View>
      <View>
        <Text>You are about to join {props.route.params.session.name}</Text>
      </View>
      <View>
        <Button
          title='Confirm'
          onPress={handleSubmit}
        />
      </View>
    </View>
  )
}

export default ConfirmJoinSession;
