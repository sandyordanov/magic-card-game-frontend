import React, { useState, useHistory } from 'react';
import UserService from '../../Services/UserService';
import 'bootstrap/dist/css/bootstrap.css'
import {useNavigate} from "react-router-dom";

function RegisterForm() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
    const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
    function redirect(){

    }
  const handleSubmit = (e) => {
    e.preventDefault();
     UserService.createUser(formData)
         .catch(() => alert("Register failed!"))
        .then(response => {
          navigate("/login");
        })
        .catch(error => console.error(error.errors));

   };

  return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-12 col-md-12 col-lg-4">
            <h2 className="mb-3 mt-2">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="me-2 form-label">Username:</label>
                <input class="form-control" type="text" name="username" value={formData.username} onChange={handleChange}/>
              </div>
              <div className="mb-3">
                <label className="me-2 form-label">Password:</label>
                <input class="form-control" type="password" name="password" value={formData.password} onChange={handleChange}/>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
)
  ;
}

export default RegisterForm;