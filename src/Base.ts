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
        this.sprite.x = 250;
        this.sprite.y = 320;
    }
}