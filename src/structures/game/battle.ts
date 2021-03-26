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

    // TODO: Add round increment after each round in DB
    
    let battleReport = stripIndents`
    You deal \`${playerDmg}\` and receive \`${monsterDmg}\` damage from \`${this.monster!.name}\`
    \`\`\`diff
    + You (${this.message.member!.displayName}) have ${playerHealth}/${100 + (this.player.level * 10 - 10)}hp left
    - ${this.monster!.name} (lv.${this.monster!.level}) has ${monsterHealth < 0 ? 0 : monsterHealth}hp left
    `
    
    if (monsterHealth > 0) {
      battleReport += '\`\`\`';
      return this.message.util!.send(battleReport);
    }

    const goldReward = this.player.gold += this.monster!.gold;
    const expReward = this.player.exp += this.monster!.exp;
    const newMonster = this.newMonster.generateMonster(this.player!.level);
    await this.db.update(this.message.member!, { monster: newMonster, gold: goldReward, exp: expReward });
    battleReport += `\n---\nCongratulations, ${this.monster!.name} is dead! (${monsterHealth.toString().replace('-', '')} damage overkill)\nHere's your reward: ${this.monster!.exp} experience points and ${this.monster!.gold} gold coins!`;

    if (this.player.exp > this.calculateExpNeededToNextLevel()) {
      const expLeft = this.player.exp - this.calculateExpNeededToNextLevel();
      this.player.totalExp += this.calculateExpNeededToNextLevel();
      this.player.level += 1;
      this.player.hp = 100 + (this.player.level * 10 - 10);
      await this.db.update(this.message.member!, { totalExp: this.player.totalExp, exp: expLeft, hp: this.player.hp, level: this.player.level });
      battleReport += `\n+ You\'re leveling up aswell, you\'re now level ${this.player.level}!\n\`\`\``;
      return this.message.util!.send(battleReport);
    }

    battleReport += '\n\`\`\`';
    return this.message.util!.send(battleReport);
  }
}