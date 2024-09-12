"use client";

import { useEffect, useState } from "react";
import { fetchData } from "./api/api";
import { CacheLoader } from "./components/CacheLoader";
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

  if (!data) {
    return <p>Chargement ...</p>;
  }

  const toggleShiny = (index: number) => {
    setShinyState((prevShinyState) => prevShinyState.map((isShiny, i) => (i === index ? !isShiny : isShiny)));
  };

  function resolveIndex(wishedIndex: number) {
    return (currentIndex + wishedIndex + data.length) % data.length;
  }

  return (
    <div className="text-center h-screen content-center mx-auto max-w-fit select-none">
      {data.length > 0 ? (
        <div className="flex items-center gap-2">
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
  );
}
