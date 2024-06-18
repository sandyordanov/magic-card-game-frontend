import React, {useState} from "react";
import "../Components/styles/CardForm.css";
import CardService from "../Services/CardService";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import UserService from "../Services/UserService.js";

function CreateAdminForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = () => {
        let newAdmin = {
            username: username,
            password:password
        };

        UserService.createAdmin(newAdmin)
            .then((response) => {
                console.log(response.data);
                navigate('/cardsAdmin');
            })
    };

    return (
        <form className="card-form border border-black rounded-1 border-3 p-3 mt-2"
              onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-3">
                <h2>Create an admin</h2>
            </div>
            <div className="mb-3">
                <label htmlFor="attackPoints">Username: </label>
                <input
                    type="text"
                    {...register('username', {
                        required: 'Username is required',
                        minLength: {value: 3, message: 'Username must be at least 3 characters long'},
                        maxLength: {value: 20, message: 'Username cannot exceed 20 characters'}
                    })}
                    id="username"
                    className="form-control"
                    data-cy="input-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {errors.username && <p className="error-message">{errors.username.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="healthPoints">Password: </label>
                <input
                    type="text"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {value: 10, message: 'Password must be at least 10 characters long'},
                        max: {value: 40, message: 'Password cannot exceed 20 characters'}
                    })}
                    id="password"
                    className="form-control"
                    data-cy="input-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <button className="btn btn-primary" data-cy="btn-submit" type="submit">Register</button>
        </form>
    );
}

export default CreateAdminForm;
