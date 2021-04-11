import { Command, PrefixSupplier } from 'discord-akairo';
import { stripIndents } from 'common-tags';
import { Message, MessageEmbed } from 'discord.js';

export default class HelpCommand extends Command {
  public constructor() {
    super('help', {
      aliases: ['help', 'h'],
      description: {
        content: 'The help command returns a list of all commands available or detailed about a specific one.',
        usage: '(h)elp <command>',
        subCommand: '',
        examples: ['help', 'help ping', 'h prefix']
      },
      category: 'Bot',
      ratelimit: 2,
      args: [
        {
          id: 'command',
          type: 'commandAlias'
        }
      ]
    });
  }

  // @ts-ignore
  public async exec(message: Message, { command }: { command: Command } ): Promise<Message> {
    const prefix = await (this.handler.prefix as PrefixSupplier)(message);

    if (!command) {
      const embed = new MessageEmbed()
        .setColor(this.client.colorConstants.infoColor)
        .setAuthor(`Hello, my name is ${this.client.user!.username}!`, this.client.user!.displayAvatarURL())
        .setDescription(stripIndents`You can find a list of all our commands below.
          If you need assistance, you can join [our support server](https://placeholder.com).
          **--------------------**`)
          
      for (const category of this.handler.categories.values()) {
        embed.addField(`ф ${category.id}`, `${category.filter((cmd): boolean => cmd.aliases.length > 0).map((cmd): string => `\`${cmd.aliases[0]}\``).join(', ')}`);
      }
  
      embed.addField('--------------------', stripIndents`**Use \`${prefix}help <command>\` for help about a specific command.**
      Some examples: \`${prefix}help prefix\` | \`${prefix}help ping\`
      `);
  
      return message.util!.send(embed);
    }
    
    return message.util!.send(stripIndents`
    \`\`\`makefile
    [Help: Command -> ${command.aliases[0]}] ${command.ownerOnly ? '\/!\\ For admins only \/!\\' : ''}

    ${command.description.content}
    ${command.description.subCommand === '' ? 'There\'s no subcommand available for this command.' : command.description.subCommand}
    
    ${prefix}${command.description.usage}
    Examples: ${prefix}${command.description.examples.join(` | ${prefix}`)}

    ---

    ${prefix} = prefix to use for your bot (can be changed with the prefix command)
    () = alias | {} = subcommand available | [] = mandatory argument(s) | <> = optionnal argument(s)
    Do NOT include those characters -> [], (), <> or {} in your command.
    If you have a problem, join the support server (available through the about command)
    \`\`\``);
  }
}
