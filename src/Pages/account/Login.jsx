import React, {useEffect, useState} from "react";
import LoginForm from "../../Components/LoginForm";
import TokenManager from '../../Services/TokenManager.js';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    useEffect(() => {

    }, []);
    const handleLogin = async (username, password) => {
         await axios.post('http://localhost:8080/tokens', {username, password})
            .then(response => response.data.accessToken)
            .then(accessToken => TokenManager.setAccessToken(accessToken))
            .then(() => {
               const claims = TokenManager.getClaims();
                if (claims.role[0] === "ADMIN") {
                    navigate('/cardsAdmin');
                }
                if (claims.role[0] === "PLAYER") {
                    navigate('/');
                }
            })
            .catch(error => {
                if (error.response && error.message) {
                   setServerError(error.response.data.error);
                }
            });
    }

    return (
        <LoginForm onLogin={handleLogin} serverError={serverError} />
    );
}

export default Login;
