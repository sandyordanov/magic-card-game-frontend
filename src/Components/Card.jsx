import React from "react";
import "../Components/styles/Card.css";

function Card(props) {
    return (
        <div className="card rounded-4 border border-3 border-black ps-2 pe-2" style={{maxWidth:"11rem"}}>
            <img src="/eyecard.png" className="card-img-top mb-1" alt="..." style={{ maxHeight: "9rem" }} />
            <div className="text-center p-2">
                <div className="row stats">
                    <div className="col p-1">
                        <p className="card-text text-nowrap ap rounded-3 text-white">
                            <img className="" src="/sword32.png" alt="sword"/> {props.attackPoints}
                        </p>
                    </div>
                    <div className="col p-1">
                        <p className=" hp rounded-3 text-nowrap text-white">
                            <img className="" src="/shield.png" alt="shield"/> {props.healthPoints}
                        </p>
                    </div>
                </div>
                <h5 className="title text-nowrap text-truncate">{props.name}</h5>
            </div>
        </div>
    );
}

export default Card;
