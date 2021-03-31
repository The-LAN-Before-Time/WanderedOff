import React, { useState } from 'react';
import { View, Button, Text, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';

const ConfirmJoinSession = (props) => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    // firebase.firestore().collection('sessionUsers').doc(props.route.params.session.id).update({ [props.route.params.userData.id]: {} });

    navigation.navigate("Tabbed Nav", props.route.params);
    //Grab the user,
    //update the user's sessionId to this props sessionId

    //SessionUsers table
    //sessionUsers has a mapped object for each user userId keyvalue pair
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
