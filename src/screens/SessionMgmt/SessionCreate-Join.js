import React, { useState } from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SessionCreateJoin = (props) => {
  console.log('IN GET STARTED');
  const testNotification = () => {
    props.notify(
      {
        title: `This is a test`,
        body: 'testing notification',
        notify: true,
      },
      [
        'ExponentPushToken[xdcmTxC3c8-xz-x7WLEBJr]',
        'ExponentPushToken[ojpz5WGPiUx74aaXmKCVnH]',
      ]
    );
  };
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
      <View>
        <TouchableOpacity style={styles.button} onPress={testNotification}>
          <Text style={styles.buttonTitle}>Test Notification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SessionCreateJoin;
