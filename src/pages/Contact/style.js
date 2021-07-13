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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: (height * 5) / 100
  },

  contentHeader: {
    height: (height * 15) / 100,
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },

  heading1: {
    fontSize: 25,
    fontWeight: 'bold'
  },

  heading2: {
    fontSize: 18,
  },

  bodyContent: {
    height: (height * 50) / 100,
    width: width,
    alignItems: 'center',
  },

  headerSectionContacts: {
    justifyContent: 'flex-end', height: '40%'
  },

  sectionContacts: {
    flexDirection: 'row',
    height: '50%',
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonContact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#68B92C',
    width: 140,
    height: 55,
    borderRadius: 10,
  },

  labelButtonContact: {
    fontSize: 16,
    marginLeft: 7,
    color: '#f7f7f7',
    fontWeight: 'bold'
  }
})

export default styles;