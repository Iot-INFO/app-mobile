import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: 'white'
  },

  appBar: {
    height: (height * 10) / 100,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1
  },
  
  heading: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  body: {
    height: (height * 90) / 100,
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },

  heading2: {
    fontSize: 16,
  },
});

export default styles;