import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import Error from "../error";

function Pokemon() {
  const location = useLocation();
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading]=useState(true);
  const [error, setError]=useState(false);

  async function getData() {
    let pokemonInfo = location.pathname.match(/\/([^\/]+)\/?$/)[1];
    try {
          const data = await axios.get(`http://localhost:3000/api/pokemon/${pokemonInfo}`);
      setPokemon(data);
      
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(true);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if(error){
    return <Error error_type="error_load" />
  }

  if (!pokemon) {
    return <Loading />;
  }

  return <h1>{pokemon && pokemon.species.name}</h1>;
}

export default Pokemon;
