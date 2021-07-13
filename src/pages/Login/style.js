import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
    marginTop: 50,
    marginLeft: 30,
    marginRight: 70,
    marginBottom: 70,
    fontWeight: "bold",
    fontSize: 28,
    color: "#1B3806",
    
  },
  inputLogin: {
		paddingHorizontal: 15,
		paddingVertical: 10,
    borderColor: "#A8A8A8",
    borderWidth: 2,
    borderRadius: 8,
    width: 300,
    marginVertical: 5,
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
  buttonEnter: {
    marginTop: 20,
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
  textToSignIn: {
    marginTop: 10,
  },
  textLinkSignIn: {
    fontWeight: "bold",
	},

	textInputError: {
		color: 'red',
		marginVertical: 1,
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
