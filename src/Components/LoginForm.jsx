import React from 'react';
import { useForm } from 'react-hook-form';

function LoginForm({ onLogin, serverError }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        onLogin(data.username, data.password);
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-sm-12 col-md-12 col-lg-4">
                    <h2 className="mb-3 mt-2">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="me-2 form-label">Username:</label>
                            <input
                                className="form-control"
                                type="text"
                                {...register('username', {
                                    required: 'Username is required'
                                })}
                            />
                            {errors.username && <div className="text-danger">{errors.username.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="me-2 form-label">Password:</label>
                            <input
                                className="form-control"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required'
                                })}
                            />
                            {errors.password && <div className="text-danger">{errors.password.message}</div>}
                        </div>
                        {serverError && <div className="text-danger">{serverError}</div>}
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
