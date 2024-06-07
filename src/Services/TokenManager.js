import { jwtDecode } from "jwt-decode";
const TokenManager = {
    getAccessToken: () => sessionStorage.getItem("accessToken"),
    getClaims: () => {
        if (!sessionStorage.getItem("claims")) {
            return undefined;
        }
        return JSON.parse(sessionStorage.getItem("claims"));
    },
    getUserId: () => {
        if (!sessionStorage.getItem("claims")) {
            return undefined;
        }
        return JSON.parse(sessionStorage.getItem("claims")).userId;
    },
    setAccessToken: (token) => {
        sessionStorage.setItem("accessToken", token);
        const claims = jwtDecode(token);
        sessionStorage.setItem("claims", JSON.stringify(claims));
        return claims;
    },
    clear: () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("claims");
    },
    logout: () => {
        TokenManager.clear();
        window.location.href = '/login';  // Redirect to the login page after logout
    }
}

export default TokenManager;