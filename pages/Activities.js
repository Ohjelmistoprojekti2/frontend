import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Component } from 'react';
import {StyleSheet, View, Text, } from 'react-native';

//expo/npm install react-native-multiple-tags
export default function Activities() {

    const [content, setContent] = useState([]);
    const [contentx, setContentx] = useState([]);
  
const tags = [
    'cherry',
    'mango',
    'cashew',
    'almond',
    'guava',
    'pineapple',
    'orange',
    'pear',
    'date',
    'strawberry',
    'pawpaw',
    'banana',
    'apple',
    'grape',
    'lemon',
  ];
  
  const objectTags = [
    {
      key: 'id_01',
      value: 'cherry',
    },
    {
      key: 'id_02',
      value: 'mango',
    },
    {
      key: 'id_03',
      value: 'cashew',
    },
    {
      key: 'id_04',
      value: 'almond'
    },
    {
      key: 'id_05',
      value: 'guava'
    },
    {
      key: 'id_06',
      value: 'pineapple'
    },
    {
      key: 'id_07',
      value: 'orange'
    },
    {
      key: 'id_08',
      value: 'pear'
    },
    {
      key: 'id_09',
      value: 'date'
    }
  ]

  /* 
  Component.constructor(props) {
    super(props);
    this.state = {
      content: [],
      contentx: [],
    };
  }; 
  */

    return (
        <View style={styles.screen}>
            <StatusBar hidden={true} />
            <View>
        <MultipleTags
            tags={objectTags}
            search
            onChangeItem={(content) => { setContent({ content }); }}
            title="Fruits"
          />
          {
          (() => content.map(item => <Text key={item.key}> {item.key}: {item.value} </Text>))()
          }
        <MultipleTags
          tags={tags}
          search
          onChangeItem={(contentx) => { setContentx({ contentx }); }}
          title="Fruits"
        />
        {
        (() => contentx.map(item => <Text key={item}> {item} </Text>) )()
        }
      </View>
        </View>
    );
}

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
        alignSelf: 'flex-start'
    }
});
