import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Alert, Linking, } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { styles } from '../styles/stylesPlayground';
import { Card } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';


export default function AdvSearch({ navigation }) {
    // Selected item tags
    const [currentTags, setCurrentTags] = useState([]);
    // List for all tags 
    const [allTags, setAllTags] = useState([]);
    const [activities, setActivities] = useState([]);
    // List of selected tags
    const [selectedTags, setSelectedTags] = useState([]);
    // String inside the dataFetch url
    const [fetchString, setFetchString] = useState('');
    const getImages = (images) => images.map(image => image.url);
    // Get list of activities and tags
    let array = Object.values(allTags);

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
    //useEffect filter that changes when user selects new tags
    useEffect(() => {
        createFilterTagsString();
    }, [selectedTags]);

    //useEffect for new filter
    useEffect(() => {
        dataFetch();
    }, [fetchString]);

    const createFilterTagsString = () => {
        let str = ('tags_search=');
        // For loop of selected tags and creating string to url
        if (selectedTags.length > 0) {
            for (let i = 0; i < selectedTags.length; i++) {
                
                if (selectedTags[i + 1]) {
                    //If after a tag comes a tag
                    str = str.concat(selectedTags[i].replace("&", "%26").replace(/\s+/g, "%20") + "%2C")
                } else {
                    //If a tag is the last one 
                    str = str.concat(selectedTags[i].replace("&", "%26").replace(/\s+/g, "%20") + '&')
                }
                setFetchString(str)
            }
        }
        else {
            setFetchString('')
        }
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

    //Get the coordinates of activity 
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

    //Change users selection of tags
    const checkAnFetch = (newValue, tag) => {
        if (newValue === true) {
            setSelectedTags([...selectedTags, tag])
        } else {
            setSelectedTags(selectedTags.filter((current) => current !== tag))
        }
    }

    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row' }}>
            
            <CheckBox
                disabled={false}
                value={
                    selectedTags.indexOf(item) >= 0
                }
                onValueChange={(newValue) => { checkAnFetch(newValue, item) }}
            //If oncheck value is true, add to list
            />
            <Text style={{width:80}}>{item}</Text>
        </View>
    )


    return (

        <View style={styles.screen}>

            <View style={styles.smallcontainer}>

                <FlatList data={array}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={listSeparator}
                    renderItem={renderItem} 
                    numColumns={3}
                    />
            </View>
            <View style={styles.listcontainer}>
                <FlatList
                    style={{ marginLeft: "0%", height: 150 }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Card>
                            <Card.Title>
                                {item.name.fi}
                            </Card.Title>
                            <Card.Divider />
                            <Text style={{ marginBottom: 10 }}>
                                Osoite: {item.location.address.street_address}
                            </Text>
                            <Text style={{ marginBottom: 10 }}>
                                {item.where_when_duration.where_and_when}
                            </Text>
                            <Text style={{ marginBottom: 10, color: '#130DDE' }} onPress={() => { Linking.openURL(item.info_url) }}>
                                Klikkaa tästä tapahtuman nettisivuille
                            </Text>
                            <SliderBox
                                resizeMethod={'resize'}
                                resizeMode={'cover'}
                                parentWidth={280}
                                paginationBoxVerticalPadding={20}
                                autoplay
                                circleLoop
                                images={getImages(item.description.images)} />

                        </Card>
                    )}
                    onPress={getCoordinates}
                    ItemSeparatorComponent={listSeparator} data={activities} />

            </View>
        </View>



    );
}
