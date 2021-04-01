import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import formStyles from '../../styles/formStyles';

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
    <ScrollView >
      <View style={{marginTop: 50}}><Text>Option</Text></View>
      <View style={formStyles.container}>
        <View>
          <TextInput
            style={formStyles.input}
            placeholder="Enter code"
            value={newCode}
            onChangeText={(val) => setNewCode(val)}
            keyboardType='number-pad'
          />
          <TextInput
            style={formStyles.input}
            placeholder="Enter radius"
            value={String(newRadius)}
            onChangeText={(val) => setNewRadius(val)}
            keyboardType='number-pad'
          />
        </View>
        <View>
          <TouchableOpacity
              style={formStyles.button}
              onPress={handleSubmit}>
            <Text style={formStyles.buttonTitle}>Update Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default OptionsScreen;
