// game constants
export const STAGE_WIDTH:number = 640;
export const STAGE_HEIGHT:number = 480;
export const FRAME_RATE:number = 30;
export const ENEMY_POOL_SIZE:number = 10;

export const ASSET_MANIFEST:Object[] = [
    {
        type:"json",
        src:"./lib/sprites/sprites.json",
        id:"sprites",
        data:0
    },
    {
        type:"image",
        src:"./lib/sprites/sprites.png",
        id:"sprites",
        data:0
    },
    {
        type:"json",
        src:"./lib/sprites/glyphs.json",
        id:"glyphs",
        data:0
    },
    {
        type:"image",
        src:"./lib/sprites/glyphs.png",
        id:"glyphs",
        data:0
    },
    {
        asset:"sound",
        src:"./lib/audio/startGame.ogg",
        id:"startGame",
        data:1
    },
    {
        asset:"sound",
        src:"./lib/audio/rocketLaunch.ogg",
        id:"rocketLaunch",
        data:5
    },
    {
        asset:"sound",
        src:"./lib/audio/planeMove.ogg",
        id:"planeMove",
        data:1
    },
    {
        asset:"sound",
        src:"./lib/audio/planeExplode.ogg",
        id:"planeExplode",
        data:5
    },
    {
        asset:"sound",
        src:"./lib/audio/gameOver.ogg",
        id:"gameOver",
        data:1
    },
    {
        asset:"sound",
        src:"./lib/audio/bombExplode.ogg",
        id:"bombExplode",
        data:5
    },
    {
        asset:"sound",
        src:"./lib/audio/bombDrop.ogg",
        id:"bombDrop",
        data:5
    },
];