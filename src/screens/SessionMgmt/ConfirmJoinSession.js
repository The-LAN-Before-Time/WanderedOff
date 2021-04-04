import React, { useState, useContext } from 'react';
import { View, Button, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import styles from '../../styles/styles';
import { UserContext } from '../../../shared/UserContext';

const ConfirmJoinSession = (props) => {
  const navigation = useNavigation();
  const userData = useContext(UserContext);
  const handleSubmit = () => {
    props.setSessionId(props.route.params.session.id);
    const userLocationRef = firebase
      .firestore()
      .collection('sessionUsers')
      .doc(props.route.params.session.id);
    userLocationRef.update({
      [userData.id]: {
        token: props.token,
        userId: userData.id,
        fullName: userData.fullName,
        status: 'active',
      },
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Sessions', params: props.route.params }],
    });
  };

  return (
    <View style={styles.containerCenter}>
      <View style={styles.listContainer}>
        <Text style={styles.entityText}>You are about to join </Text>
        <View style={styles.center}>
          <Text style={styles.sessionName}>
            {props.route.params.session.name}
          </Text>
        </View>
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
