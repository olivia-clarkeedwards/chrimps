import { BaseEnemy, Enemy } from "../models/monsters";
import { BaseZone } from "../models/zones";
import { stage } from "./zone";

class BaseMonster implements BaseEnemy {
  level = 0;
  get baseHealth(): number {
    return Math.pow(1.2, this.level) + 9;
  }

  constructor(stage: BaseZone) {
    this.level = stage.stageNumber;
  }
}

class Monster extends BaseMonster implements Enemy {
  name;
  healthMulti;
  image;
  health;

  constructor(name: string, stage: BaseZone, healthMulti: number, imagePath: string) {
    super(stage);
    this.name = name;
    this.healthMulti = healthMulti;
    this.image = imagePath;
    this.health = Math.floor(this.baseHealth * this.healthMulti);
  }

  static spawnSlime(stage: BaseZone): Monster {
    return new Monster("Slime", stage, 1, "/ph-slime.png");
  }
  static spawnWorm(stage: BaseZone): Monster {
    return new Monster("Worm", stage, 1.05, "/ph-worm.png");
  }
  static spawnCacodemon(stage: BaseZone): Monster {
    return new Monster("Cacodemon", stage, 1.1, "/ph-cacodemon.png");
  }
  static spawnYeti(stage: BaseZone): Monster {
    return new Monster("Yeti", stage, 1.2, "/ph-yeti.png");
  }
}

export const monsters = [
  (stage: BaseZone) => Monster.spawnSlime(stage),
  (stage: BaseZone) => Monster.spawnWorm(stage),
  (stage: BaseZone) => Monster.spawnCacodemon(stage),
  (stage: BaseZone) => Monster.spawnYeti(stage),
];

export function getRandomMonster(stage: BaseZone): Monster {
  const randomIndex = Math.floor(Math.random() * monsters.length);
  return monsters[randomIndex](stage);
}
