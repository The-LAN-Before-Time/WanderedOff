import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from '../../styles/styles';
import { firebase } from '../../firebase/config';

export default function HomeScreen(props) {
  let latitude = 0;
  let longitude = 0;
  navigator.geolocation.getCurrentPosition((position) => {
    latitude = parseFloat(position.coords.latitude);
    longitude = parseFloat(position.coords.longitude);
  });
  const [entityText, setEntityText] = useState('');
  const [entities, setEntities] = useState([]);

  const entityRef = firebase.firestore().collection('entities');
  const sessionRef = firebase.firestore().collection('sessions');
  const usersRef = firebase.firestore().collection('users');
  const userID = props.extraData ? props.extraData.id : null;

  useEffect(() => {
    console.log('in effect');
    usersRef.where('session', '==', '123456').onSnapshot(
      (querySnapshot) => {
        const newEntities = [];
        querySnapshot.forEach((doc) => {
          const entity = doc.data();
          entity.id = doc.id;
          newEntities.push(entity);
          console.log('session user: ', entity);
        });
        setEntities(newEntities);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const onAddButtonPress = async () => {
    try {
      if (entityText && entityText.length > 0) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          fullname: props.extraData.fullname,
          location: [latitude, longitude],
        };
        let activeSession = await sessionRef
          .where('token', '==', entityText)
          .get()
          //   .then((session) => (activeUsers = session.collection('activeUsers')));
          // activeUsers
          //   // .collection('activeUsers')
          //   .add(data)
          // .then((_doc) => {
          //   setEntityText('');
          //   Keyboard.dismiss();
          // })
          .catch((error) => {
            alert(error);
          });
        // console.log(activeSession['value']);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.fullName}
        </Text>
      </View>
    );
  };

  const onLogoutButtonPress = () => {
    firebase
      .auth()
      .signOut()
      .then((response) => {
        props.navigation.navigate('Login');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add new entity'
          placeholderTextColor='#aaaaaa'
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onLogoutButtonPress}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
}
