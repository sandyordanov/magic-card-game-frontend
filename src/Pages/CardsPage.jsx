import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import CardForm from "../Components/CardForm";
import UpdateCardForm from "../Components/UpdateCardForm";
import NavAdmin from "../Components/NavAdmin";
import CardService from "../Services/CardService";
import "../Pages/styles/CardsPage.css";

function CardsPage() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    CardService.getAllCards().then((result) => {
      setCards(result.data);
    });
  }, []);

  const handleCreate = (newCard) => {
    CardService.createCard(newCard.name, newCard.attackPoints, newCard.healthPoints).then((response) => {
      setCards([...cards, response.data]);
      console.log(response.data);
      console.log("Created card with id:", response.data.id);
    });
  };

  const handleUpdate = (name, attackPoints, healthPoints) => {
    CardService.updateCard(selectedCard.id, name, attackPoints, healthPoints).then(() => {
      setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
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
      {selectedCard && (
        <UpdateCardForm onSubmit={() => handleUpdate()} selectedCard={selectedCard} />
      )}

      <h2>All cards</h2>
      <div className="cards-container">
        {cards.map((element, index) => (
          <div key={index} className="card-container">
            <Card {...element}></Card>
            <div className="button-container">
              <button onClick={() => setSelectedCard(element)}>Update</button>
              <button onClick={() => handleDelete(element.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardsPage;
