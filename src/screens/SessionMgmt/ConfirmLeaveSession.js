import React, { useState, useContext } from 'react';
import {View, Button, Text, ScrollView, FlatList, Modal, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "../../styles/styles";

const ConfirmLeaveSession = ({ leaveSession }) => {
  const navigation = useNavigation();

  const handleExit = () => {
    leaveSession();
    console.log('ATTEMPTING TO NAVIGATE');

  };

  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={() =>{navigation.navigate('Sessions')}}>
            <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.buttonDanger}
            onPress={handleExit}>
            <Text style={styles.buttonText}>Exit Session</Text>
        </TouchableOpacity>

      {/* End for all button will render if user is owner */}
      {/* <Button title="End for All" /> */}
    </View>
  );
};

export default ConfirmLeaveSession;
