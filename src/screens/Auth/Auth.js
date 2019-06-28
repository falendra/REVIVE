import React, { Component } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native"
import startMainTabs from '../MainTabs/startMainTabs'
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"

class AuthScreen extends Component {

    loginHandler = () => {
        startMainTabs();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Please Login</Text>
                <View style={styles.inputContainer}>
                    <DefaultInput placeholder="Your E-mail Address" style={styles.input}/>
                    <DefaultInput placeholder="Password" style={styles.input} />
                    <DefaultInput placeholder="Confirm Password" style={styles.input} />
                </View>

                <Button title="Login" onPress={this.loginHandler} />
            </View>
        );


    }
}

export default AuthScreen;


styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        width: "80%"
    },
    input:{
        borderColor:"#bbb",
        backgroundColor:"#eee"
    }
})