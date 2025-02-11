const db = require("../config/db");

async function calculator() {
  try {
    const result = await db.many('select * from pokemon');
    return result;
  } catch (error) {
    return null;
  }
}

async function pokeplay_guess(randomNumber) {
  try {
    const result = await db.oneOrNone("SELECT * FROM pokeplay_guess WHERE id_pokemon=$1", [randomNumber]);
    return result;
  } catch (error) {
    return null;
  }
}

async function getAllPokemons(limit, start, end) {
  try {
    const result = db.manyOrNone('select * from pokemon where id_pokemon>=$1 and id_pokemon<=$2 limit $3', [start, end, limit]);
    return result;
  } catch (error) {
    return null;
  }
}

async function searchByName(name) {
  try {
    const result = await db.manyOrNone("SELECT * FROM pokemon WHERE name ilike $1", [`%${name}%`]);
    return result;
  } catch (error) {
    return null;
  }
}


module.exports = { calculator, pokeplay_guess, getAllPokemons, searchByName };