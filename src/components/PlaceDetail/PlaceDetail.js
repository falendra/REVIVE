import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet ,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetail = (props) => {
    let modalContent = null;
    if (props.selectedPlace) {
        modalContent = (
            <View>
                <Image source={props.selectedPlace.image} style={styles.placeImage} />
                <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
            </View>
        )
    }

    return (
        <Modal visible={props.selectedPlace !== null}
            onRequestClose={props.onModalClosed}
            animationType="slide"
            color="#5e5f60">
            <View style={styles.modalContainer}>
                {modalContent}
                <View style= {styles.iconContainer}>
                   
                    <TouchableOpacity onPress={props.onItemDeleted}>
                    <Icon size={30} name="ios-trash" color="#f20004"/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={props.onModalClosed}>
                    <Icon size={30} name="ios-close-circle-outline" color="#f20004"/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
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
    iconContainer:{
        alignItems: "center",
        
    }
})

export default PlaceDetail;