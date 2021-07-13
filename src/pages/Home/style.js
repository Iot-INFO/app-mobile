import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
//não está ocupando toda a altura da tela, verificar depois

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  header: {
    height: height * (30 / 100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  imageBackgroundHeader: {
    flex: 1,
    width: width,
  },

  contentHeader: {
    width: width,
    height: height * (30 / 100),
    padding: 25,
    justifyContent: 'space-between',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  titleView: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  userName: {
    color: '#000000',
  },
  body: {
    paddingVertical: '4%',
  },
});

export default styles;
