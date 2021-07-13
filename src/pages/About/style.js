import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: 'white'
  },

  header: {
    height: (height * 30) / 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  content: {
    height: (height * 70) / 100,
    width: width,
    alignItems: 'center'
  },

  heading1: {
    fontSize: 25,
    fontWeight: 'bold'
  },

  heading2: {
    fontSize: 20,
    fontWeight: '700'
  },

  font: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 25
  },

  contentHeader: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentBody: {
    height: '75%',
    width: (width * 80) / 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: '10%'
  },
});

export default styles;