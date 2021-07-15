import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../context';
import api from '../../utils/api';

import EmptyTravels from '../../assets/imagens/empty_travels.png';
import styles from './style';
import Travel from '../../components/Travel';

export default function Travels() {
  const { infoUser, travels, setTravels } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const user = infoUser.user[0];

  async function getTravels() {
    const { data } = await api.get(`/corrida/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${infoUser.token}`,
      }
    });

    let travels = data.corridas;
    setTravels(travels);
    setLoading(false);
  }

  useEffect(() => {
    getTravels();
  }, []);

  if (loading) {
    return (
      <View 
        style={
          { 
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: 'white' 
          }
        }
      >
        <ActivityIndicator size="large" color="#68B92C" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Feather
          name="arrow-left"
          color="black"
          size={25}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.appBarTitle}>Minhas viagens</Text>
      </View>
      { travels == [] || travels == null ? (
        <View style={styles.contentContainer}>
          <View style={styles.noTravelsContainer}>
            <Image source={EmptyTravels} />
            <Text style={styles.textNoTravels}>
              Você ainda não fez nenhuma viagem.
            </Text>
            <TouchableOpacity
              style={styles.buttonNewTravel}
              onPress={() => {
                navigation.navigate('Scanner');
              }}
            >
              <Text style={styles.textButton}>Realizar viagem</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={[styles.contentContainer, { width: '80%' }]}>
          <FlatList 
            data={travels}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            renderItem={({ item }) => <Travel travel={item} />}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>
      ) }
    </View>
  );
}
