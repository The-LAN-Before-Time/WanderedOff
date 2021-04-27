import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import styles from '../../styles/styles';

const ConfirmJoinSession = (props) => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    props.setSessionId(props.route.params.session.id);
    props.setRadius(Number(props.route.params.session.radius));
    props.setSessionInformation(props.route.params.session);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Sessions', params: props.route.params }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.entityText}>You are about to join </Text>
        <Text style={styles.sessionName}>
          {props.route.params.session.name}
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmJoinSession;
