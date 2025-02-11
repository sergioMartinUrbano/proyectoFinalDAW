import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Loading from "../Loading";
import "../../../public/css/search.css";
import "../../../public/css/pokedexAll.css";
import { useTranslation } from "react-i18next";


const fetchAllPokemon = async (start) => {
  try {
    const data = await awios.get(`http://localhost:3000/api/community/all?limit=12&start=${start}`);
    
    return data && data.length > 0 ? data.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchPokemonByName = async (name) => {
  try {
    const data = await axios.get(`http://localhost:3000/api/community/search?name=${name}`);

    return data && data.length > 0 ? data.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

function CommunityDex() {
    const { t } = useTranslation();
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const initialLoadRef = useRef(false);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const start = page * 12 + 1;
    const newPokemon = await fetchAllPokemon(start);

    if (!newPokemon || (newPokemon.length === 1 && newPokemon[0].id === 1025)) {
      setHasMore(false);
      return;
    }
    setPokemonList((prev) => [...prev, ...newPokemon]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  const getDataByName = async (name) => {
    setLoading(true);
    const results = await fetchPokemonByName(name);
    setPokemonList(results);
    setLoading(false);
  };

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      getData();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const searchTerm = event.target.pokemonName.value.trim();

    if (searchTerm !== "") {
      setPage(0);
      setPokemonList([]);
      setIsSearching(true);
      setHasMore(false);
      await getDataByName(searchTerm);
    } else if (isSearching) {
      setPage(0);
      setPokemonList([]);
      setHasMore(true);
      setIsSearching(false);
      await getData();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <h1>Pokedex</h1>
      <div className="page-wrapper">
        <div className="mainSearch">
          <nav>
            <div className="logo-container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
                alt="Poké Ball"
              />
            </div>
            <form className="search-bar" onSubmit={handleSubmit}>
              <input
                type="text"
                name="pokemonName"
                className="search-field"
                id="search-field"
                placeholder={t('search-pokemon')}
              />
              <button className="btn-submit" type="submit">
                <i className="bx bx-search"></i>
              </button>
            </form>
          </nav>
        </div>
      </div>

      <InfiniteScroll
        className="pokemonMain"
        dataLength={pokemonList.length}
        next={getData}
        hasMore={hasMore && !isSearching}
        loader={<Loading />}
        endMessage={<p className="noMore">{t('noMore')}</p>}
      >
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemonDIV"
            onClick={() => navigate(`/pokedex/community/${pokemon.id}`)}
          >
            <div className={`image ${pokemon.type1.toLowerCase()}`}>
              <p className="pokemonID">#{pokemon.id}</p>
              <img
                src={pokemon.image}
                alt={pokemon.name}
              />
            </div>
            <div className="pokemonInfo">
              <p className="name">{pokemon.name}</p>
              <div className="types">
                <p className={`type1 text-${pokemon.type1.toLowerCase()}`}>
                  {t(pokemon.type1.toLowerCase())}
                </p>
                {pokemon.type2 && (
                  <p className={`type2 text-${pokemon.type2.toLowerCase()}`}>
                    {t(pokemon.type2.toLowerCase())}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </main>
  );
}

export default CommunityDex;
