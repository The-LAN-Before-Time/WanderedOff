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
    setRadius(Number(newRadius));
    navigation.navigate('Sessions');
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 50 }}>
        <Text style={formStyles.label}>Radius (in meters)</Text>
      </View>
      <View style={styles.container}>
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
    </ScrollView>
  );
};
export default OptionsScreen;
