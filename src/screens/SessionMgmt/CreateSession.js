import React, { useState, useContext } from 'react';
import { View, Button, Text, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import { UserContext } from '../../../shared/UserContext'

const CreateSession = (props) => {
  const userData = useContext(UserContext)
  const navigation = useNavigation();
  const [initialState, setInitialState] = useState({
    name: '',
    code: '',
    radius: '4000',
    centerMovable: 'true',
    owner: userData.id,
    active: true,
    expirationDate: new Date(Date.now() + 24*60*60*1000)
  })

  const handleSubmit = () => {
    const sessionRef = firebase.firestore().collection('sessions')
    sessionRef.add(initialState).then(response => {
      firebase.firestore().collection('sessionUsers').doc(response.id).set({});
      // console.log('This is the id', response.id);
      const session = Object.assign({}, initialState);
      session.id = response.id;
      navigation.navigate("Tabbed Nav", {session});
    })
  }

  return (
    <ScrollView>
      <View>
        <Text>Create New Session</Text>
        <View>
          <TextInput
            placeholder="Session Name"
            value={initialState.name}
            onChangeText={(val) => setInitialState({...initialState, name: val})}
          />
          <TextInput  //Remove this input later
            placeholder="Token *phone number*"
            value={initialState.code}
            onChangeText={(val) => setInitialState({...initialState, code: val})}
            keyboardType='number-pad'
          />
          <TextInput
            placeholder="Enter radius"
            value={String(initialState.radius)}
            onChangeText={(val) => setInitialState({...initialState, radius: val})}
            keyboardType='number-pad'
          />
          <TextInput
            placeholder="Center movable?"
            value={initialState.centerMovable}
            onChangeText={(val) => setInitialState({...initialState, centerMovable: val})}
          />
        </View>
        <View>
          <Button
            title='Create Session'
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateSession;
