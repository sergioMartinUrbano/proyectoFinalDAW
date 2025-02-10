const { calculator, pokeplay_guess, getAllPokemons, searchByName } = require("../models/pokemonModel");


async function pokeapi() {
  try {
    const URL = 'https://pokeapi.co/api/v2/pokemon/';
    const batchSize = 41;
    const result = [];
    
    for (let i = 1; i < 1025; i += batchSize) {
      const batchRequests = Array.from({ length: batchSize }, (_, j) =>
        fetch(`${URL}${i + j}`)
          .then((res) => res.json())
          .catch((err) => {
            console.error(`Error fetching Pokémon #${i + j}:`, err);
            return null;
          })
      );

      const batchResults = await Promise.all(batchRequests);
      const filteredResults = batchResults.filter((data) => data !== null);

      result.push(...filteredResults);
    }

    return result;
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return null;
  }
}
async function pokeapi_limit(start, limit) {
  const URL = `https://pokeapi.co/api/v2/pokemon/`;
  const result = [];
  
  for (let i = start; i <= limit; i++) {
    try {
      const response = await fetch(`${URL}${i}`);
      const data = await response.json();
      result.push(data);
    } catch (err) {
      console.error(`Error fetching Pokémon #${i}:`, err);
    }
  }

  return result;
}



async function getPokemonCalculator(req, res) {
  const data = await calculator();

  if (!data) {
    const statName = {
      attack: 'Ataque',
      defense: 'Defensa',
      hp: 'PS',
      speed: 'Velocidad',
      'special-attack': 'Ataque Especial',
      'special-defense': 'Defensa Especial',
    };


    let filteredResults=await pokeapi();
    const batchData = filteredResults.map((data) => ({
      value: data.species.name,
      label:
        data.species.name.charAt(0).toUpperCase() +
        data.species.name.slice(1),
      id: data.id,
      stats: data.stats.map((stat) => ({
        name: statName[stat.stat.name],
        base_stat: stat.base_stat,
      })),
    }));
    return res.json(batchData);
  }

  return res.json(data.map(pokemon => {
    return {
      id: pokemon.id_pokemon,
      label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase(),
      value: pokemon.name.toLowerCase(),
      stats: [
        { name: 'PS', base_stat: pokemon.base_hp },
        { name: 'Ataque', base_stat: pokemon.base_attack },
        { name: 'Defensa', base_stat: pokemon.base_defense },
        { name: 'Ataque Especial', base_stat: pokemon.base_special_attack },
        { name: 'Defensa Especial', base_stat: pokemon.base_special_defense },
        { name: 'Velocidad', base_stat: pokemon.base_speed },
      ],
    }
  }));
};

async function getPokemonGuess(req, res) {
  const randomNumber = Math.floor(Math.random() * 1025) + 1;
  let data = await pokeplay_guess(randomNumber);
  if (!data) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
      if (!response.ok) {
        return res.status(404).json({ message: 'Can\'t load pokemon from PokeAPI' });
      }

      const apiData = await response.json();

      return res.json({
        id: apiData.id,
        name: apiData.species.name,
        message: 'PokeApi',
      });

    } catch (error) {
      return res.status(500).json({ message: 'Error fetching from PokeAPI', error: error.message });
    }
  }

  return res.json({ id: randomNumber, name: data.name, message: 'DATABASE' });
}

async function getPokemons(req, res) {
  let { limit, start, end } = req.query;
start = start ? Math.max(1, Math.min(1025, start)) : 1;
limit = limit && !isNaN(limit) ? Math.min(Math.max(1, limit), 1025) : 15;
end = end ? Math.min(1025, Math.max(start, end)) : start + limit - 1;

end = Math.min(end, 1025);
  try{
  if (end < start) {
    return res.status(400).json({ message: 'End cannot be less than start' });
  }
  
  const data = await getAllPokemons(limit, start, end);

  return res.json(data.map(pokemon => ({
    id: pokemon.id_pokemon,
    name: pokemon.name,
    type1: pokemon.type1,
    type2: pokemon.type2,
  })));
  }catch(error){
    const result = await pokeapi_limit(start, end);
    return res.json(result.map(pokemon => ({
      id: pokemon.id,
      name: pokemon.species.name,
      type1: pokemon.types[0].type.name,
      type2: pokemon.types[1] ? pokemon.types[1].type.name : null,
    })));
  }
}



async function getPokemonByName(req, res) {
  let { name } = req.query;
  if (!name) {
    return;
  }
  let result = await searchByName(name);
  if (!result) {
    const data = await pokeapi();
const nameFiltered=data.filter(pokemon => {
  if(pokemon.species.name.toLowerCase().includes(name.toLowerCase())){
    return pokemon;
  }
});

    return res.json(nameFiltered.map(pokemon=>{
      return {
        id: pokemon.id,
        name: pokemon.species.name,
        type1: pokemon.types[0].type.name,
        type2: pokemon.types[1] ? pokemon.types[1].type.name : null,
      }
    }));
  }
  return res.json(result.map(pokemon => {
    return {
      id: pokemon.id_pokemon,
      name: pokemon.name,
      type1: pokemon.type1,
      type2: pokemon.type2,
    }
  }));

}

module.exports = { getPokemonCalculator, getPokemonGuess, getPokemons, getPokemonByName };
