import { Schema, model, Document } from 'mongoose';

export interface Players extends Document {
  id: string,
  gold: number,
  exp: number,
  hp: number,
  monster: {
    name: string,
    hp: number,
    exp: number,
    att: number,
    description: string,
    level: number
  }
  gear: {
    helm: string,
    chest: string,
    legs: string,
    boots: string,
    weapon: string
  },
}

const PlayersSchema = new Schema({
  id: String,
  gold: {
    type: Number,
    default: 0
  },
  exp: {
    type: Number,
    default: 0
  },
  hp: Number,
  monster: {
    name: {
      type: String,
      default: "Evil Sprout"
    },
    hp: {
      type: Number,
      default: 25
    },
    exp: {
      type: Number,
      default: 3
    },
    att: {
      type: Number,
      default: 13
    },
    description: {
      type: String,
      default: "It's alive and evil!"
    },
    level: {
      type: Number,
      default: 1
    }
  },
  gear: {
    helm: String,
    chest: String,
    legs: String,
    boots: String,
    weapon: String
  },
});

export const Players = model<Players>('Players', PlayersSchema);
