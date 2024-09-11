"use client";

import { useEffect, useState } from "react";
import { fetchData } from "./api/api";
import { NavigationButton } from "./components/NavigationButton";
import { PokemonCard } from "./components/PokemonCard";
import { StatsChart } from "./components/StatsChart";
import PokemonData from "./interfaces/PokemonData";

export default function App() {
  const [data, setData] = useState<PokemonData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [shinyState, setShinyState] = useState<boolean[]>([]);

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

  // Configuration du slicer de la liste de configuration des cartes.
  // Permet de déterminer la coupure entre les cartes affichées...
  // ...à gauche de la carte principale et celles affichées à droite.
  const sliceAtIndex = 4;

  // Configuration des cartes
  const CARDSCONFIG = [
    { indexOffset: -3, isShinyOverride: true },
    { indexOffset: -3 },
    { indexOffset: -2 },
    { indexOffset: -1 },
    { indexOffset: 1 },
    { indexOffset: 2 },
    { indexOffset: 3 },
    { indexOffset: 3, isShinyOverride: true },
  ];

  return (
    <div className="text-center h-screen content-center mx-auto max-w-fit">
      {data && data.length > 0 ? (
        <div className="flex items-center gap-2">
          {/* Rendu des cartes de gauche */}
          {CARDSCONFIG.slice(0, sliceAtIndex).map(({ indexOffset, isShinyOverride }, id) => {
            const resolvedIndex = resolveIndex(indexOffset);
            const isShiny = isShinyOverride !== undefined ? isShinyOverride : shinyState[resolvedIndex];
            return (
              <PokemonCard
                key={id}
                isCurrentIndex={false}
                pokemon={data[resolvedIndex]}
                isShiny={isShiny}
                onToggleShiny={() => toggleShiny(resolvedIndex)}
                isHidden={true}
              />
            );
          })}

          {/* Rendu de la carte principale + nav */}
          <NavigationButton text="←" onClick={handlePrev} />
          <PokemonCard
            isCurrentIndex={true}
            pokemon={data[currentIndex]}
            isShiny={shinyState[currentIndex]}
            onToggleShiny={() => toggleShiny(currentIndex)}
            isHidden={false}
          />
          <StatsChart pokemon={data[currentIndex]} />
          <NavigationButton text="→" onClick={handleNext} />

          {/* Rendu des cartes de droite */}
          {CARDSCONFIG.slice(sliceAtIndex).map(({ indexOffset, isShinyOverride }, id) => {
            const resolvedIndex = resolveIndex(indexOffset);
            const isShiny = isShinyOverride !== undefined ? isShinyOverride : shinyState[resolvedIndex];
            return (
              <PokemonCard
                key={id + sliceAtIndex}
                isCurrentIndex={false}
                pokemon={data[resolvedIndex]}
                isShiny={isShiny}
                onToggleShiny={() => toggleShiny(resolvedIndex)}
                isHidden={true}
              />
            );
          })}
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
