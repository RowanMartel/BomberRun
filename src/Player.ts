import { AssetManager } from "./AssetManager";
import { InputManager } from "./InputManager";
import { Missile } from "./Missile";

export class Player
{
    // state class constants
    public static STATE_3_MISSILES:number = 3;
    public static STATE_2_MISSILES:number = 2;
    public static STATE_1_MISSILES:number = 1;
    public static STATE_0_MISSILES:number = 0;

    // direction class constants
    public static LEFT:number = 0;
    public static RIGHT:number = 1;

    // property variables
    private speed:number;
    private state:number;
    private sprite:createjs.Sprite;
    private inputManager:InputManager;
    private moving:boolean;
    private canFire:boolean;

    // missiles
    private missilesArray:Missile[];
    private availableMissile:Missile;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, inputManager:InputManager)
    {
        // initialization
        this.speed = 8;
        this.inputManager = inputManager;

        // construct sprite and position on stage
        this.sprite = assetManager.getSprite("sprites", "Truck/truck3");
        stage.addChild(this.sprite);

        this.reset();
    }
    
    public getPos(position:string):number
    {
        switch (position)
        {
            case "x":
            case "X":
                return this.sprite.x;
            case "y":
            case "Y":
                return this.sprite.y;
            default:
                return 0;
        }
    }// gets current value of the passed-in variable

    public getMissiles(missilesArray:Missile[]):void
    {
        this.missilesArray = missilesArray;
        this.availableMissile = missilesArray[0];
    }// missiles are built after player so getting them is necessary

    public update():void
    {
        this.getAvailableMissile();

        if (this.inputManager.mousePressed)
        {
            this.fire();
        }

        // movement code
        if (this.inputManager.leftPressed)
        {
            this.changeDirection(Player.LEFT);
            this.moveLeft();
        }
        else if (this.inputManager.rightPressed)
        {
            this.changeDirection(Player.RIGHT);
            this.moveRight();
        }
        else
        {
            this.moving = false;
            switch (this.state)
            {
                case Player.STATE_0_MISSILES:
                    this.sprite.gotoAndStop("Truck/truck0");
                    break;
                case Player.STATE_1_MISSILES:
                    this.sprite.gotoAndStop("Truck/truck1");
                    break;
                case Player.STATE_2_MISSILES:
                    this.sprite.gotoAndStop("Truck/truck2");
                    break;
                case Player.STATE_3_MISSILES:
                    this.sprite.gotoAndStop("Truck/truck3");
                    break;
            }
            return;
        }// stops the movement animation

        if (!this.moving)
        {
            this.moving = true;
            switch (this.state)
            {
                case Player.STATE_0_MISSILES:
                    this.sprite.gotoAndPlay("Truck/truck0");
                    break;
                case Player.STATE_1_MISSILES:
                    this.sprite.gotoAndPlay("Truck/truck1");
                    break;
                case Player.STATE_2_MISSILES:
                    this.sprite.gotoAndPlay("Truck/truck2");
                    break;
                case Player.STATE_3_MISSILES:
                    this.sprite.gotoAndPlay("Truck/truck3");
                    break;
            }
        }// starts up movement animations
    }

    private moveLeft():void
    {
        if (this.sprite.x <= 25) return;
        this.sprite.x -= this.speed;
    }
    private moveRight():void
    {
        if (this.sprite.x >= 615) return;
        this.sprite.x += this.speed;
    }

    private changeDirection(direction:number):void
    {
        switch (direction)
        {
            case Player.LEFT:
                this.sprite.scaleX = 1;
                break;
            case Player.RIGHT:
                this.sprite.scaleX = -1;
                break;
        }
    }// changes player direction

    private fire():void
    {
        if (!this.canFire || this.state == Player.STATE_0_MISSILES) return;
        
        this.state--;
        this.moving = false;
        this.availableMissile.fire();

        this.canFire = false;
        setTimeout(() => {
            this.canFire = true;    
        }, 500);
    }// fires the current available missile

    public addMissile():void
    {
        if (this.state == Player.STATE_3_MISSILES) return;
        this.state++;
        this.moving = false;
    }// adds a missile to the missile count - max three

    public getAvailableMissile():void
    {
        for (let index = 0; index < this.missilesArray.length; index++)
        {
            if (!this.missilesArray[index].Moving)
            {
                this.availableMissile = this.missilesArray[index];
                break;
            }
        }
    }// finds if there is a missile that is not in use

    public reset():void
    {
        this.state = Player.STATE_3_MISSILES; 
        this.sprite.x = 320;
        this.sprite.y = 410;
        this.moving = false;
        this.canFire = true;
    }// resets the player to how it was at the start
}