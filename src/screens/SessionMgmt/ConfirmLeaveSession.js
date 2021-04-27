import React, { useState, useContext } from 'react';
import {
  View,
  Button,
  Text,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/styles';
import { UserContext } from '../../../shared/UserContext';

const ConfirmLeaveSession = ({ leaveSession, terminateSession, sessionInformation }) => {
  const navigation = useNavigation();
  const userData = useContext(UserContext);
  console.log("HI FROM LEEEEAVE", sessionInformation)
  const handleExit = () => {
    leaveSession();
    console.log('ATTEMPTING TO NAVIGATE');
  };

  const endSessionForAll = () => {
    terminateSession();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Sessions');
        }}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDanger} onPress={handleExit}>
        <Text style={styles.buttonText}>Exit Session</Text>
      </TouchableOpacity>
      {sessionInformation.owner === userData.id && <TouchableOpacity style={styles.buttonDanger} onPress={endSessionForAll}>
        <Text style={styles.buttonText}>End for All</Text>
      </TouchableOpacity>}
      {/* <TouchableOpacity style={styles.buttonDanger} onPress={endSessionForAll}>
        <Text style={styles.buttonText}>End for All</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default ConfirmLeaveSession;
