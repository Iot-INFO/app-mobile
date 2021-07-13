import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./style";

export default function MarkerMap(props) {
  return (
    <View style={styles.container}>
      <MaterialIcons name={props.iconName} color="#fff" size={24} />
    </View>
  );
}
