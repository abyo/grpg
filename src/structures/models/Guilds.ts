import { Schema, model, Document } from 'mongoose';

export interface Guilds extends Document {
  id: string,
  prefix: string,
  channels: {
    welcome: string,
    modlog: string
  }
}

const GuildsSchema = new Schema({
  id: String,
  prefix: {
    type: String,
    default: ';'
  },
  channels: {
    welcome: {
      type: String,
      default: ''
    },
    modlog: {
      type: String,
      default: ''
    }
  }
});

export const Guilds = model<Guilds>('Guilds', GuildsSchema);