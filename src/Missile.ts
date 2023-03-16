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
        if (this.moving) return;
        this.sprite.visible = true;
        this.sprite.x = this.player.getPos("x");
        this.sprite.y = this.player.getPos("y");
        this.angle = Math.atan2(this.stage.mouseY - this.sprite.y, this.stage.mouseX - this.sprite.x ) ;
        this.sprite.rotation = this.angle * 180 / Math.PI + 90;
        this.moving = true;
    }// launches missile from the player

    public update():void
    {
        if (!this.moving) return;

        this.sprite.x += 15 * Math.cos(this.angle);
        this.sprite.y += 15 * Math.sin(this.angle);
        // trigonometry is used to maintain consistent speed regardless of direction

        if (this.checkRange()) this.reset();
    }

    public reset():void
    {
        this.player.addMissile();
        this.moving = false;
        this.sprite.visible = false;
        this.sprite.x = 0;
        this.sprite.y = 0;
    }

    private checkRange():boolean
    {
        if (this.sprite.x <= 0 || this.sprite.x >= 640 || this.sprite.y <= 0 || this.sprite.y >= 480)
        {
            return true;
        }
        return false;
    }// checks if out of bounds

    get Moving():boolean
    {
        return this.moving;
    }
    get Sprite():createjs.Sprite
    {
        return this.sprite;
    }
}