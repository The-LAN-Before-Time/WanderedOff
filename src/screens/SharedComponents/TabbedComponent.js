import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../SessionMgmt/styles';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ icon }) {
  return (
    <View style={styles.tabbedIcon}>
      <Ionicons name={icon} size={40} />
    </View>
  );
}
