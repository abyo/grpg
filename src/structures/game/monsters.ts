import monsters from './data/monsters.json';
import { IMonsters } from '../../util/Interface';

export default class Monsters {
  generateMonster(playerLevel: number, playerArea: string): IMonsters {
    const monsterInfo = monsters.filter(m => m.level >= (playerLevel - 5) && m.level <= (playerLevel + 5) && m.area == playerArea);
    const monster = monsterInfo[Math.floor(Math.random() * monsterInfo.length)];
    return monster;
  }
}