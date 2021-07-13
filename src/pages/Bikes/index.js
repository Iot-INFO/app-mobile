import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Context } from '../../context';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import api from '../../utils/api';

import BikeImage from '../../assets/imagens/bike.png';
import Empty from '../../assets/imagens/empty.png';
import styles from './style';

export default function Bikes({ route }) {
  const { id } = route.params;
  const { infoUser } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [bikes, setBikes] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function getBikes(id_base) {
      const { data } = await api.get(`/bike/base/${id_base}`, {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        },
      });

      setBikes(data.bikes);
      setLoading(false);
    }

    getBikes(id);
  }, []);

  function ItemBike(props) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Scanner')}
      >
        <View>
          <Text>{props.bikeName}</Text>
          <Text>{props.bikeDescription}</Text>
        </View>
        <Image source={BikeImage} />
      </TouchableOpacity>
    );
  }

  return loading ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" color="#68B92C" />
    </View>
  ) : bikes.length === 0 ? (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <View style={styles.viewEmptyBikes}>
        <Image source={Empty} style={styles.imageEmptyBikes} />
        <Text style={styles.textEmptyBikes}>Não há bikes disponíveis</Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={25} />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Bikes da Vaga #{id}</Text>
      </View>

      <View style={styles.viewCountBikes}>
        <Text style={styles.countBikesText}>
          Foram encontradas {bikes.length} bikes disponíveis.
        </Text>
      </View>

      {bikes.map((bike) => (
        <ItemBike
          key={bike.id}
          bikeName={`Bike #${bike.id}`}
          bikeDescription={bike.description}
        />
      ))}
    </View>
  );
}
