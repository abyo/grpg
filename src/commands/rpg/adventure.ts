import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Players } from '../../structures/models/Players';
import Battle from '../../structures/game/battle';

export default class AdventureCommand extends Command {
  public constructor() {
    super('adventure', {
      aliases: ['adventure', 'adv'],
      description: {
        content: 'The adventure command makes you fight again random monsters.',
        usage: '(ad)venture',
        subCommand: '',
        examples: ['adventure', 'adv']
      },
      category: 'Rpg',
      cooldown: 8000,
      ratelimit: 2,
    });
  }

  public async exec(message: Message): Promise<Message> {
    // TODO: add info subcommand
    const player: Players = await this.client.player.get(message.member!);
    const adventure = new Battle(player, player.monster, message);
    return adventure.skirmish();
  }
}