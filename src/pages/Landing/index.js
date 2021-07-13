import React, { useEffect } from "react";
import {
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MoobiLogo from '../../assets/imagens/other-version-logo.png';
import Background from "../../assets/imagens/background-initial.png";
import styles from "./style";

export default function Landing() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={Background} style={styles.backgroundImage}> 
        <Image source={MoobiLogo} style={styles.logo}/>
        <Text style={styles.subtitle}>
          Mobilidade Urbana sustentável e viável
        </Text>

        <Text style={styles.impactWords}>Andar de bike vai além do esporte, é sustentabilidade!</Text>
        <TouchableOpacity
          style={styles.buttonEnter}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.textButtonEnter}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSignIn}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.textSignIn}>Cadastrar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
