import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from "chart.js";
import { Radar } from "react-chartjs-2";
import PokemonData from "../interfaces/PokemonData";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Props {
  pokemon: PokemonData;
}

export const StatsChart: React.FC<Props> = ({ pokemon }) => {
  if (!pokemon) {
    return;
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

  return (
    <div className="bg-zinc-100 p-5 rounded-lg">
      <h2 className="text-xl font-bold">Statistiques</h2>
      <Radar data={data} options={options} />
    </div>
  );
};
