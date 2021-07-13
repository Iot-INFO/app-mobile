import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    backgroundColor: '#fff',
    padding: 15
  },
 

  orientations: {
    height: height * (70 / 100),
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 10,
    height: 200,
    width: 220
  },

  labelOrientations: {
    fontSize: 20,
    textAlign: 'center',
  },

  action: {
    height: height * (30 / 100),
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    backgroundColor: '#68B92C',
    height: 60,
    width: 270,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }
});

export default styles;