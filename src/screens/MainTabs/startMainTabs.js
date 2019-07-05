import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from "react-native";

const startTabs = () => {

    Promise.all([
        Icon.getImageSource(Platform.OS==="android"? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS==="android"?"md-share" :"ios-share", 30),
        Icon.getImageSource(Platform.OS==="android"?"md-menu" :"ios-menu", 30)
    ]
    ).then(sources =>
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "myApk.FindPlaceScreen",
                    label: "Find Place",
                    title: "Find Place",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "myApk.SharePlaceScreen",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                id:"sideDrawerToggle"
                            }
                        ]
                    }
                },

            ],

            tabsStyle: { // optional, **iOS Only** add this if you want to style the tab bar beyond the defaults
                tabBarButtonColor: '#ff0000'
              },

            appStyle:{   //for android 
                tabBarSelectedButtonColor: '#ff9900',
            },
            drawer: {
                left: {
                    screen: "myApk.SideDrawerScreen"
                }
            }
        })
    );

};

export default startTabs;

