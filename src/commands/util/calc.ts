import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { evaluate, MathExpression } from 'mathjs';

export default class CalcCommand extends Command {
  public constructor() {
    super('calc', {
      aliases: ['calc'],
      description: {
        content: 'The calc command allow you to return the result of a calcul.',
        usage: 'calc [operation]',
        subCommand: '',
        examples: ['calc 2+2', 'calc 5*7/2']
      },
      category: 'Util',
      ratelimit: 2,
      args: [
        {
          id: 'operation',
          match: 'rest',
          type: 'MathExpression',
          prompt: {
            start: (message: Message): string => `${message.author}, what would you like to calculate?`
          }
        },
      ]
    });
  }

  public async exec(message: Message, { operation }: { operation: MathExpression }): Promise<Message | Message[]> {
    const calcul = evaluate(operation);
    const embed = new MessageEmbed()
      .addField('Calcul', `\`\`\`autohotkey\n${operation}\`\`\``)
      .addField('Résultat', `\`\`\`fix\n${calcul} \`\`\``);

    return message.util!.send(embed);
  }
}