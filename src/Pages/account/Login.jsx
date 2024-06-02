import React, {useState} from "react";
import LoginForm from "../../Components/LoginForm";
import AuthAPI from "../../Services/AuthAPI.js";
import TokenManager from '../../Services/TokenManager.js';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [claims, setClaims] = useState(TokenManager.getClaims());

function redirect(){
    if (claims.role[0] === "ADMIN") {
        navigate('/cardsAdmin');
    }
    if (claims.role[0] === "PLAYER") {
        navigate('/');
    }
}
    const handleLogin = (username, password) => {
        AuthAPI.login(username, password)

            .then(newClaims => {
                setClaims(newClaims)
                redirect();
            })
            .catch(error => console.error(error));

    }

    return (
        <LoginForm onLogin={handleLogin}></LoginForm>
    );
}

export default Login;
