import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Players } from '../../structures/models/Players';

export default class SetupCommand extends Command {
  public constructor() {
    super('setup', {
      aliases: ['setup'],
      description: {
        content: 'The setup command allows you to start your adventure.',
        usage: 'setup',
        subCommand: '',
        examples: ['setup']
      },
      category: 'Player',
      ratelimit: 2,
    });
  }

  public async exec(message: Message): Promise<Message | Message[]> {
    const player = await this.client.player.get(message.member!);
    if (player) return message.util!.reply('you can\'t start multiple adventures');
    await Players.create({
      id: message.author.id,
      guildId: message.guild!.id,
      hp: 1,
    });
    return message.util!.send(`Congratulation, you are ready to start your adventure!`);
  }
}
