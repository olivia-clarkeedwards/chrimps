import { BaseEnemy, Enemy } from "../models/monsters";
import { BaseStage } from "../models/stages";
import { stage } from "./stage";

class BaseMonster implements BaseEnemy {
  level = 0;
  get baseHealth(): number {
    return Math.pow(1.2, this.level) + 9;
  }

  constructor(stage: BaseStage) {
    this.level = stage.stageNumber;
  }
}

class Monster extends BaseMonster implements Enemy {
  name;
  healthMulti;
  image;
  health;

  constructor(name: string, stage: BaseStage, healthMulti: number, imagePath: string) {
    super(stage);
    this.name = name;
    this.healthMulti = healthMulti;
    this.image = imagePath;
    this.health = Math.floor(this.baseHealth * this.healthMulti);
  }

  static spawnSlime(stage: BaseStage): Monster {
    return new Monster("Slime", stage, 1, "/ph-slime.png");
  }
  static spawnWorm(stage: BaseStage): Monster {
    return new Monster("Worm", stage, 1.05, "/ph-worm.png");
  }
  static spawnCacodemon(stage: BaseStage): Monster {
    return new Monster("Cacodemon", stage, 1.1, "/ph-cacodemon.png");
  }
  static spawnYeti(stage: BaseStage): Monster {
    return new Monster("Yeti", stage, 1.2, "/ph-yeti.png");
  }
}

export const monsters = [
  (stage: BaseStage) => Monster.spawnSlime(stage),
  (stage: BaseStage) => Monster.spawnWorm(stage),
  (stage: BaseStage) => Monster.spawnCacodemon(stage),
  (stage: BaseStage) => Monster.spawnYeti(stage),
];

export function getRandomMonster(stage: BaseStage): Monster {
  const randomIndex = Math.floor(Math.random() * monsters.length);
  return monsters[randomIndex](stage);
}
