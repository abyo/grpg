import { Schema, model, Document } from 'mongoose';

export interface Players extends Document {
  id: string,
  guildId: string,
  className: string,
  level: number,
  gear: {
    helm: string,
    chest: string,
    legs: string,
    boots: string
  },
  attributs: {
    str: number,
    dex: number,
    int: number,
    vit: number,
    def: number
  }
}

const PlayersSchema = new Schema({
  id: String,
  guildId: String,
  className: String,
  level: {
    type: Number,
    default: 1
  },
  gear: {
    helm: String,
    chest: String,
    legs: String,
    boots: String,
    weapon: String
  },
  attributs: {
    str: Number,
    dex: Number,
    int: Number,
    vit: Number,
    def: Number
  }
});

export const Players = model<Players>('Players', PlayersSchema);