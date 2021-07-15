import React from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

export default function Travel(props) {
  let date = props.travel.hora_inicial.split(" ")[0];
  let hour_inicial = props.travel.hora_inicial.split(" ")[1];
  let hour_final = props.travel.hora_final.split(" ")[1];
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.sectionBike}>
        <MaterialIcons name="electric-bike" size={50} color="#000" />
      </View>

      <View style={styles.sectionInfo}>
        <View style={styles.sectionInfoDate}>
          <View style={styles.itemSectionInfoDate}>
            <Feather name="calendar" size={20} color="#000" />
            <Text style={{ marginLeft: 5 }}>{date}</Text>
          </View>
          <View style={{ height: '10%' }} />
          <View style={styles.itemSectionInfoDate}>
            <Feather name="clock" size={20} color="#000" />
            <Text style={{ marginLeft: 5 }}>
              {`${hour_inicial.split(":")[0]}:${hour_inicial.split(":")[1]} - ${hour_final.split(":")[0]}:${hour_final.split(":")[1]}`}
            </Text>
          </View>
        </View>
        
        <View style={styles.sectionDetails}>
          <TouchableOpacity 
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate('RouteTravel', {
                corrida: props.travel
              })
            }}
          >
            <Text style={styles.textDetails}>Ver Trajeto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}