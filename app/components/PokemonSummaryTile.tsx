import Image from "next/image";
import PokemonData from "../interfaces/PokemonData";

interface Props {
  pokemon: PokemonData;
}

export function PokemonSummaryTile({ pokemon }: Props) {
  if (!pokemon) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="bg-zinc-100 p-2 rounded-lg relative">
      <div className="absolute top-1/3 left-8">
        {/* Index du pokémon */}
        <p className="italic font-semibold">#{pokemon.pokedex_id}</p>
      </div>
      <div>
        {/* Nom et catégorie */}
        <h2 className="text-2xl font-bold">{pokemon.name?.fr || "???"}</h2>
        <p className="text-sm">
          <strong>{pokemon.category || "Inconnu"}</strong>
        </p>
      </div>
      {/* Types */}
      <div className="flex absolute top-1/4 right-4">
        {pokemon.types?.length > 0 &&
          pokemon.types.map((type, index) => (
            <div key={index} className="flex">
              <Image
                className="rounded-full p-1"
                width={40}
                height={40}
                src={type.image || "https://via.placeholder.com/50"}
                alt={type.name || "type"}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
