import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import io from 'socket.io-client'
// import { Socket } from 'dgram';

// /home/webi/Documents/AwesomeProject/node_modules/socket.io-client


class screen1 extends React.Component {
  
  componentDidMount(){
    const socket = io('http://10.130.12.76:3000')

    socket.on('message',() => {})
  }
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title = "screen2"
          onPress={() => alert('hello')}
        />
      </View>
    );
  }
}

class screen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      v: 'aaaa',
    };
  }
  componentDidMount(){
    const { navigation } = this.props;
    const val = navigation.getParam('val', 'none');
    this.setState({
      v: val
    })
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{this.state.v}</Text>
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
// fc = (val) => {
//   this.setState({
//     value: val
//   })
// }