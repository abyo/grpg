import { Guild } from 'discord.js';
import { Document, Query } from 'mongoose';
import { Guilds } from '../models/Guilds';

export class GuildsProvider {
  public async get(guild: Guild): Promise<any> {
    const data = await Guilds.findOne({ id: guild.id });
		if (data) return data;
  }

  public async update(guild: Guild, settings: any): Promise<Query<Document>> {
    let data = await this.get(guild);
		if (typeof data !== 'object') data = {};
		for (const key in settings) {
			if (data[key] !== settings[key]) data[key] = settings[key];
		}
		return data.updateOne(settings);
  }
}