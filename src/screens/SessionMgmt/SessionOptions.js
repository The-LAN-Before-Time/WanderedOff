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
import formStyles from '../../styles/formStyles';

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
        <Text>Options</Text>
      </View>
      <View style={formStyles.container}>
        <View>
          <TextInput
            style={formStyles.input}
            placeholder='Enter radius'
            value={String(newRadius)}
            onChangeText={(val) => setNewRadius(val)}
            keyboardType='number-pad'
          />
        </View>
        <View>
          <TouchableOpacity style={formStyles.button} onPress={handleSubmit}>
            <Text style={formStyles.buttonTitle}>Update Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default OptionsScreen;
