import axios from "axios";
import PokemonData from "../interfaces/PokemonData";

// Fonction fetch + stockage dans localStorage
export const fetchData = async (): Promise<PokemonData[]> => {
  // Vérifie si le cache contient les datas
  const cachedData = localStorage.getItem("pokemonData");

  if (cachedData) {
    // Retourne les datas contenue dans le cache
    console.log("Fetching LOCAL STORAGE");

    return JSON.parse(cachedData);
  } else {
    try {
      // Récupère les datas depuis l'API
      console.log("Fetching API");

      const response = await axios.get("https://tyradex.tech/api/v1/pokemon", {
        headers: {
          UserAgent: "emilejo on discord",
          From: "ajoutez moi sur discord si besoin",
          "Content-type": "application/json",
        },
      });

      // Met en cache les datas dans le cache
      localStorage.setItem("pokemonData", JSON.stringify(response.data));

      // Retourne les datas récupérées depuis l'API
      return response.data;
    } catch (error) {
      console.error("Une erreur est survenue pendant la récupération des données depuis l'API: ", error);
      throw error;
    }
  }
};
