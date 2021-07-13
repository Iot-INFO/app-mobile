import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff'
  },

  appBar: {
    height: height * (15 / 100),
    width: width,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },

  appBarTitle: {
    width: '85%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  contentContainer:{
    height: height * (85 / 100),
  },

  buttonNewTravel:{
    width: 300,
    backgroundColor: '#68B92C',
    padding: 10,
    borderRadius: 8
  },

  textButton:{
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 18,
  },

  noTravelsContainer:{
    flex:1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textNoTravels:{
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 30
  }
})

export default styles;