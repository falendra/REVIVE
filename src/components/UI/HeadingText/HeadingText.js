import React from 'react'; 
import{Text,StyleSheet} from "react-native";

const HeadingText = (props) => {
    return (
        <Text {...props} style={[styles.HeadingText,props.style]}> {props.children} </Text>
    );
};

const styles =StyleSheet.create({
    HeadingText:{
        fontSize:28,
        fontWeight:"bold",
       
    }
})
export default HeadingText;