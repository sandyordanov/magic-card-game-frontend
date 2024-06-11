import {Navigate} from "react-router-dom";
import TokenManager from "../Services/TokenManager.js";

const ProtectedRoute = ({ children, roles }) => {
    const token = TokenManager.getAccessToken();
    const claims = TokenManager.getClaims();

    if (!token || !claims) {
        // If not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    const userRoles = claims.role;
    if (roles && roles.length > 0 && !roles.some(role => userRoles.includes(role))) {
        // If user doesn't have the required role, redirect to home or an unauthorized page
        return <Navigate to="/" replace />;
    }

    // If everything is fine, render the children components
    return children;
};

export default ProtectedRoute;