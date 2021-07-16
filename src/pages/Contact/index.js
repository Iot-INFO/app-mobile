import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Logo from '../../assets/imagens/moobi-verde-logo.png';
import styles from './style';

export default function Contact() {
  const messageEmail = () => {
    Linking.openURL('mailto:moobiverde@gmail.com?subject=Relatar um problema no aplicativo');
  }

  const messageWhatsapp = () => {
    Linking.openURL(`whatsapp://send?text=Quero relatar um problema no aplicativo.&phone=558296625158`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} />
      </View>

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={[styles.heading1, { marginBottom: 10 }]}>Suporte técnico</Text>
          <Text style={styles.heading2}>Deyvid Chaves</Text>
        </View>

        <View style={styles.bodyContent}>
          <View style={styles.headerSectionContacts}>
            <Text style={styles.heading2}>Entrar em contato</Text>
          </View>

          <View style={styles.sectionContacts}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={messageEmail}
              style={[styles.buttonContact, { marginRight: '5%' }]}
            >
              <MaterialCommunityIcons name="email" size={24} color="#edf4f2" />
              <Text style={styles.labelButtonContact}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={messageWhatsapp}
              style={styles.buttonContact}
            >
              <MaterialCommunityIcons name="whatsapp" size={24} color="#edf4f2" />
              <Text style={styles.labelButtonContact}>Whatsapp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}