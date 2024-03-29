import React, { useState } from "react";

import "../Components/styles/CardForm.css";

function UpdateCardForm({ onSubmit, selectedCard }) {
    const [name, setName] = useState(selectedCard.name || "");
    const [attackPoints, setAttackPoints] = useState(selectedCard.attackPoints || "");
    const [healthPoints, setHealthPoints] = useState(selectedCard.healthPoints || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({selectedCard});
    
    setName("");
    setAttackPoints("");
    setHealthPoints("");
  };

  return (
    
    <form className="card-form" onSubmit={handleSubmit}>
      <div>
        <h2>Update card</h2>
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
      <button type="submit">Update Card</button>
    </form>
  );
}

export default UpdateCardForm;
