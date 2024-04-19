import React from "react";
import './styles/Nav.css'
import { Link } from 'react-router-dom';

function NavAdmin() {
    return (
        <>
            <div class="banner">
                MCG admin
            </div>
            <nav className="navbar">
                <Link to="/cardsAdmin" className="nav-link">Cards</Link>
                <Link to="/" className="nav-link">Else</Link>
            </nav>
            

        </>
    )

}

export default NavAdmin;