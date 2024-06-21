import React from 'react';
import './styles/Home.css';
import Nav from '../Components/Nav';
import Invite from "./Invite.jsx";
import TokenManager from "../Services/TokenManager.js";

const Home = () => {
    const token = TokenManager.getAccessToken();
    return (
        <div className="home-container">
            <Nav />
            <div className="row">
                <div className=" col-md-10">
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-5 text-center">
                                <h1>Welcome to Magic Card Game!</h1>
                                <p className="bg-dark bg-opacity-75 text-white border border-1 rounded-1">
                                    Arcane Realms is a strategic card game set in a fantasy world where players take on the roles of powerful wizards competing for dominance. Each player commands a deck of magical spells, creatures, and artifacts, seeking to outmaneuver and outwit their opponents in a battle of wits and magic.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {token && (
                    <div className="col-3 invites-container">
                        <Invite />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
