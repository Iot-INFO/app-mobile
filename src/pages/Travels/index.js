import React from 'react';
import { Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import EmptyTravels from '../../assets/imagens/empty_travels.png';

import Travel from './Travel';

import styles from './style';

export default function Travels() {
  const navigation = useNavigation();

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

        <View>
          {/*
            
              Fazer verificação se existe ou não histórico de viagens no back end

              - Aguardando implementação no back

            <FlatList 
              data={}
              renderItem={(item) => (
              )}
            />
            <Travel
              baseFrom="Base Ufal 1"
              baseTo="Base Ufal 2"
              duration="5 min"
              coust="0.5 créditos"
              travelDate="22/06/2021"
            />
        
            */}
        </View>
      </View>
    </View>
  );
}
