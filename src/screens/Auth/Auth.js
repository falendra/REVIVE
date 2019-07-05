import React, { Component } from "react";
import { View, ImageBackground, Button, StyleSheet, Dimensions } from "react-native"
import {connect } from 'react-redux'

import startMainTabs from '../MainTabs/startMainTabs'
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"
import HeadingText from "../../components/UI/HeadingText/HeadingText"
import BackgroundImage from "../../assets/BackgroundImage.jpg"
import ButtonWithBackground from "../../components/UI/Button/ButtonWithBackground/ButtonWithBackground"
import MainText from "../../components/UI/MainText/MainText"
import validate from "../../utility/validation"
import {tryAuth } from "../../store/actions/index"
class AuthScreen extends Component {


    state= {
        viewMode:Dimensions.get("window").height >500 ? 'portrait' :'landscape',
        controls:{
            email:{
                value:"",
                valid: false,
                validationRules:{
                    isEmail:true,
                },
                touched:false
            },
            password:{
                value:"",
                valid: false,
                validationRules:{
                   minLength: 6,
                },
                touched:false

            },
            confirmPassword:{
                value:"",
                valid: false,
                validationRules:{
                    equalTo:"password",
                },
                touched:false
            }
        }
    };

    constructor(props){
        super(props);
        Dimensions.addEventListener("change",this.updateStyle)
    }

    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyle)
    };

    updateStyle =(dims)=>{
        this.setState({
            viewMode:dims.window.height >500 ? 'portrait' :'landscape'
        });
    };

    updateInputState=(key,value)=>{
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
          const equalControl = this.state.controls[key].validationRules.equalTo;
          const equalValue = this.state.controls[equalControl].value;
          connectedValue = {
            ...connectedValue,
            equalTo: equalValue
          };
        }
        if (key === "password") {
          connectedValue = {
            ...connectedValue,
            equalTo: value
          };
        }
        this.setState(prevState => {
          return {
            controls: {
              ...prevState.controls,
              confirmPassword: {
                ...prevState.controls.confirmPassword,
                valid:
                  key === "password"
                    ? validate(
                        prevState.controls.confirmPassword.value,
                        prevState.controls.confirmPassword.validationRules,
                        connectedValue
                      )
                    : prevState.controls.confirmPassword.valid
              },
              [key]: {
                ...prevState.controls[key],
                value: value,
                valid: validate(
                  value,
                  prevState.controls[key].validationRules,
                  connectedValue
                ),
                touched:true
              }
            }
          };
        });
        
    }


    loginHandler = () => {
        const authData ={
            email:this.state.controls.email.value,
            password:this.state.controls.password.value,
        };
        this.props.onLogin( authData );
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
                        <DefaultInput 
                        placeholder="Your E-mail Address" 
                        style={styles.input}
                         value ={this.state.controls.email.value}
                         onChangeText ={(val)=>this.updateInputState( 'email', val )}
                         valid = {this.state.controls.email.valid}
                         touched={this.state.controls.email.touched}
                         />
                       
                       
                       
                        <View style={this.state.viewMode ==="portrait"? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode ==="portrait"? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                placeholder="Password" 
                                style={styles.input}
                                value={this.state.controls.password.value}
                                onChangeText={(val)=>this.updateInputState('password',val)}
                                valid={this.state.controls.password.valid}
                                touched={this.state.controls.password.touched}
                                />
                            </View>
                            <View style={this.state.viewMode ==="portrait"? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                placeholder="Confirm Password" 
                                style={styles.input}
                                value={this.state.controls.confirmPassword.value}
                                onChangeText={(val)=>this.updateInputState('confirmPassword',val)}
                                valid={this.state.controls.confirmPassword.valid}
                                touched={this.state.controls.confirmPassword.touched}
                                />

                            </View>

                        </View>

                    </View>


                    <Button title="Submit" onPress={this.loginHandler}
                     disabled={
                         !this.state.controls.email.valid ||
                         !this.state.controls.password.valid ||
                         !this.state.controls.confirmPassword.valid } />
                </View>
            </ImageBackground>



        );


    }
}








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

const mapDispatchToProps= dispatch=>{
    return{
        onLogin : (authData) =>dispatch(tryAuth(authData))
    };
};


export default connect(null,mapDispatchToProps) (AuthScreen);