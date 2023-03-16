import { AssetManager } from "./AssetManager";
import { reset } from "./Game";

export class Button
{
    // properties
    private sprite:createjs.Sprite;
    private button1:string;
    private button2:string;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, restart:boolean)
    {
        // initialization
        if (restart)
        {
            this.button1 = "Other/button1";
            this.button2 = "Other/button2";
        }
        else
        {
            this.button1 = "Other/button3";
            this.button2 = "Other/button4";
        }// determines which button sprite to use: start or restart

        this.sprite = assetManager.getSprite("sprites", this.button1);
        this.sprite.visible = false;
        this.sprite.x = 320;
        
        if (restart)
        {
            this.sprite.y = 320;
        }
        else
        {
            this.sprite.y = 200;
        }// determines where to place the button based on whether or not it's a restart button

        stage.addChild(this.sprite);
        
        // listeners
        this.sprite.on("click", ()=> 
        {
            this.sprite.gotoAndStop(this.button1);
            this.sprite.visible = false;
            reset();
        });
        this.sprite.on("mouseout", ()=> this.sprite.gotoAndStop(this.button1));
        this.sprite.on("mousedown", ()=> this.sprite.gotoAndStop(this.button2));
    }

    public enable():void
    {
        this.sprite.visible = true;
    }
}