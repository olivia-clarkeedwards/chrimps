import { BaseEnemy, Enemy } from "../models/monsters";
import { BaseStage } from "../models/stages";
import { stage } from "./stage";

export class BaseMonster implements BaseEnemy {
  monsterLevel = 0;
  get health(): number {
    return Math.floor(Math.pow(1.2, this.monsterLevel) + 9);
  }

  constructor(stage: BaseStage) {
    this.monsterLevel = stage.stageNumber;
  }
}

export class Monster extends BaseMonster implements Enemy {
  healthMulti = 0;
  monsterImage = "../assets/logo.svg";
  get monsterHealth(): number {
    return this.health * this.healthMulti;
  }

  constructor(stage: BaseStage, healthMulti: number) {
    super(stage);
    this.healthMulti = healthMulti;
  }

  static spawnSlime(): Monster {
    return new Monster(stage, 1);
  }
  static spawnWorm(): Monster {
    return new Monster(stage, 1.05);
  }
  static spawnCacodemon(): Monster {
    return new Monster(stage, 1.1);
  }
  static spawnYeti(): Monster {
    return new Monster(stage, 1.2);
  }
}

export const spawnSlime = Monster.spawnSlime();
// const cacodemon = new Monster(stage, 1.1);
// const yeti = new Monster(stage, 1.2);
// const worm = new Monster(stage, 1.05);

console.log(spawnSlime.monsterHealth);
