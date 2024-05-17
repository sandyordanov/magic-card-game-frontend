import axios from 'axios';
import TokenManager from "../Services/TokenManager";


const API_URL = "http://localhost:8080"; 
const afterSlash = "cards";

const CardService = {
    getCard: (id) => axios.get(`${API_URL}/${afterSlash}/${id}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
    }),

    getAllCards: () => axios.get(`${API_URL}/${afterSlash}`,{
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
    }),

    createCard: (name, attackPoints, healthPoints) => axios.post(`${API_URL}/${afterSlash}`,
    {
        "name": name,
        "attackPoints": attackPoints,
        "healthPoints": healthPoints
    },
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }
    
    ),

    updateCard: (input) => axios.put(`${API_URL}/${afterSlash}/${input.id}`,
    {
        "name" : input.name,
        "attackPoints" : input.attackPoints,
        "healthPoints" : input.healthPoints
    },
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }
    
    ),

    deleteCard: (id) => axios.delete(`${API_URL}/${afterSlash}/${id}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
    }),
}

export default CardService;