import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class AdventureCommand extends Command {
  public constructor() {
    super('adventure', {
      aliases: ['adventure', 'ad'],
      description: {
        content: 'The adventure command makes you fight again random monsters.',
        usage: '(ad)venture',
        subCommand: '',
        examples: ['adventure', 'ad']
      },
      category: 'Rpg',
      ratelimit: 2,
    });
  }

  // @ts-ignore
  public async exec(message: Message): Promise<Message> {}
}