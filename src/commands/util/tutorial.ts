import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import guides from '../../assets/guides/index.json';
import { MessageEmbed } from 'discord.js';

export default class TutorialCommand extends Command {
  public constructor() {
    super('tutorial', {
      aliases: ['tutorial', 'tuto'],
      description: {
        content: 'The tutorial command return a guide about a feature/mechanic in the game.',
        usage: '(tuto)rial [guideName] <--advanced>',
        subCommand: '',
        examples: ['tuto start', 'tutorial end', 'tuto end --advanced']
      },
      category: 'Util',
      ratelimit: 2,
      args: [
        {
          id: 'guideName'
        },
        {
          id: 'advanced',
          match: 'flag',
          flag: '-adv'
        }
      ]
    });
  }

  public async exec(message: Message, { guideName, advanced }: { guideName: string, advanced: string }): Promise<Message | Message[]> {
    if (!guideName) return message.util!.send(`Guides available -> \`${guides.map(e => e.name).join('|')}\``);
    if (!guideName.toLowerCase().match(/^(start|end)$/)) return message.util!.send(`This guide doesn\'t exist (guides available -> \`${guides.map(e => e.name).join('|')}\`).`);

    const guideInfo = guides.find(e => e.name.toLowerCase() == guideName.toLowerCase());
    const embed = new MessageEmbed()
      .setAuthor(this.client.user!.username, this.client.user!.displayAvatarURL())
      .setColor(this.client.colorConstants.infoColor);    
    // const classImg: any = new MessageAttachment(`./src/assets/playerClasses/${guideName.toLowerCase()}.png`);

    if (advanced) {
      embed.setDescription(guideInfo!.advanced);
      return message.util!.send(embed);
    }

    embed.setDescription(guideInfo!.content);
    embed.setFooter('Add -adv to your command to get the advanced version of the guide!')
    return message.util!.send(embed);  
  }
}