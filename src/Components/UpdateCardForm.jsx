import React, { useState } from "react";

import "../Components/styles/CardForm.css";
import CardService from "../Services/CardService";
import { useNavigate } from "react-router-dom";

function UpdateCardForm(input) {
  const selectedCard = input.selectedCard;
  const navigate = useNavigate();
    const [name, setName] = useState(selectedCard.name || "");
    const [attackPoints, setAttackPoints] = useState(selectedCard.attackPoints || "");
    const [healthPoints, setHealthPoints] = useState(selectedCard.healthPoints || "");
    
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let newCard = {
      id : selectedCard.id,
      name : name,
      attackPoints : attackPoints,
      healthPoints: healthPoints
    }

    CardService.updateCard(newCard)
    .then((response) => {
        console.log(response.data);
        navigate('/cardsAdmin');
      }
    )
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
