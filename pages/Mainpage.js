import React, { useState, useEffect } from 'react';
import { Text, View, Alert, FlatList, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Card } from 'react-native-elements';
import { styles } from '../styles/stylesMainpage';
import { SliderBox } from 'react-native-image-slider-box';


export default function Mainpage({ navigation }) {

  const [activities, setActivities] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [note, setNote] = useState('Tapahtumat');
  const [region, setRegion] = useState({});


  const getImages = (images) => images.map(image => image.url);

  //Get list of activities and tags
  useEffect(() => {
    defaultList()
  }, []);

  //Default list search 
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

  //Get coordinates of activity
  const getCoordinates = () => {
    fetch(`http://open-api.myhelsinki.fi/v1/activities/${item.location}`)
      .then(response => response.json())
      .then((data) => {
        const lat = data.location.lat;
        const lng = data.location.lon;
        setRegion({
          latitude: lat,
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
    )
  }

  return (

    <View style={styles.mainContainer}>

      <View style={styles.listcontainer}>
        <Text style={{ textAlign: 'center', fontSize: 15, padding: 5, fontWeight: 'bold' }}>{note}</Text>
        <FlatList
          style={{ marginLeft: "0%", height: 150 }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card>
              <Card.Title>{item.name.fi}</Card.Title>

              <Card.Divider />

              <Text style={{ marginBottom: 10 }}>
                Osoite: {item.location.address.street_address}
              </Text>

              <Text style={{ marginBottom: 10 }}>{item.where_when_duration.where_and_when}</Text>

              <Text style={{ marginBottom: 10, color: '#130DDE' }} onPress={() => { Linking.openURL(item.info_url) }}>Klikkaa tästä tapahtuman nettisivuille</Text>
              <SliderBox
                resizeMethod={'resize'}
                resizeMode={'cover'}
                parentWidth={310}
                paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
                images={getImages(item.description.images)} />
            </Card>)}
          onPress={getCoordinates}
          ItemSeparatorComponent={listSeparator} data={activities} />

      </View>
      {/*Mapview and Marker returns coordinates of Kamppi, Helsinki*/}
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
