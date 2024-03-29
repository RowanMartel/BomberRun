import { AssetManager } from "./AssetManager";
import { gameOver } from "./Game";

export class Base
{
    // class constants
    public static MAXHP:number = 3;

    // properties
    private hp:number;
    private sprite:createjs.Sprite;

    constructor(assetManager:AssetManager, stage:createjs.StageGL)
    {
        this.sprite = assetManager.getSprite("sprites", "Other/baseUndamaged");
        this.reset();
        stage.addChild(this.sprite);
        this.sprite.x = 320;
        this.sprite.y = 380;
    }

    public reset():void
    {
        this.hp = Base.MAXHP;
        this.sprite.gotoAndStop("Other/baseUndamaged");
    }

    public damage():void
    {
        this.hp--;
        switch(this.hp)
        {
            case 2:
                this.sprite.gotoAndStop("Other/baseLightlyDamaged");
                break;
            case 1:
                this.sprite.gotoAndStop("Other/baseHeavilyDamaged")
                break;
            case 0:
                gameOver();
                break;
        }
    }// handles the base taking damage. can trigger a game over

    get Sprite():createjs.Sprite
    {
        return this.sprite;
    }
}