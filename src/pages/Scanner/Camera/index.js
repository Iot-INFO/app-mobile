import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View, Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Context } from '../../../context';
import * as Crypto from 'expo-crypto';
import api from '../../../utils/api';
import firebase from '../../../../firebase_config';

export default function Camera() {
  const { infoUser } = useContext(Context);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState(null);
  const navigation = useNavigation();

  async function getPermissions() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  useEffect(() => {
    getPermissions();
  }, []);

  function handleBarCodeScanned({ type, data }) {
    setScanned(true);
    setId(data);
  }

  async function checkStatusBike() {
    try {
      let block = '';
      let charge = '';
      let id_base = '';

      const user = infoUser.user[0];

      const response = await api.get(`/bike/${id}`, {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        }
      });

      id_base = response.data.bike.id_base;

      firebase.database().ref(id).on('value', (snapshot) => {
        block = snapshot.val().Bloqueado;
        charge = snapshot.val().Carga;

        if (user.cash < 1) {
          Alert.alert(
            'Ops...',
            'Você não possui saldo suficiente para efetuar o aluguel',
            [
              {
                text: 'OK',
                onPress: () => {
                  firebase.database().ref(id).off();
                  
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{ name: 'Home' }]
                    })
                  );
                }
              }
            ]
          );
        } else if (block == false) {
          Alert.alert(
            'Ops...',
            'A bicicleta atualmente está em uso',
            [
              {
                text: 'OK',
                onPress: () => {
                  firebase.database().ref(id).off();

                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{ name: 'Home' }]
                    })
                  );
                }
              }
            ]
          );
        } else if (charge < 12) {
          Alert.alert(
            'Ops...',
            'A bicicleta não pussui carga suficiente para realizar uma corrida',
            [
              {
                text: 'OK',
                onPress: () => {
                  firebase.database().ref(id).off();

                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{ name: 'Home' }]
                    })
                  );
                }
              }
            ]
          );
        } else {
          firebase.database().ref(id).off();

          navigation.navigate('Payment', {
            id: id,
            charge: charge,
            id_base: id_base
          });
        }
      });
    } catch (error) {
      Alert.alert('Ops...', 'Parece que houve um erro, tente novamente', [
        {
          text: 'OK',
        },
      ]);

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Home' }]
        })
      );
    }
  }

  if (hasPermission == false) {
    return Alert.alert(
      'Permissão',
      'Por favor, precisamos que habilite a utilização da câmera.',
      [
        {
          text: 'Cancelar',
          onPress: () => navigation.goBack(),
        },

        {
          text: 'OK',
          onPress: () => getPermissions(),
        },
      ]
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? checkStatusBike : handleBarCodeScanned}
        style={{ width: '100%', height: '100%', display: scanned ? 'none' : 'flex' }}
      />

      { scanned && (
        <ActivityIndicator size="large" color="#68B92C" />
      ) }
    </View>
  );
}
