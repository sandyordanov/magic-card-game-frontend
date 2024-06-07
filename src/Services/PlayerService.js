import axios from 'axios';
import TokenManager from "./TokenManager.js";

const API_URL = "http://localhost:8080";
const afterSlash = "players";

const PlayerService = {
    getPlayer: (userId) => axios.get(
        `${API_URL}/${afterSlash}/${userId}`,
        {headers: {Authorization: `Bearer ${TokenManager.getAccessToken()}`}}
    ),
    getAllPlayers: () => axios.get(
        `${API_URL}/${afterSlash}`,
        {headers: {Authorization: `Bearer ${TokenManager.getAccessToken()}`}}
    ),
}
export default PlayerService;