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
    private missiles:number;
    private maxMissiles:number;
    private direction:number;
    private inputManager:InputManager;
    private stage:createjs.StageGL;
    private moving:boolean;
    private canFire:boolean;

    // missiles
    private missile1:Missile;
    private missile2:Missile;
    private missile3:Missile;
    private availableMissile:Missile;

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
    }

    constructor(stage:createjs.StageGL, assetManager:AssetManager, inputManager:InputManager)
    {
        // initialization
        this.speed = 20;
        this.state = Player.STATE_3_MISSILES;
        this.maxMissiles = 3;
        this.missiles = this.maxMissiles;
        this.direction = Player.LEFT;
        this.inputManager = inputManager;
        this.stage = stage;
        this.moving = false;
        this.canFire = true;

        // construct sprite and position on stage
        this.sprite = assetManager.getSprite("sprites", "Truck/truck3");
        stage.addChild(this.sprite);
        this.sprite.x = 320;
        this.sprite.y = 410;
    }

    public getMissiles(missile1:Missile, missile2:Missile, missile3:Missile):void
    {
        this.missile1 = missile1;
        this.missile2 = missile2;
        this.missile3 = missile3;
        this.availableMissile = missile1;
    }

    public update():void
    {
        this.getAvailableMissile();

        if (this.inputManager.mousePressed)
        {
            this.fire();
        }
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
        }

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
        }
    }

    private moveLeft():void
    {
        if (this.sprite.x <= 25) return;
        this.sprite.x -= 5;
    }
    private moveRight():void
    {
        if (this.sprite.x >= 615) return;
        this.sprite.x += 5;
    }

    private changeDirection(_direction:number):void
    {
        switch (_direction)
        {
            case Player.LEFT:
                this.direction = Player.LEFT;
                this.sprite.scaleX = 1;
                break;
            case Player.RIGHT:
                this.direction = Player.RIGHT;
                this.sprite.scaleX = -1;
                break;
        }
    }

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
    }

    public addMissile():void
    {
        if (this.state == Player.STATE_3_MISSILES) return;
        this.state++;
        this.moving = false;
    }

    public getAvailableMissile():void
    {
        if (!this.missile1.isMoving())
            this.availableMissile = this.missile1;
        else if (!this.missile2.isMoving())
            this.availableMissile = this.missile2;
        else if (!this.missile3.isMoving())
            this.availableMissile = this.missile3;
    }
}