import { Player, Country } from "./player";

export interface team {
  $key?: string;
  name: string;
  country: Country;
  players: Player[];
}
