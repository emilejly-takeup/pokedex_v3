"use client";

import { useEffect, useState } from "react";
import { fetchData } from "./api/api";
import { CacheLoaderTile } from "./components/CacheLoaderTile";
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

  function handlePrev() {
    return data && setCurrentIndex((currentIndex) => (currentIndex === 0 ? data.length - 1 : currentIndex - 1));
  }

  function handleNext() {
    return data && setCurrentIndex((currentIndex) => (currentIndex === data.length - 1 ? 0 : currentIndex + 1));
  }

  const toggleShiny = (index: number) => {
    setShinyState((prevShinyState) => prevShinyState.map((isShiny, i) => (i === index ? !isShiny : isShiny)));
  };

  function resolveIndex(wishedIndex: number) {
    return (currentIndex + wishedIndex + data.length) % data.length;
  }

  return (
    <div className="text-center h-screen content-center mx-auto max-w-fit">
      {data && data.length > 0 ? (
        <div className="flex items-center gap-2">
          <NavigationButton text="←" onClick={handlePrev} />

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

          <NavigationButton text="→" onClick={handleNext} />

          {/* Pré-rendu des cartes précedentes et suivantes */}
          {cacheLoaderIndexes.map((index) => (
            <CacheLoaderTile pokemon={data[resolveIndex(index)]} key={index} />
          ))}
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
