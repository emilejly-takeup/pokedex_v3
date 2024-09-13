import PokemonData from "../interfaces/PokemonData";

interface Props {
  pokemon: PokemonData;
}

export function PokemonDetailsTile({ pokemon }: Props) {
  if (!pokemon) {
    return <p>Chargement...</p>;
  }

  if (pokemon.pokedex_id === 0) {
    return (
      <div className="bg-zinc-100 p-2 rounded-lg h-[112px] flex justify-center">
        <p className="self-center text-2xl font-bold">???</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-100 p-2 rounded-lg flex flex-col gap-2">
      <div className="flex justify-evenly">
        <span className="text-2xl font-bold self-center">
          {pokemon.sexe?.male !== 0 && "♂︎"} {pokemon.sexe?.female !== 0 && "♀︎"}
        </span>
        <p className="text-md self-center">Taille: {pokemon.height || "???"}</p>
        <p className="text-md self-center">Poids: {pokemon.weight || "???"}</p>
      </div>
      <p>
        Talent: <strong>{pokemon.talents[0].name}</strong>
      </p>
      <p>
        Talent caché: <strong>{pokemon.talents[1]?.name || "❌"}</strong>
      </p>
    </div>
  );
}
