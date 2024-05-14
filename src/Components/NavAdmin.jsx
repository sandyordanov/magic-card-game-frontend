import React from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"

function NavAdmin() {
    return (
        <div class="container bg-secondary">
            <div class="row">
                <div class="col">
                   <p class="navbar">MCG admin</p>
                </div>
            </div>
            
          
             <div class="row mt-2">
                <div class="col ">
                    <div class="row mb-3 align-middle">
                        <Link to="/cardsAdmin" className="nav-link">Cards</Link>
                    </div>
                    <div class="row mb-3 align-middle">
                        <Link to="/" className="nav-link">Else</Link>
                    </div> 
                </div>
            </div> 
        </div>
            
    )

}

export default NavAdmin;