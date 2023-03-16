import { AssetManager } from "./AssetManager";
import { Base } from "./Base";
import { ENEMY_POOL_SIZE } from "./Constants";
import { Enemy } from "./Enemy";
import { Missile } from "./Missile";
import { Score } from "./Score";

export class EnemyManager
{
    // properties
    private enemies:Enemy[];
    private loop:ReturnType<typeof setTimeout>;
    private spawnTime:number;
    private tickCounter:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, missiles:Missile[], base:Base, score:Score)
    {
        // initialization
        this.enemies = [];
        for (let index = 0; index < ENEMY_POOL_SIZE; index++)
        {
            this.enemies.push(new Enemy(stage, assetManager, missiles, base, score));
        }// makes the enemy object pool
    }

    public update():void
    {
        this.tickCounter++;
        if (this.tickCounter >= 5)
        {
            this.spawnTime--;
            if (this.spawnTime < 0) this.spawnTime = 0;
            this.tickCounter = 0;
        }// reduces time until next spawn every five ticks

        for (let index = 0; index < this.enemies.length; index++)
        {
            this.enemies[index].update();
            if (this.enemies[index].State == Enemy.FLYING)
            {
                createjs.Sound.play("planeMove");
            }
        }// updates planes
    }

    public reset():void
    {
        this.spawnTime = 1000;
        this.tickCounter = 0;
        for (let index = 0; index < this.enemies.length; index++)
        {
            this.enemies[index].reset();
        }
        this.startLoop();
    }

    private startLoop():void
    {
        this.loop = setTimeout(()=>
        {
            for (let index = 0; index < this.enemies.length; index++)
            {
                if (this.enemies[index].State == Enemy.DEAD)
                {
                    this.enemies[index].spawn();
                    this.startLoop();
                    return;
                }
            }
            this.startLoop();
        }, this.spawnTime);
    }// starts a self-recurring loop that spawns planes
    public stopLoop():void
    {
        clearTimeout(this.loop);
    }// stops the spawning loop
}