import { SET_PLACES, REMOVE_PLACE, PLACE_ADDED ,START_ADD_PLACE} from "./actionTypes"
import { uiStartLoading, uiStopLoading, authGetToken } from "./index"


export const  startAddPlace=()=>{
    return{
        type:START_ADD_PLACE
    }
    };


export const addPlace = (placeName, location, image,userId) => {
    return dispatch => {
        let authToken;

        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(token => {
                authToken= token;
                return fetch(
                    "https://us-central1-myapk-react-native.cloudfunctions.net/storeImage",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            image: image.base64
                        }),
                        headers:{
                            Authorization : "Bearer " +authToken
                        }
                    }
                );
            })
            .catch(err => {
                
                alert("Something went wrong ...please try again");
                dispatch(uiStopLoading());
            })
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                else{
                    throw new Error();
                }
            })
            .then(parsedRes => {
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parsedRes.imageUrl,
                    imagePath:parsedRes.imagePath,
                    userId:userId
                };
                  
                return fetch("https://myapk-react-native.firebaseio.com/places.json?auth="+
                authToken,
                 {
                    method: "POST",
                    body: JSON.stringify(placeData)
                })
                    .then(res =>{
                        if(res.ok){
                            return res.json();
                        }
                        else{
                            throw new Error();
                        }
                    })
                    .then(parsedRes => {
                        dispatch(uiStopLoading());
                        dispatch(placeAdded());
                        
                    })
                    .catch(err => {
                        
                        alert("Something went wrong ...please try again");
                        dispatch(uiStopLoading());
                    });
            });

    };

};

export const placeAdded=()=>{
return{
    type:PLACE_ADDED
}
};

export const getPlaces = (userId) => {
    return dispatch => {
          
        dispatch(authGetToken())
            .then(token => {
                const queryParams = '?auth='+ token +'&orderBy=\"userId\"&equalTo='+'\"'+userId+'\"';
                
                return fetch(
                    "https://myapk-react-native.firebaseio.com/places.json" + queryParams
                );
            })
            .catch(() => {
                alert("No valid token found!");
            })
            .then(res => {
                
                if(res.ok){
                    return res.json();
                }
                else{
                    throw new Error();
                }
                
               
            })
            .then(parsedRes => {
                
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        image: {
                            uri: parsedRes[key].image
                        },
                        key: key
                    });
                }
                dispatch(setPlaces(places));
            })
            .catch(err => {
                alert("Something went wrong, sorry ");
            
            });
    };


}

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    }
};


export const deletePlace = key => {

    return dispatch => {
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(token => {
                dispatch(removePlace(key));
                fetch("https://myapk-react-native.firebaseio.com/places/" + key +
                    ".json?auth=" +
                    token, {
                        method: "DELETE"
                    })
                    .then(res =>{
                        if(res.ok){
                            return res.json();
                        }
                        else{
                            throw new Error();
                        }
                    })
                    .then(parsedRes => {
                        console.log("done");
                    })
                    .catch(err => {
                        alert("Something went wrong ...please try again");
                    });
            });
    };
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};