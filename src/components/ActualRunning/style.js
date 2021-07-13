import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width * 95/100,
    alignSelf: 'center',
    top: 10,
    zIndex: 5,
    backgroundColor: 'rgba(104, 185, 44, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  titleButton: {
    color: 'white',
    fontSize: 17
  },

  labelActionButton: {
    color: '#F1F1F1',
    fontSize: 14
  }
});