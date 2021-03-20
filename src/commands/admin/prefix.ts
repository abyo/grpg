import { Command, PrefixSupplier } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PrefixCommand extends Command {
  public constructor() {
    super('prefix', {
      aliases: ['prefix'],
      description: {
        content: 'The prefix command returns the current prefix of the bot and allows you to change it.',
        usage: 'prefix <newPrefix>',
        subCommand: '',
        examples: ['prefix', 'prefix ?']
      },
      category: 'Admin',
      ratelimit: 2,
      args: [{
        id: 'newPrefix',
        match: 'rest',
        type: 'string'
      }]
    });
  }

  public async exec(message: Message, { newPrefix }: { newPrefix: string }): Promise<Message | Message[]> {
    if (!newPrefix) return message.util!.send(`Current prefix -> \`${await (this.handler.prefix as PrefixSupplier)(message)}\``);
    await this.client.guildSettings.update(message.guild!, { prefix: newPrefix });
    return message.util!.send(`The prefix for your guid is now -> \`${newPrefix}\``);
  }
}