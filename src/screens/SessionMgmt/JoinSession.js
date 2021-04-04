import React, { useState, useContext } from 'react';
import {View, Button, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../shared/UserContext'
import { firebase } from '../../firebase/config';
import { PinDropSharp } from '@material-ui/icons';

import { Formik } from 'formik';
import * as yup from 'yup';
import styles from "../../styles/styles";

const JoinSession = () => {
  const userData = useContext(UserContext)
  const navigation = useNavigation();
  //const [newCode, setNewCode] = useState('');

  const reviewSchema = yup.object({
    newCode: yup.string()
    .required()
    .min(3),
    //.test('is user's phone number', 'Invalid Phone Number', (val) => {
    //   val === userData.phoneNumber;
    // })
  })

  const joinSession = (values) => {
    console.log("JOIN SESSION VALS", values.newCode)
    let session = {};
    const sessionRef = firebase.firestore().collection('sessions').where('code', '==', values.newCode).orderBy('expirationDate', 'desc').limit(1);
    sessionRef.get().then((doc) => {
      doc.forEach((individualDoc) => {
          session = individualDoc.data();
          session.id = individualDoc.id;
          console.log('This is our session, apples', session)
      })
      if (!session.id) {
        console.log('Hitting the IF')
      } else {
      navigation.navigate("Confirm", {session, userData});
      };
    }).catch((error) => {
  });
  }

  return (
    <ScrollView>
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
              placeholder="Enter code"
              value={props.values.newCode}
              onChangeText={props.handleChange('newCode')}
              onBlur={props.handleBlur("newCode")}
              keyboardType='number-pad'
            />
            <Text style={styles.errorText}>{props.touched.newCode && props.errors.newCode}</Text>
          </View>
          <View>
            <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}>
              <Text style={styles.buttonText}>Join Session</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
      </Formik>
    </ScrollView>
  )
}

export default JoinSession;
