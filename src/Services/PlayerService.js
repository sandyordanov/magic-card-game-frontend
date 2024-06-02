import axios from 'axios';
import TokenManager from "./TokenManager.js";

const API_URL = "http://localhost:8080";
const afterSlash = "players";
const accessToken = TokenManager.getAccessToken();

const PlayerService = {
    getPlayer: (userId) => axios.get(
        `${API_URL}/${afterSlash}/${userId}`,
        {headers: {Authorization: `Bearer ${accessToken}`}}
    ),
    getAllPlayers: () => axios.get(
        `${API_URL}/${afterSlash}`,
        {headers: {Authorization: `Bearer ${accessToken}`}}
    ),
}
export default PlayerService;