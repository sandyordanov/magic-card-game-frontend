import React, { useState } from 'react';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      props.onLogin(username, password);
    }
  
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-sm-12 col-md-12 col-lg-4">
                    <h2 className="mb-3 mt-2">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="me-2 form-label">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="me-2 form-label">Password:</label>
                            <input className="form-control"
                                   type="password"
                                   name="password"
                                   value={password}
                                   placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
)
    ;
}

export default LoginForm;