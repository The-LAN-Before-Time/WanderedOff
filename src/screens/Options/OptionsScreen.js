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
import styles from '../../styles/styles';

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
      <View>
        <Text style={styles.label}>Radius</Text>
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
          <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}>
            <Text style={styles.buttonTitle}>Update Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default OptionsScreen;
