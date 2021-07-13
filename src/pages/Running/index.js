import React, { useEffect, useState, useContext } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, { Geojson, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../../../firebase_config';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import MapViewDirections from 'react-native-maps-directions';
import { Context } from '../../context';
import api from '../../utils/api';
import { useAuth } from '../../states/auth';

import styles from './style';
import Bike from '../../assets/imagens/bike_payment.png';

const LOCATION_TASK_NAME = 'background-location-task';

export default function Running(props) {
  const { infoUser, setInfoUser, running, setRunning } = useContext(Context);
  const [isStopwatchStart, setIsStopwatchStart] = useState(true);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { height, width } = Dimensions.get('window');
  const navigation = useNavigation();
  const [actualLocation, setActualLocation] = useState({});
  const user = infoUser.user[0];
  const base_info = props.route.params.base_info;
  const id_bike = props.route.params.id_bike;

  let lastTime = null;

  useEffect(() => {
    setRunning(true);
  }, []);

  // async function getLocation() {
  //   // setRunning(true);

  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     return;
  //   } else {
  //     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
  //       accuracy: Location.Accuracy.Balanced,
  //       timeInterval: 1000,
  //       distanceInterval: 0,
  //       foregroundService: {
  //         notificationTitle: 'Olá',
  //         notificationBody: 'Você está sendo rastreado',
  //         notificationColor: '#eee'
  //       }
  //     })
  //   }
  // }

  async function finishRun() {
    setLoading(true);

    setRunning(false);
    console.log(`RUNNING: ${running}`)
    setIsStopwatchStart(false);
    let hoursTraveled = parseInt(lastTime[1]);
    let minutesTraveled = parseInt(lastTime.slice(3, 5));
    let travelCost = Math.ceil((hoursTraveled / 60 + minutesTraveled) / 30);
    console.log(`TRAVEL COST: ${travelCost}`);

    firebase.database().ref(id_bike).update({
      Bloqueado: true,
    })

    console.log(`USER: ${JSON.stringify(user)}`)

    await api.put(`/user/update_cash/${user.id}`, {
      cash: user.cash - travelCost,
    }, {
      headers: {
        Authorization: `Bearer ${infoUser.token}`,
      }
    });

    console.log('PASSOU NO UPDATE')

    const responseLogin = await api.post('/login', {
      email: user.email,
      senha: infoUser.password,
    });

    login(responseLogin.data.token, responseLogin.data.user, infoUser.password);

    console.log('PASSOU PELO LOGIN');

    Alert.alert(
      'Corrida concluída',
      `Você terminou a sua corrida com ${lastTime} e custou ${travelCost} créditos`,
      [
        {
          text: 'Finalizar',
          onPress: () => {
            setLoading(false);

            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: 'Home' }]
              })
            )
          }
        },
      ]
    );
  }

  // TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  //   if (error) {
  //     return;
  //   }
  
  //   if (data) {
  //     const { location } = data;
  //     setActualLocation(location[0].coords);
  //   }
  // })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Bike} style={styles.bikeImage} />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{ color: 'blue', fontSize: 17 }}>Navegar pelo app</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.viewMap,
          height < 600
            ? { height: height * (60 / 100) }
            : { height: height * (68 / 100) },
        ]}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          // onMapReady={() => {
          //   getLocation();
          // }}
          initialRegion={{
            latitude: base_info.latitude,
            longitude: base_info.longitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
          }}
          zoomEnabled={true}
          style={styles.map}
        >
          {/* terminar e testar "Traçando rota " */}
          <MapViewDirections 
            origin={
              { 
                latitude: base_info.latitude,
                longitude: base_info.longitude
              }
            } 
            destination={actualLocation} 
          />
          <Marker
            coordinate={{
              latitude: base_info.latitude,
              longitude: base_info.longitude,
            }}
            pinColor="#4B96F3"
          />
        </MapView>
      </View>

      <View
        style={[
          styles.footer,
          height < 600
            ? { height: height * (25 / 100) }
            : { height: height * (12 / 100) },
        ]}
      >
        <Stopwatch
          laps
          start={isStopwatchStart}
          getTime={(time) => {
            lastTime = time.slice(0, 8);
          }}
        />
        <TouchableOpacity
          style={styles.finishButton}
          onPress={() => finishRun()}
        >
          { loading ? (
            <ActivityIndicator 
              size="large"
              color="white"
            />
          ) : (
            <MaterialIcons
              name="check"
              size={25}
              style={{ color: '#396B15' }}
            />
          ) }
        </TouchableOpacity>
      </View>
    </View>
  );
}
