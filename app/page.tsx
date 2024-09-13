"use client";

import { useEffect, useState } from "react";
import { fetchData } from "./api/api";
import { CacheLoader } from "./components/CacheLoader";
import { DynamicSearchBar } from "./components/DynamicSearchBar";
import { NavigationButton } from "./components/NavigationButton";
import { PokemonDetailsTile } from "./components/PokemonDetailsTile";
import { PokemonSpriteTile } from "./components/PokemonSpriteTile";
import { PokemonStatsTile } from "./components/PokemonStatsTile";
import { PokemonSummaryTile } from "./components/PokemonSummaryTile";
import PokemonData from "./interfaces/PokemonData";

export default function App() {
  const [data, setData] = useState<PokemonData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [shinyState, setShinyState] = useState<boolean[]>([]);
  const [searchResults, setSearchResults] = useState<PokemonData[]>([]);

  const cacheLoaderIndexes = [-3, -2, -1, 1, 2, 3];

  useEffect(() => {
    fetchData()
      .then((data: PokemonData[]) => {
        setData(data);
        setShinyState(new Array(data.length).fill(false));
      })
      .catch((error: Error) => {
        console.error("Erreur pendant le fetch API du useEffect() : ", error);
      });
  }, []);

  const handleSearch = (query: string) => {
    const filteredResults = data.filter((pokemon) => {
      const lowerQuery = query.toLowerCase();
      // Vérifie si la requête correspond à un ou plusieurs Pokémon (fr, en, ou jp)
      return (
        pokemon.name.fr.toLowerCase().includes(lowerQuery) ||
        pokemon.name.en.toLowerCase().includes(lowerQuery) ||
        pokemon.name.jp.toLowerCase().includes(lowerQuery)
      );
    });
    setSearchResults(filteredResults);
  };

  const handleSelectPokemon = (index: number) => {
    const selectedIndex = data.findIndex((pokemon) => pokemon === searchResults[index]);
    setCurrentIndex(selectedIndex);
  };

  const toggleShiny = (index: number) => {
    setShinyState((prevShinyState) => prevShinyState.map((isShiny, i) => (i === index ? !isShiny : isShiny)));
  };

  function resolveIndex(wishedIndex: number) {
    return (currentIndex + wishedIndex + data.length) % data.length;
  }

  return (
    <div className="relative">
      <DynamicSearchBar onSearch={handleSearch} searchResults={searchResults} onSelectPokemon={handleSelectPokemon} />
      <div className="text-center h-screen content-center mx-auto max-w-fit">
        {/* Rendu de la bare de recherche */}

        {data.length > 0 ? (
          <div className="flex items-center gap-2 select-none">
            <NavigationButton text="←" onClick={() => setCurrentIndex(resolveIndex(-1))} />

            {/* Rendu des tiles */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Rendu des tiles haut gauche */}
              <div className="flex flex-col gap-2">
                <PokemonSummaryTile pokemon={data[currentIndex]} />
                <PokemonSpriteTile pokemon={data[currentIndex]} isShiny={shinyState[currentIndex]} onToggleShiny={() => toggleShiny(currentIndex)} />
              </div>

              {/* Rendu des tiles haut droit */}
              <div className="flex flex-col gap-2">
                <PokemonStatsTile pokemon={data[currentIndex]} />
                <PokemonDetailsTile pokemon={data[currentIndex]} />
              </div>
            </div>

            <NavigationButton text="→" onClick={() => setCurrentIndex(resolveIndex(1))} />

            {/* Pré-rendu des cartes précedentes et suivantes */}
            {cacheLoaderIndexes.map((index) => (
              <CacheLoader pokemon={data[resolveIndex(index)]} key={index} />
            ))}
          </div>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </div>
  );
}
