import { Listener } from 'discord-akairo';
import { Guild, TextChannel, MessageEmbed } from 'discord.js';
import { Guilds } from '../../structures/models/Guilds';

export default class GuildCreateListener extends Listener {
  public constructor() {
    super('guildCreate', {
      emitter: 'client',
      category: 'client',
      event: 'guildCreate'
    });
  }

  public async exec(guild: Guild): Promise<void> {
    const owner = await this.client.users.fetch(guild.ownerID);
    const logChannel = this.client.channels.cache.get(this.client.idConstants.mainModLog);

    const logEmbed = new MessageEmbed()
      .setColor(this.client.colorConstants.succeedColor)
      .setAuthor(`${guild.name} (Owner: <${owner.username} / ${owner.id}>)`, guild.iconURL()!)
      .setTimestamp(Date.now())
      .setFooter('GRPG Joined a guild!');

    await Guilds.create({ id: guild!.id }, async(err: any) => {
      if (err) return (logChannel as TextChannel).send('something went wrong!');
      return (logChannel as TextChannel).send(logEmbed);
    });
  }
}