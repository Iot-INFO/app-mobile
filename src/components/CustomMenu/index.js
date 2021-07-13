import React, { useEffect, useState, useContext } from 'react';
import { Dimensions, Image, TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Context } from '../../context';
import { useAuth } from '../../states/auth';

import logo from '../../assets/imagens/moobi-verde-logo.png';

import { styles } from './style';

export default function CustomMenu(props) {
  const { infoUser, running } = useContext(Context);
  const { logout } = useAuth();

  function Item(props) {
    return (
      <TouchableOpacity style={styles.buttonMenu} onPress={props.navigation}>
        <MaterialIcons
          name={props.iconName}
          size={24}
          style={{ marginRight: 15 }}
        />
        <Text style={styles.labelButton}>{props.routeName}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={logo} />
      </View>

      <View style={styles.infoPersonView}>
        <View style={styles.initialLetterNameView}>
          <Text style={styles.initialLetterNameText}>
            {infoUser != null
              ? infoUser.user[0].nome_completo[0].toUpperCase()
              : ''}
          </Text>
        </View>

        <View>
          <Text style={styles.usernameText}>
            {infoUser != null ? infoUser.user[0].nome_completo : ''}
          </Text>
          <Text style={styles.emailUserText}>
            {infoUser != null ? infoUser.user[0].email : ''}
          </Text>
        </View>
      </View>

      <View style={styles.listMenu}>
        {!running ? (
          <>
            <Item
              iconName="home"
              routeName="Home"
              navigation={() => {
                props.navigation.navigate('Home');
              }}
            />
            <Item
              iconName="electric-bike"
              routeName="Alugar"
              navigation={() => {
                props.navigation.navigate('Scanner');
              }}
            />

            <Item
              iconName="history"
              routeName="Histórico de Viagens"
              navigation={() => {
                props.navigation.navigate('Travels');
              }}
            />
          </>
        ) : (
          <>
            <Item
              iconName="history"
              routeName="Viagem atual"
              navigation={() => {
                props.navigation.navigate('Running');
              }}
            />
          </>
        )}

        <Item
          iconName="help-outline"
          routeName="Sobre o Aplicativo"
          navigation={() => {
            props.navigation.navigate('About');
          }}
        />

        <Item
          iconName="handyman"
          routeName="Relatar Problema"
          navigation={() => {
            props.navigation.navigate('Contact');
          }}
        />

        <TouchableOpacity style={styles.buttonMenu} onPress={() => logout()}>
          <MaterialIcons name="logout" size={24} style={{ marginRight: 15 }} />
          <Text style={styles.labelButton}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
