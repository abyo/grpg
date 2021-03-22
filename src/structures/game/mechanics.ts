import { Players } from '../models/Players';
import items from '../game/data/items.json';

export default class Mechanics {
  public player: Players;

  public constructor(player: Players) {
    this.player = player;
  }
  
  // Player Mechanics
  public defense(): number {
    const addedDef = this.calculateAddedDef();
    return Math.floor(1.5 * this.player.attributs.str + 0.4 * (this.player.attributs.dex + this.player.attributs.int) + addedDef);
  }

  private calculateAddedDef(): number {
    const helm = items.find(e => e.name == this.player.gear.helm);
    const chest = items.find(e => e.name == this.player.gear.chest);
    const legs = items.find(e => e.name == this.player.gear.legs);
    const boots = items.find(e => e.name == this.player.gear.boots);
    const addedDef = helm?.armor! + chest?.armor! + legs?.armor! + boots?.armor!;
    return addedDef;
  }
}