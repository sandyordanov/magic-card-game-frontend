import React from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

function NavAdmin() {
    return (
        <div className="container-fluid h-100">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-dark bg-dark flex-column text-center">
                        <a className="navbar-brand" href="#">MCG Admin</a>
                        <ul className="navbar-nav flex-column">
                            <li className="nav-item">
                                <Link to="/cardsAdmin" className="nav-link text-white">All Cards</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-white">Else</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default NavAdmin;
