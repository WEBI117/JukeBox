import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput,FlatList,TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import io from 'socket.io-client'
// import { Socket } from 'dgram';
import {List, ListItem} from 'react-native-elements'

// /home/webi/Documents/AwesomeProject/node_modules/socket.io-client


class screen1 extends React.Component {
  constructor(props){
    super(props)
    const socket = io('http://10.130.13.232:8050')
    this.state = {
      sock: socket,
      input : '',
      arr: '',
      loading: false
    }
    this.state.sock.on('finalanswer', (v) => {
      console.log(v)
      this.setState({
        loading: false
      })
      this.props.navigation.navigate('Screen2', {
            ssocket: this.state.sock,
            sermessage: v
          })
    })
  }

  textinputhandler = (val) => {
    this.setState({
      input:val
    })
  }
  buttonhandler = () => {
    this.state.sock.emit('searchfromapp', this.state.input)
    this.setState({
      loading: true
    })
  }
 
  render() {
    if(this.state.loading === true){
      return(
        <View  style={styles.container}>
            <Text>Retrieving results from server.</Text>
            <Button
              title = 'abort'
              onPress = {() => {
                this.setState({
                  loading: false
                })
              }}
            />
        </View>
      );
    }
    return (
      <View style={styles.container}>
          <TextInput
            style = {{width:200,}}
            placeholder = 'search'
            value = {this.state.input}
            onChangeText = {this.textinputhandler}
          />
          <TouchableOpacity style = {styles.submitButton} onPress = {this.buttonhandler}>
            <View style = {{alignItems: 'center', justifyContent: 'space-evenly'}}>
                <Text style = {{fontSize: 20, color: 'white',fontWeight: "bold"}}>
                      Submit
                </Text>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
}

class screen2 extends React.Component {
  constructor(props){
    super(props)
    const { navigation } = this.props;
    const s = navigation.getParam('ssocket');
    const sm = navigation.getParam('sermessage','woops');
    this.state = {
      jsonob: sm.tracks.items,
      socket: s
    }
  }
  sendsong = (val) => {
    console.log(val)
    this.state.socket.emit('itemid',val)
    this.props.navigation.navigate('Screen1')
  }
  componentDidMount(){
    console.log(this.state.jsonob)//.items.album.images[1].url
  }
  render() {
    if(!this.state.jsonob.length){
      return(
        <View style = {styles.container}>
          <Text>Unable to retrieve list. Try Again!</Text>
        </View>
      )
    }
    return (
      <View>
          <FlatList
          data = {this.state.jsonob}
          renderItem = {({item}) => (
           <TouchableOpacity onPress = {() => this.sendsong(item.id)}>
            <ListItem
              roundAvatar
              title = {item.name}
              subtitle = {item.artists[0].name}
              avatar = {{uri: item.album.images[0].url}}
            />
           </TouchableOpacity>
          )}
          keyExtractor = {(item) => (item.id)}
          />
      </View>
    );
  }
}

const Rootstack = createStackNavigator({
  Screen1: {
    screen: screen1
  },
  Screen2: {
    screen: screen2
  }
});

const AppContainer =  createAppContainer(Rootstack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: '#ff4500',
    padding: 10,
    margin: 15,
    height: 40,
    width: 200
 },
})



