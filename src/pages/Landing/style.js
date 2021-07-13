import react from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  
    
  },
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo:{
    width: 300,
    height: 70,
  },
  subtitle: {
    marginTop: 40,
    marginLeft: 30,
    marginRight: 50,
    fontWeight: "bold",
    fontSize: 35,
    color: "#1B3806"
  },
  impactWords:{
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 30,
    marginRight: 50,
    marginTop:40
  },
  buttonEnter: {
    marginTop: 70,
    backgroundColor: "#559625",
    width: 300,
    padding: 10,
    borderRadius: 8,
  },
  textButtonEnter: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 18,
  },
  buttonSignIn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#68B92C",
    width: 300,
    borderRadius: 8,
  },
  textSignIn: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default styles;
