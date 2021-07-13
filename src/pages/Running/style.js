import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    backgroundColor: '#fff',
    width: width,
  },

  header: {
    height: height * (15 / 100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 1,
  },

  bikeImage: {
    height: height * (10 / 100),
    width: width * (30 / 100),
  },

  viewMap: {
    // height: height * (70 / 100),
  },

  map: {
    flex: 1,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  finishButton: {
    backgroundColor: '#C0CCA5',
    borderRadius: 100,
    borderColor: '#FCF1F1',
    borderWidth: 5,
    padding: 15,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  labelViewTimeAndDone: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },

  countdownTextViewTimeAndDone: {
    color: '#FFF',
  },
});

export default styles;
