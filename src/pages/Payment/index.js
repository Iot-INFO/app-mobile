import React, { useContext, useState } from 'react';
import { 
  ActivityIndicator,
  Dimensions, 
  Image, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity 
} from 'react-native';
import { Feather, FontAwesome5, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Context } from '../../context';
import api from '../../utils/api';
import firebase from '../../../firebase_config';

import styles from './style';
import Bike from '../../assets/imagens/bike_payment.png';

export default function Payment(props) {
  const { infoUser } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { height } = Dimensions.get('window');
  const id_bike = props.route.params.id;
  const id_base = props.route.params.id_base;

  async function startRun(){
    setLoading(true);

    let base_info = {};

    const response = await api.get(`/base/${id_base}`, {
      headers: {
        Authorization: `Bearer ${infoUser.token}`,
      }
    });

    base_info = response.data.base;

    firebase.database().ref(id_bike).update({
      Bloqueado: false
    });
    
    setLoading(false);

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Running', params: {
          id_bike: id_bike,
          base_info: base_info
        } }]
      })
    )
  }
 
  return (
    <ScrollView style={styles.container}>
      <View 
        style={
          [
            styles.header,
            height < 600
            ? { height: height * (25 / 100) }
            : { height: height * (20 / 100), justifyContent: 'flex-start' }
          ]
        }
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Estamos quase lá...</Text>
        <Text>Verifique todas as informações</Text>
      </View>

      <View 
        style={
          [
            styles.sectionBike,
            height < 600
            ? { height: height * (35 / 100) }
            : { height: height * (30 / 100), }
          ]
        }
      >
        <Text style={styles.titleSection}>Bicicleta</Text>
        <View style={styles.sectionDetailsBike}>
          <Image source={Bike} style={styles.image} />
          <View style={styles.sectionEnergyBike}>
            <SimpleLineIcons size={28} name="energy" color="#549c1f" />
            <Text style={{ fontSize: 18 }}>100%</Text>
          </View>
        </View>
      </View>

      <View 
        style={
          [
            styles.sectionRace,
            height < 600
            ? { height: height * (40 / 100) }
            : { height: height * (30 / 100) }
          ]
        }
      >
        <Text style={styles.titleSection}>Corrida</Text>
        
        <View style={styles.sectionRaceInstructions}>
          <FontAwesome5 name="coins" size={28} color="#f1c40f" />
          <Text style={styles.sectionRaceInstructionsTitle}>
            A cada 30 minutos de uso será descontado um crédito
          </Text>
        </View>
        <View style={styles.sectionRaceInstructions}>
          <MaterialIcons name="pin-drop" size={28} color="#171717" />
          <Text style={styles.sectionRaceInstructionsTitle}>
            Devolva a bicicleta na base mais próxima ao seu destino
          </Text>
        </View>
      </View>

      <View 
        style={
          [
            styles.sectionStartRace,
            height < 600
            ? { height: height * (15 / 100) }
            : { height: height * ( 21 / 100 ) }
          ]
        }
      >
        <TouchableOpacity 
          disabled={loading}
          onPress={() => startRun()}
          style={styles.buttonStartRace}
        >
          { loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={styles.textButtonStartRace}>
              Iniciar Corrida
            </Text>
          ) }
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}