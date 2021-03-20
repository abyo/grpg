import { Schema, model, Document } from 'mongoose';

export interface Players extends Document {
  id: string,
  guildId: string,
  className: string
}

const PlayersSchema = new Schema({
  id: String,
  guildId: String,
  className: String
});

export const Players = model<Players>('Players', PlayersSchema);