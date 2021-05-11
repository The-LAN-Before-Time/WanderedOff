import React, { useState, useContext } from 'react';
import {
  View,
  Button,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../shared/UserContext';
import { firebase } from '../../firebase/config';
import { PinDropSharp } from '@material-ui/icons';

import styles from '../../styles/styles';
import { Formik } from 'formik';
import * as yup from 'yup';

const JoinSession = () => {
  const userData = useContext(UserContext);
  const navigation = useNavigation();
  const [validCode, setValidCode] = useState(true);
  //const [newCode, setNewCode] = useState('');

  const reviewSchema = yup.object({
    newCode: yup
      .string()
      .required()
      .min(3)
      .test(
        'is the code valid',
        'Cannot find session code, please try again',
        () => validCode
      ),
    //.test('is user's phone number', 'Invalid Phone Number', (val) => {
    //   val === userData.phoneNumber;
    // })
  });

  const joinSession = (values) => {
    let session = {};
    const sessionRef = firebase
      .firestore()
      .collection('sessions')
      .where('code', '==', values.newCode)
      .orderBy('expirationDate', 'desc')
      .limit(1);
    sessionRef
      .get()
      .then((doc) => {
        doc.forEach((individualDoc) => {
          session = individualDoc.data();
          session.id = individualDoc.id;
        });
        if (!session.id) {
          setValidCode(false);
        } else {
          navigation.navigate('Confirm', { session, userData });
        }
      })
      .catch((error) => {});
  };

  return (
    <ScrollView
    keyboardShouldPersistTaps="handled">
      <Formik
        initialValues={{ newCode: '' }}
        validationSchema={reviewSchema}
        onSubmit={(values) => {
          joinSession(values);
        }}
      >
        {(props) => (
          <View>
            <View>
              <Text style={styles.label}>Enter Code</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter code'
                value={props.values.newCode}
                onChangeText={props.handleChange('newCode')}
                onChange={() => setValidCode(true)}
                onBlur={props.handleBlur('newCode')}
                keyboardType='number-pad'
              />
              <Text style={styles.errorText}>
                {props.touched.newCode && props.errors.newCode}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>Join Session</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default JoinSession;
