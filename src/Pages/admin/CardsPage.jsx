import React, { useState, useEffect } from "react";
import Card from "../../Components/Card.jsx";
import CardForm from "../../Components/CardForm.jsx";
import NavAdmin from "../../Components/NavAdmin.jsx";
import CardService from "../../Services/CardService.js";
import { TextField, Slider, Typography, Box, Grid } from '@mui/material';
import "../styles/CardsPage.css";
import { useNavigate } from "react-router-dom";

function CardsPage() {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [name, setName] = useState('');
    const [minHealthPoints, setMinHealthPoints] = useState(0);
    const [maxHealthPoints, setMaxHealthPoints] = useState(20);
    const [minAttackPoints, setMinAttackPoints] = useState(0);
    const [maxAttackPoints, setMaxAttackPoints] = useState(20);

    const navigate = useNavigate();

    useEffect(() => {
        CardService.getAllCards().then((result) => {
            setCards(result.data.cards);
            setFilteredCards(result.data.cards);
        });
    }, []);

    useEffect(() => {
        const filterCards = () => {
           const queryParams = {
               name:name,
               minHealthPoints:minHealthPoints,
               maxHealthPoints:maxHealthPoints,
               minAttackPoints:minAttackPoints,
               maxAttackPoints:maxAttackPoints
           }
            CardService.searchCards(queryParams).then((result)=>{setFilteredCards(result.data.cards)})
            // const filtered = cards.filter((card) => {
            //     return (
            //         (name === '' || card.name.toLowerCase().includes(name.toLowerCase())) &&
            //         card.healthPoints >= minHealthPoints &&
            //         card.healthPoints <= maxHealthPoints &&
            //         card.attackPoints >= minAttackPoints &&
            //         card.attackPoints <= maxAttackPoints
            //     );
            // });
            // setFilteredCards(filtered);
        };

        filterCards();
    }, [name, minHealthPoints, maxHealthPoints, minAttackPoints, maxAttackPoints, cards]);

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

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSliderChange = (type) => (event, newValue) => {
        if (type === 'minHealthPoints') {
            if (newValue > maxHealthPoints) {
                setMinHealthPoints(maxHealthPoints);
            } else {
                setMinHealthPoints(newValue);
            }
        } else if (type === 'maxHealthPoints') {
            if (newValue < minHealthPoints) {
                setMaxHealthPoints(minHealthPoints);
            } else {
                setMaxHealthPoints(newValue);
            }
        } else if (type === 'minAttackPoints') {
            if (newValue > maxAttackPoints) {
                setMinAttackPoints(maxAttackPoints);
            } else {
                setMinAttackPoints(newValue);
            }
        } else if (type === 'maxAttackPoints') {
            if (newValue < minAttackPoints) {
                setMaxAttackPoints(minAttackPoints);
            } else {
                setMaxAttackPoints(newValue);
            }
        }
    };

    return (
        <div className="page-container">
            <div className="row">
                <div className="col-2 bg-dark nav-admin-container">
                    <NavAdmin class=""/>
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-4">
                            <CardForm onSubmit={handleCreate}></CardForm>
                        </div>
                        <div className="row">
                            <Box sx={{width: '100%', p: 3}}>
                                <Typography variant="h4" gutterBottom>
                                    Filter Cards
                                </Typography>
                                <TextField
                                    label="Search by Name"
                                    variant="outlined"
                                    fullWidth
                                    value={name}
                                    onChange={handleNameChange}
                                    sx={{mb: 2}}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>Min Health Points</Typography>
                                        <Slider
                                            value={minHealthPoints}
                                            onChange={handleSliderChange('minHealthPoints')}
                                            aria-labelledby="min-health-points-slider"
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={20}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Max Health Points</Typography>
                                        <Slider
                                            value={maxHealthPoints}
                                            onChange={handleSliderChange('maxHealthPoints')}
                                            aria-labelledby="max-health-points-slider"
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={20}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Min Attack Points</Typography>
                                        <Slider
                                            value={minAttackPoints}
                                            onChange={handleSliderChange('minAttackPoints')}
                                            aria-labelledby="min-attack-points-slider"
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={20}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Max Attack Points</Typography>
                                        <Slider
                                            value={maxAttackPoints}
                                            onChange={handleSliderChange('maxAttackPoints')}
                                            aria-labelledby="max-attack-points-slider"
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={20}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <h2 className="mb-1 mt-2">All cards</h2>
                            <div className="cards-container container">
                                {filteredCards.map((element, index) => (
                                    <div key={index}  className="">
                                        <div data-cy="card-content">
                                            <Card {...element}></Card>
                                            <div className="button-container container">
                                                <div className="row justify-content-center">
                                                    <div className="col">
                                                        <button className="btn btn-outline-primary" data-cy="btn-update" onClick={() => {
                                                            navigate('/updateCard', {state: element})
                                                        }}>Update
                                                        </button>
                                                        <button className="btn btn-danger" data-cy="btn-delete"
                                                                onClick={() => handleDelete(element.id)}>Delete
                                                        </button>
                                                    </div>
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
