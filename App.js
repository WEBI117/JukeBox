import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import io from 'socket.io-client'
// import { Socket } from 'dgram';

// /home/webi/Documents/AwesomeProject/node_modules/socket.io-client


class screen1 extends React.Component {
  constructor(props){
    super(props)
    const socket = io('http://192.168.100.23:3000')
    this.state = {
      sock: socket,
      input : '',
      arr: ''
    }
  }

  textinputhandler = (val) => {
    this.setState({
      input:val
    })
  }
  buttonhandler = () => {
    this.state.sock.emit('message', this.state.input)
    prom = new Promise ((resolve,reject) => {
      this.state.sock.on('hi', (v) => {
          resolve(v)
        })
    })
    .then((v) => {
      this.props.navigation.navigate('Screen2', {
      ssocket: this.state.sock,
      sermessage: v
    })
  })
    .catch(() => {alert('error')})

  }
 
  render() {
    return (
      <View style={styles.container}>
          <TextInput
            style = {{width:200}}
            placeholder = 'search'
            value = {this.state.input}
            onChangeText = {this.textinputhandler}
          />
          <Button
            title = 'submit'
            onPress = {this.buttonhandler}
          />
      </View>
    );
  }
}

class screen2 extends React.Component {
  render() {
    const { navigation } = this.props;
    const s = navigation.getParam('ssocket');
    const sm = navigation.getParam('sermessage','woops');
    return (
      <View style={styles.container}>
        <Text>screen 2!!</Text>
        <Text>{sm}</Text>
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
    backgroundColor: '#F5FCFF',
  },
})