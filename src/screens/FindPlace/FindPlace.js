import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import PlaceList from "../../components/PlaceList/PlaceList"
import { connect } from "react-redux";
import {getPlaces} from '../../store/actions/index'


class FindPlaceScreen extends Component {

    static navigatorStyle = {

        navBarButtonColor: "orange"
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    };




    onNavigatorEvent = event => {
        if (event.type === "ScreenChangedEvent") {
            if(event.id==="willAppear"){
                this.props.onLoadPlaces(this.props.userId);
            }
          }

        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                })


            }
        }
    }


    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };

    placeSearchHandler = () => {


        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
        });
        this.placesLoadedHandler();
    }



    itemSelectedHandler = key => {

        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });

        this.props.navigator.push({
            screen: "myApk.PlaceDetailScreen",
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        })
    }

    
    render() {

        let content = (
            <Animated.View style={{
                opacity: this.state.removeAnim,
                transform: [{
                    scale: this.state.removeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [12, 1]
                    })
                }]
            }}>
                <TouchableOpacity onPress={this.placeSearchHandler}>
                    <View style={styles.seachButton}>
                        <Text style={styles.searchButtonText}> Find places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );

        if (this.state.placesLoaded) {
            content = (
                <Animated.View style={{
                    opacity: this.state.placesAnim
                }}>

                    <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />


                </Animated.View>
            )
        }
        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    seachButton: {
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 26
    }
})
const mapStateToProps = state => {
    return {
        places: state.places.places,
        userId: state.auth.userId
    };
};

const mapDispatchToProps =dispatch =>{
    return{
        onLoadPlaces : (userId)=> dispatch(getPlaces(userId))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);