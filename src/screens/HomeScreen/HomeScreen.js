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
import fromStyles from '../../styles/formStyles';
import styles from '../../styles/styles'
import { firebase } from '../../firebase/config';

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState('');
  const [entities, setEntities] = useState([]);

  const entityRef = firebase.firestore().collection('entities');
  const userID = props.extraData ? props.extraData.id : null;

  useEffect(() => {
    entityRef
      .where('authorID', '==', userID)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
      };
      entityRef
        .add(data)
        .then((_doc) => {
          setEntityText('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.text}
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
      <View style={fromStyles.formContainer}>
        <TextInput
          style={fromStyles.input}
          placeholder='Add new entity'
          placeholderTextColor='#aaaaaa'
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        <TouchableOpacity style={fromStyles.button} onPress={onAddButtonPress}>
          <Text style={fromStyles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={fromStyles.button} onPress={onLogoutButtonPress}>
          <Text style={fromStyles.buttonText}>Logout</Text>
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
