import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../public/css/navbar.css";
import "../../public/css/body.css";
function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(i18n.language === "en");
  const location = useLocation();
  const handleLanguageChange = (e) => {
    const language = e.target.checked ? "en" : "es";
    i18n.changeLanguage(language);
    setIsChecked(e.target.checked);
  };

  const handleRandomClick = () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    navigate(`/pokedex/pokemon/${randomId}`);
  };

  const navLinks = {
    "/": [
      { name: "Inicio", path: "/" },
      { name: "Pokedex", path: "/pokedex" },
      { name: "Pokeplay", path: "/pokeplay" },
      { name: "Poketools", path: "/poketools" },
    ],
    "/pokedex": [
      { name: "Inicio", path: "/" },
      { name: "Todos los Pokémon", path: "/pokedex/all" },
      { name: "Tipos", path: "/pokedex/types" },
      { name: "Buscar", path: "/pokedex/search" },
      { name: "Random", path: "#", onClick: handleRandomClick },
    ],
    "/pokeplay": [
      { name: "Inicio", path: "/" },
      { name: "Adivinar", path: "/pokeplay/guess" },
      { name: "Rankings", path: "/pokeplay/rankings" },
    ],
    "/poketools": [
      { name: "Inicio", path: "/" },
      { name: "Calculadora IV", path: "/poketools/IV" },
      { name: "Calculadora EV", path: "/poketools/EV" },
      { name: "Damage Calculator", path: "/poketools/damage" },
    ],
  };
  let basePath = location.pathname.match(/^\/([^\/]+)/);

  if(!basePath){
    basePath='/';
  }else{
    basePath='/'+basePath[1];
  }

  return (
    <nav>
      <div className="nav-container">
        <a href="#" className="logo">
          <img
            src="https://pa1.aminoapps.com/6386/d93bdb5a6cfa647336b1ed5c7bf6807bc3fa8cff_00.gif"
            alt="Ditto dancing Conga"
          />
          <span>PokéWorld</span>
        </a>
        <ul>
          {navLinks[basePath].map((link) => (
            <li key={link.name}>
              {link.onClick ? (
                <button onClick={link.onClick}>{link.name}</button>
              ) : (
                <Link to={link.path}>{link.name}</Link>
              )}
            </li>
          ))}
        </ul>

        <label className="language-switch">
          <input
            type="checkbox"
            id="changeLanguageButton"
            checked={isChecked}
            onChange={handleLanguageChange}
          />
          <span className="slider"></span>
        </label>
      </div>
    </nav>
  );
}

export default Navbar;
