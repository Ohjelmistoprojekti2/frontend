import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {CheckBox} from "native-base"

//npm install native-base --save

export default class App extends React.Component {
  state={
    selectedTag1:false,
    selectedTag2:false,
    selectedTag3:false,
    selectedTag4:false,

  }
  render(){
    const {selectedTag1,selectedTag2,selectedTag3,selectedTag4} = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Pick the tags that interests you</Text>
        <View style={styles.item} >
            <CheckBox checked={selectedTag1} color="#fc5185" onPress={()=>this.setState({selectedTag1:!selectedTag1})}/>
            <Text style={
              {...styles.checkBoxTxt,
                color:this.state.selectedTag1?"#fc5185":"gray",
                fontWeight:this.state.selectedTag1? "bold" :"normal"
              }}
              >Music</Text>
        </View>
        <View style={styles.item}>
            <CheckBox checked={this.state.selectedTag2} color="#fc5185" onPress={()=>this.setState({selectedTag2:!selectedTag2})}/>
            <Text style={
              {...styles.checkBoxTxt,
                color:this.state.selectedTag2?"#fc5185":"gray",
                fontWeight:this.state.selectedTag2? "bold" :"normal"
              }}
              >Nightlife</Text>
        </View>
        <View style={styles.item}>
            <CheckBox checked={this.state.selectedTag3} color="#fc5185" onPress={()=>this.setState({selectedTag3:!selectedTag3})}/>
            <Text style={
              {...styles.checkBoxTxt,
                color:this.state.selectedTag3?"#fc5185":"gray",
                fontWeight:this.state.selectedTag3? "bold" :"normal"
              }}
              >Culture</Text>
        </View>
        <View style={styles.item}>
            <CheckBox checked={this.state.selectedTag4} color="#fc5185" onPress={()=>this.setState({selectedTag4:!selectedTag4})}/>
            <Text style={
              {...styles.checkBoxTxt,
                color:this.state.selectedTag4?"#fc5185":"gray",
                fontWeight:this.state.selectedTag4? "bold" :"normal"
              }}
              >Outdoors</Text>
        </View>
        <TouchableOpacity style={styles.submit}>
          <Text style={{color:"white"}}>SUBMIT</Text>
        </TouchableOpacity>


      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize:25,
    fontWeight:"bold",
    color:"#364f6b",
    marginBottom:40
  },
  item:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:10,
    marginBottom:10,
    flexDirection:"row",
  },
  checkBoxTxt:{
    marginLeft:20
  },
  submit:{
    width:"80%",
    backgroundColor:"#fc5185",
    borderRadius:20,
    padding:10,
    alignItems:"center",
    marginTop:40
  }
});
