import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { Context } from '../../../context';
import api from '../../../utils/api';

import styles from './style';

export default function DetailsBase({ route }) {
  const { vaga, localidade } = route.params;
  const { infoUser } = useContext(Context);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  async function getBikes() {
    setLoading(true);

    const { data } = await api.get(`/bike/base/${vaga.id}`, {
      headers: {
        Authorization: `Bearer ${infoUser.token}`,
      }
    });

    setCount(data.bikes.length);
    setLoading(false);
  }

  useEffect(() => {
    getBikes();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando informações...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.heading}>{vaga.description}</Text>
      </View>

      <View style={styles.sectionInfo}>
        <View style={styles.itemSectionInfo}>
          <Entypo name="location" color="#000" size={24} />
          <Text style={styles.fontBody}>{localidade.name}</Text>
        </View>
        <View style={styles.itemSectionInfo}>
          <MaterialIcons name="electric-bike" color="#000" size={24} />
          <Text style={styles.fontBody}>{`Bikes: ${count}`}</Text>
        </View>
      </View>

      <MapView 
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: vaga.latitude,
          longitude: vaga.longitude,
          latitudeDelta: 0.000922,
          longitudeDelta: 0.000421
        }}
        style={styles.map}
      >
        <Marker 
          coordinate={{
            latitude: vaga.latitude,
            longitude: vaga.longitude
          }}
        />
      </MapView>
    </View>
  )
}