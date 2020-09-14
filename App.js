import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

const [tags, setTags] = React.useState('');


  return (
    <View style={styles.container}>
      <Text>Tähän tulee Vhattodo-botti!</Text>
      <TextInput style={{fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
      value={tags}>
      </TextInput>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
