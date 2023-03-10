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

// game setup variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
let assetManager:AssetManager;

// game object variables
let player:Player;
let inputManager:InputManager;

let missile1:Missile;
let missile2:Missile;
let missile3:Missile;

// background sprites
let background:createjs.Sprite;
let grass:createjs.Sprite;

// --------------------------------------------------- event handler
function onReady(e:createjs.Event):void {
    console.log(">> all assets loaded – ready to add sprites to game");

    // background sprites
    background = assetManager.getSprite("sprites", "Other/background");
    stage.addChild(background);
    grass = assetManager.getSprite("sprites", "Other/grass", 0, 360);
    stage.addChild(grass);

    // construct game objects here
    inputManager = new InputManager(stage);
    player = new Player(stage, assetManager, inputManager);

    missile1 = new Missile(stage, player, assetManager);
    missile2 = new Missile(stage, player, assetManager);
    missile3 = new Missile(stage, player, assetManager);
    player.getMissiles(missile1, missile2, missile3);

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

    missile1.update();
    missile2.update();
    missile3.update();

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