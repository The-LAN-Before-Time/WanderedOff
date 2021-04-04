import React, { useState, useContext } from 'react';
import {View, Button, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../shared/UserContext'
import { firebase } from '../../firebase/config';
import { PinDropSharp } from '@material-ui/icons';
import styles from "../../styles/styles";

const JoinSession = () => {
  const userData = useContext(UserContext)
  const navigation = useNavigation();
  const [newCode, setNewCode] = useState('');

  const handleSubmit = () => {
    let session = {};
    const sessionRef = firebase.firestore().collection('sessions').where('code', '==', newCode).orderBy('expirationDate', 'desc').limit(1);
    sessionRef.get().then((doc) => {
      doc.forEach((individualDoc) => {
        // console.log('This is the individualDoc, mangos', individualDoc)
          session = individualDoc.data();
          session.id = individualDoc.id;
          // console.log('This is the doc.id, cherries', individualDoc.id)
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
      <View>
        <View>
          <Text style={styles.label}>Enter Code</Text>
          <TextInput
              style={styles.input}
            placeholder="Enter code"
            value={newCode}
            onChangeText={(val) => setNewCode(val)}
            keyboardType='number-pad'
          />
        </View>
        <View>
          <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}>
            <Text style={styles.buttonText}>Join Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default JoinSession;
