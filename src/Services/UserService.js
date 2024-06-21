import axios from 'axios';
import TokenManager from "./TokenManager.js";

const API_URL = "http://localhost:8080"; 
const afterSlash = "users";

const UserService = {
    getUser: (id) => axios.get(`${API_URL}/${afterSlash}/${id}`),

    getAllUsers: () => axios.get(`${API_URL}/${afterSlash}`),

    createUser: (props) => axios.post(`${API_URL}/${afterSlash}`,
    {
        "username": props.username,
        "password": props.password
    }
    ),

    createAdmin: (props) => axios.post(`${API_URL}/${afterSlash}/admin`,

    {
        "username": props.username,
        "password": props.password
    },{headers: {Authorization: `Bearer ${TokenManager.getAccessToken()}`}}
    ),
    updateUser: (props) => axios.put(`${API_URL}/${afterSlash}/${props.id}`,
    {
        "id": props.id,
        "password": props.password
    }
    ),

    deleteUser: (id) => axios.delete(`${API_URL}/${afterSlash}/${id}`)
}

export default UserService;