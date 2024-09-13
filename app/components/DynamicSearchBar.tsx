import { useEffect, useRef, useState } from "react";
import PokemonData from "../interfaces/PokemonData";

interface DynamicSearchBarProps {
  onSearch: (query: string) => void;
  searchResults: PokemonData[];
  onSelectPokemon: (index: number) => void;
}

export function DynamicSearchBar({ onSearch, searchResults, onSelectPokemon }: DynamicSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Nettoie le timeout
    if (debouncerRef.current) {
      clearTimeout(debouncerRef.current);
    }

    // Set a new timeout to delay the onSearch call
    debouncerRef.current = setTimeout(() => {
      onSearch(query);
    }, 200); // Délai de 200 ms
  };

  const handleSelect = (index: number) => {
    onSelectPokemon(index);
    setSearchQuery(""); // Clear search input after selection
  };

  useEffect(() => {
    // Clean up the timeout on component unmount
    return () => {
      if (debouncerRef.current) {
        clearTimeout(debouncerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full flex justify-center relative">
      <div className="bg-zinc-100 h-fit p-2 rounded-lg w-[668px]">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Rechercher un Pokémon..."
          className="w-full p-2 rounded-lg outline-none bg-transparent"
        />
        {searchQuery && (
          <div className="bg-zinc-100 rounded-lg shadow-lg mt-4 max-h-60 overflow-auto absolute w-[650px] z-10">
            {searchResults.length > 0 ? (
              searchResults.map((pokemon, index) => (
                <div key={index} className="p-2 bg-white my-1 rounded-lg hover:bg-zinc-300 cursor-pointer" onClick={() => handleSelect(index)}>
                  {pokemon.name.fr} / {pokemon.name.en} / {pokemon.name.jp}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">Aucun résultat</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
