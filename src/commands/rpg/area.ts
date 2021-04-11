import {stripIndents} from 'common-tags';
import {Command} from 'discord-akairo';
import {Message} from 'discord.js';

export default class AreaCommand extends Command {
  public constructor() {
    super('area', {
      aliases: ['area'],
      description: {
        content: 'The area command returns where the player is located and allows you to move to a different area.',
        usage: 'area <newPrefix>',
        subCommand: '',
        examples: ['area', 'area Starter Area']
      },
      category: 'Rpg',
      ratelimit: 2,
      args: [{
        id: 'newArea',
        match: 'rest',
        type: 'string'
      }]
    });
  }

  public async exec(message: Message, {newArea}: {newArea: string}): Promise<Message | Message[]> {
    if (!newArea) return message.util!.send(stripIndents`
      \`\`\`accesslog
      [Level Range :: Area]
      
        1-3 :: Starter Area
        2-5 :: River
      \`\`\``);
    newArea = this.capitalize(newArea);
    if (!newArea.match(/^(Starter Area|River)$/)) return message.util!.send(`This area doesn't exist!`);
    await this.client.player.update(message.member!, {area: newArea});
    return message.util!.send(`You're now in -> \`${newArea}\``);
  }

  private capitalize(s: string): string {
    return s.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  }
}
