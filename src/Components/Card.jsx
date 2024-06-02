import React from "react";
import "../Components/styles/Card.css";

function Card(props) {
    return (
        <div className="card rounded-4 border border-3 border-black position-relative" style={{maxWidth:"18rem"}}>
            <img src="/eyecard.png" className="card-img-top" alt="..." style={{ maxHeight: "200px" }} />
            <div className="text-center">
                <div className="row">
                    <div className="col">
                        <p className="card-text ap rounded-3 text-white fw-bold align-content-center">
                            <img className="mb" src="/sword32.png" alt="sword" /> {props.attackPoints}
                        </p>
                    </div>
                    <div className="col">
                        <p className="card-text hp rounded-3 text-white fw-bold align-content-center">
                            <img className="mb" src="/shield.png" alt="shield" /> {props.healthPoints}
                        </p>
                    </div>
                </div>
            </div>
            <div className="card-body p-2">
                <h5 className="card-title text-nowrap text-truncate">{props.name}</h5>
            </div>
        </div>
    );
}

export default Card;
