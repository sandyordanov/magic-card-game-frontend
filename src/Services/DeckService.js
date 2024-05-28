import axios from 'axios';
import TokenManager from "../Services/TokenManager";


const API_URL = "http://localhost:8080";
const afterSlash = "decks";

const DeckService = {
    addCard: (props) => axios.put(`${API_URL}/${afterSlash}/add/${props.userId}/card/${props.cardId}`,
        {},
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        }),
    removeCard: (props) => axios.delete(`${API_URL}/${afterSlash}/remove/${props.userId}/card/${props.cardId}`,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }
    ),
    getDeck: (id) => axios.get(`${API_URL}/${afterSlash}/${id}`,{
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
    }),
    getOwnedCards: (id) => axios.get(`${API_URL}/${afterSlash}/ownedCards/${id}`,{
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
    }),
}

export default DeckService;