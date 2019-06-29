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

            drawer: {
                left: {
                    screen: "myApk.SideDrawerScreen"
                }
            }
        })
    );

};

export default startTabs;

