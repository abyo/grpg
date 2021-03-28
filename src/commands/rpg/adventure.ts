import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Players } from '../../structures/models/Players';
import Battle from '../../structures/game/battle';
import { stripIndents } from 'common-tags';

export default class AdventureCommand extends Command {
  public constructor() {
    super('adventure', {
      aliases: ['adventure', 'adv'],
      description: {
        content: 'The adventure command makes you fight again random monsters.',
        usage: '(ad)venture <-(-i)nfo>',
        subCommand: '',
        examples: ['adventure', 'adv', 'adventure --info', 'adv -i']
      },
      category: 'Rpg',
      cooldown: 8000,
      ratelimit: 2,
      args: [
        {
          id: 'info',
          match: 'flag',
          flag: ['--info', '-i']
        }
      ]
    });
  }

  public async exec(message: Message, { info }: { info: string }): Promise<Message> {
    const player: Players = await this.client.player.get(message.member!);

    if (info) return message.util!.send(stripIndents`
    \`\`\`
    Current Monster -> ${player.monster.name} (lv.${player.monster.level})
    HP: ${player.monster.hp} | ATT: ${player.monster.att} | PDR: ${player.monster.pdr} | MDR: ${player.monster.mdr}
    Rewards: ${player.monster.exp} experience points and ${player.monster.gold} gold coins.
    Description: ${player.monster.description}
    \`\`\``);

    const adventure = new Battle(player, player.monster, message);
    return adventure.skirmish();
  }
}