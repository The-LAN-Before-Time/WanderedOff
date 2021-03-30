import React, { useState } from 'react';
import { View, Button, Text, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConfirmJoinSession = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate("Tabbed Nav");
  }

  return (
    <View>
      <View>
        <Text>You are about to join session name</Text>
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
