import { Command } from 'discord-akairo';
import { Message, MessageEmbed, MessageAttachment } from 'discord.js';
import { Players } from '../../structures/models/Players';
import pClasses from '../../structures/game/data/classes.json';

export default class SetupCommand extends Command {
  public constructor() {
    super('setup', {
      aliases: ['setup'],
      description: {
        content: 'The setup command allow you to choose a class for your adventure.',
        usage: 'setup [className] <--select>',
        subCommand: '',
        examples: ['setup Clerc', 'setup Clerc --select']
      },
      category: 'Player',
      ratelimit: 2,
      args: [
        {
          id: 'className'
        },
        {
          id: 'select',
          match: 'flag',
          flag: '--select'
        }
      ]
    });
  }

  public async exec(message: Message, { className, select }: { className: string, select: string }): Promise<Message | Message[]> {
    if (!className) return message.util!.send(`Classes available -> \`${pClasses.map(e => e.name).join('|')}\`\nAdd the class name to get more information about this class. If you want to select this class, add \`--select\` after the name of the class.`);
    if (!className.toLowerCase().match(/^(clerc)$/)) return message.util!.send(`This class doesn\'t exist (classes available -> \`${pClasses.map(e => e.name).join('|')}\`).`);

    const classInfo = pClasses.find(e => e.name.toLowerCase() == className.toLowerCase());
    const classImg: any = new MessageAttachment(`./src/game/data/img/${className.toLowerCase()}.png`);

    if (select) {
      const player = await this.client.player.get(message.member!);
      if (player) return message.util!.reply('you can\'t select multiple classes!');
      await Players.create({
        id: message.author.id,
        guildId: message.guild!.id,
        className: classInfo!.name,
        attributs: classInfo!.attributs,
        gear: classInfo!.gear
      });
      return message.util!.send(`Congratulation, you are now a \`${classInfo!.name}\`, you can start your adventure!`);
    }

    let embed = new MessageEmbed()
      .attachFiles(classImg)
      .setColor(classInfo!.color)
      .setAuthor(classInfo!.name, `attachment://${className.toLowerCase()}.png`)
      .setDescription(classInfo!.description)
      .setFooter(`Add --select on your command to select this class`)
    
    return message.util!.send(embed);
  }
}