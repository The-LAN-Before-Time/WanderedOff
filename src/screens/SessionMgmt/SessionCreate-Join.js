import React, { useState } from 'react';
import {View, Button, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import formStyles from '../../styles/formStyles'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const SessionCreateJoin = (props) => {
console.log('IN GET STARTED')
const navigation = useNavigation();
  return (
    <View>
      <View>
          <TouchableOpacity
              style={formStyles.button}
              onPress={() => navigation.navigate('Create Session')}>
              <Text style={formStyles.buttonTitle}>Create Session</Text>
          </TouchableOpacity>
      </View>
      <View>
          <TouchableOpacity
              style={formStyles.button}
              onPress={() => navigation.navigate('Join Session')}>
              <Text style={formStyles.buttonTitle}>Join Session</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default SessionCreateJoin;
