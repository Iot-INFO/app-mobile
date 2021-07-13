import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  map: {
    height: height * (30 / 100),
    width: width * (80 / 100),
  },

  button: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    height: height * (30 / 100),
    width: width * (80 / 100),
    justifyContent: 'center',
    alignItems: 'center'
  },

  textButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default styles;