import { StyleSheet } from 'react-native';
/**
Pohja tyylitiedostolle, kaikki tyylit tänne (eli katsotaan läpi tiedostot)
Miten toimii tämän tiedoston kutsuminen sivuilla?
Refaktrointi tälle, voidaan vaihtaa js, en tiedä miksei.
*/
const styles =  StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 5,
    // marginTop: 10
  },
  mapcontainer: {
    flex: 1,
    padding: 10,
  },
  listcontainer: {
    flex: 4,
    padding: 10,
    backgroundColor: '#f9f8f8'
  },
  map: {
    flex: 1,
    height: "100%",
    width: "100%",
  }
});

export { styles }
