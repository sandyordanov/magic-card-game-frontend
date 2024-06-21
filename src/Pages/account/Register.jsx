import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import UserService from '../../Services/UserService';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const onSubmit = (data) => {
    UserService.createUser(data)
        .then(response => {
          navigate('/login');
        })
        .catch(error => {
          if (error.response && error.response.data) {
            setServerError(error.response.data.error);
          }
        });
  };

  return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-12 col-md-12 col-lg-4">
            <h2 className="mb-3 mt-2">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="me-2 form-label">Username:</label>
                <input
                    className="form-control"
                    data-cy="username-input"
                    type="text"
                    {...register('username', {
                      required: 'Username is required',
                      minLength: { value: 3, message: 'Username must be at least 3 characters' },
                      maxLength: { value: 20, message: 'Username cannot exceed 20 characters' }
                    })}
                />
                {errors.username && <div className="text-danger">{errors.username.message}</div>}
              </div>
              <div className="mb-3">
                <label className="me-2 form-label">Password:</label>
                <input
                    className="form-control"
                    data-cy="password-input"
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' }
                    })}
                />
                {errors.password && <div className="text-danger">{errors.password.message}</div>}
              </div>
              {serverError && <div className="text-danger">{serverError}</div>}
              <div className="mb-3">
                <button type="submit" data-cy="register-button" className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}

export default RegisterForm;
