import React, { useState } from 'react';
import { View, Button, Text, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateSession = (props) => {
  const navigation = useNavigation();
  const [initialState, setInitialState] = useState({
    name: '',
    radius: 4000,
    centerMovable: 'true',
  })

  const handleSubmit = () => {
    navigation.navigate("Tabbed Nav");
  }

  return (
    <ScrollView>
      <View>
        <Text>Create New Session</Text>
        <View>
          <TextInput
            placeholder="Session Name"
            value={initialState.name}
            // onChangeText={(val) => setInitialState(...initialState, initialState.name: val)}
          />
          <TextInput
            placeholder="Enter radius"
            value={String(initialState.radius)}
            // onChangeText={(val) => setInitialState(...initialState, initialState.radius: val)}
            keyboardType='number-pad'
          />
          <TextInput
            placeholder="Center movable?"
            value={initialState.centerMovable}
            // onChangeText={(val) => setInitialState(...initialState, initialState.centerMovable: val)}
          />
        </View>
        <View>
          <Button
            title='Create Session'
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateSession;
