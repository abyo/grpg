import { Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';

export default class PingCommand extends Command {
  public constructor() {
    super('profil', {
      aliases: ['profil', 'p'],
      description: {
        content: 'The profil command returns informations about a player.',
        usage: '(p)rofil',
        subCommand: '',
        examples: ['profil', 'p']
      },
      category: 'Player',
      ratelimit: 2,
      args: [
        {
          id: 'member',
          match: 'content',
          type: 'member',
          default: (message: Message): GuildMember => message.member!
        }
      ]
    });
  }

  public async exec(message: Message, { member }: { member: GuildMember }): Promise<Message> {
    const player = await this.client.player.get(member);
    if (!player) return message.util!.send(`The player ${member} doesn't exist yet!`);
    return message.util!.send(player.id);
  }
}