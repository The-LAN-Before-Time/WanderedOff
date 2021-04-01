import React, { useState } from 'react';
import { View, Button, Text, ScrollView, FlatList, Modal } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import styles from '../../../styles'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';

const SessionTab = (props) => {
  const navigation = useNavigation();
  const { userData, sessionId, /*setSessionId,*/ exitSession, sessionInfo, activeUsers } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const userList = Object.values(activeUsers).sort((a, b) => a.index - b.index)
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.fullName}</Text>
        <Text>{item.status}</Text>
      </View>
    )
  };

  const leaveSession = () => {
    
    // setSessionId('');
    const userLocationRef = firebase.firestore().collection('sessionUsers').doc(sessionId);
  
    setTimeout(() => {
      userLocationRef.update({
        [userData.id]: firebase.firestore.FieldValue.delete(),
      })
    }, 15000);
  
    navigation.navigate('Get Started')
  }

  const ExitModal = () => {
    return (
      <SafeAreaView>
      <Modal
      animationType="none"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Confirm" onPress={leaveSession} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />  
          {/* End for all button will render if user is owner */}  
            {/* <Button title="End for All" /> */}
        </View>
      </Modal>
      </SafeAreaView>
    )
  }

  return (
    <View>
    <ExitModal />
      <View>
        <Text>Current Session</Text>
        <Text>{sessionInfo.name}</Text>
        <Text>{sessionInfo.code}</Text>
      </View>
      <View>
        <Text>Active Users:</Text>
        <View>
          <FlatList
          data={userList}
          renderItem={renderItem}
          keyExtractor={item => item.userId}
          />
        </View>
      </View>
      <View>
        <Button title="Invite"/>
        <Button title="Exit Session" onPress={() => setModalVisible(true)}/>
      </View>
    </View>
  )
}

export default SessionTab;
