import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function Mainpage( { navigation }) {


  return (
    
    <View style={styles.container}>

  
     <Text>
         This is mainpage
     </Text>
     <Button title="Activities" onPress={() => navigation.navigate('Activities')}/>
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
  
