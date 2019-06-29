import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from "react-native";

class PickLocation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Text> map</Text>
                </View>

                <View style={styles.button}>
                    <Button title="Locate me" onPress={()=>alert("pick location")} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        backgroundColor: '#eee',
        borderColor: "black",
        width: "80%",
        height: 200,

    },
    button: {
        margin: 8
    },
    
})


export default PickLocation;