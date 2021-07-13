import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: height,
    width: width,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },

  imageEmptyBikes: {
    height: height * (35 / 100),
    width: width * (80 / 100),
    marginBottom: 20,
  },

  viewEmptyBikes: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  textEmptyBikes: {
    fontSize: 16
  },

  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height * (15 / 100),
    width: width * (80 / 100),
    marginBottom: 20,
    // backgroundColor: 'red'
  },

  appBarTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  viewCountBikes: {
    marginBottom: 20,
    padding: 15,
  },

  countBikesText: {
    color: 'black',
    fontSize: 16
  },

  item: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 25,
    width: width * (80 / 100),
    marginBottom: 20,
  }
});

export default styles;