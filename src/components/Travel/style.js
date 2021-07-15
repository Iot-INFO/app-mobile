import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
  },

  sectionBike: {
    height: '100%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  sectionInfo: {
    height: '100%',
    width: '60%',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },

  sectionInfoDate: {
    height: '70%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  itemSectionInfoDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionDetails: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textDetails: {
    color: '#3498db',
  }
});

export default styles;