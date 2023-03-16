import { AssetManager } from "./AssetManager";
import { reset } from "./Game";

export class Button
{
    // properties
    private sprite:createjs.Sprite;

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        // initialization
        this.sprite = assetManager.getSprite("sprites", "Other/button1");
        this.sprite.visible = false;
        this.sprite.x = 320;
        this.sprite.y = 320;
        stage.addChild(this.sprite);
        
        // listeners
        this.sprite.on("click", ()=> 
        {
            this.sprite.gotoAndStop("Other/button1");
            this.sprite.visible = false;
            reset();
        });
        this.sprite.on("mouseout", ()=> this.sprite.gotoAndStop("Other/button1"));
        this.sprite.on("mousedown", ()=> this.sprite.gotoAndStop("Other/button2"));
    }

    public enable():void
    {
        this.sprite.visible = true;
    }
}