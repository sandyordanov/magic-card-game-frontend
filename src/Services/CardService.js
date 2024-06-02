import axios from 'axios';
import TokenManager from "./TokenManager.js";


const API_URL = "http://localhost:8080"; 
const afterSlash = "cards";
const accessToken = TokenManager.getAccessToken();
const CardService = {
    getCard: (id) => axios.get(`${API_URL}/${afterSlash}/${id}`,
    {
        headers: { Authorization: `Bearer ${accessToken}` },
    }),

    getAllCards: () => axios.get(`${API_URL}/${afterSlash}`,{
        headers: { Authorization: `Bearer ${accessToken}` },
    }),

    createCard: (name, attackPoints, healthPoints) => axios.post(`${API_URL}/${afterSlash}`,
    {
        "name": name,
        "attackPoints": attackPoints,
        "healthPoints": healthPoints
    },
    {
        headers: { Authorization: `Bearer ${accessToken}` }
    }
    
    ),

    updateCard: (input) => axios.put(`${API_URL}/${afterSlash}/${input.id}`,
    {
        "name" : input.name,
        "attackPoints" : input.attackPoints,
        "healthPoints" : input.healthPoints
    },
    {
        headers: { Authorization: `Bearer ${accessToken}` }
    }
    
    ),

    deleteCard: (id) => axios.delete(`${API_URL}/${afterSlash}/${id}`,
    {
        headers: { Authorization: `Bearer ${accessToken}` },
    }),
}

export default CardService;