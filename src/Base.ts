import { AssetManager } from "./AssetManager";

export class Base
{
    // class constants
    public static MAXHP:number = 3;

    // properties
    private hp:number;
    private sprite:createjs.Sprite;
    private stage:createjs.StageGL;

    constructor(assetManager:AssetManager, stage:createjs.StageGL)
    {
        this.hp = Base.MAXHP;
        this.sprite = assetManager.getSprite("sprites", "Other/base");
        this.stage = stage;
        stage.addChild(this.sprite);
        this.sprite.x = 320;
        this.sprite.y = 380;
    }

    public damage():void
    {
        this.hp--;
        switch(this.hp)
        {
            case 2:
            case 1:
                this.sprite.gotoAndStop(this.sprite.currentFrame - 1);
                break;
        }
    }

    get Sprite():createjs.Sprite
    {
        return this.sprite;
    }
}