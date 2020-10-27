import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


export default function AdvancedSearch({ route, navigation }) {


  return (

    <View style={styles.container}>


     <Text>
         This is AdvancedSearch page
     </Text>
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
    });
