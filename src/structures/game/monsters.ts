import monsters from './data/monsters.json';

// TODO: Rename Interface
export default class Monsters {
  generateMonster(playerLevel: number): MonstersStats {
    const monsterInfo = monsters.filter(mlvl => mlvl.level >= (playerLevel - 5) && mlvl.level <= (playerLevel + 5));
    const monster = monsterInfo[Math.floor(Math.random() * monsterInfo.length)];
    return monster;
  }
}

export interface MonstersStats {
  name: string,
  hp: number,
  att: number,
  pdr: number,
  mdr: number,
  description: string,
  level:number
}