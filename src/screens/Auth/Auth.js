import React, { Component } from "react";
import { View, ImageBackground, Button, StyleSheet } from "react-native"
import startMainTabs from '../MainTabs/startMainTabs'
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"
import HeadingText from "../../components/UI/HeadingText/HeadingText"
import BackgroundImage from "../../assets/BackgroundImage.jpg"
class AuthScreen extends Component {

    loginHandler = () => {
        startMainTabs();
    }
    render() {
        return (
            <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>

                    <HeadingText>Please.. Login</HeadingText>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Your E-mail Address" style={styles.input} />
                        <DefaultInput placeholder="Password" style={styles.input} />
                        <DefaultInput placeholder="Confirm Password" style={styles.input} />
                    </View>

                    <Button title="Login" onPress={this.loginHandler} />
                </View>
            </ImageBackground>



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
    input: {
        borderColor: "#bbb",
        backgroundColor: "#eee"
    }, backgroundImage: {
        flex:1,
        width:"100%"

    }
})