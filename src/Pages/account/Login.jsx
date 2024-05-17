import React, {useState} from "react";
import LoginForm from "../../Components/LoginForm";
import AuthAPI from "../../Services/AuthAPI";
import TokenManager from '../../Services/TokenManager';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [claims, setClaims] = useState(TokenManager.getClaims());

function redirect(){
    if (TokenManager.getClaims().role[0] === "ADMIN") {
        navigate('/cardsAdmin');
    }
    if (TokenManager.getClaims().role[0] === "PLAYER") {
        navigate('/');
    }
}
    const handleLogin = (username, password) => {
        AuthAPI.login(username, password)
            .catch(() => alert("Login failed!"))
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
