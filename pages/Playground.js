import React, { useState, useEffect } from 'react';
import { Text, View, Alert, FlatList, TextInput, Linking, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import { Header, Input, Button, Card } from 'react-native-elements';
import { styles }  from '../styles/stylesMainpage';

// npm install --save react-native-image-slider import ImageSlider from 'react-native-image-slider';
//npm install i react-native-image-box
import {SliderBox} from 'react-native-image-slider-box';

export default function Fiddlin({ navigation }) {
    const [activities, setActivities] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [note, setNote] = useState('Tapahtumat');
    const [region, setRegion] = useState({});

  /*   const getImages = (images) => {
        //Noukitaan urlit imageihin
        let imageArray;
        for (let i = 0; i < images.length; i++){
           imageArray = imageArray.push(images[i].url)
        }
        return imageArray
    } */
    const getImages = (images) => images.map(image => image.url);
  /**
   * <ImageSlider images={['http://image.com','http://image.com','http://image.com',]}
   */
  const testImages = [
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
    'https://placeimg.com/640/640/animals',
    'https://placeimg.com/640/640/beer',
  ];
  
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
                      
        <View style={styles.listcontainer}>
        <Text style={{textAlign: 'center', fontSize:15, padding: 5, fontWeight:'bold' }}>{note}</Text>
        <FlatList
        style={{marginLeft: "0%", height:150}}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
        <Card>
        <Card.Title>{item.name.fi}</Card.Title>
        <Card.Divider/>
          <Text style={{marginBottom: 10}} onPress={getCoordinates}>Osoite: {item.location.address.street_address}</Text>
          <Text style={{marginBottom: 10}}>{item.where_when_duration.where_and_when}</Text>
          <Text style={{marginBottom: 10, color:'#130DDE'}}onPress={() => {Linking.openURL(item.info_url)}}>Klikkaa tästä tapahtuman nettisivuille</Text>
            <SliderBox
            resizeMethod={'resize'}
            resizeMode={'cover'}
            parentWidth={310}
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            images={getImages(item.description.images)}/>
          </Card>
            )}
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
  
/*         {/**testi elementti alapuoella }
                <Text>{fetchString}</Text>
                <View style={styles.row}>
                    <Button title="Haku" onPress={dataFetch} />
                </View>
                {/**lista johon tulee checkatut tägit }
                <Text style={styles.basicTexts}>Chosen Tags</Text>
                <FlatList data={selectedTags}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={listSeparator}
                    renderItem={({ item }) => <Text>{item}</Text>} />
            </View>
            <View style={styles.smallcontainer}>
                <FlatList
                    data={activities}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Text>{item.name.fi}</Text>}
                    ItemSeparatorComponent={listSeparator} style={{ marginLeft: "5%" }} />
            </View>

            <View style={styles.smallcontainer}>
                {/**lista josta voi checkata tägejä }
                <Button title='GetActsWithTags' onPress={getActsWithTags} />
                <FlatList data={array}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={listSeparator}
                    renderItem={renderItem} /> */