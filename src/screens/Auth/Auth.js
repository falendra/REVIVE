import React ,{Component} from "react";
import {View,Text,Button,TextInput,StyleSheet} from "react-native"
import startMainTabs from '../MainTabs/startMainTabs'

class AuthScreen extends Component{

    loginHandler=()=>{
        startMainTabs();
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>Please Login</Text>
                <TextInput placeholder="Your E-mail Address"/>
                <TextInput placeholder="Password"/>
                <TextInput placeholder="Confirm Password"/>
                <Button title ="Login" onPress={this.loginHandler}/>
            </View>
        );

        
    }
}

export default AuthScreen;


styles= StyleSheet.create({
    container:{
        borderColor:"red",
        borderWidth:2,
    }
})