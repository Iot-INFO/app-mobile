import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
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
  subtitle: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 70,
    fontWeight: "bold",
    fontSize: 28,
    color: "#1B3806",
    
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
  },

  form: {
    height: height * (70 / 100),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  inputView: {
    padding: 10,
    borderColor: "#A8A8A8",
    borderWidth: 2,
    borderRadius: 8,
    width: 300,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  input: {
    width: 250,
    padding: 10,
    height: "100%",
  },

  signUpView: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  buttonSignIn: {
    marginTop: 10,
    backgroundColor: "#68B92C",
    padding: 10,
    width: 300,
    borderRadius: 8,
  },
  textButton: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

  footer: {
    height: height * (5 / 100),
    alignItems: "center",
    justifyContent: "center",
  },

  textTologin: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonTextLink: {
    margin: 0,
  },
  textLink: {
    fontWeight: "bold",
  },

  error: {
    fontSize: 12,
    marginBottom: 10,
    paddingTop: 5,
    color: "red",
  },

  footer: {
    height: height * (10 / 100),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 300
  },

  labelFooter: {
    fontSize: 17,
    marginRight: 5,
  },

  labelButtonFooter: {
    color: "#1B3806",
    fontSize: 17,
    fontWeight: 'bold'
  }
});

export default styles;
