import { GuildMember } from 'discord.js';
import { Document, Query } from 'mongoose';
import { Players } from '../models/Players';

export class PlayersProvider {
  public async get(player: GuildMember): Promise<any> {
    const data = await Players.findOne({ id: player.id });
		if (data) return data;
  }

  public async update(player: GuildMember, settings: any): Promise<Query<Document>> {
    let data = await this.get(player);
		if (typeof data !== 'object') data = {};
		for (const key in settings) {
			if (data[key] !== settings[key]) data[key] = settings[key];
		}
		return data.updateOne(settings);
  }
}
