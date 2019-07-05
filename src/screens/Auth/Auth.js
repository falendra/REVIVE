import React, { Component } from "react";
import { View, ImageBackground, Button, StyleSheet, Dimensions } from "react-native"
import startMainTabs from '../MainTabs/startMainTabs'
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"
import HeadingText from "../../components/UI/HeadingText/HeadingText"
import BackgroundImage from "../../assets/BackgroundImage.jpg"
import ButtonWithBackground from "../../components/UI/Button/ButtonWithBackground/ButtonWithBackground"
import MainText from "../../components/UI/MainText/MainText"
import validate from "../../utility/validation"
class AuthScreen extends Component {


    state= {
        viewMode:Dimensions.get("window").height >500 ? 'portrait' :'landscape',
        controls:{
            email:{
                value:"",
                valid: false,
                validationRules:{
                    isEmail:true,
                }
            },
            password:{
                value:"",
                valid: false,
                validationRules:{
                   minLength: 6,
                }

            },
            confirmPassword:{
                value:"",
                valid: false,
                validationRules:{
                    equalTo:"password",
                }
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
                )
              }
            }
          };
        });
        
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
                        <DefaultInput 
                        placeholder="Your E-mail Address" 
                        style={styles.input}
                         value ={this.state.controls.email.value}
                         onChangeText ={(val)=>this.updateInputState( 'email', val )}
                         />
                       
                       
                       
                        <View style={this.state.viewMode ==="portrait"? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode ==="portrait"? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                placeholder="Password" 
                                style={styles.input}
                                value={this.state.controls.password.value}
                                onChangeText={(val)=>this.updateInputState('password',val)}
                                
                                />
                            </View>
                            <View style={this.state.viewMode ==="portrait"? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                placeholder="Confirm Password" 
                                style={styles.input}
                                value={this.state.controls.confirmPassword.value}
                                onChangeText={(val)=>this.updateInputState('confirmPassword',val)}
                                
                                
                                />

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