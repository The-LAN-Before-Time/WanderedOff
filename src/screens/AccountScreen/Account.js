import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import styles from '../../styles/styles';
import { UserContext } from '../../../shared/UserContext';
import { firebase } from '../../firebase/config';
import { useNavigation } from '@react-navigation/native';

const Account = ({ setUser }) => {
  const navigation = useNavigation();
  const userData = useContext(UserContext);
  const [newDisplayName, setNewDisplayName] = useState(userData.fullName);

  const handleSubmit = () => {
    // const userSessionRef = firebase.firestore().collection('sessionUsers').doc(sessionId);
    // userSessionRef.update({
    //   [userData.id]: { fullName: newDisplayName },
    // })
    const userRef = firebase.firestore().collection('users').doc(userData.id);
    userRef.update({ fullName: newDisplayName });
  };

  const onLogoutButtonPress = () => {
    firebase
      .auth()
      .signOut()
      .then((response) => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      });
  };

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    const userQuery = usersRef.doc(userData.id).onSnapshot((doc) => {
      if (!doc.exists) {
        alert('User does not exist anymore.');
        return;
      }
      console.log('NEW USER DATA CHERRIES', doc.data());
      setUser(doc.data());
    });
    return () => {
      userQuery();
    };
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={styles.label}>Display Name</Text>
        <TextInput
          style={styles.input}
          placeholder='display name'
          value={newDisplayName}
          onChangeText={(val) => setNewDisplayName(val)}
        />
        <View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={onLogoutButtonPress}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Account;
