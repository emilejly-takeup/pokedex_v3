/* eslint-disable @next/next/no-img-element */
import PokemonData from "../interfaces/PokemonData";

interface Props {
  pokemon: PokemonData;
}

export function SmallPokemonRender({ pokemon }: Props) {
  return (
    <img width={70} height={70} src={pokemon.sprites?.regular || "https://via.placeholder.com/100"} alt={`${pokemon.name?.fr || "Inconnu"} sprite`} />
  );
}
