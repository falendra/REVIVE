import { ADD_PLACE, DELETE_PLACE } from "../actions/actionTypes"



const initialState = {
    places: [],
    selectedPlace: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,

                places: state.places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    image: {
                        uri: "https://images.unsplash.com/photo-1541890289-b86df5bafd81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1456&q=80"
                    },
                    location:action.location
                })
            };


        case DELETE_PLACE:
            return{
                ...state,
                places: state.places.filter((place) => {
                    return place.key !== action.placeKey;
                  }),
                  
            };

        
        default:
            return state;
    }

};

export default reducer;
