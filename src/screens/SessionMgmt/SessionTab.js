import React, { useState } from 'react';
import { View, Button, Text, ScrollView, FlatList, Modal } from 'react-native';

const SessionTab = (props) => {
  const { exitSession, sessionInfo, activeUsers } = props;
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


  const ExitModal = () => {
    return (
      <Modal
      animationType="none"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
      >
        <View>
          <View>
            <Button title="Confirm" onPress={exitSession} />
          </View>
          <View>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
          {/* End for all button will render if user is owner */}
          <View>
            <Button title="End for All" />
          </View>
        </View>
      </Modal>
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
