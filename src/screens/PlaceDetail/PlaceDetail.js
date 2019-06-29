import React ,{Component} from 'react';
import { View, Image, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index';
import {connect} from "react-redux"

class PlaceDetail extends Component{

    placeDeletedHandler=()=>{
        this.props.onDeletePlace(this.props.selectedPlace.key)
        this.props.navigator.pop();
    }
    render(){
        return (

            <View style={styles.Container}>
                <View>
                    <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View>
                <View style={styles.iconContainer}>
    
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <Icon size={30} name= {Platform.OS==="android" ?"md-trash" :"ios-trash" }color="#f20004" />
                    </TouchableOpacity>
    
    
                </View>
            </View>
        );
    }
        

}

    

const styles = StyleSheet.create({
    Container: {
        margin: 22
    },
    placeImage: {
        width: '100%',
        height: 200

    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    iconContainer: {
        alignItems: "center",

    }
})


mapDispatchToProps = dispatch => {
    return {
        onDeletePlace:key => dispatch(deletePlace(key))
    };
};

export default connect(null,mapDispatchToProps)(PlaceDetail);