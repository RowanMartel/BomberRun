import { AssetManager } from "./AssetManager";
import { Player } from "./Player";

export class Missile
{
    // property variables
    private sprite:createjs.Sprite;
    private moving:boolean;
    private player:Player;
    private stage:createjs.StageGL;
    private angle:number;

    constructor(stage:createjs.StageGL, player:Player, assetManager:AssetManager)
    {
        // initialization
        this.stage = stage;
        this.player = player;
        this.angle = 0;

        // construct sprite
        this.sprite = assetManager.getSprite("sprites", "Other/missile");
        stage.addChild(this.sprite);
        this.reset();
    }

    public fire():void
    {
        this.sprite.visible = true;
        this.sprite.x = this.player.getPos("x");
        this.sprite.y = this.player.getPos("y");
        this.angle = Math.atan2(this.stage.mouseY - this.sprite.y, this.stage.mouseX - this.sprite.x ) ;
        this.sprite.rotation = this.angle * 180 / Math.PI + 90;
        this.moving = true;
    }

    public update():void
    {
        if (!this.moving) return;

        this.sprite.x += 10 * Math.cos(this.angle);
        this.sprite.y += 10 * Math.sin(this.angle);

        if (this.checkRange())
        {
            this.reset();
            this.player.addMissile();
        }
    }

    private reset():void
    {
        this.moving = false;
        this.sprite.visible = false;
        this.sprite.x = 0;
        this.sprite.y = 0;
        console.log("reset missile");
    }

    private checkRange():boolean
    {
        if (this.sprite.x <= 0 || this.sprite.x >= 640 || this.sprite.y <= 0 || this.sprite.y >= 480)
        {
            return true;
        }
        return false;
    }

    public isMoving():boolean
    {
        return this.moving;
    }
}