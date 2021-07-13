import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
  LocationAccuracy,
} from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../context';
import api from '../../utils/api';

import MarkerMap from '../../components/MarkerMap';

import styles from './style';

export default function Bases({ route }) {
  const navigation = useNavigation();
  const { bases, setBases, infoUser } = useContext(Context);
  const [currentRegion, setCurrentRegion] = useState(null);

  const { location } = route.params;
  // console.log('ACTUAL LOCATION', route.params);

  useEffect(() => {
    async function initialPositionMap() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          accuracy: LocationAccuracy.High,
        });

        setCurrentRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        });
      }
    }

    async function getBases() {
      const { data } = await api.get(`/base/localidade/${location.id}`, {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        },
      });

      setBases(data.bases);
    }

    initialPositionMap();

    getBases();
  }, []);

  async function getPosition() {
    const { coords } = await getCurrentPositionAsync({
      accuracy: LocationAccuracy.High,
    });

    setCurrentRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    });
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      {currentRegion && (
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={currentRegion}
          loadingEnabled={true}
          style={styles.container}
        >
          {bases.map((base) => (
            <Marker
              key={base.id}
              coordinate={{
                latitude: base.latitude,
                longitude: base.longitude,
              }}
            >
              <MarkerMap iconName="pin-drop" />

              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.vagaName}>{base.description}</Text>
                  <Text>Bikes disponíveis: </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <View style={styles.viewOpenDrawer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.button}
        >
          <MaterialIcons name="menu" color="#000" size={25} />
        </TouchableOpacity>
      </View>
    </>
  );
}
