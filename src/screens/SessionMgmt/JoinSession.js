import React, { useState } from 'react';
import { View, Button, Text, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JoinSession = () => {
  const navigation = useNavigation();
  const [newCode, setNewCode] = useState('');

  const handleSubmit = () => {
    navigation.navigate("Confirm");
  }

  return (
    <ScrollView>
      <View>
        <View>
          <TextInput
            placeholder="Enter code"
            value={newCode}
            onChangeText={(val) => setNewCode(val)}
            keyboardType='number-pad'
          />
        </View>
        <View>
          <Button
            title='Join Session'
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default JoinSession;
