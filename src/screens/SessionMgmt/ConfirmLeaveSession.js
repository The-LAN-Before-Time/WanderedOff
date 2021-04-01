import React, { useState, useContext } from 'react';
import {View, Button, Text, ScrollView, FlatList, Modal, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "../../../styles";

const ConfirmLeaveSession = ({ leaveSession }) => {
  const navigation = useNavigation();

  const handleExit = () => {
    leaveSession();
    console.log('ATTEMPTING TO NAVIGATE');

  };

  return (
    <View>
        <TouchableOpacity
            style={styles.button}
            onPress={leaveSession}>
            <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      {/*<Button title='Confirm' onPress={leaveSession} />*/}
        <TouchableOpacity
            style={styles.buttonDanger}
            onPress={handleExit}>
            <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      {/*<Button title='Cancel' onPress={handleExit} />*/}
      {/* End for all button will render if user is owner */}
      {/* <Button title="End for All" /> */}
    </View>
  );
};

export default ConfirmLeaveSession;
