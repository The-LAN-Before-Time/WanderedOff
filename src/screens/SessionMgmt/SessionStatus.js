import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/styles';
import { RadioButton } from 'react-native-paper';
import { Formik } from 'formik';

const UpdateStatus = (props) => {
  const { status, setStatus } = props;
  const navigation = useNavigation();
  const [notify, setNotify] = useState(status.notify);
  const [newStatus, setNewStatus] = useState(status.status);

  const handleSubmit = () => {
    setStatus({ status: newStatus, notify });
    navigation.navigate('Sessions');
  };

  const customOrNot = () => {
    if (status.status === 'Active' || status.status === 'On Break' || status.status === 'Need Assistance') {
      return;
    } else {
      return status.status;
    }
  }

  return (
    <ScrollView
    keyboardShouldPersistTaps="handled">
      <View>
        <View style={styles.radioView}>
          <RadioButton
            value='Active'
            status={newStatus === 'Active' ? 'checked' : 'unchecked'}
            color='#0061b2'
            onPress={() => {
              setNewStatus('Active')
              Keyboard.dismiss();
            }}
          />
          <Text
            onPress={() => {
              setNewStatus('Active')
              Keyboard.dismiss();
            }}
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
            onPress={() => {
              setNewStatus('On Break')
              Keyboard.dismiss();
            }}
          />
          <Text
            style={styles.radioLabel}
            onPress={() => {
              setNewStatus('On Break')
              Keyboard.dismiss();
            }}
          >
            On Break
          </Text>
        </View>
        <View style={styles.radioView}>
          <RadioButton
            value='Need Assistance'
            status={newStatus === 'Need Assistance' ? 'checked' : 'unchecked'}
            onPress={() => {
              setNewStatus('Need Assistance')
              Keyboard.dismiss();
            }}
            color='#0061b2'
          />
          <Text
            onPress={() => {
              setNewStatus('Need Assistance')
              Keyboard.dismiss();
            }}
            style={styles.radioLabel}
          >
            Need Assistance
          </Text>
        </View>

        <View >
          <ScrollView>
          <Formik
            initialValues={{newCustomStatus:customOrNot()}}
            // validationSchema={reviewSchema}
          //   onSubmit={(values) => {
          //  setNewStatus(values)
          // }}
          >
        {(props) => (
          <View style={styles.radioView}>
            <RadioButton
            value={props.values.newCustomStatus}
            status={newStatus === props.values.newCustomStatus ? 'checked' : 'unchecked'}
            onPress={() => setNewStatus(props.values.newCustomStatus)}
            color='#0061b2'
          />
            <TextInput
            keyboardShouldPersistTaps="never"
              onFocus={() => setNewStatus(props.values.newCustomStatus)}
              style={styles.input} //styles.radioLabel
              placeholder='Custom status'
              value={props.values.newCustomStatus}
              onChangeText={(e) => {
                // props.handleChange('newCustomStatus')
                props.setFieldValue('newCustomStatus', e)
                setNewStatus(e)
              }}
            />
            {/* <Text style={styles.errorText}>{props.touched.newDisplayName && props.errors.newDisplayName}</Text> */}
          </View>
        )}
      </Formik>
      </ScrollView>
        </View>
      </View>
      <View>
        <View style={styles.switchView}>
          <Text style={styles.label}>Alert group of status change?</Text>
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
    </ScrollView>
  );
};

export default UpdateStatus;
