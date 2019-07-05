import React from "react";

import DefaultInput from "../UI/DefaultInput/DefaultInput"


const PlaceInput = props => (
       
        <DefaultInput
          placeholder="Place Name"
          value={props.placeName}
          onChangeText={props.onChangeText}
          autoCapitalize= 'words'
          autoCorrect ={false}
        />
        
);


export default PlaceInput;
