import React, { useState, useContext } from 'react';
import {View, Button, Text, ScrollView, TextInput, TouchableOpacity, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import { UserContext } from '../../../shared/UserContext'
import styles from '../../styles/formStyles';

const CreateSession = (props) => {
  const {setSessionId} = props;
  const userData = useContext(UserContext)
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(true);
  const [initialState, setInitialState] = useState({
    name: '',
    code: '',
    radius: '4000',
    centerMovable: toggle,
    owner: userData.id,
    active: true,
    expirationDate: new Date(Date.now() + 24*60*60*1000)
  })

  const handleSubmit = () => {
    const sessionRef = firebase.firestore().collection('sessions')
    sessionRef.add(initialState).then(response => {
      firebase.firestore().collection('sessionUsers').doc(response.id).set({});
      const session = Object.assign({}, initialState);
      session.id = response.id;
      setSessionId(session.id);
      navigation.navigate("Sessions", {session});
    })
  }

  return (
    <ScrollView>
      <View>
        {/*<Text>Create New Session</Text>*/}
        <View>
          <Text style={styles.label}> Session Name </Text>
          <TextInput
            style={styles.input}
            placeholder="Session Name"
            value={initialState.name}
            onChangeText={(val) => setInitialState({...initialState, name: val})}
          />
          <Text style={styles.label}>Token *phone number*</Text>
          <TextInput  //Remove this input later
              style={styles.input}
            placeholder="Token *phone number*"
            value={initialState.code}
            onChangeText={(val) => setInitialState({...initialState, code: val})}
            keyboardType='number-pad'
          />
          <Text style={styles.label}>Enter radius</Text>
          <TextInput
              style={styles.input}
            placeholder="Enter radius"
            value={String(initialState.radius)}
            onChangeText={(val) => setInitialState({...initialState, radius: val})}
            keyboardType='number-pad'
          />


          {/*<TextInput*/}
          {/*    style={styles.input}*/}
          {/*  placeholder="Center movable?"*/}
          {/*  value={initialState.centerMovable}*/}
          {/*  onChangeText={(val) => setInitialState({...initialState, centerMovable: val})}*/}
          {/*/>*/}

          <Text style={styles.label}>Center movable?</Text>
            <Switch
                style={styles.switch}
                trackColor={{false: 'gray', true: '#59b3ff'}}
                thumbColor="white"
                ios_backgroundColor="gray"
                onValueChange={(value) => setToggle(value)}
                value={toggle}
            />

        </View>

        <View style={styles.container}>
          <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Session</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  )
}

export default CreateSession;
