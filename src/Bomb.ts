import { AssetManager } from "./AssetManager";
import { Base } from "./Base";
import { Enemy } from "./Enemy";
import { Missile } from "./Missile";
import { Score } from "./Score";
import { boxHit } from "./Toolkit";

export class Bomb
{
    // state class constants
    public static STATE_ARMED:number = 0;
    public static STATE_FALLING:number = 1;
    public static STATE_EXPLODING:number = 2;

    // properties
    private state:number;
    private sprite:createjs.Sprite;
    private base:Base;
    private missiles:Missile[];
    private host:Enemy;
    private score:Score;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, base:Base, missiles:Missile[], host:Enemy, score:Score)
    {
        this.sprite = assetManager.getSprite("sprites", "Bomb/falling");
        stage.addChild(this.sprite);
        this.base = base;
        this.missiles = missiles;
        this.host = host;
        this.score = score;
        this.reset();
    }

    public update():void
    {
        if (this.state != Bomb.STATE_FALLING) return;

        for (let index = 0; index < this.missiles.length; index++)
        {
            if (boxHit(this.sprite, this.missiles[index].Sprite))
            {
                this.explode(false); // exploded not on base
                this.missiles[index].reset();
                break;
            }
        }

        if (boxHit(this.sprite, this.base.Sprite))
        {
            this.explode(true); // exploded on base
        }

        this.sprite.y += 10;
    }

    private explode(onBase:boolean):void
    {
        this.state = Bomb.STATE_EXPLODING;
        this.sprite.gotoAndPlay("Bomb/exploding");
        this.sprite.on("animationend", () => this.reset(), this, true);

        if (onBase) this.base.damage();
        else this.score.increaseScore(2);
    }

    private reset():void
    {
        this.state = Bomb.STATE_ARMED;
        this.sprite.visible = false;
        this.sprite.x = 0;
        this.sprite.y = 0;
    }

    public drop():void
    {
        this.state = Bomb.STATE_FALLING;
        this.sprite.x = this.host.Sprite.x;
        this.sprite.y = this.host.Sprite.y;
        this.sprite.visible = true;
        this.sprite.gotoAndPlay("Bomb/falling");
    }
}