const express = require("express");
const { getPokemonCalculator, getPokemonGuess, getPokemons, getPokemonByName} = require("../controllers/pokemonController");

const router = express.Router();

// router.get("/pokemon", obtenerTodos);
// router.get("/pokemon/:name", obtenerPokemon);
router.get("/pokeplay/guess", getPokemonGuess);
router.get("/poketools/calculator", getPokemonCalculator); 
router.get("/pokedex/all", getPokemons); 
router.get("/pokedex/search", getPokemonByName); 

module.exports = router;