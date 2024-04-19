import React from "react";
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <>
            <div class="banner">
                This is a banner.
            </div>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/deck">Decks</Link>
                <Link to="/account">User Information</Link>
                <Link to="/play">Play</Link>
            </nav>
        </>
    )

}

export default Nav;