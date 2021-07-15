import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import imageScan from '../../assets/imagens/scan-smartphone.png';

export default function Scanner() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.orientations}>
        <Image source={imageScan} style={{ height: 250, width: 200, marginBottom: 20 }} />

        <Text style={styles.labelOrientations}>
          Para prosseguir, leia o QR Code da bike.
        </Text>
      </View>

      <View style={styles.action}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Camera')
          }}
        >
          <Text style={styles.textButton}>Ler QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
