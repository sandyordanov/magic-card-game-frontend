import axios from 'axios';

const API_URL = "http://localhost:8080"; 
const afterSlash = "cards";

const CardService = {
    getCard: (id) => axios.get(`${API_URL}/${afterSlash}/${id}`),

    getAllCards: () => axios.get(`${API_URL}/${afterSlash}`),

    createCard: (name, attackPoints, healthPoints) => axios.post(`${API_URL}/${afterSlash}`,
    {
        "name": name,
        "attackPoints": attackPoints,
        "healthPoints": healthPoints
    }
    ),

    updateCard: (input) => axios.put(`${API_URL}/${afterSlash}/${input.id}`,
    {
        "name" : input.name,
        "ap" : input.attackPoints,
        "hp" : input.healthPoints
    }
    ),

    deleteCard: (id) => axios.delete(`${API_URL}/${afterSlash}/${id}`)
}

export default CardService;