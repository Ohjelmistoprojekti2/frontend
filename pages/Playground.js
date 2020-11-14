import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, RecyclerViewBackedScrollViewComponent } from 'react-native';
//expo install @react-native-community/checkbox
import CheckBox from '@react-native-community/checkbox';
import { styles }  from '../styles/stylesPlayground';

/** ToDoList
 * DONE: MIKSI CHECKBOXIA EI VOI UNCHECKATA
 * Mitä kaikkea voi refaktoroida erillisiksi elementeiksi?
 * Tyylit omaan tiedostoon ja funktiot?
 * Voidaanko yhdistää funktioita? yksi urli ja yksi muuttuva haku?
 * Sama ilman buttoneita, miten? Epäilen async await toiminnolla.
 *
 * Bugs: Jos hakee useampaa tägiä, myhelsinki api palauttaa vain ensimmäisen tägin löydöt
 * Returns items with ANY of the tags listed. Separate tags with a comma.
 * ?tags_search=sauna%2C%20bar palauttaa listan jossa on vain sauna aktiviteetteja
 *
 * Bugs: Jos yrittää hakea aktiviteettia joka sisältää useamman tägin
 * ?tags_filter= Ei helsinkiApi palauta yhtään tulosta.
 */

export default function Fiddlin({ navigation }) {

    const [currentTags, setCurrentTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [activities, setActivities] = useState([]);
    //Lista valituista tägeistä
    const [selectedTags, setSelectedTags] = useState([]);
    //String state jonka voi laittaa urlin sisään
    const [fetchString, setFetchString] = useState('');
    const [defaultFetch, setDefaultFetch] = useState(true);
    let url = `http://open-api.myhelsinki.fi/v1/activities/?${fetchString}language_filter=fi&limit=20`
    //Haetaan lista aktiviteeteista ja tagseista
    let array = Object.values(currentTags);
    //Staattisia elementtejä koska...?
    let tags = selectedTags;
    let fetchString2 = fetchString;

        //default haku
        const dataFetch = () => {
            //async?
            //Jos default haku, tyhjennä fetch, jos tägi haku, suorita normaalisti
        /*  */   if (defaultFetch === true) {
               setFetchString('')
            }

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setActivities(data.data);
                    setCurrentTags(data.tags);
                })
                .catch((error) => {
                    Alert.alert('Something went wrong', error);
                })
        }
        //Koetan sulauttaa yhdeksi dataFetch hauksi -Niko
        //Haku jolla haetaan tägit
        const uusiHaku = () => {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                setActivities(data.data);
                setCurrentTags(data.tags);
            })
            .catch((error) => {
                Alert.alert('Something went wrong', error);
            })
        }

    useEffect(() => {
        dataFetch()
        setAllTags(currentTags)
    }, []);

   const getActsWithTags = () => {
        let str = ('tags_search=');
       // Käydään läpi valitut tägit ja tehdään niistä urliin sopiva stringi
            for (let i = 0; i < selectedTags.length; i++){
                //Yhden tägin & merkki rikkoi haun, joten tarkistetaan onko tägillä sitä merkkiä ja korvataan
                selectedTags[i] = selectedTags[i].replace("&", "%26")
                if (selectedTags[i+1]){
                    //Jos tägin jälkeen on tägi
                str = str.concat(selectedTags[i] + "%2C%20")
            }   else {
                //jos on viimeinen tägi
                str=str.concat(selectedTags[i]+'&')
            }
            setFetchString(str)
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
    const checkList = () => {
        //Checkboxin onValueChangiin funktio joka sisältää olemassa olevan koodin
        // riviltä 106-114, sekä sulautettu getActsWithTags ja reaktiivinen fetch
        //setDefaultFetch=false
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
                    //jos oncheck value on true, lisää listaan
                    if (newValue === true) {
                        setSelectedTags([...selectedTags, item])
                        //jos ei, poista listasta, tämän voisi muuttaa ehkä muotoon else{}
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
                {/**testi elementti alapuoella */}
                <Text>{fetchString}</Text>
                <View style={styles.row}>
                <Button title="GetItMf" onPress={uusiHaku} />
                <Button title="Default" onPress={dataFetch}/>
                </View>
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
