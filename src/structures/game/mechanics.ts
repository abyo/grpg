import { Players } from '../models/Players';

export default class Mechanics {
  public player: Players;

  public constructor(player: Players) {
    this.player = player;
  }
  
  // public defense(): number {
  //   const addedDef = this.calculateAddedDef();
  //   return 1.5 * this.player.attributs.str + 0.4 * this.player.attributs.dex + addedDef;
  // }

  // private calculateAddedDef(): number {
  //   return Object.values(this.player.gear).splice(1).reduce((a, b) => a + b, 0);
  // }
}