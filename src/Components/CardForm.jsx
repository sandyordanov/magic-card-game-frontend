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
    <form className="card-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="attackPoints">Attack Points: </label>
        <input
          type="number"
          id="attackPoints"
          value={attackPoints}
          onChange={(e) => setAttackPoints(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="healthPoints">Health Points: </label>
        <input
          type="number"
          id="healthPoints"
          value={healthPoints}
          onChange={(e) => setHealthPoints(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Card</button>
    </form>
  );
}

export default CardForm;
