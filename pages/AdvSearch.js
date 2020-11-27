import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, RecyclerViewBackedScrollViewComponent } from 'react-native';
//expo install @react-native-community/checkbox
import CheckBox from '@react-native-community/checkbox';
import { styles } from '../styles/stylesPlayground';
import { Card } from 'react-native-elements';

export default function Fiddlin({ navigation }) {
    // valittujen itemien tägit
    const [currentTags, setCurrentTags] = useState([]);
    // lista kaikille tageille
    const [allTags, setAllTags] = useState([]);
    const [activities, setActivities] = useState([]);
    //Lista valituista tägeistä
    const [selectedTags, setSelectedTags] = useState([]);
    //String state jonka voi laittaa urlin sisään
    const [fetchString, setFetchString] = useState('');
    //const [defaultFetch, setDefaultFetch] = useState(true);

    //Haetaan lista aktiviteeteista ja tagseista
    let array = Object.values(allTags);

    //haku joka muokkaantuu käytön mukaan
    const dataFetch = () => {
        let url = `http://open-api.myhelsinki.fi/v1/activities/?${fetchString}language_filter=fi&limit=20`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setActivities(data.data);
                setCurrentTags(data.tags);
                if (allTags.length === 0) {
                    setAllTags(data.tags)
                }
            })
            .catch((error) => {
                Alert.alert('Something went wrong', error);
            })
    }
    //useEffect joka luo filtteri lauseen kun käyttäjä muuttaa tägi valintojaan
    useEffect(() => {
        createFilterTagsString();
    }, [selectedTags]);

    //useEffect suorittaa uuden haun kun filtteri lause on valmis
    useEffect(() => {
        dataFetch();
    }, [fetchString]);

    const createFilterTagsString = () => {
        let str = ('tags_search=');
        // Käydään läpi valitut tägit ja tehdään niistä urliin sopiva stringi
        if (selectedTags.length > 0) {
            for (let i = 0; i < selectedTags.length; i++) {
                //Yhden tägin & merkki rikkoi haun, joten tarkistetaan onko tägillä sitä merkkiä ja korvataan

                if (selectedTags[i + 1]) {
                    //Jos tägin jälkeen on tägi
                    str = str.concat(selectedTags[i].replace("&", "%26") + "%2C%20")
                } else {
                    //jos on viimeinen tägi
                    str = str.concat(selectedTags[i].replace("&", "%26") + '&')
                }
                setFetchString(str)
            }
        }
        else {
            setFetchString('')
        }
    }

    //Voisimme siirtyä React elements listaan
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

    //Muuta käyttäjän tägi valintoja
    const checkAnFetch = (newValue, tag) => {
        if (newValue === true) {
            setSelectedTags([...selectedTags, tag])
        } else {
            setSelectedTags(selectedTags.filter((current) => current !== tag))
        }
    }


    //Tarkoitus käyttää useammassa listassa, onko mahdollista? Pitäisikö renderitemit siirtää?
    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row' }}>
            <Text>{item}</Text>
            <CheckBox
                disabled={false}
                value={
                    selectedTags.indexOf(item) >= 0
                }
                onValueChange={(newValue) => { checkAnFetch(newValue, item) }}
            //jos oncheck value on true, lisää listaan
            />
        </View>
    )


    return (
        
        <View style={styles.screen}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.smallcontainer}>
                    <Text style={styles.basicTexts}>Chosen Tags</Text>
                    <FlatList data={selectedTags}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={listSeparator}
                        renderItem={({ item }) => <Text>{item}</Text>} />
                </View>
                <View style={styles.smallcontainer}>
                    {/**lista josta voi checkata tägejä */}
                    <FlatList data={array}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={listSeparator}
                        renderItem={renderItem} />
                </View>
            </View>
            <View style={styles.listcontainer}>
                <FlatList
                    style={{marginLeft: "0%", height:150}}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Card>
                            <Card.Title>
                                {item.name.fi}
                            </Card.Title>
                            <Card.Divider/>
                            <Text style={{marginBottom: 10}}>
                                Osoite: {item.location.address.street_address}
                            </Text>
                            <Text style={{marginBottom: 10}}>
                                {item.where_when_duration.where_and_when}
                            </Text>
                            <Text style={{marginBottom: 10, color:'#130DDE'}}onPress={() => {Linking.openURL(item.info_url)}}>
                                Klikkaa tästä tapahtuman nettisivuille
                            </Text>
                            <Card.Image style={{marginBottom: 10}}source={{uri: item.description.images[0].url}}/>
                        </Card>
                    )}
        onPress={getCoordinates}
      ItemSeparatorComponent={listSeparator} data={activities} />
    
    </View> 
        </View>

        

    );
}
