import React, {useEffect, useState} from "react";
import './styles/Home.css'
import 'bootstrap/dist/css/bootstrap.css';
import Nav from "../Components/Nav.jsx";
import DeckService from "../Services/DeckService.js";
import TokenManager from "../Services/TokenManager.jsx";
import DraggableCard from "../Components/DragableCard.jsx"
import {DroppableDeck, DroppableOwnedCards} from "../Components/Droppables.jsx";

const Decks = () => {
    const [ownedCards, setOwnedCards] = useState([]);
    const [deck, setDeck] = useState([]);
    const claims = TokenManager.getClaims();

    useEffect(() => {
        // Fetch owned cards and deck in parallel
        Promise.all([
            DeckService.getOwnedCards(claims.studentId),
            DeckService.getDeck(claims.studentId)
        ]).then(([ownedCardsResult, deckResult]) => {
            const ownedCardsData = ownedCardsResult.data.cards;
            const deckData = deckResult.data.cards;

            // Create a Set of card IDs that are in the deck
            const deckCardIds = new Set(deckData.map(card => card.id));

            // Filter out owned cards that are in the deck
            const filteredOwnedCards = ownedCardsData.filter(card => !deckCardIds.has(card.id));

            setOwnedCards(filteredOwnedCards);
            setDeck(deckData);
        });
    }, [claims.studentId]);

    const moveCardToDeck = async (cardId) => {
        const cardToMove = ownedCards.find(card => card.id === cardId);
        const props = {
            "userId": claims.studentId,
            "cardId": cardId
        }
        try {
            const response = await DeckService.addCard(props);
            if (response.status === 200) {
                setDeck(prevDeck => [...prevDeck, cardToMove]);
                setOwnedCards(prevOwnedCards => prevOwnedCards.filter(card => card.id !== cardId));
            } else {
                // Handle non-200 responses if necessary
                console.error('Failed to add card to deck', response);
            }
        } catch (error) {
            // Handle error if the request fails
            console.error('Error adding card to deck', error);
        }
    };

    const moveCardToOwned = async (cardId) => {
        const props = {
            "userId": claims.studentId,
            "cardId": cardId
        }
        const cardToMove = deck.find(card => card.id === cardId);
        try {
            const response = await DeckService.removeCard(props);
            if (response.status === 204) {
                setOwnedCards(prevOwnedCards => [...prevOwnedCards, cardToMove]);
                setDeck(prevDeck => prevDeck.filter(card => card.id !== cardId));
            } else {
                // Handle non-200 responses if necessary
                console.error('Failed to remove card from deck', response);
            }
        } catch (error) {
            // Handle error if the request fails
            console.error('Error removing card from deck', error);
        }
    };


    return (
        <div>

            <div className="decks-page">
                <Nav className=""></Nav>
                <div className="container">
                    <DroppableDeck cards={deck} onDrop={moveCardToDeck}>
                        {(cards) => (
                            <>
                                <h2 className="">Deck</h2>
                                {cards.map((element, index) => (
                                    <div key={index} className="col-md-3 mb-3">
                                        <DraggableCard card={element} type="DECK_CARD"/>
                                    </div>
                                ))}
                            </>
                        )}
                    </DroppableDeck>
                    <DroppableOwnedCards cards={ownedCards} onDrop={moveCardToOwned}>
                        {(cards) => (
                            <>
                                <h2 className="">Owned cards</h2>
                                {cards.map((element, index) => (
                                    <div key={index} className="col-md-3 mb-3">
                                        <DraggableCard card={element} type="OWNED_CARD"/>
                                    </div>
                                ))}
                            </>
                        )}
                    </DroppableOwnedCards>
                </div>
            </div>
        </div>
    );
};

export default Decks;
