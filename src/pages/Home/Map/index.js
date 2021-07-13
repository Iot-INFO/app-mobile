import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import style from './style';

export default function Map(props) {
  const actualLocation = props.actualLocation;
  const navigation = useNavigation();

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: actualLocation.latitude,
          longitude: actualLocation.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
        style={style.map}
      />

      <TouchableOpacity
        style={style.button}
        onPress={() =>
          navigation.navigate('Bases', {
            location: actualLocation,
          })
        }
      >
        <Text style={style.textButton}>Toque para ampliar</Text>
      </TouchableOpacity>
    </View>
  );
}
