import Image from "next/image";
import PokemonData from "../interfaces/PokemonData";

interface Props {
  pokemon: PokemonData;
  isCurrentIndex: boolean;
  isShiny: boolean;
  onToggleShiny: () => void;
  isHidden: boolean;
}

export function PokemonCard({ pokemon, isCurrentIndex, isShiny, onToggleShiny, isHidden }: Props) {
  if (!pokemon) {
    return <p>Chargement...</p>;
  }

  return (
    <div
      className={`p-5 w-72 h-[500px] mx-auto border-2 border-gray-600 rounded-lg ${isHidden ? "hidden" : ""} ${isCurrentIndex ? "" : "opacity-70"}`}
    >
      {/* Noms */}
      <h2 className="text-2xl font-bold">{pokemon.name?.fr || "Inconnu"}</h2>
      <div className="mt-1 flex justify-around text-sm">
        <h4>🇬🇧 {pokemon.name?.en || "Inconnu"}</h4>
        <h4>🇯🇵 {pokemon.name?.jp || "Inconnu"}</h4>
      </div>

      {/* Catégorie */}
      <p className="mt-3 text-sm">
        <strong>{pokemon.category || "Inconnu"}</strong>
      </p>

      {/* Image + Shiny */}
      <div className="relative">
        <Image
          className="w-72 h-auto mt-8"
          priority={true}
          width={288}
          height={200}
          src={isShiny && pokemon.sprites?.shiny ? pokemon.sprites.shiny : pokemon.sprites?.regular || "https://via.placeholder.com/100"}
          alt={`${pokemon.name?.fr || "Inconnu"} sprite`}
        />

        <div className="absolute top-0 right-0">
          {pokemon.sprites?.shiny && (
            <button className="p-1 text-yellow-400 hover:text-yellow-300 font-bold rounded-full" onClick={onToggleShiny}>
              {isShiny ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path
                    fillRule="evenodd"
                    d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Types */}
      <div className="flex justify-center gap-4 mt-8">
        {pokemon.types?.length > 0 ? (
          pokemon.types.map((type, index) => (
            <div key={index} className="text-center">
              <Image width={40} height={40} src={type.image || "https://via.placeholder.com/50"} alt={type.name || "image"} />
            </div>
          ))
        ) : (
          <p>???</p>
        )}
      </div>
    </div>
  );
}
