import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import TokenManager from "../Services/TokenManager.js";
function NavAdmin() {
    const navigate = useNavigate();
    const handleLogout = () => {
        TokenManager.clear();
        navigate('/');
    };




    return (
        <div>
            <div className={`nav-admin-container`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <nav className="navbar navbar-dark bg-dark flex-column text-center">
                                <a className="navbar-brand" href="#">MCG Admin</a>
                                <ul className="navbar-nav flex-column">
                                    <li className="nav-item">
                                        <Link to="/cardsAdmin" className="nav-link text-white">Cards</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admins" className="nav-link text-white">Admins</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a onClick={handleLogout} className="nav-link text-white" style={{ cursor: 'pointer' }}>Logout</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavAdmin;
