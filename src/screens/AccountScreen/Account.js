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
import { Formik } from 'formik';
import * as yup from 'yup';

const Account = ({ setUser }) => {
  const navigation = useNavigation();
  const userData = useContext(UserContext);
  // const [newDisplayName, setNewDisplayName] = useState(userData.fullName);

  const reviewSchema = yup.object({
    // newDisplayName: yup.string(),
    // newDisplayName: yup.string().required().min(1).test(
    //   'Enter a name!',
    // )
    
    //.test('is user's phone number', 'Invalid Phone Number', (val) => {
    //   val === userData.phoneNumber;
    // })
  })

  const updateName = (values) => {
    const userRef = firebase.firestore().collection('users').doc(userData.id);
    userRef.update({ fullName: values.newDisplayName });
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
      <Formik
        initialValues={{ newDisplayName: userData.fullName }}
        validationSchema={reviewSchema}
        onSubmit={(values) => {
          updateName(values);
        }}
      >
        {(props) => (
          <View>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              placeholder='display name'
              value={props.values.newDisplayName}
              onChangeText={props.handleChange('newDisplayName')}
            />
            <Text style={styles.errorText}>{props.touched.newDisplayName && props.errors.newDisplayName}</Text>
            <View>
              <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.buttonDanger} onPress={onLogoutButtonPress}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Account;
