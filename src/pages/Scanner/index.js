import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Camera, { qrCodeData, qrCodeType } from './Camera/index';

import { Context } from '../../context';
import firebase from '../../../firebase_config';

import styles from './style';

export default function Scanner() {
  const navigation = useNavigation();
  const [buttonActive, setButtonActive] = useState(false);
  const { infoUser } = useContext(Context);
  const id = 1; //Id da bike (teste)

  //Falta buscar ids das bikes no firebase para comparação

  function checkPayment() {

      firebase
        .database()
        .ref('Bicicleta')
        .on('value', (snapshot) => {
          console.log('ENTROU NO FIREBASE!!!');
          console.log(snapshot);
          // console.log(snapshot.val().Bloqueado);
        });

    
  }

  function checkQrCode() {
    if (qrCodeData === id) {
      checkPayment();
    } else {
      Alert.alert('Ops...', 'Verifique o QR Code novamente', [
        {
          text: 'OK',
        },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.orientations}>
        {/* colocar uma ilustração */}

        <Text style={styles.labelOrientations}>
          Para prosseguir, leia o QR Code da bike.
        </Text>
      </View>

      <View style={styles.action}>
        <TouchableOpacity
          style={styles.button}
          disabled={buttonActive}
          onPress={() => {
            checkPayment();
            navigation.navigate('Camera')
          }}
        >
          <Text style={styles.textButton}>Ler QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
