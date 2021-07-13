import React from 'react';
import { Image, View, Text } from 'react-native';

import styles from './style';
import logo from '../../assets/imagens/moobi-verde-logo.png';

export default function About() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
      </View>

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.heading1}>Sobre o Aplicativo</Text>
        </View>

        <View style={styles.contentBody}>
          <Text style={styles.font}>
            <Text style={styles.heading2}>Moobi Verde™</Text> é um projeto cujo objetivo é o estímulo da utilização da bicicleta elétrica, de baixo custo, como meio alternativo e sustentável de locomoção.
          </Text>
        </View>
      </View>
    </View>
  )
}