import { useState } from "react";
import PokemonData from "../interfaces/PokemonData";

interface DynamicSearchBarProps {
  onSearch: (query: string) => void;
  searchResults: PokemonData[];
  onSelectPokemon: (index: number) => void;
}

export function DynamicSearchBar({ onSearch, searchResults, onSelectPokemon }: DynamicSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Appel de la fonction parente pour filtrer les résultats
  };

  const handleSelect = (index: number) => {
    onSelectPokemon(index); // Appel de la fonction parente pour séléctionner le Pokémon cliqué
    setSearchQuery(""); // Vide la recherche
  };

  return (
    <div className="w-full flex justify-center absolute top-28">
      <div className="bg-zinc-100 h-fit p-2 rounded-lg w-[668px]">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Rechercher un Pokémon..."
          className="w-full p-2 rounded-lg outline-none bg-transparent"
        />
        {searchQuery && (
          <div className="bg-white rounded-lg shadow-lg mt-2 max-h-60 overflow-auto">
            {searchResults.length > 0 ? (
              searchResults.map((pokemon, index) => (
                <div key={index} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSelect(index)}>
                  {/* Affiche le nom de chaque Pokémon dans ses trois langues */}
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
