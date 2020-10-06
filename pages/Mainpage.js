import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Flatlist } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function Mainpage( { navigation }) {

  const [tags, setTags] = useState('');
  const [activities, setActivities] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [osoite, setOsoite] = React.useState('');


//Haetaan lista aktiviteeteista ja tagseista

  useEffect(() => {
    getActivities()
  },[]);

  const getActivities = () => {
    fetch(`http://open-api.myhelsinki.fi/v1/activities/?tags_search=${tags}&language_filter=fi&limit=20`)
    .then(response => response.json())
    .then(data => {
      setActivities(data.data);
      setAllTags(data.tags);
    })
    .catch((error) => {
      Alert.alert('Something went wrong', error);
    })
  }

  //Hakee apista kartan
  const getOsoite = () => {
    fetch('http://www.mapquestapi.com/geocoding/v1/address?key=RGx0aXHHuyCCnCZA30GjP9laK2mzcHUp&location=')
    .then(response => response.json())
    .then(data => setOsoite(data.locations))
    .catch(err => console.error(err))
  }

  const listSeparator = () => {
    return (
      <View
      style={{
        height: 1,
        width: "90%",
        backgroundColor: "#CFD20CF"
      }}
      />
    );
  };

  return (

    <View style={styles.container}>

      <TextInput
      style={{fontSize: 18, width: 150}}
      value={tags}
      placeholder="Write tags"
      onChangeText={(tags) => setTags(tags)} />
      <Button title="Find activities" onPress={getActivities} />

      <Flatlist
      style={{marginLeft: "5%"}}
      keyExtractor={item => item.id}
      renderItem={({item}) => <Text>{item.name.fi}</Text>}
      ItemSeparatorComponent={listSeparator} data={activities} />

     <Text>This is mainpage</Text>
     <Button title="Activities" onPress={() => navigation.navigate('Activities')}/>

     //Karttanäkymä ja Markeri karttaan, palauttaa Kampin osoitteen
    <MapView
        style={styles.map}
        region={{
          latitude: 60.167389,
          longitude: 24.931080,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}>

      <Marker
        coordinate={{
          latitude: 60.167389,
          longitude: 24.931080 }}
          title='Kamppi' />
      </MapView>


     </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-end',
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
    map: {
      height: '25%',
      width: '90%',
      marginTop: '130%',
      marginLeft: '5%',
    }
    });
