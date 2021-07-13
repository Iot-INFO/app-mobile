import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    backgroundColor: '#fff',
    paddingHorizontal: 15
  },
  
  header: {
    height: height * (25 / 100),
    justifyContent: 'center',
  },

  titleHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 19,
    fontWeight: '300'
  },

  sectionBike: {
    height: height * (30 / 100),
    justifyContent: 'center',
  },

  titleSection: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: height * (3 / 100)
  },

  image: {
    height: height * (20 / 100),
    width: width * (60 / 100)
  },

  sectionDetailsBike: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  sectionEnergyBike: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionRace: {
    height: height * (30 / 100),
    justifyContent: 'center',
  },

  sectionRaceInstructions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },

  sectionRaceInstructionsTitle: {
    fontSize: 19,
    marginLeft: 8
  },

  sectionStartRace: {
    height: height * (15 / 100),
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonStartRace: {
    width: width * (60 / 100),
    backgroundColor: '#2f5910',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10
  },

  textButtonStartRace: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  }
});

export default styles;