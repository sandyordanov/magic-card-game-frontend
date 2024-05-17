import React from "react";
import {Link} from 'react-router-dom';

function Nav() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark rounded-3 text-decoration-none mt-3 p-3 ms-2 me-2 bg-opacity-75">
                <div className="container-fluid">

                    <a className="navbar-brand text-white" href="#">MCG</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/shop">Shop</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/deck">Decks</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/account">Account</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/register">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className=" nav-link text-light" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-success text-light" href="/play">Play</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )

}

export default Nav;