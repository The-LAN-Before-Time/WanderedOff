import React, { useState } from 'react';
import {View, Button, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import styles from './styles'

const ConfirmJoinSession = (props) => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    props.setSessionId(props.route.params.session.id)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Sessions', params: props.route.params }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.entityText}>You are about to join </Text>
        <View style={styles.center}>
            <Text style={styles.sessionName}>{props.route.params.session.name}</Text>
        </View>
      </View>
      <View>
          <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default ConfirmJoinSession;
