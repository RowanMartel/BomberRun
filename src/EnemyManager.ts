import { AssetManager } from "./AssetManager";
import { ENEMY_POOL_SIZE } from "./Constants";
import { Enemy } from "./Enemy";
import { Missile } from "./Missile";

export class EnemyManager
{
    // properties
    private enemies:Enemy[];

    constructor(stage:createjs.StageGL, assetManager:AssetManager, missiles:Missile[])
    {
        // initialization
        this.enemies = [];
        for (let index = 0; index < ENEMY_POOL_SIZE; index++)
        {
            this.enemies.push(new Enemy(stage, assetManager, missiles));
            this.enemies[index].spawn();
        }
    }

    public update():void
    {
        for (let index = 0; index < this.enemies.length; index++)
        {
            this.enemies[index].update();
        }
    }
}