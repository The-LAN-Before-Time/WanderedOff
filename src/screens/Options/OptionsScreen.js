import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const OptionsScreen = ({ changeSession, sessionId }) => {
  const [newCode, setNewCode] = useState(sessionId);

  return (
    <View>
      <View>
        <Text>Input Session Id</Text>
        <TextInput
          value={newCode}
          onChangeText={setNewCode}
          keyboardType='number-pad'
        />
        <Button
          title='Update Session'
          onPress={() => {
            console.log(
              'setting sessiong id to ',
              newCode,
              '(',
              typeof newCode,
              ')'
            );
            changeSession(String(newCode));
          }}
          color='blue'
        />
      </View>
    </View>
  );
};

export default OptionsScreen;
