import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import "../Components/styles/CardForm.css";

function CardForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form className="card-form border border-black rounded-1 border-3 p-3 mt-2" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-3">
                <h2>Create cards</h2>
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                    type="text"
                    {...register('name', {
                        required: 'Name is required',
                        minLength: { value: 3, message: 'Name must be at least 3 characters' },
                        maxLength: { value: 20, message: 'Name cannot exceed 20 characters' }
                    })}
                    className="form-control"
                    id="name"
                    data-cy="input-name"
                />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="attackPoints" className="form-label">Attack Points:</label>
                <input
                    type="number"
                    {...register('attackPoints', {
                        required: 'Attack Points are required',
                        min: { value: 0, message: 'Attack Points must be at least 0' },
                        max: { value: 20, message: 'Attack Points cannot exceed 20' }
                    })}
                    className="form-control"
                    id="attackPoints"
                    data-cy="input-ap"
                />
                {errors.attackPoints && <p className="error-message">{errors.attackPoints.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="healthPoints" className="form-label">Health Points:</label>
                <input
                    type="number"
                    {...register('healthPoints', {
                        required: 'Health Points are required',
                        min: { value: 0, message: 'Health Points must be at least 0' },
                        max: { value: 20, message: 'Health Points cannot exceed 20' }
                    })}
                    className="form-control"
                    id="healthPoints"
                    data-cy="input-hp"
                />
                {errors.healthPoints && <p className="error-message">{errors.healthPoints.message}</p>}
            </div>
            <div className="text-center">
                <button className="btn btn-primary" data-cy="btn-create" type="submit">Create Card</button>
            </div>
        </form>
    );
}

export default CardForm;
