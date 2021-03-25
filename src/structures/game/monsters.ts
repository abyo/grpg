import monsters from './data/monsters.json';
import { IMonsters } from '../../util/Interface';

export default class Monsters {
  generateMonster(playerLevel: number): IMonsters {
    const monsterInfo = monsters.filter(mlvl => mlvl.level >= (playerLevel - 5) && mlvl.level <= (playerLevel + 5));
    const monster = monsterInfo[Math.floor(Math.random() * monsterInfo.length)];
    return monster;
  }
}