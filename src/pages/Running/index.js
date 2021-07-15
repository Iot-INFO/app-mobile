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
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../../../firebase_config';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { Context } from '../../context';
import api from '../../utils/api';
import { useAuth } from '../../states/auth';

import styles from './style';
import Bike from '../../assets/imagens/bike_payment.png';

const LOCATION_TASK_NAME = 'background-location-task';

export default function Running(props) {
  const { infoUser, setRunning } = useContext(Context);
  const [isStopwatchStart, setIsStopwatchStart] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const base_info = props.route.params.base_info;
  const { height } = Dimensions.get('window');
  const navigation = useNavigation();
  const user = infoUser.user[0];
  const id_bike = props.route.params.id_bike;
  const [actualLocation, setActualLocation] = useState({
    latitude: base_info.latitude,
    longitude: base_info.longitude,
  });
  const [markers, setMarkers] = useState([actualLocation]);
  const [idCorrida, setIdCorrida] = useState(null);

  let lastTime = null;

  async function startRace() {
    let d = new Date();

    let hora_inicial = `${d.getDate()}/${d.getUTCMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    let hora_final = '';
    let ponto_inicial_lat = base_info.latitude;
    let ponto_inicial_long = base_info.longitude;
    let ponto_final_lat = 0.00;
    let ponto_final_long = 0.00;
    let id_user = user.id;

    await api.post('/corrida', {
      hora_inicial: hora_inicial,
      hora_final: hora_final,
      ponto_inicial_lat: ponto_inicial_lat,
      ponto_inicial_long: ponto_inicial_long,
      ponto_final_lat: ponto_final_lat,
      ponto_final_long: ponto_final_long,
      id_bike: id_bike,
      id_user: id_user,
    }, {
      headers: {
        Authorization: `Bearer ${infoUser.token}`,
      }
    });

    const { data } = await api.get(`/corrida/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${infoUser.token}`,
      }
    })

    let travels = data.corridas;

    travels.map((item) => {
      if (item.hora_inicial == hora_inicial && item.hora_final == hora_final && item.ponto_inicial_lat == ponto_inicial_lat && item.ponto_inicial_long == ponto_inicial_long && item.ponto_final_lat == ponto_final_lat && item.ponto_final_long == ponto_final_long && item.id_bike == id_bike && item.id_user == id_user) {
        setIdCorrida(item.id)
      }
    });
  }

  useEffect(() => {
    startRace();
    setRunning(true);
  }, []);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    } else {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 2000,
        distanceInterval: 0,
      })
    }
  }

  async function finishRun() {
    setLoading(true);
    setRunning(false);
    
    let d = new Date();

    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);

    setIsStopwatchStart(false);
    let hoursTraveled = parseInt(lastTime[1]);
    let minutesTraveled = parseInt(lastTime.slice(3, 5));
    let travelCost = Math.ceil((hoursTraveled / 60 + minutesTraveled) / 30);

    firebase.database().ref(id_bike).update({
      Bloqueado: true,
    });

    await api.put(`/corrida/update/${idCorrida}`, {
      hora_final: `${d.getDate()}/${d.getUTCMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
      ponto_final_lat: markers[markers.length - 1].latitude,
      ponto_final_long: markers[markers.length - 1].longitude,
    }, {
      headers: {
        Authorization: `Bearer ${infoUser.token}`,
      }
    });

    markers.map(async (item) => {
      await api.post('/point', {
        latitude: item.latitude,
        longitude: item.longitude,
        id_corrida: idCorrida,
      }, {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        }
      })
    });

    await api.put(`/user/update_cash/${user.id}`, {
      cash: user.cash - travelCost,
    }, {
      headers: {
        Authorization: `Bearer ${infoUser.token}`,
      }
    });

    const responseLogin = await api.post('/login', {
      email: user.email,
      senha: infoUser.password,
    });

    login(responseLogin.data.token, responseLogin.data.user, infoUser.password);

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

  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      return;
    }
  
    if (data) {
      const { locations } = data;
      setMarkers((result) => [...result, locations[0].coords]);
      setActualLocation(locations[0].coords);
    }
  })

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
          onMapReady={() => {
            getLocation();
          }}
          initialRegion={{
            latitude: base_info.latitude,
            longitude: base_info.longitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
          }}
          zoomEnabled={true}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: actualLocation.latitude,
              longitude: actualLocation.longitude,
            }}
            pinColor="#4B96F3"
          />

          <Polyline 
            coordinates={markers}
            strokeColor="#000"
            strokeColors={[
              '#7F0000',
              '#00000000',
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000'
            ]}
            strokeWidth={4}
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
