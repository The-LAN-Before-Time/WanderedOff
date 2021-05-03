import React, { useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Share } from 'react-native';
import styles, { colorArray } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../shared/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';
import LoadingScreen from '../../../shared/LoadingScreen';

const SessionTab = (props) => {
  const userData = useContext(UserContext);
  const navigation = useNavigation();
  const sessionInfo = props.route.params.session;
  const { setActiveUsers, setSessionId, exitSession, activeUsers } = props;
  const userList = Object.values(activeUsers).sort((a, b) => a.index - b.index);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Join my Wandered Off session by searching for code: ${sessionInfo.code}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderItem = ({ item }) => {
    
    const renderName = () => {
      let output = '';
      let uniqueSpaceCount = 0;
      let prevChar = false;
      let i = 0;
      while (i < item.fullName.length) {
        if (item.fullName[i] != ' ' && !prevChar) {
          if (uniqueSpaceCount >= 2) return output + '..'
          output += item.fullName[i];
          prevChar = true;
          i++;
        } else if (item.fullName[i] == ' ') {
          prevChar = false;
          uniqueSpaceCount++;
          while (item.fullName[i] == ' ') {
            i++;
          }
        } else i++;
      }
      return output;
    };

    return (
      // <View style={styles.userContainer}>
      //   <Text style={styles.userName}>
      //     <View>
      //       {item.status === 'active' ? (
      //         <View style={styles.circleGreen} />
      //       ) : (
      //         <View style={styles.circleRed} />
      //       )}
      //     </View>
      //     {item.fullName}
      //   </Text>
      // </View>
      <ListItem bottomDivider>
        <Avatar
          rounded
          title={renderName()}
          overlayContainerStyle={{
            backgroundColor: colorArray[item.index % colorArray.length],
          }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.fullName}</ListItem.Title>
          <ListItem.Subtitle>{item.status}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  if (!userList.length) {
    return <LoadingScreen name='Session Management' />;
  }

  return (
    <View style={styles.containerFull}>
      <View>
        <View>
          <View style={styles.horizontalContainer}>
            <Text style={styles.heading}>Current Session</Text>
            <Ionicons
              name='settings-outline'
              size={30}
              style={styles.cog}
              onPress={() => navigation.navigate('Session Options')}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.text}>Name: {sessionInfo.name}</Text>
            <Text style={styles.text}>Code: {sessionInfo.code}</Text>
          </View>
        </View>

        {/* <Text style={styles.label_underline}>Active Users:</Text> */}
        <View style={styles.flatlist}>
          <FlatList
            data={userList}
            renderItem={renderItem}
            keyExtractor={(item) => item.userId}
          />
        </View>
      </View>
      <View style={styles.containerBottomButtons}>
        <View>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Update Status')}
          >
            <Text style={styles.buttonText}>Update Status</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={onShare}>
            <Text style={styles.buttonText}>Invite</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonDanger}
            onPress={() => navigation.navigate('Confirm Leave Session')}
          >
            <Text style={styles.buttonText}>Exit Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SessionTab;
