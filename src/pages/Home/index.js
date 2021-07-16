import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import { Context } from '../../context';
import api from '../../utils/api';

import style from './style';
import ImageHome from '../../assets/imagens/image_home.png';
import Map from './Map';
import ActualRunning from '../../components/ActualRunning';

export default function Home() {
  const { infoUser, running } = useContext(Context);
  const navigation = useNavigation();
  const [localidades, setLocalidades] = useState([]);
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  
  useFocusEffect(
    useCallback(() => {
      const getLocalidades = async () => {
        setLoading(true);
        const response = await api.get('/localidade', {
          headers: {
            Authorization: `Bearer ${infoUser.token}`,
          },
        });

        setLocalidades(response.data.localidades);
        let location = response.data.localidades[0];
        setLocation(location);
        setLoading(false);
      }

      getLocalidades();

      return () => localidades;
    }, []),
  );

  if (loading) {
    return (
      <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Carregando localidades...</Text>
        </View>
     </>
    )
  }

  return (
    <>
      { running == true && (
        <ActualRunning />
      )}

      <View style={style.container}>
        <View style={style.header}>
          <ImageBackground source={ImageHome} style={style.imageBackgroundHeader}>
            <View style={style.contentHeader}>
              <View style={style.row}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <MaterialIcons name="menu" color="#FFF" size={24} />
                </TouchableOpacity>

                <View style={style.row}>
                  <FontAwesome5 name="coins" color="#f1c40f" size={24} />
                  <Text style={[style.headerText, { paddingLeft: 10 }]}>
                    {infoUser.user[0].cash}
                  </Text>
                </View>
              </View>

              <View>
                <Text style={style.headerText}>
                  Olá,{' '}
                  <Text style={style.userName}>
                    {infoUser.user[0].nome_completo.split(' ')[0]}
                  </Text>
                </Text>
                <Text style={style.headerText}>Bem vindo novamente!</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <ScrollView style={style.body}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={style.titleView}>Localidades Atendidas</Text>
            
            <Picker
              selectedValue={location}
              onValueChange={(itemValue) => setLocation(itemValue)}
            >
              {localidades.map((localidade) => (
                <Picker.Item 
                  key={localidade.id}
                  label={localidade.name}
                  value={localidade}
                  color="#68B92C"
                />
              ))}
            </Picker>
        </View>

        <View>
          <Text style={style.titleView}>Bases na Localidade</Text>

          <Map actualLocation={location} />
        </View>
      </ScrollView>
    </View>
    </>
  )
}
