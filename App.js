/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail"
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index';





class App extends Component {



  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
    console.log("place added")
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  };

  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);

  }

  modalClosedHandler = () => {
    this.props.onDeselectPlace();
  }

  render() {

    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler} />

        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },


});

mapStateToProps = (state) => {

  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace

  };
};

mapDispatchToProps = dispatch => {
  return {
    onAddPlace: name => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: key => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);