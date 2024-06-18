import React, {useEffect, useState} from 'react';
import useWebSocket from '../Services/useWebSocket';
import {useParams, useNavigate} from 'react-router-dom';
import playerService from '../Services/PlayerService.js';
import TokenManager from '../Services/TokenManager.js';
import Card from '../Components/Card.jsx';

const Game = () => {
    const {gameId} = useParams();
    const navigate = useNavigate();
    const {client, isConnected} = useWebSocket('ws://localhost:8080/ws');
    const [gameState, setGameState] = useState(null);
    const [player, setPlayer] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false); // Track player's turn
    useEffect(() => {
        if (isConnected && client && gameState && player) {
            const playerChannel = `/topic/game/${gameId}/player/${player.id}`;
            const subscription = client.subscribe(playerChannel, (message) => {
                alert(message); // Replace with your UI logic
                setIsPlayerTurn(true); // Enable player to play a card
            });
        }
    }, [isConnected, client, gameState, player, gameId]);
    useEffect(() => {
        if (isConnected && client) {
            const subscription = client.subscribe(`/topic/game/${gameId}`, (message) => {
                const game = JSON.parse(message.body);
                setGameState(game);
                // Check if it's the current player's turn based on their ID
                const userId = TokenManager.getUserId();
                setIsPlayerTurn(game.player1.userId === userId || game.player2.userId === userId);
            });

            client.publish({
                destination: `/app/game/${gameId}`,
                body: JSON.stringify({gameId: Number(gameId)}),
            });

        }
    }, [isConnected, client, gameId]);

    useEffect(() => {
        if (gameState) {
            const userId = TokenManager.getUserId();
            if (gameState.player1.userId === userId) {
                setPlayer(gameState.player1);
                setOpponent(gameState.player2);
            } else if (gameState.player2.userId === userId) {
                setPlayer(gameState.player2);
                setOpponent(gameState.player1);
            }
        }
    }, [gameState]);

    const playCard = () => {
        if (client && isConnected && selectedCard && isPlayerTurn) {
            const request = {
                gameId: gameId,
                playerId: player.id,
                card: selectedCard,
            };
            client.publish({
                destination: '/app/play-card',
                body: JSON.stringify(request),
            });
            setSelectedCard(null);
            setIsPlayerTurn(false); // Disable playing until it's the player's turn again
        }
    };
    const handleCardClick = (card) => {
        if (isPlayerTurn) {
            setSelectedCard(selectedCard === card ? null : card); // Toggle selection
        }
    };

    const handleCancelSelection = () => {
        setSelectedCard(null);
    };

    if (!gameState || !player) return <div>Loading...</div>;

    if (gameState.isGameOver) {
        return (
            <div className="game-over">
                <h1>Game Over</h1>
                <h2>Winner: {gameState.winner.name}</h2>
                <button onClick={() => navigate('/invite')}>Back to Lobby</button>
            </div>
        );
    }

    return (
        <div className="game-container d-flex flex-column justify-content-between vh-100">
            <div className="player-data p-3" style={{position: 'absolute', top: 0, left: 0}}>
                <h2>{player.name}</h2>
                <p>Health: {player.hp}</p>
            </div>
            <div className="player-data p-3" style={{position: 'absolute', top: 0, right: 100}}>
                <h2>{opponent.name}</h2>
                <p>Health: {opponent.hp}</p>
            </div>

            <div className="player-hand mt-auto p-3" style={{position: 'relative'}}>
                <div className="hand d-flex justify-content-center">
                    {player.hand &&
                        player.hand.map((card, index) => (
                            <div
                                key={index}
                                className={`card-container mx-1 ${selectedCard === card ? 'selected-card' : ''}`}
                                style={{
                                    transform: 'scale(1.05)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                    borderRadius: '1px',
                                    background: "azure"
                                }}
                                onClick={() => handleCardClick(card)}
                            >
                                <Card {...card} />
                            </div>
                        ))}
                </div>
                {selectedCard && (
                    <div className="d-flex justify-content-center mt-2">
                        <button onClick={playCard} className="btn btn-primary play-button mr-2">
                            Play Card
                        </button>
                        <button onClick={handleCancelSelection} className="btn btn-secondary">
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;