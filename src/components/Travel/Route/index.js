import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { Context } from '../../../context';
import api from '../../../utils/api';

import styles from './style';

export default function RouteTravel({ route }) {
  const { infoUser } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState([]);
  const [markers, setMarkers] = useState([]);

  async function getPoints() {
    setMarkers([]);

    setMarkers(
      [
        { 
          latitude: route.params.corrida.ponto_inicial_lat,
          longitude: route.params.corrida.ponto_inicial_long,
        }
      ]
    )

    setLoading(true);

    const { data } = await api.get(`point/corrida/${route.params.corrida.id}`, {
      headers: {
        Authorization: `Bearer ${infoUser.token}`,
      }
    });
    let response = data.points;
    setPoints(response);

    response.map((item) => {
      setMarkers((result) => [...result, {
        latitude: item.latitude,
        longitude: item.longitude,
      }]);
    });

    setMarkers((result) => [...result, {
      latitude: route.params.corrida.ponto_final_lat,
      longitude: route.params.corrida.ponto_final_long,
    }])

    setLoading(false);
  }

  useEffect(() => {
    getPoints();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={styles.heading2}>Carregando trajeto...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.heading}>TRAJETO</Text>
      </View>

      <MapView 
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: route.params.corrida.ponto_inicial_lat,
          longitude: route.params.corrida.ponto_inicial_long,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
        style={styles.body}
      >
        <Marker coordinate={markers[0]} />
          <Polyline
            coordinates={markers}
            strokeColor="#000"
            strokeColors={[
              '#7F0000',
              '#00000000',
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000'
            ]}
            strokeWidth={4}
          />
        <Marker coordinate={markers[markers.length - 1]} />
      </MapView>
    </View>
  )
}