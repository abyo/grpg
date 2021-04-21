import Mechanics from "./mechanics";
import MonsterGeneration from "./monsters";
import { Players } from '../models/Players';
import { Message } from 'discord.js';
import { PlayersProvider } from '../providers/PlayersProvider';
import { stripIndents } from "common-tags";
import { IMonsters } from '../../util/Interface';

export default class Battle extends Mechanics {
  private message: Message;
  private db = new PlayersProvider();

  public constructor(player: Players, monster: IMonsters, message: Message) { 
    super(player, monster); 
    this.message = message;
  }

  // public async skirmish(): Promise<Message> {}
}
