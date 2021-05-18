import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Share,
  Animated,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
} from 'react-native';
import styles, { colorArray } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../shared/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';
import LoadingScreen from '../../../shared/LoadingScreen';
import { SwipeListView } from 'react-native-swipe-list-view';
import { firebase } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';

const SessionTab = (props) => {
  const userData = useContext(UserContext);
  const navigation = useNavigation();
  const sessionInfo = props.route.params.session;
  const {
    setActiveUsers,
    setSessionId,
    exitSession,
    activeUsers,
    leaveSession,
  } = props;

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

  // const renderItem = ({ item }) => {
  //   return (
  //     <ListItem bottomDivider>
  //       <Avatar
  //         rounded
  //         title={item.fullName
  //           .split(' ')
  //           .map((name) => name[0])
  //           .join('')}
  //         overlayContainerStyle={{
  //           backgroundColor: colorArray[item.index % colorArray.length],
  //         }}
  //       />
  //       <ListItem.Content>
  //         <ListItem.Title>{item.fullName}</ListItem.Title>
  //         <ListItem.Subtitle>{item.status}</ListItem.Subtitle>
  //       </ListItem.Content>
  //     </ListItem>
  //   );
  // };

  const closeRow = (rowMap, userId) => {
    if (rowMap[userId]) {
      rowMap[userId].closeRow();
    }
  };

  const deleteRow = (rowMap, userId) => {
    closeRow(rowMap, userId);

    if (activeUsers[userId] && activeUsers[userId].active) {
      const userLocationRef = firebase
        .firestore()
        .collection('sessionUsers')
        .doc(sessionInfo.id);
      //leaveSession();
      // setTimeout(() => {
      //   console.log('IN SWIPE DELETE');
      userLocationRef.update({
        [`${userId}.active`]: false,
      });
      //   console.log('USER LOCATION DELETED');
      // }, 15000);
    }
  };

  const VisibleItem = (props) => {
    const { data } = props;
    return (
      <TouchableHighlight style={swipeStyles.rowFrontVisible}>
        <View style={swipeStyles.statusRowContainer}>
          <Avatar
            rounded
            title={data.item.fullName
              .split(' ')
              .map((name) => name[0])
              .join('')}
            overlayContainerStyle={{
              backgroundColor: colorArray[data.item.index % colorArray.length],
            }}
          />
          <View style={swipeStyles.statusTextContainer}>
            <Text numberOfLines={1}>{data.item.fullName}</Text>
            <Text numberOfLines={1}>{data.item.status}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderItem = (data, rowMap) => {
    return <VisibleItem data={data} />;
  };

  const HiddenItemWithActions = (props) => {
    const { swipeAnimatedValue, onClose, onDelete } = props;

    return (
      <View style={swipeStyles.rowBack}>
        <TouchableOpacity
          style={[swipeStyles.backRightBtn, swipeStyles.backRightBtnLeft]}
          onPress={onClose}
        >
          <View style={swipeStyles.trash}>
            <AntDesign name='closecircleo' size={24} color='white' />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[swipeStyles.backRightBtn, swipeStyles.backRightBtnRight]}
          onPress={onDelete}
        >
          <Animated.View
            style={[
              swipeStyles.trash,
              {
                transform: [
                  {
                    scale: swipeAnimatedValue.interpolate({
                      inputRange: [-90, -45],
                      outputRange: [1, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          >
            <AntDesign name='deleteuser' size={24} color='white' />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    if (userData.id !== data.item.userId && sessionInfo.owner === userData.id) {
      return (
        <HiddenItemWithActions
          data={data}
          rowMap={rowMap}
          onClose={() => closeRow(rowMap, data.item.userId)}
          onDelete={() => deleteRow(rowMap, data.item.userId)}
        />
      );
    }
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
            {sessionInfo.owner === userData.id && (
              <Ionicons
                name='settings-outline'
                size={30}
                style={styles.cog}
                onPress={() => navigation.navigate('Session Options')}
              />
            )}
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.text}>Name: {sessionInfo.name}</Text>
            <Text style={styles.text}>Code: {sessionInfo.code}</Text>
          </View>
        </View>

        {/* <Text style={styles.label_underline}>Active Users:</Text> */}
        <View style={styles.flatlist}>
          {/* <FlatList
            data={userList}
            renderItem={renderItem}
            keyExtractor={(item) => item.userId}
          /> */}
          <SwipeListView
            data={userList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            disableRightSwipe
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

const swipeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
    display: 'flex',
  },
  statusRowContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTextContainer: {
    display: 'flex',
    marginLeft: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#0061b2',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#d9202b',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});
