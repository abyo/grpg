import { Players } from '../models/Players';
import { IMonsters } from '../../util/Interface';

export default class Mechanics {
  public player: Players;
  public monster: IMonsters;

  public constructor(player: Players, monster: IMonsters) {
    this.player = player;
    this.monster = monster;
  }

  // public playerAttack() {}

  // private defense(): number {}

  // public monsterAttack(): number {}
}

export interface Ratios {
  playerDefRatio: number,
  monsterAttackRatio: number
}
