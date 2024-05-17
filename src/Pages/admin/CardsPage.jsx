import React, {useState, useEffect} from "react";
import Card from "../../Components/Card.jsx";
import CardForm from "../../Components/CardForm.jsx";
import NavAdmin from "../../Components/NavAdmin.jsx";
import CardService from "../../Services/CardService.js";
import "../styles/CardsPage.css";
import {useNavigate} from "react-router-dom";

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
        <div className="page-container">
            <div className="row">
                <div className="col-2 bg-dark">
                    <NavAdmin class=""/>
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-4">
                            <CardForm onSubmit={handleCreate}></CardForm>
                        </div>
                        <div className="row">
                            <h2 className="mb-1 mt-2">All cards</h2>
                            <div className="cards-container container">
                                {cards.map((element, index) => (
                                    <div key={index} className="card-container">
                                        <Card {...element}></Card>
                                        <div className="button-container container">
                                            <div className="row justify-content-center">
                                                <div className="col">
                                                    <button className="btn btn-outline-primary" onClick={() => {
                                                        navigate('/updateCard', {state: element})
                                                    }}>Update
                                                    </button>
                                                    <button className="btn btn-danger"
                                                            onClick={() => handleDelete(element.id)}>Delete
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardsPage;
