import React, { useState } from "react";
import "../Components/styles/CardForm.css";
import CardService from "../Services/CardService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function UpdateCardForm({ selectedCard }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const [name, setName] = useState(selectedCard.name || "");
    const [attackPoints, setAttackPoints] = useState(selectedCard.attackPoints || "");
    const [healthPoints, setHealthPoints] = useState(selectedCard.healthPoints || "");

    const handleFormSubmit = (data) => {
        let newCard = {
            id: selectedCard.id,
            name: data.name,
            attackPoints: data.attackPoints,
            healthPoints: data.healthPoints
        };

        CardService.updateCard(newCard)
            .then((response) => {
                console.log(response.data);
                navigate('/cardsAdmin');
            })
    };

    return (
        <form className="card-form border border-black rounded-1 border-3 p-3 mt-2" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-3">
                <h2>Update card</h2>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    {...register('name', {
                        required: 'Name is required',
                        minLength: { value: 3, message: 'Name must be at least 3 characters' },
                        maxLength: { value: 20, message: 'Name cannot exceed 20 characters' }
                    })}
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="attackPoints">Attack Points: </label>
                <input
                    type="number"
                    {...register('attackPoints', {
                        required: 'Attack Points are required',
                        min: { value: 0, message: 'Attack Points must be at least 0' },
                        max: { value: 20, message: 'Attack Points cannot exceed 20' }
                    })}
                    id="attackPoints"
                    className="form-control"
                    value={attackPoints}
                    onChange={(e) => setAttackPoints(e.target.value)}
                    required
                />
                {errors.attackPoints && <p className="error-message">{errors.attackPoints.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="healthPoints">Health Points: </label>
                <input
                    type="number"
                    {...register('healthPoints', {
                        required: 'Health Points are required',
                        min: { value: 0, message: 'Health Points must be at least 0' },
                        max: { value: 20, message: 'Health Points cannot exceed 20' }
                    })}
                    id="healthPoints"
                    className="form-control"
                    value={healthPoints}
                    onChange={(e) => setHealthPoints(e.target.value)}
                    required
                />
                {errors.healthPoints && <p className="error-message">{errors.healthPoints.message}</p>}
            </div>
            <button className="btn btn-primary" type="submit">Update Card</button>
        </form>
    );
}

export default UpdateCardForm;
