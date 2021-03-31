import { Schema, model, Document } from 'mongoose';

export interface Players extends Document {
  id: string,
  guildId: string,
  className: string,
  level: number,
  gold: number,
  area: string,
  exp: number,
  totalExp: number,
  hp: number,
  arpen: number,
  monster: {
    name: string,
    hp: number,
    exp: number,
    gold: number,
    area: string,
    att: number,
    pdr: number,
    mdr: number,
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
  gold: {
    type: Number,
    default: 0
  },
  area: {
    type: String,
    default: "Starter Area"
  },
  exp: {
    type: Number,
    default: 0
  },
  totalExp: {
    type: Number,
    default: 15
  },
  hp: Number,
  arpen: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
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
    gold: {
      type: Number,
      default: 2
    },
    area: {
      type: String,
      default: "Starter Area"
    },
    att: {
      type: Number,
      default: 13
    },
    pdr: {
      type: Number,
      default: 10
    },
    mdr: {
      type: Number,
      default: 10
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
  attributs: {
    str: Number,
    dex: Number,
    int: Number,
    vit: Number,
    def: Number
  }
});

export const Players = model<Players>('Players', PlayersSchema);