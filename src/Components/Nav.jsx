import React, {useEffect, useState} from "react";
import { Client } from '@stomp/stompjs';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import TokenManager from "../Services/TokenManager.js";
import PlayerService from "../Services/PlayerService.js";

function Nav() {
    const token = TokenManager.getAccessToken();
    const userId = TokenManager.getUserId();
    const claims = TokenManager.getClaims();
    const navigate = useNavigate();
    const [player ,setPlayer] = useState({})

    useEffect(() => {
        if (token != undefined){
            PlayerService.getPlayer(userId).then((response) =>{
                setPlayer(response.data)
            });
        }
    }, [token, userId]);
    const handleLogout = () => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket for logout');
                client.publish({
                    destination: '/app/status',
                    body: JSON.stringify({ username: player.name, online: false }),
                });
                client.deactivate();
                TokenManager.clear();
                navigate('/login');
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket after logout');
            },
        });

        client.activate();
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark rounded-3 text-decoration-none mt-3 p-3 ms-2 me-2 bg-opacity-75">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="/">MCG</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-light" href="/">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="/deck">Decks</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="/">Account</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        {(!token || !claims) ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/register">Register</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a onClick={handleLogout} className="nav-link text-white" style={{ cursor: 'pointer' }}>Logout</a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-success text-light" to="/play">Play</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
