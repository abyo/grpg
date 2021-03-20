import { Command } from 'discord-akairo';
import { stripIndents } from 'common-tags';
import { Message, MessageEmbed } from 'discord.js';

export default class PingCommand extends Command {
  public constructor() {
    super('ping', {
      aliases: ['ping'],
      description: {
        content: 'The ping command returns the latency of the API.',
        usage: 'ping',
        subCommand: '',
        examples: ['ping']
      },
      category: 'Bot',
      ratelimit: 2,
    });
  }

  public async exec(message: Message): Promise<Message> {
    const sent = await message.util!.send('Pong!');
    const timeDiff = <any>(sent.editedAt || sent.createdAt) - <any>(message.editedAt || message.createdAt);
    const embed = new MessageEmbed()
      .setColor(this.client.colorConstants.otherColor)
      .setDescription(stripIndents`
        🔂 **BOT**: ${timeDiff}ms
        💟 **API**: ${Math.round(this.client.ws.ping)}ms
      `);

    return message.util!.send(embed);
  }
}