import React, {useEffect, useState} from "react";
import './styles/Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from "../Components/Nav.jsx";
import DeckService from "../Services/DeckService.js";
import TokenManager from "../Services/TokenManager.js";
import DraggableCard from "../Components/DragableCard.jsx";
import {DroppableDeck, DroppableOwnedCards} from "../Components/Droppables.jsx";
import PlayerService from "../Services/PlayerService.js";

const Decks = () => {
    const [ownedCards, setOwnedCards] = useState([]);
    const [deck, setDeck] = useState([]);
    const userId = TokenManager.getUserId();
    const [player, setPlayer] = useState(null);
    const [avgStats, setAvgStats] = useState({});

    useEffect(() => {
        PlayerService.getPlayer(userId).then((result) => {
            setPlayer(result.data);
            const ownedCardsData = result.data.ownedCards;
            const deckData = result.data.deck.cards;
            const deckCardIds = new Set(deckData.map(card => card.id));
            const filteredOwnedCards = ownedCardsData.filter(card => !deckCardIds.has(card.id));

            setOwnedCards(filteredOwnedCards);
            setDeck(deckData);
        });
    }, [userId]);

    useEffect(() => {
        if (player && player.deck) {
            DeckService.getAverageStats(player.deck.id).then((response) => {
                setAvgStats(response.data);
            });
        }
    }, [deck, player]);

    const moveCardToDeck = async (cardId) => {
        const cardToMove = ownedCards.find(card => card.id === cardId);
        const props = {
            deckId: player.deck.id,
            cardId: cardId
        };
        try {
            const response = await DeckService.addCard(props);
            if (response.status === 200) {
                setDeck(prevDeck => [...prevDeck, cardToMove]);
                setOwnedCards(prevOwnedCards => prevOwnedCards.filter(card => card.id !== cardId));
            }
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    const moveCardToOwned = async (cardId) => {
        const props = {
            deckId: player.deck.id,
            cardId: cardId
        };
        const cardToMove = deck.find(card => card.id === cardId);
        try {
            const response = await DeckService.removeCard(props);
            if (response.status === 204) {
                setOwnedCards(prevOwnedCards => [...prevOwnedCards, cardToMove]);
                setDeck(prevDeck => prevDeck.filter(card => card.id !== cardId));
            } else {
                console.error('Failed to remove card from deck', response);
            }
        } catch (error) {
            console.error('Error removing card from deck', error);
        }
    };

    return (
        <div className="decks-page">
            <Nav/>
            <div className="container mt-2 bg-dark text-white rounded-top-3">
                <div className="row mt-3">
                    <div className="col">
                        <p>Average attack
                            points: {Number(avgStats.averageAttackPoints).toFixed(2)}</p>
                    </div>
                    <div className="col">
                        <p>Average health points: {Number(avgStats.averageHealthPoints).toFixed(2)}</p>
                    </div>
                    <div className="col text-end">
                        <p> {deck.length} / {Number(avgStats.deckSize)}</p>
                    </div>
                </div>
            </div>
            <DroppableDeck cards={deck} onDrop={moveCardToDeck}>
                {(cards) => (
                    <div>
                        <h4 className="text-white text-center">Deck</h4>
                        <div className="droppable-container">
                            {cards.map((element, index) => (
                                <div key={index} className="">
                                    <DraggableCard card={element} type="DECK_CARD"/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </DroppableDeck>
            <DroppableOwnedCards cards={ownedCards} onDrop={moveCardToOwned}>
                {(cards) => (
                    <div>
                        <h4 className="text-white text-center">Owned cards</h4>
                        <div className="droppable-container">
                            {cards.map((element, index) => (
                                <div key={index} className="">
                                    <DraggableCard card={element} type="OWNED_CARD"/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </DroppableOwnedCards>

        </div>
    );
};

export default Decks;
