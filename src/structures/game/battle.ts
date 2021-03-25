import Mechanics from "./mechanics";
import { Players } from '../models/Players';

export default class Battle extends Mechanics {
  public constructor(player: Players, monster: Monsters) { super(player, monster); }

  public skirmish() {}
}

export interface Monsters {
  name: string,
  hp: number,
  att: number,
  pdr: number,
  mdr: number,
  description: string,
  level:number
}