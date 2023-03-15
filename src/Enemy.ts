import { AssetManager } from "./AssetManager";
import { Missile } from "./Missile";
import { radiusHit } from "./Toolkit";

export class Enemy
{
    // state class constants
    public static FLYING:number = 0;
    public static DYING:number = 1;
    public static DEAD:number = 2;

    // direction class constants
    public static LEFT:number = 0;
    public static RIGHT:number = 1;

    // properties
    private state:number;
    private sprite:createjs.Sprite;
    private direction:number;
    private speed:number;
    private armed:boolean;

    private missiles:Missile[];

    constructor(stage:createjs.StageGL, assetManager:AssetManager, missiles:Missile[])
    {
        // initialization
        this.state = Enemy.DEAD;
        this.missiles = missiles;
        this.armed = true;

        // construct sprite
        this.sprite = assetManager.getSprite("sprites", "Plane1/plane1idle");
        this.sprite.scaleX = 1.5;
        this.sprite.scaleY = 1.5;
        stage.addChild(this.sprite);
        this.reset();
    }

    private reset():void
    {
        this.state = Enemy.DEAD;
        this.sprite.visible = false;
        this.sprite.x = 0;
        this.sprite.y = 0;
    }
    private die():void
    {
        this.state = Enemy.DYING;
        this.sprite.gotoAndPlay("Plane1/plane1dead");
        this.sprite.on("animationend", () => this.reset());
    }

    public spawn():void
    {
        this.direction = Math.round(Math.random());
        this.speed = Math.random() * 3 + 1;

        switch (this.direction)
        {
            case Enemy.LEFT:
                this.sprite.x = 640;
                this.sprite.scaleX = 1.5;
                break;
            case Enemy.RIGHT:
                this.sprite.x = 0;
                this.sprite.scaleX = -1.5;
                break;
        }
        this.sprite.y = Math.round(Math.random() * 100) + 100;

        this.sprite.gotoAndPlay("Plane1/plane1idle");
        this.sprite.visible = true;
        this.state = Enemy.FLYING;
    }

    public update():void
    {
        if (this.state != Enemy.FLYING) return;

        switch(this.direction)
        {
            case Enemy.LEFT:
                this.sprite.x -= this.speed;
                break;
            case Enemy.RIGHT:
                this.sprite.x += this.speed;
                break;  
        }

        for (let index = 0; index < this.missiles.length; index++)
        {
            if (radiusHit(this.sprite, this.sprite.getBounds().width / 2, this.missiles[index].Sprite, this.missiles[index].Sprite.getBounds().width))
            {
                this.die();
                this.missiles[index].reset();
                break;
            }
        }

        if (this.checkBombingRange())
        {
            this.dropBomb();
        }
        if (this.checkOutOfRange()) this.reset();
    }

    private checkOutOfRange():boolean
    {
        if (this.sprite.x <= 0 + this.sprite.getBounds().x * 1.3 || this.sprite.x >= 640 - this.sprite.getBounds().x * 1.3)
        {
            return true;
        }
        return false;
    }
    private checkBombingRange():boolean
    {
        if (!this.armed) return false;
        if (this.sprite.x > 300 && this.sprite.x < 340) return true;
        return false;
    }
    private dropBomb():void
    {
        this.armed = false;
        this.speed *= 1.5;
    }
}