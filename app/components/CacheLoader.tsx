/* eslint-disable @next/next/no-img-element */
import PokemonData from "../interfaces/PokemonData";

interface Props {
  pokemon: PokemonData;
}

export function CacheLoader({ pokemon }: Props) {
  if (!pokemon) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="hidden">
      {/* Types */}
      {pokemon.types?.length > 0 ? (
        pokemon.types.map((type, index) => (
          <div key={index}>
            <img width={40} height={40} src={type.image || "https://via.placeholder.com/50"} alt={type.name || "image"} />
          </div>
        ))
      ) : (
        <p>???</p>
      )}

      {/* Regular */}
      <img width={1200} height={1200} src={pokemon.sprites?.regular || ""} alt={`${pokemon.name?.fr || "Inconnu"} sprite`} />

      {/* Shiny */}
      {pokemon.sprites.shiny && <img width={1200} height={1200} src={pokemon.sprites.shiny || ""} alt={`${pokemon.name?.fr || "Inconnu"} sprite`} />}
    </div>
  );
}
