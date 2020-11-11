import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, RecyclerViewBackedScrollViewComponent } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

/** ToDoList
 * MIKSI CHECKBOXIA EI VOI UNCHECKATA
 * Mitä kaikkea voi refaktoroida erillisiksi elementeiksi?
 * Tyylit omaan tiedostoon ja funktiot?
 * 
 */
export default function Fiddlin({ navigation }) {
    
    const [allTags, setAllTags] = useState([]);
    const [activities, setActivities] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [fetchString, setFetchString] = useState('');
    const [url, setUrl] = useState(`http://open-api.myhelsinki.fi/v1/activities/?language_filter=fi&limit=20`)
 
  let array = Object.values(allTags)
    //Haetaan lista aktiviteeteista ja tagseista
    useEffect(() => {
        defaultList()
    }, []);
    getActsWithTags = () => {

        let lista = ('?tags_search=');
       // jeb = jeb.concat(url);
            for (let i = 0; i < selectedTags.length; i++){
                if (selectedTags[i+1]){
                lista = lista.concat(selectedTags[i] + "%2C%20")
            }   else {
                lista=lista.concat(selectedTags[i] + '&')
            }
            setFetchString(lista)
        }
    }
const uusiHaku = () => {
    fetch(`http://open-api.myhelsinki.fi/v1/activities/${fetchString}language_filter=fi&limit=20`)
    .then(response => response.json())
    .then(data => {
        setActivities(data.data);
        setAllTags(data.tags);
    })
    .catch((error) => {
        Alert.alert('Something went wrong', error);
    })
}
    //default haku
    const defaultList = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setActivities(data.data);
                setAllTags(data.tags);
            })
            .catch((error) => {
                Alert.alert('Something went wrong', error);
            })
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

//Tarkoitus käyttää useammassa listassa, onko mahdollista? Pitäisikö renderitemit siirtää?
    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row' }}>
            <Text>{item}</Text>
            <CheckBox
                disabled={false}
                value={
                    selectedTags.indexOf(item) >= 0
                }
                onValueChange={(newValue) => {
                    
                    if (newValue === true) {
                        setSelectedTags([...selectedTags, item])
                    } else if (newValue === false) {
                        setSelectedTags(selectedTags.filter((current)=> current !== item))
                    }
                }}
            />

        </View>
    )
    return (

        <View style={styles.screen}>
            <View style={styles.smallcontainer}>
                <Text>{fetchString}</Text>
                <Button title="GetItMf" onPress={uusiHaku} />
                {/**lista johon tulee checkatut tägit */}
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
                {/**lista josta voi checkata tägejä */}
                <Button title='GetActsWithTags' onPress={getActsWithTags}/>
                <FlatList data={array}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={listSeparator}
                    renderItem={renderItem} />
            </View>

        </View>

    );
}
/** 
 * Siirretään tyylit omaan tiedostoon    
*/
const styles = StyleSheet.create({
    //Main screen
    screen: {
        flex: 1,
        backgroundColor: '#CED0CE',
        alignItems: 'center',
        padding: 20,
    },
    //Container styles
    maincontainer: {
        flex: 4,
        padding: 10,
        backgroundColor: '#fff',
        width: "100%",
        margin: 5,
    },
    smallcontainer: {
        flex: 1,
        minHeight: 110,
        width: "100%",
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        margin: 1,
        padding: 5,
    },
    listcontainer: {
        flex: 7,
        width: "100%",
        backgroundColor: '#FFFFFF',
        margin: 1,
    },
    footerContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        margin: 5,
        position: 'absolute',
        paddingTop: 15,
        paddingBottom: 5,
        bottom: 1
    },
    row: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 5,
        margin: 1,
        backgroundColor: '#FFFFFF',
    },
    //Flatlist styles
    flatStyle: {
        flexDirection: 'row',
        padding: 3,
        margin: 1,
        alignItems: 'center',
    },
    items1: {
        padding: 2,
        flex: 5,
        marginLeft: '10%',
    },
    items2: {
        padding: 2,

        flex: 1
    },
    image: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 20,
    },
    //TextInput & Text styles
    inputs: {
        width: "50%",
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        margin: 1,
    },
    basicTexts: {
        fontSize: 18,
        alignSelf: 'center'
    }
});