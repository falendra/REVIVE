import React, { Component } from "react";
import { View, ImageBackground, Button, StyleSheet, Dimensions } from "react-native"
import startMainTabs from '../MainTabs/startMainTabs'
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"
import HeadingText from "../../components/UI/HeadingText/HeadingText"
import BackgroundImage from "../../assets/BackgroundImage.jpg"
import ButtonWithBackground from "../../components/UI/Button/ButtonWithBackground/ButtonWithBackground"
import MainText from "../../components/UI/MainText/MainText"
class AuthScreen extends Component {


    state= {
        viewMode:Dimensions.get("window").height >500 ? 'portrait' :'landscape'
    };

    constructor(props){
        super(props);
        Dimensions.addEventListener("change",dims =>{
            this.setState({
                viewMode:Dimensions.get("window").height >500 ? 'portrait' :'landscape'
            })
        })
    }



    loginHandler = () => {
        startMainTabs();
    }
    render() {
        let headingText = null;


        if (this.state.viewMode==="portrait") {
            headingText = (
                <MainText>
                    <HeadingText>Please.. Login</HeadingText>
                </MainText>
            );
        };
        return (
            <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <ButtonWithBackground onPress={() => alert("test")} color="#4EECCA" >Switch to login  </ButtonWithBackground>

                    {headingText}

                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Your E-mail Address" style={styles.input} />
                        <View style={this.state.viewMode ==="portrait"? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode ==="portrait"? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput placeholder="Password" style={styles.input} />
                            </View>
                            <View style={this.state.viewMode ==="portrait"? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput placeholder="Confirm Password" style={styles.input} />

                            </View>

                        </View>

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
        flex: 1,
        width: "100%"

    },
    portraitPasswordContainer:{
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    portraitPasswordWrapper:{
        width:  "100%"    
   },
   landscapePasswordContainer :{
        flexDirection:  'row',
        justifyContent: "space-between"
    },
    landscapePasswordWrapper:{
        width: "45%"
    }
})