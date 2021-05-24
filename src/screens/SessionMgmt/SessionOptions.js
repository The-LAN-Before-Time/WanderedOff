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
  TouchableOpacity,
} from 'react-native';
import styles from '../../styles/styles';

const OptionsScreen = ({ radius, setRadius }) => {
  const [newRadius, setNewRadius] = useState(radius);
  const navigation = useNavigation();

  const handleSubmit = () => {
    setRadius(Math.round(Number(newRadius)/3.281*1000)/1000);
    // navigation.navigate('Sessions');
    Keyboard.dismiss();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Radius (in feet)</Text>
        </View>
        <View>
          <View>
            <TextInput
              style={styles.input}
              placeholder='Enter radius'
              value={String(newRadius)}
              onChangeText={(val) => setNewRadius(val)}
              keyboardType='number-pad'
            />
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonTitle}>Update Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default OptionsScreen;
