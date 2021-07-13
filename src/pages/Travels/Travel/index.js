import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
 


import styles from './style';




export default function Travel(props){
    return(
        <View style={styles.container}>
           <View style={styles.routeInformationsContainer}>
               <Text style={styles.text}>De: <Text style={styles.textDataTravel}>{props.baseFrom}</Text></Text>
               <Text style={styles.text}>Para: <Text style={styles.textDataTravel}>{props.baseTo}</Text></Text>
           </View>

           <View style={styles.details}>
               <Text style={styles.text}>Duração: <Text style={styles.textDataTravel}>{props.duration}</Text></Text>
               <Text style={styles.text}>Custo: <Text style={styles.textDataTravel}>{props.coust}</Text></Text>
           </View>
           <Text style={styles.textHour}>{props.travelDate}</Text>
        </View>
         
    );

}