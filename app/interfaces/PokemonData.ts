export default interface PokemonData {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string;
    gmax: string | null;
  };
  types: Array<{
    name: string;
    image: string;
  }>;
  talents: Array<{
    name: string;
    tc: boolean;
  }>;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
  resistances: Array<{
    name: string;
    multiplier: number;
  }>;
  evolution: {
    pre: null | {
      pokedex_id: number;
      name: string;
      condition: string;
    };
    next: Array<{
      pokedex_id: number;
      name: string;
      condition: string;
    }>;
    mega: null | string;
  };
  height: string;
  weight: string;
  egg_groups: string[];
  sexe: {
    male: number;
    female: number;
  };
  catch_rate: number;
  level_100: number;
  formes: string | null;
}
