import React from 'react';
import { View, Button, Text, ScrollView, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConfirmLeaveSession = ({ exitSession }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Modal
      animationType="none"
      >
        <View>
          <Button title="Confirm" onPress={exitSession} />
        </View>
        <View>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
        {/* End for all button will render if user is owner */}
        <View>
          <Button title="End for All" />
        </View>
      </Modal>
    </View>
  )
}

export default ConfirmLeaveSession;
