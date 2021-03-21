import { Schema, model, Document } from 'mongoose';

export interface Players extends Document {
  id: string,
  guildId: string,
  className: string,
  level: number,
  armors: {
    head: number,
    chest: number
  },
  attributs: {
    str: number,
    dex: number
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
  armors: {
    head: {
      type: Number,
      default: 3
    },
    chest: {
      type: Number,
      default: 4
    }
  },
  attributs: {
    str: {
      type: Number,
      default: 4
    },
    dex: {
      type: Number,
      default: 2
    }
  }
});

export const Players = model<Players>('Players', PlayersSchema);