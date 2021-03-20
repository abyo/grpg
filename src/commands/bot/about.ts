import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class AboutCommand extends Command {
  public constructor() {
    super('about', {
      aliases: ['about'],
      description: {
        content: 'The about command returns informations about the bot.',
        usage: 'about',
        subCommand: '',
        examples: ['about']
      },
      category: 'Bot',
      ratelimit: 2,
    });
  }

  public async exec(message: Message): Promise<Message> {
    return message.util!.send('Lien vers le serveur officiel -> https://placeholder.com');
  }
}