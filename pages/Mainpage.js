import React, { useState, useEffect } from 'react';
import { Text, View, Alert, FlatList, TextInput, Linking, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import { Header, Input, Button, Card } from 'react-native-elements';
import { styles }  from '../styles/stylesMainpage';

export default function Mainpage({ navigation }) {

  const [tags, setTags] = useState('');
  const [activities, setActivities] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [note, setNote] = useState('Default lista');
  const [region, setRegion] = useState('');


//Haetaan lista aktiviteeteista ja tagseista
  useEffect(() => {
    defaultList()
  }, []);

//default haku
const defaultList = () => {
    fetch(`http://open-api.myhelsinki.fi/v1/activities/?language_filter=fi&limit=20`)
      .then(response => response.json())
      .then(data => {
        setActivities(data.data);
        setAllTags(data.tags);
      })
      .catch((error) => {
        Alert.alert('Something went wrong', error);
  })
}

//haetaan lista käyttäjän tägeillä, palautetaan default lista jos uusi lista on tyhjä
const getActivities = () => {
    fetch(`http://open-api.myhelsinki.fi/v1/activities/?tags_search=${tags}&language_filter=fi&limit=20`)
      .then(response => response.json())
      .then(data => {
        if (data.data.length > 0){
        setActivities(data.data);
        setAllTags(data.tags);
        setNote('Tässä hakemasi aktiviteetit');}

        else {
          defaultList();
          setNote('Haulla tuli tyhjä lista, tässä default lista.')
        }
      })
      .catch((error) => {
        Alert.alert('Something went wrong', error);
      })
  }

  //Haetaan aktiviteetin koordinaatit
const getCoordinates = () => {
    fetch(`http://open-api.myhelsinki.fi/v1/activities/${item.location}`)
      .then(response => response.json())
      .then((data) => {
        const lat = data.location.lat;
        const lng = data.location.lon;
        setRegion({
               latitude:lat,
               longitude: lng,
               latitudeDelta: 0.0322,
               longitudeDelta: 0.0221
       });
    })
  }

const listSeparator = () => {
        return (
            <View style={{
                height: 1,
                width: "90%",
                backgroundColor: "#CED0CE",
                marginLeft: "10%"
            }}
            />

        
        )}

  return (

    <View style={styles.mainContainer}>

      <View style={styles.container} >
        <Input
          style={styles.inputs}
          value={tags}
          placeholder="Write tags"
          onChangeText={(tags) => setTags(tags)} />
        <Button type="outline" title="Find activities" onPress={getActivities} />
      </View>

    <View style={styles.listcontainer}>
      <Text style={{textAlign: 'center', fontSize:15, padding: 5, fontWeight:'bold' }}>{note}</Text>
      <FlatList
      style={{marginLeft: "0%", height:150}}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
      <Card>
      <Card.Title>{item.name.fi}</Card.Title>
      <Card.Divider/>
        <Text style={{marginBottom: 10}}>
        Osoite: {item.location.address.street_address}</Text>
        <Text style={{marginBottom: 10}}>{item.where_when_duration.where_and_when}</Text>
        <Text style={{marginBottom: 10, color:'#130DDE'}}onPress={() => {Linking.openURL(item.info_url)}}>Klikkaa tästä tapahtuman nettisivuille</Text>
        <Card.Image style={{marginBottom: 10}}source={{uri: item.description.images[0].url}}/>
        </Card>
        
        
        
          )}
          onPress={getCoordinates}
      ItemSeparatorComponent={listSeparator} data={activities} />
    
    </View> 
{/*Karttanäkymä ja Markeri karttaan, palauttaa Kampin osoitteen*/}
      <View style={styles.mapcontainer} >
        <MapView
          style={styles.map}
          region={{
            latitude: 60.167389,
            longitude: 24.931080,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
          }}
          onRegionChange={setRegion}>

          <Marker
            coordinate={{
              latitude: 60.167389,
              longitude: 24.931080
            }}
            title='Kamppi' />
        </MapView>
      </View>
    </View>
  );
}
