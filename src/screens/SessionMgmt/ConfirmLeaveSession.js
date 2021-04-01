import React, { useState, useContext } from 'react';
import { View, Button, Text, ScrollView, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConfirmLeaveSession = ({ leaveSession }) => {
  const navigation = useNavigation();

  const handleExit = () => {
    leaveSession();
    console.log('ATTEMPTING TO NAVIGATE');

  };

  return (
    <View>
      <Button title='Confirm' onPress={leaveSession} />
      <Button title='Cancel' onPress={handleExit} />
      {/* End for all button will render if user is owner */}
      {/* <Button title="End for All" /> */}
    </View>
  );
};

export default ConfirmLeaveSession;
