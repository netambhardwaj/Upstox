import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  boldFont: {
    fontWeight: 'bold',
    color: 'black',
  },
  fontColor: {
    color: 'black',
  },
  topBanner: {
    backgroundColor: 'purple',
    padding: 15,
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  summaryContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  imageStyle: {
    marginVertical: 10,
    width: 20,
    height: 20,
  },
  flatlist: {backgroundColor: '#c8c4cc'},
  stockHolding: {borderBottomWidth: 1, backgroundColor: 'white'},
  expandIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
