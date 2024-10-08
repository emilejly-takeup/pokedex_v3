import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from "chart.js";
import { Radar } from "react-chartjs-2";
import PokemonData from "../interfaces/PokemonData";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Props {
  pokemon: PokemonData;
}

export const PokemonStatsTile: React.FC<Props> = ({ pokemon }) => {
  if (!pokemon) {
    return <p>Chargement...</p>;
  }

  const stats = pokemon.stats
    ? [pokemon.stats.hp, pokemon.stats.atk, pokemon.stats.spe_atk, pokemon.stats.vit, pokemon.stats.spe_def, pokemon.stats.def]
    : [0, 0, 0, 0, 0, 0];

  const data = {
    labels: ["HP", "ATK", "ATK SPE", "VIT", "DEF SPE", "DEF"],
    datasets: [
      {
        label: "Statistiques",
        fill: true,
        data: stats,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderColor: "rgb(255, 0, 0)",
        pointRadius: 0,
      },
    ],
  };

  const options = {
    elements: {
      line: {
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 255,
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (!pokemon.stats) {
    return (
      <div className="bg-zinc-100 h-fit p-2 rounded-lg relative">
        <Radar data={data} options={options} />
        <p className="text-4xl font-bold absolute top-1/2 left-1/2 translate-x-[-50%]	translate-y-[-50%]">???</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-100 h-fit p-2 rounded-lg">
      <Radar data={data} options={options} />
    </div>
  );
};
