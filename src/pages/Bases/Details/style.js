import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },

  appBar: {
    height: (height * 15) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  sectionInfo: {
    height: (height * 10) / 100,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  itemSectionInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  fontBody: {
    fontSize: 16,
    marginLeft: 5
  },

  map: {
    height: (height * 75) / 100,
    width: width
  }
});

export default styles;