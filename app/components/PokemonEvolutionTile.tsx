import PokemonData from "../interfaces/PokemonData";
import { SmallPokemonRender } from "./SmallPokemonRender";

interface Props {
  pokemons: PokemonData[];
  onSelectPokemon: (index: number) => void;
}

export function PokemonEvolutionTile({ pokemons, onSelectPokemon }: Props) {
  const handleSelect = (index: number) => {
    onSelectPokemon(index); // Appel de la fonction parente pour séléctionner le Pokémon cliqué
  };

  return (
    <div className="bg-zinc-100 h-[86px] p-2 rounded-lg mt-2 flex gap-2">
      {pokemons.length === 1 ? (
        <div className="mx-auto self-center">{"Ce Pokémon n'évolue pas."}</div>
      ) : (
        <div className="flex flex-wrap w-[668px] justify-evenly">
          {pokemons.map((p) => (
            <div className="cursor-pointer" key={p.pokedex_id} onClick={() => handleSelect(p.pokedex_id)}>
              <SmallPokemonRender pokemon={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
