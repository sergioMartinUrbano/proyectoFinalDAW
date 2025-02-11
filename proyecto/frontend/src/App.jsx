import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PokeplayGuess from './components/pokeplay/guess';
import EVCalculator from './components/poketools/EV';
import IVCalculator from './components/poketools/IV';
import Home from './components/home';
import NationalDex from './components/pokedex/nationaldex';
import CommunityDex from './components/pokedex/communitydex';
import PokedexIndex from './components/pokedex';
import Pokemon from './components/pokedex/pokemon';

function App() {

  useEffect(() => {
    const imagenes = [
      '80.png',
      '54.png',
      '7.png',
    ];
    const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
    document.body.style.backgroundImage = `url(/images/${imagenes[indiceAleatorio]})`;
    document.body.style.backgroundPosition = `center`;
    document.body.style.backgroundAttachment = `fixed`;

  }, []);

  return (
    <Router>
      <Navbar />
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokeplay/guess" element={<PokeplayGuess />} />
          <Route path="/poketools/IV" element={<IVCalculator />} />
          <Route path="/poketools/EV" element={<EVCalculator />} />
          
          <Route path="/pokedex" element={<PokedexIndex />} />
          <Route path="/pokedex/nationaldex" element={<NationalDex />} />
          <Route path="/pokedex/communitydex" element={<CommunityDex />} />
          <Route path="/pokedex/pokemon/:id" element={<Pokemon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
