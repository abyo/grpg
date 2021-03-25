import Mechanics from "./mechanics";
import MonsterGeneration from "./monsters";
import { Players } from '../models/Players';
import { Message } from 'discord.js';
import { PlayersProvider } from '../providers/PlayersProvider';
import { stripIndents } from "common-tags";
import { IMonsters } from '../../util/Interface';

export default class Battle extends Mechanics {
  private message: Message;
  private newMonster = new MonsterGeneration();
  private db = new PlayersProvider();

  public constructor(player: Players, monster: IMonsters, message: Message) { 
    super(player, monster); 
    this.message = message;
  }

  public async skirmish(): Promise<Message> {
    const playerDmg = this.playerAttack();
    const monsterDmg = this.monsterAttack();

    const playerHealth = this.player.hp -= monsterDmg;
    const monsterHealth = this.player.monster.hp -= playerDmg;

    await this.db.update(this.message.member!, {
      hp: playerHealth,
      'monster.hp': monsterHealth
    });

    const skirmishReport = stripIndents`
    \`\`\`diff
    + You (${this.message.member!.displayName}) have ${playerHealth}/100pv left
    - ${this.monster!.name} (lv.${this.monster!.level}) has ${monsterHealth < 0 ? 0 : monsterHealth}pv left
    \`\`\`
    `
    
    // TODO: Add round increment after each round in DB
    this.message.util!.send(`You deal \`${playerDmg}\` and receive \`${monsterDmg}\` damage from \`${this.monster!.name}\`!`);

    if (monsterHealth > 0) return this.message.util!.send(skirmishReport);

    this.message.util!.send(skirmishReport);
    const goldReward = this.player.gold += this.monster!.gold;
    const expReward = this.player.exp += this.monster!.exp;
    const newMonster = this.newMonster.generateMonster(this.player!.level);
    await this.db.update(this.message.member!, { monster: newMonster, gold: goldReward, exp: expReward });
    return this.message.util!.send(`Congratulations, you have killed \`${this.monster!.name}\` and you got \`${this.monster!.exp}\` experience and \`${this.monster!.gold}\`gold!`);
  }
}