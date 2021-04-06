import React, { useState } from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SessionCreateJoin = (props) => {
  console.log('IN GET STARTED');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Create Session')}
        >
          <Text style={styles.buttonTitle}>Create Session</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Join Session')}
        >
          <Text style={styles.buttonTitle}>Join Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SessionCreateJoin;
