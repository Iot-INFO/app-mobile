import React from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Image, View, Text, TouchableOpacity } from 'react-native';

import bike from '../../assets/imagens/bike_payment.png';
import styles from './style';

export default function Travel(props) {
  let date = props.travel.hora_inicial.split(" ")[0];
  let hour = props.travel.hora_inicial.split(" ")[1];

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
            <Text style={{ marginLeft: 5 }}>{hour}</Text>
          </View>
        </View>
        
        <View style={styles.sectionDetails}>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.textDetails}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}