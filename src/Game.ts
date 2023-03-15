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
import { Enemy } from "./Enemy";
import { EnemyManager } from "./EnemyManager";
import { Base } from "./Base";

// game setup variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
let assetManager:AssetManager;

// game object variables
let player:Player;
let inputManager:InputManager;
let enemyManager:EnemyManager;
let base:Base;

let missiles:Missile[];

// background sprites
let background:createjs.Sprite;
let grass:createjs.Sprite;

// --------------------------------------------------- event handler
function onReady(e:createjs.Event):void {
    console.log(">> all assets loaded – ready to add sprites to game");

    // background sprites
    background = assetManager.getSprite("sprites", "Other/background");
    stage.addChild(background);
    // construct base here first so it appears in back
    base = new Base(assetManager, stage);
    grass = assetManager.getSprite("sprites", "Other/grass", 0, 360);
    stage.addChild(grass);

    // construct game objects here
    inputManager = new InputManager(stage);
    player = new Player(stage, assetManager, inputManager);

    missiles = [];
    for (let index = 0; index < 3; index++)
    {
        missiles.push(new Missile(stage, player, assetManager));
    }
    player.getMissiles(missiles);
    
    enemyManager = new EnemyManager(stage, assetManager, missiles);

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

function onTick(e:createjs.Event) {
    // displaying frames per second - comment this out when game is published
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    // this is your game loop!
    player.update();
    enemyManager.update();

    for (let index = 0; index < missiles.length; index++)
    {
        missiles[index].update();
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

main();