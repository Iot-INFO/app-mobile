import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './style';

export default function ActualRunning() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate('Running')
      }}
      style={styles.container}
    >
      <Text style={styles.titleButton}>Corrida em andamento</Text>
      <Text style={styles.labelActionButton}>ABRIR</Text>
    </TouchableOpacity>
  )
}