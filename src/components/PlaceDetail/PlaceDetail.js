import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native'

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
        <Modal visible={props.selectedPlace !== null} onRequestClose={props.onModalClosed} animationType="slide" color="#5e5f60">
            <View style={styles.modalContainer}>
                {modalContent}
                <View>
                    <Button title="delete" color="red"  onPress={props.onItemDeleted}/>
                    <Button title="close"  onPress={props.onModalClosed}/>
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
    }
})

export default PlaceDetail;