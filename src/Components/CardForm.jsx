import React, { useState } from "react";

import "../Components/styles/CardForm.css";

function CardForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [attackPoints, setAttackPoints] = useState("");
  const [healthPoints, setHealthPoints] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, attackPoints, healthPoints });
    
    setName("");
    setAttackPoints("");
    setHealthPoints("");
  };

  return (
      <form className="card-form border border-black rounded-1 border-3 p-3 mt-2" onSubmit={handleSubmit}>
          <div className="mb-3">
              <h2>Create cards</h2>
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
              />
          </div>
          <div className="mb-3">
              <label htmlFor="attackPoints" className="form-label">Attack Points:</label>
              <input
                  type="number"
                  className="form-control"
                  id="attackPoints"
                  value={attackPoints}
                  onChange={(e) => setAttackPoints(e.target.value)}
                  required
              />
          </div>
          <div className="mb-3">
              <label htmlFor="healthPoints" className="form-label">Health Points:</label>
              <input
                  type="number"
                  className="form-control"
                  id="healthPoints"
                  value={healthPoints}
                  onChange={(e) => setHealthPoints(e.target.value)}
                  required
              />
          </div>
          <div className="text-center">
              <button className="btn btn-primary" type="submit">Create Card</button>
          </div>
      </form>

  );
}

export default CardForm;
