const express = require("express");
const { getPokemonCalculator, getPokemonGuess, getPokemons, getPokemonByName} = require("../controllers/pokemonController");

const router = express.Router();

router.get("/pokeplay/guess", getPokemonGuess);
router.get("/poketools/calculator", getPokemonCalculator); 
router.get("/pokedex/all", getPokemons); 
router.get("/pokedex/search", getPokemonByName); 
// router.get("/community/all", getCommunitymonByName); 
// router.get("/community/search", getCommunitymons); 
// router.get("/pokemon/:info", getPokemonInfo);


module.exports = router;