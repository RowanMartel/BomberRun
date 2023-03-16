// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST } from "./Constants";
import { AssetManager } from "./AssetManager";
import { Player } from "./Player";
import { InputManager } from "./InputManager";
import { Missile } from "./Missile";
import { EnemyManager } from "./EnemyManager";
import { Base } from "./Base";
import { Score } from "./Score";
import { Button } from "./Button";

// game setup variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
let assetManager:AssetManager;
let gameActive:boolean;

// game object variables
let player:Player;
let inputManager:InputManager;
let enemyManager:EnemyManager;
let base:Base;
let score:Score;
let missiles:Missile[];
let background:createjs.Sprite;
let grass:createjs.Sprite;
let gameOverBG:createjs.Sprite;
let restartButton:Button;
let startButton:Button;

// --------------------------------------------------- event handler
function onReady(e:createjs.Event):void {
    console.log(">> all assets loaded – ready to add sprites to game");

    // construct game objects here
    background = assetManager.getSprite("sprites", "Other/background");
    stage.addChild(background);
    score = new Score(stage, assetManager);
    base = new Base(assetManager, stage);
    grass = assetManager.getSprite("sprites", "Other/grass", 0, 360);
    stage.addChild(grass);
    inputManager = new InputManager(stage);
    player = new Player(stage, assetManager, inputManager);
    missiles = [];
    for (let index = 0; index < 3; index++)
    {
        missiles.push(new Missile(stage, player, assetManager));
    }
    player.getMissiles(missiles);
    enemyManager = new EnemyManager(stage, assetManager, missiles, base, score);
    gameOverBG = assetManager.getSprite("sprites", "Other/gameover");
    stage.addChild(gameOverBG);
    gameOverBG.visible = false;
    restartButton = new Button(stage, assetManager, true);
    startButton = new Button(stage, assetManager, false);
    score.goToFront();

    gameActive = false;
    enemyManager.GameActive = false;
    startButton.enable();

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

function onTick(e:createjs.Event) {
    // displaying frames per second - comment this out when game is published
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    // this is your game loop!
    if (gameActive)
    {
        player.update();
        enemyManager.update();

        for (let index = 0; index < missiles.length; index++)
        {
            missiles[index].update();
        }
    }

    // update the stage
    stage.update();
}

// --------------------------------------------------- main method
function main():void {
    console.log(">> game initialization");
    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;    

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });
    stage.enableMouseOver();

    // AssetManager setup
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

// --------------------------------------------------- other functions
export function gameOver():void
{
    score.lock();
    gameOverBG.visible = true;
    restartButton.enable();
    enemyManager.stopLoop();
    gameActive = false;
}// brings up game over screen

export function reset():void
{
    score.unlock();
    score.reset();
    player.reset();
    for (let index = 0; index < missiles.length; index++)
    {
        missiles[index].reset();
    }
    enemyManager.reset();
    gameOverBG.visible = false;
    base.reset();
    gameActive = true;
}// starts game from beginning

main();