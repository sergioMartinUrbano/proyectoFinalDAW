import React from "react";
import { useTranslation } from "react-i18next";
import "../../public/css/homes.css"

function PokedexIndex() {
  const { t } = useTranslation();
  return (
    <main className="home">
      <h1>Pokédex - {t("home")}</h1>
      <p>{t("pokedex-text")}</p>
    </main>
  );
}

export default PokedexIndex;