import React, { useState, useContext } from 'react';
import {View, Button, Text, ScrollView, FlatList, Modal, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../screens/SessionMgmt/styles';
import formStyles from '../../styles/formStyles'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import { UserContext } from '../../../shared/UserContext';

const SessionTab = (props) => {
  const userData = useContext(UserContext);
  const navigation = useNavigation();
  const sessionInfo = props.route.params.session;
  const { setActiveUsers, setSessionId, exitSession, activeUsers } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const userList = Object.values(activeUsers).sort((a, b) => a.index - b.index);



  // const leaveSession = () => {

  //   setSessionId('');
  //   setActiveUsers({
  //     list: {},
  //     loaded: false,
  //     center: {},
  //   });
  //   console.log('ATTEMPTING TO REMOVE ID')
  //   const userLocationRef = firebase.firestore().collection('sessionUsers').doc(sessionInfo.id);
  //   console.log('CREATED REFERENCE', sessionInfo.id)

  //   setTimeout(() => {
  //     console.log('IN TIMEOUT')
  //     userLocationRef.update({
  //       [userData.id]: firebase.firestore.FieldValue.delete(),
  //     })
  //     console.log('USER LOCATION DELETED')
  //   }, 15000);

  //   console.log('ABOUT TO NAVIGATE')
  //   navigation.navigate('Get Started')
  // }

  // const ExitModal = () => {
  //   return (
  //     <SafeAreaView>
  //     <Modal
  //     animationType="none"
  //     visible={modalVisible}
  //     onRequestClose={() => {
  //       setModalVisible(!modalVisible)
  //     }}
  //     >
  //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //           <Button title="Confirm" onPress={leaveSession} />
  //           <Button title="Cancel" onPress={() => setModalVisible(false)} />
  //         {/* End for all button will render if user is owner */}
  //           {/* <Button title="End for All" /> */}
  //       </View>
  //     </Modal>
  //     </SafeAreaView>
  //   )
  // }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.userContainer}>
                <Text style={styles.userName}>
                    <View>
                        {(item.status === 'active')?
                            <View style={styles.circleGreen} /> :
                            <View style={styles.circleRed} />}
                    </View>
                    {item.fullName}
                </Text>

            </View>
        );
    };

  return (
    <View>
      <View >
        <Text style={formStyles.label}>Current Session:</Text>
          <View style={styles.paddingLeft}>
            <Text style={styles.text}>Name: {sessionInfo.name}</Text>
            <Text style={styles.text}>Code: {sessionInfo.code}</Text>
          </View>
      </View>
      <View >
        <Text style={styles.label_underline}>Active Users:</Text>
        <View>
          <FlatList
            style={styles.text}
            data={userList}
            renderItem={renderItem}
            keyExtractor={(item) => item.userId}
          />
        </View>
      </View>
      <View>
          <TouchableOpacity
              style={formStyles.button}
              onPress={()=>{}}>
              <Text style={formStyles.buttonText}>Invite</Text>
          </TouchableOpacity>
      </View>
      <View>
          <TouchableOpacity
              style={formStyles.buttonDanger}
              onPress={() => navigation.navigate('Confirm Leave Session')}>
              <Text style={formStyles.buttonText}>Exit Session</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default SessionTab;
