import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/styles';
import { RadioButton } from 'react-native-paper';

const UpdateStatus = (props) => {
  const { status, setStatus } = props;
  const navigation = useNavigation();
  const [notify, setNotify] = useState(status.notify);
  const [newStatus, setNewStatus] = useState(status.status);

  const handleSubmit = () => {
    setStatus({ status: newStatus, notify });
    navigation.navigate('Sessions');
  };

  return (
    <View>
      <View>
        <View style={styles.radioView}>
          <RadioButton
            value='Active'
            status={newStatus === 'Active' ? 'checked' : 'unchecked'}
            color='#0061b2'
            onPress={() => setNewStatus('Active')}
          />
          <Text
            onPress={() => setNewStatus('Active')}
            style={styles.radioLabel}
          >
            Active
          </Text>
        </View>
        <View style={styles.radioView}>
          <RadioButton
            value='On Break'
            status={newStatus === 'On Break' ? 'checked' : 'unchecked'}
            color='#0061b2'
          />
          <Text
            style={styles.radioLabel}
            onPress={() => setNewStatus('On Break')}
          >
            On Break
          </Text>
        </View>
        <View style={styles.radioView}>
          <RadioButton
            value='Need Assistance'
            status={newStatus === 'Need Assistance' ? 'checked' : 'unchecked'}
            onPress={() => setNewStatus('Need Assistance')}
            color='#0061b2'
          />
          <Text
            onPress={() => setNewStatus('Need Assistance')}
            style={styles.radioLabel}
          >
            Need Assistance
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.switchView}>
          <Text style={styles.label}>Alert friends of status change?</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: 'gray', true: '#0061b2' }}
            thumbColor='white'
            ios_backgroundColor='gray'
            onValueChange={(value) => setNotify(value)}
            value={notify}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Update Status</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UpdateStatus;
