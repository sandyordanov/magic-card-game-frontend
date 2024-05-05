import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import CardForm from "../Components/CardForm";
import NavAdmin from "../Components/NavAdmin";
import CardService from "../Services/CardService";
import "../Pages/styles/CardsPage.css";
import { useNavigate } from "react-router-dom";

function CardsPage() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    CardService.getAllCards().then((result) => {
      setCards(result.data.cards);
    });
  }, []);

  const handleCreate = (newCard) => {
    CardService.createCard(newCard.name, newCard.attackPoints, newCard.healthPoints).then((response) => {
      setCards([...cards, response.data]);
      console.log(response.data);
      console.log("Created card with id:", response.data.id);
    });
  };
  
  const handleDelete = (id) => {
    CardService.deleteCard(id)
      .then(() => {
        setCards(cards.filter((card) => card.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  };
  return (
    <>
      <NavAdmin />
      <h2>Create cards</h2>
      <CardForm onSubmit={handleCreate}></CardForm>

      <h2>All cards</h2>
      <div className="cards-container">
        {cards.map((element, index) => (
          <div key={index} className="card-container">
            <Card {...element}></Card>
            <div className="button-container">
              <button onClick={()=>{navigate('/updateCard', { state: element })}}>Update</button>
              <button onClick={() => handleDelete(element.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardsPage;
