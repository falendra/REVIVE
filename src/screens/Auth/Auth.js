import React, { Component } from "react";
import { View, ImageBackground, Button, StyleSheet, Dimensions ,KeyboardAvoidingView ,Keyboard,TouchableWithoutFeedback,ActivityIndicator} from "react-native"
import { connect } from 'react-redux'

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"
import HeadingText from "../../components/UI/HeadingText/HeadingText"
import BackgroundImage from "../../assets/BackgroundImage.jpg"
import ButtonWithBackground from "../../components/UI/Button/ButtonWithBackground/ButtonWithBackground"
import MainText from "../../components/UI/MainText/MainText"
import validate from "../../utility/validation"
import { tryAuth ,authAutoSignIn} from "../../store/actions/index"

class AuthScreen extends Component {


    state = {
        viewMode: Dimensions.get("window").height > 500 ? 'portrait' : 'landscape',
        authMode: 'login',
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true,
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6,
                },
                touched: false

            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password",
                },
                touched: false
            }
        }
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyle)
    };


    componentDidMount(){
        this.props.onAutoSignIn();
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyle)
    };

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        });
    };

    updateInputState = (key, value) => {
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
                        touched: true
                    }
                }
            };
        });

    }

    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return {
                authMode: prevState.authMode === 'login' ? "signup" : "login"
            }
        });

    }
    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        };
        this.props.onTryAuth(authData,this.state.authMode);
    
    }
    render() {
        let headingText = null;
        let confirmPasswordControl = null;
        let submitButton=(
            <Button title="Submit" onPress={this.authHandler}
                        disabled={
                            !this.state.controls.email.valid  ||
                            !this.state.controls.password.valid ||
                            !this.state.controls.confirmPassword.valid && this.state.authMode==='signup' } />

        )
        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (
                <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                    <DefaultInput
                        placeholder="Confirm Password"
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry={true}
                    />

                </View>
            )
        }


        if (this.state.viewMode === "portrait") {
            if (this.state.authMode === 'login') {
                headingText = (
                    <MainText>
                        <HeadingText>Please.. Login</HeadingText>
                    </MainText>
                );
            }
            else {
                headingText = (
                    <MainText>
                        <HeadingText>Please.. Sign up</HeadingText>
                    </MainText>
                );
            }
        };

        if(this.props.isLoading){
            submitButton=<ActivityIndicator/>
        }
        return (
            <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <ButtonWithBackground onPress={this.switchAuthModeHandler} color="#4EECCA" >
                        Switch to {this.state.authMode === 'login' ? "Signup" : "Login"}
                    </ButtonWithBackground>

                    {headingText}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inputContainer}>
                        <DefaultInput
                            placeholder="Your E-mail Address"
                            style={styles.input}
                            value={this.state.controls.email.value}
                            onChangeText={(val) => this.updateInputState('email', val)}
                            valid={this.state.controls.email.valid}
                            touched={this.state.controls.email.touched}
                            autoCapitalize= 'none'
                            autoCorrect ={false}
                            keyboardType ="email-address"
                        />



                        <View style={this.state.viewMode === "portrait" || this.state.authMode ==='login' ?
                            styles.portraitPasswordContainer :
                            styles.landscapePasswordContainer
                        }>

                            <View style={this.state.viewMode === "portrait" || this.state.authMode ==='login' ?
                                styles.portraitPasswordWrapper :
                                styles.landscapePasswordWrapper
                            }>
                                <DefaultInput
                                    placeholder="Password"
                                    style={styles.input}
                                    value={this.state.controls.password.value}
                                    onChangeText={(val) => this.updateInputState('password', val)}
                                    valid={this.state.controls.password.valid}
                                    touched={this.state.controls.password.touched}
                                    secureTextEntry={true}
                                />
                            </View>
                            {confirmPasswordControl}

                        </View>

                    </View>
                    </TouchableWithoutFeedback>


                    {submitButton}
                </KeyboardAvoidingView>
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
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    portraitPasswordWrapper: {
        width: "100%"
    },
    landscapePasswordContainer: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    landscapePasswordWrapper: {
        width: "45%"
    }
})


mapStateToProps= state=>{
    return{
        isLoading : state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
    onTryAuth: (authData,authMode) => dispatch(tryAuth(authData,authMode)),
    onAutoSignIn:()=>dispatch(authAutoSignIn()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);