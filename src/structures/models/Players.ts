import { Schema, model, Document } from 'mongoose';

export interface Players extends Document {
  id: string,
  guildId: string,
  className: string,
  level: number
}

const PlayersSchema = new Schema({
  id: String,
  guildId: String,
  className: String,
  level: {
    type: Number,
    default: 1
  }
});

export const Players = model<Players>('Players', PlayersSchema);