import PokemonData from "../interfaces/PokemonData";

interface Props {
  pokemon: PokemonData;
}

export function PokemonDetailsTile({ pokemon }: Props) {
  if (!pokemon) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="bg-zinc-100 p-2 rounded-lg">
      <p>Prochainement disponible</p>
    </div>
  );
}
