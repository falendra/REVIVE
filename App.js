import { Navigation } from  "react-native-navigation" ;
import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import { Provider } from 'react-redux';
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail"
import SideDrawerScreen from "./src/screens/SideDrawer/SideDrawer"

import configureStore from './src/store/configureStore';

const store = configureStore();


//register screen
Navigation.registerComponent("myApk.AuthScreen",()=> AuthScreen,store,Provider);
Navigation.registerComponent("myApk.SharePlaceScreen",()=> SharePlaceScreen,store,Provider);
Navigation.registerComponent("myApk.FindPlaceScreen",()=> FindPlaceScreen,store,Provider);
Navigation.registerComponent("myApk.PlaceDetailScreen",()=> PlaceDetailScreen,store,Provider);
Navigation.registerComponent("myApk.SideDrawerScreen",()=> SideDrawerScreen,store,Provider);

//start app

export default()=> Navigation.startSingleScreenApp({
  screen:{
    screen:"myApk.AuthScreen",
    title:"Login"
  }
});