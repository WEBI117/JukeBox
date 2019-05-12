import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';

class screen1 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
    }
    fc = (val) => {
      this.setState({
        value: val
      })
    }

    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <TextInput
            style = {{width: 200}}
            placeholder = "enter text"
            onChangeText = {this.fc}
          />
          <Button
            title = "screen2"
            onPress={() => this.props.navigation.navigate('Screen2',{val : this.state.value})}
          />
        </View>
      );
    }
  }

  export default screen1