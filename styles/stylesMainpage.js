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
    padding: 10,
    marginTop: 55
  },
  mapcontainer: {
    flex: 1,
    padding: 10,
  },
  listcontainer: {
    flex: 3,
    padding: 10,
    backgroundColor: '#f9f8f8'
  },

  buttoncontainer: {
    flex: 2,
    width: 150,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 20,
  },
  inputs: {
    width: 200,
    borderWidth: 0,
    borderColor: 'black',
    padding: 5,
    margin: 1,
},
  map: {
    flex: 1,
    height: "100%",
    width: "100%",
  }
});

export { styles }
