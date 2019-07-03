import React from 'react';
import{TextInput,StyleSheet} from "react-native";


const DefaultInput = (props) => {
    return (
        <TextInput 
        {...props}
        style={[styles.input,props.style]}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: "100%",
        padding: 5,
        borderColor:"#eee",
        borderWidth:1,
        marginTop:8,
        marginBottom:8,
    }
})

export default DefaultInput;

