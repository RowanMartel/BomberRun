export class InputManager
{
    private stage:createjs.StageGL;

    // input bools
    public leftPressed:boolean;
    public rightPressed:boolean;
    public mousePressed:boolean;

    constructor (stage:createjs.StageGL)
    {
        this.leftPressed = false;
        this.rightPressed = false;
        this.mousePressed = false;
        this.stage = stage;

        // document.onkeydown = this.keyLogDown;
        document.onkeydown = (keyEvent:KeyboardEvent):void => this.keyLogDown(keyEvent);
        document.onkeyup = (keyEvent:KeyboardEvent):void => this.keyLogUp(keyEvent);
        stage.on("mousedown", this.mouseLogDown, this);
        stage.on("stagemouseup", this.mouseLogUp, this);
    }

    private keyLogDown(keyEvent:KeyboardEvent):void
    {
        switch (keyEvent.key)
        {
            case "a":
            case "ArrowLeft":
                this.leftPressed = true;
                this.rightPressed = false;
                break;
            case "d":
            case "ArrowRight":
                this.rightPressed = true;
                this.leftPressed = false;
                break;
        }
    }

    private keyLogUp(keyEvent:KeyboardEvent):void
    {
        switch (keyEvent.key)
        {
            case "a":
            case "ArrowLeft":
                this.leftPressed = false;
                break;
            case "d":
            case "ArrowRight":
                this.rightPressed = false;
                break;
        }
    }
    private mouseLogDown(e:createjs.Event):void
    {
        this.mousePressed = true;
    }
    private mouseLogUp(e:createjs.Event):void
    {
        this.mousePressed = false;
    }
}