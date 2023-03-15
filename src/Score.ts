import { AssetManager } from "./AssetManager";

export class Score
{
    // class constants
    public static LABEL:string = "Score: ";

    // properties
    private score:number;
    private scoreText:createjs.BitmapText;

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        //initialization
        this.score = 0;
        
        this.scoreText = new createjs.BitmapText(Score.LABEL + this.score.toString(), assetManager.getSpriteSheet("glyphs"));
        this.scoreText.letterSpacing = 1;
        this.scoreText.x = 10;
        this.scoreText.y = 10;
        this.scoreText.scaleX = 20;
        this.scoreText.scaleY = 20;
        stage.addChild(this.scoreText);
    }
}