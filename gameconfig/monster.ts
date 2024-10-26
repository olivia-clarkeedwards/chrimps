import { BaseEnemy, Enemy } from "../models/monsters";
import { BaseStage } from "../models/stages";
import { stage } from "./stage";

class BaseMonster implements BaseEnemy {
  monsterLevel = 0;
  get health(): number {
    return Math.pow(1.2, this.monsterLevel) + 9;
  }

  constructor(stage: BaseStage) {
    this.monsterLevel = stage.stageNumber;
  }
}

class Monster extends BaseMonster implements Enemy {
  healthMulti = 1;
  image = "../assets/logo.svg";
  get monsterHealth(): number {
    return Math.floor(this.health * this.healthMulti);
  }

  constructor(stage: BaseStage, healthMulti: number, imagePath: string) {
    super(stage);
    this.healthMulti = healthMulti;
    this.image = imagePath;
  }

  static spawnSlime(): Monster {
    return new Monster(stage, 1, "/ph-slime.png");
  }
  static spawnWorm(): Monster {
    return new Monster(stage, 1.05, "/ph-worm.png");
  }
  static spawnCacodemon(): Monster {
    return new Monster(stage, 1.1, "/ph-cacodemon.png");
  }
  static spawnYeti(): Monster {
    return new Monster(stage, 1.2, "/ph-yeti.png");
  }
}

export const monsters = [Monster.spawnSlime, Monster.spawnWorm, Monster.spawnCacodemon, Monster.spawnYeti];

export function getRandomMonster(): Monster {
  return monsters[Math.floor(Math.random() * monsters.length)]();
}
