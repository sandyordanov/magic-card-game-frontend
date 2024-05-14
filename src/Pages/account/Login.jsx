import React, { useState } from "react";
import LoginForm from "../../Components/LoginForm";
import AuthAPI from "../../Services/AuthAPI";
import TokenManager from '../../Services/TokenManager';

function Login() {
  // Define state for managing claims
  const [claims, setClaims] = useState(TokenManager.getClaims());

  // Define login handler function
  const handleLogin = (username, password) => {
    AuthAPI.login(username, password)
      .catch(() => alert("Login failed!"))
      .then(newClaims => setClaims(newClaims))
      .catch(error => console.error(error));
  }

  return (
    <LoginForm onLogin={handleLogin}></LoginForm>
  );
}

export default Login;
