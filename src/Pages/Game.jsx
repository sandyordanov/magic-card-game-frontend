import React, {useEffect, useState} from 'react';
import useWebSocket from '../Services/useWebSocket';
import {useParams, useNavigate} from 'react-router-dom';
import TokenManager from '../Services/TokenManager.js';
import Card from '../Components/Card.jsx';
import './styles/Game.css'

const Game = () => {
    const {gameId} = useParams();
    const navigate = useNavigate();
    const {client, isConnected} = useWebSocket('ws://localhost:8080/ws');
    const [gameState, setGameState] = useState(null);
    const [player, setPlayer] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [showFacedownCard, setShowFacedownCard] = useState(false);
    const [playedCard, setPlayedCard] = useState(null);
    const [opponentPlayedCard, setOpponentPlayedCard] = useState(null);

    useEffect(() => {
        if (isConnected && client && gameState && player) {
            const playerChannel = `/topic/game/${gameId}/player/${player.userId}`;
            const subscription = client.subscribe(playerChannel, (message) => {
                setIsPlayerTurn(true);
                setShowFacedownCard(true);
            });
            return () => {
                if (subscription) {
                    subscription.unsubscribe();
                }
            };
        }
    }, [isConnected, client, gameState, player, gameId]);

    useEffect(() => {
        if (isConnected && client) {
            const subscription = client.subscribe(`/topic/game/${gameId}`, (message) => {
                const game = JSON.parse(message.body);
                setGameState(game);

                const userId = TokenManager.getUserId();
                setIsPlayerTurn(game.player1.userId === userId || game.player2.userId === userId);
            });

            client.publish({
                destination: `/app/game/${gameId}`,
                body: JSON.stringify({gameId: Number(gameId)}),
            });

            return () => {
                if (subscription) {
                    subscription.unsubscribe();
                }
            };
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

    useEffect(() => {
        if (gameState && gameState.turnFinished) {
            const opponentPlayed = gameState.player1.userId === player.userId ? gameState.pendingRequests[gameState.player2.userId] : gameState.pendingRequests[gameState.player1.userId];
            setOpponentPlayedCard(opponentPlayed.card);

            const timeoutId = setTimeout(() => {
                setShowFacedownCard(false);
                setPlayedCard(null);
                setOpponentPlayedCard(null);

                if (gameState.gameOver) {
                    setView('gameOver');
                }
            }, 3000); // Wait 3 seconds before hiding

            return () => clearTimeout(timeoutId); // Clean up the timeout if the component unmounts
        }
    }, [gameState, player]);

    const [view, setView] = useState('game');

    const playCard = () => {
        if (client && isConnected && selectedCard && isPlayerTurn) {
            const request = {
                gameId: gameId,
                userId: player.userId,
                card: selectedCard,
            };
            client.publish({
                destination: '/app/play-card',
                body: JSON.stringify(request),
            });
            setPlayedCard(selectedCard);
            player.hand = player.hand.filter(x => x.id !== selectedCard.id);
            setSelectedCard(null);
            setIsPlayerTurn(false);
        }
    };

    const handleCardClick = (card) => {
        if (isPlayerTurn) {
            setSelectedCard(selectedCard === card ? null : card);
        }
    };

    const handleCancelSelection = () => {
        setSelectedCard(null);
    };
    if (!gameState || !player) return <div>Loading...</div>;
    if (view === 'gameOver') {
        if (gameState.winner === null) {
            return (
                <div className="game-over">
                    <h1>Game Over</h1>
                    <h2>Draw</h2>
                    <button onClick={() => navigate('/')}>Back to Lobby</button>
                </div>
            );
        }
        return (
            <div className="game-over text-center mt-2">
                <h1 className="text-white">Game Over</h1>

                <h3>
                    {gameState.winner.name === player.name ? 'You Won!' : 'You Lost!'}
                </h3>
                <button onClick={() => navigate('/')}>Back to Lobby</button>
            </div>
        );

    }

    return (
        <div className="game-container">
            <div className="player-data left">
                <h2>{player.name}</h2>
                <p>Health: {player.hp}</p>
            </div>
            <div className="player-data right">
                <h2>{opponent.name}</h2>
                <p>Health: {opponent.hp}</p>
            </div>

            <div className="position-relative d-flex justify-content-center align-items-center"
                 style={{height: '100vh'}}>
                {showFacedownCard && !opponentPlayedCard && (
                    <div className="facedown-card">

                    </div>
                )}
                {opponentPlayedCard && (
                    <div className="opponent-played-card">
                        <Card {...opponentPlayedCard} />
                    </div>
                )}
                {playedCard && (
                    <div className="played-card">
                        <Card {...playedCard} />
                    </div>
                )}
            </div>

            <div className="player-hand">
                <div className="hand d-flex justify-content-center">
                    {player.hand &&
                        player.hand.map((card, index) => (
                            <div
                                key={index}
                                className={`card-container ${selectedCard === card ? 'selected-card' : ''}`}
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
                        <button onClick={handleCancelSelection} className="btn btn-secondary cancel-button ms-2">
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;
