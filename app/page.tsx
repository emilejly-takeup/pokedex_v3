"use client";

import { useEffect, useState } from "react";
import { fetchData } from "./api/api";
import { CacheLoader } from "./components/CacheLoader";
import { DynamicSearchBar } from "./components/DynamicSearchBar";
import { NavigationButton } from "./components/NavigationButton";
import { PokemonDetailsTile } from "./components/PokemonDetailsTile";
import { PokemonEvolutionTile } from "./components/PokemonEvolutionTile";
import { PokemonSpriteTile } from "./components/PokemonSpriteTile";
import { PokemonStatsTile } from "./components/PokemonStatsTile";
import { PokemonSummaryTile } from "./components/PokemonSummaryTile";
import PokemonData from "./interfaces/PokemonData";
import purifyString from "./utils/stringUtils";

export default function App() {
  const [data, setData] = useState<PokemonData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [shinyState, setShinyState] = useState<boolean[]>([]);
  const [searchResults, setSearchResults] = useState<PokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const cacheLoaderIndexes = [-3, -2, -1, 0, 1, 2, 3];

  useEffect(() => {
    fetchData()
      .then((data: PokemonData[]) => {
        setData(data);
        setShinyState(new Array(data.length).fill(false));
      })
      .catch((error: Error) => {
        console.error("Erreur pendant le fetch API du useEffect() : ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (query: string) => {
    const filteredResults = data.filter((pokemon) => {
      const lowerQuery = purifyString(query.toLowerCase());
      // Vérifie si la requête correspond à un ou plusieurs Pokémon (fr, en, ou jp)
      return (
        purifyString(pokemon.name.fr.toLowerCase()).includes(lowerQuery) ||
        purifyString(pokemon.name.en.toLowerCase()).includes(lowerQuery) ||
        pokemon.name.jp.toLowerCase().includes(lowerQuery)
      );
    });
    setSearchResults(filteredResults);
  };

  const handleSelectPokemon = (index: number) => {
    const selectedIndex = data.findIndex((pokemon) => pokemon === searchResults[index]);
    setCurrentIndex(selectedIndex);
  };

  const handleSelectEvolution = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleShiny = (index: number) => {
    setShinyState((prevShinyState) => prevShinyState.map((isShiny, i) => (i === index ? !isShiny : isShiny)));
  };

  function resolveIndex(wishedIndex: number): number {
    return (currentIndex + wishedIndex + data.length) % data.length;
  }

  function resolveEvolutions(): PokemonData[] {
    const preEvoArray: PokemonData[] = [];
    const nextEvoArray: PokemonData[] = [];

    // Le Pokémon n'a aucune évolution
    if (!data[currentIndex].evolution) {
      return [data[currentIndex]];
    }

    if (data[currentIndex].evolution?.pre) data[currentIndex].evolution.pre.map((preEvo) => preEvoArray.push(data[preEvo.pokedex_id]));
    if (data[currentIndex].evolution?.next) data[currentIndex].evolution.next.map((nextEvo) => nextEvoArray.push(data[nextEvo.pokedex_id]));

    return [...preEvoArray, data[currentIndex], ...nextEvoArray];
  }

  return (
    <div className="h-full">
      {/* Rendu de l'animation de chargement circualaire */}
      {isLoading || !data ? (
        <div className="flex justify-center items-center h-full">
          <div className="w-32 h-32 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Rendu de la barre de recherche */}
          <div className="mt-2">
            <DynamicSearchBar onSearch={handleSearch} searchResults={searchResults} onSelectPokemon={handleSelectPokemon} />
          </div>
          <div className="text-center justify-center h-full content-center mx-auto max-w-fit">
            {data.length > 0 && (
              <div className="flex items-center gap-2 select-none">
                <NavigationButton text="←" onClick={() => setCurrentIndex(resolveIndex(-1))} />

                {/* Rendu des tiles */}
                <div className="flex flex-col w-[668px]">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Div des tiles de gauche */}
                    <div className="flex flex-col gap-2">
                      <PokemonSummaryTile pokemon={data[currentIndex]} />
                      <PokemonSpriteTile
                        pokemon={data[currentIndex]}
                        isShiny={shinyState[currentIndex]}
                        onToggleShiny={() => toggleShiny(currentIndex)}
                      />
                    </div>
                    {/* Div des tiles de droite */}
                    <div className="flex flex-col gap-2">
                      <PokemonStatsTile pokemon={data[currentIndex]} />
                      <PokemonDetailsTile pokemon={data[currentIndex]} />
                    </div>
                  </div>
                  <PokemonEvolutionTile pokemons={resolveEvolutions()} onSelectPokemon={handleSelectEvolution} />
                </div>
                <NavigationButton text="→" onClick={() => setCurrentIndex(resolveIndex(1))} />

                {/* Pré-rendu des cartes précedentes et suivantes */}
                {cacheLoaderIndexes.map((index) => (
                  <CacheLoader pokemon={data[resolveIndex(index)]} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
