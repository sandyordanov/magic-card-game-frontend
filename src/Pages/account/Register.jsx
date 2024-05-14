import React, { useState, useHistory } from 'react';
import UserService from '../../Services/UserService';
import 'bootstrap/dist/css/bootstrap.css'

function RegisterForm() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     UserService.createUser(formData)

   };

  return (
    <div class="container ">
      <div class="row border border-solid p-3">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div class="col mb-2">
          <label class="me-2">Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label class="me-2">Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button class="mt-2" type="submit">Register</button>
      </form>
    </div>
      </div>
  );
}

export default RegisterForm;