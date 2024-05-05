import React, {useState} from "react";
import "../Components/styles/Card.css";

function Card(props){

    return(
        <div className="card">
 
        <h5 className="title"> {props.name}</h5>
        <p className="point">Attack points: {props.ap}</p>
        <p className="point">Health points: {props.hp}</p>
        
        </div>
       
    )
}
export default Card;