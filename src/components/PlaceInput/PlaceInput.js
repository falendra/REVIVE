import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import DefaultInput from "../UI/DefaultInput/DefaultInput"


class PlaceInput extends Component {
  state = {
    placeName: ""
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });

  };

  // placeSubmitHandler = () => {
  //   if (this.state.placeName.trim() === "") {
  //     return;
  //   }

  //   this.props.onPlaceAdded(this.state.placeName);
  // };

  render() {
    return (
      <View>
        <DefaultInput
          placeholder="Place Name"
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
          
        />
        
      </View>
    );
  }
}


export default PlaceInput;
