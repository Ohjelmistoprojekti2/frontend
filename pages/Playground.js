import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Image } from 'react-native';
//expo install @react-native-community/checkbox
import CheckBox from '@react-native-community/checkbox';
import { styles } from '../styles/stylesPlayground';

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
    
    //default haku
    const dataFetch = () => {
        let url = `http://open-api.myhelsinki.fi/v1/activities/?${fetchString}language_filter=fi&limit=20`
console.log(url)
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

    /* useEffect(() => {
        dataFetch()
    }, []); */

   // useEffect joka päivittyy kun selectedTags päivittyy/checklist onchange ja suorittaa ensin getActs ja sitten datafetch
   useEffect(() => {
       console.log(selectedTags)
         dataFetch(); 
    }, [fetchString]);

    useEffect(() => {
        getActsWithTags();
    }, [selectedTags]);
 
   /*  fetchString joka on staattinen
   let fetchString = {
        let str = ('tags_search=');
        // Käydään läpi valitut tägit ja tehdään niistä urliin sopiva stringi
        if (selectedTags.length > 0) {
            for (let i = 0; i < selectedTags.length; i++) {
                //Yhden tägin & merkki rikkoi haun, joten tarkistetaan onko tägillä sitä merkkiä ja korvataan
                selectedTags[i] = selectedTags[i].replace("&", "%26")
                if (selectedTags[i + 1]) {
                    //Jos tägin jälkeen on tägi
                    str = str.concat(selectedTags[i] + "%2C%20")
                } else {
                    //jos on viimeinen tägi
                    str = str.concat(selectedTags[i] + '&')
                }
                setFetchString(str)
            }
        }
        else {
            ('')
        }
    } */

     const  getActsWithTags = () => {
       
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
         //dataFetch() 
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
    //sulautettu getActsWithTags ja reaktiivinen fetch
    const checkAnFetch = (newValue, tag) => {
        //Step 1
        if (newValue === true) {
            setSelectedTags([...selectedTags, tag])
            //jos ei, poista listasta, tämän voisi muuttaa ehkä muotoon else{}
        } else {
            setSelectedTags(selectedTags.filter((current) => current !== tag))
        }
        //Ensimmäinen tägin valinta lisää vain tägin listaan,
        //Toinen tägin valinta lisää toisen tägin ja tekee fetchstringin ensimmäiselle
        //Kolmas toistaa kaavaa ja hakee joko ensimmäisen tägin fetchillä tai kahden,
        //Mahdoton tietää koska myHelsingin apit ei toimi
       
        //getActsWithTags()
      
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
            <View style={styles.smallcontainer}>

        
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