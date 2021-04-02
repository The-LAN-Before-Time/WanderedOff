import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from '../../styles/formStyles';
import { UserContext } from '../../../shared/UserContext';
import { firebase } from '../../firebase/config';

//activeUsers
//sessionId

const Account = ({ sessionId, activeUsers }) => {
  const userData = useContext(UserContext)

  const [newDisplayName, setNewDisplayName] = useState(userData.fullName);
  const handleSubmit = () => {
    console.log("ACCOUNT BUTTON CLICKED")
    const userSessionRef = firebase.firestore().collection('sessionUsers').doc(sessionId);
    userSessionRef.update({
      [userData.id]: { fullName: newDisplayName },
    })
  }


  return (
    <View>
        <Text style={styles.label}>Display Name</Text>
        <TextInput
        style={styles.input}
        value={newDisplayName}
        onChangeText={(val) => setNewDisplayName(val)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Account;
