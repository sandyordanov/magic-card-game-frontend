import React from 'react';
import './styles/Home.css'
import Nav from '../Components/Nav';

const Home = () => {
  return (
    <div className="home-container">
        <Nav></Nav>
      <h1>Welcome to Magic Card Game!</h1>
      
    </div>
  );
};

export default Home;