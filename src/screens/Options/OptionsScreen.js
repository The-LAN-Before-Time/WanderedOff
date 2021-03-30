import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView } from 'react-native';


const OptionsScreen = ({ setSessionId, sessionId, radius, setRadius }) => {
  const [newCode, setNewCode] = useState(sessionId);
  const [newRadius, setNewRadius] = useState(radius);
  const navigation = useNavigation();

  const handleSubmit = () => {
    setSessionId(newCode);
    setRadius(Number(newRadius));
    navigation.navigate('Map')
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter code"
            value={newCode}
            onChangeText={(val) => setNewCode(val)}
            keyboardType='number-pad'
          />
          <TextInput
            style={styles.input}
            placeholder="Enter radius"
            value={String(newRadius)}
            onChangeText={(val) => setNewRadius(val)}
            keyboardType='number-pad'
          />
        </View>
        <View>
          <Button
            style={styles.button}
            title='Update Session'
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
  }
})

export default OptionsScreen;
