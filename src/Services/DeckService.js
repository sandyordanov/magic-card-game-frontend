import axios from 'axios';
import TokenManager from "./TokenManager.js";


const API_URL = "http://localhost:8080";
const afterSlash = "decks";
const accessToken = TokenManager.getAccessToken();
const DeckService = {
    getDeck: (deckId) => axios.get(
        `${API_URL}/${afterSlash}/${deckId}`,
        {headers: {Authorization: `Bearer ${accessToken}`}}
    ),

    getAverageStats: (deckId) => axios.get(
        `${API_URL}/${afterSlash}/${deckId}/average-stats`,
        {headers: {Authorization: `Bearer ${accessToken}`}}
    ),

    addCard: (props) => axios.put(
        `${API_URL}/${afterSlash}/${props.deckId}/card/${props.cardId}`,
        {},
        {
            headers: {Authorization: `Bearer ${accessToken}`},
        }),

    removeCard: (props) => axios.delete(
        `${API_URL}/${afterSlash}/${props.deckId}/card/${props.cardId}`,
        {headers: {Authorization: `Bearer ${accessToken}`}}
    ),
}

export default DeckService;