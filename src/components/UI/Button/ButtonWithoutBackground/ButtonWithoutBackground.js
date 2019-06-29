import React from 'react';
import { TouchableOpacity, Text, View ,StyleSheet} from "react-native";

const buttonWithoutBackground = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.button,{backgroundColor:props.color}]}>
                <Text> {props.children} </Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin:5,
        borderWidth:1,
        borderRadius:15,
        borderColor:"black"
    }
});
export default buttonWithoutBackground;