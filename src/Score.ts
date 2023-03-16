import { AssetManager } from "./AssetManager";

export class Score
{
    // class constants
    public static TITLE:string = "SCORE- ";

    // properties
    private score:number;
    private scoreText:createjs.BitmapText;
    private locked:boolean
    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        //initialization
        this.stage = stage;
        this.score = 0;
        this.locked = false;
        this.scoreText = new createjs.BitmapText(Score.TITLE + this.score.toString(), assetManager.getSpriteSheet("glyphs"));
        this.scoreText.letterSpacing = 1;
        this.scoreText.x = 10;
        this.scoreText.y = 10;
        this.scoreText.scaleX = 2;
        this.scoreText.scaleY = 2;
    }

    public increaseScore(amount:number):void
    {
        if (this.locked) return;
        this.score += amount;
        this.scoreText.text = Score.TITLE + this.score.toString();
    }// changes the score by the passed-in number

    public lock():void
    {
        this.locked = true;
    }
    public unlock():void
    {
        this.locked = false;
    }
    // makes the score able or unable to be changed

    public reset():void
    {
        this.score = 0;
        this.locked = false;
        this.increaseScore(0);
    }// resets the score to zero

    public goToFront():void
    {
        this.stage.addChild(this.scoreText);
    }// places the score in front of all other sprites
}