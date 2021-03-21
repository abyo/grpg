import { Mechanics } from './mechanics';
import monsters from '../../assets/npcs/index.json';

export default class Monsters extends Mechanics {
  generateMonster(playerLevel: number): string {
    const monsterInfo = monsters.filter(mlvl => mlvl.level >= (playerLevel - 5) && mlvl.level <= (playerLevel + 5));
    const monster = monsterInfo[Math.floor(Math.random() * monsterInfo.length)];
    return monster.name;
  }
}