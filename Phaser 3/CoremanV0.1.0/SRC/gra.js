/** @type {import("../phaser/phaser")} */

import {Prompt1} from './scenes/prompts/Tutorial_Prompt.js';
import {Scene2} from './scenes/Menu.js';
import {Scene3} from './scenes/Inside_House.js';
import {Scene4} from './scenes/Europe.js';
import {Scene5} from './scenes/Submenu.js';
import {FatherScene} from './scenes/FatherScene.js';
import { Scene6 } from './scenes/Death_Screen.js';
import {Scene7} from './scenes/WinScreen.js'
import { Scene1 } from './scenes/PatchNotes.js';
import { Scene9 } from './scenes/Asia.js';
import { Scene10 } from './scenes/Map_Open.js';
import {Scene11} from './scenes/Loader.js';
import {Scene8} from './scenes/Credits.js';
import { Scene12 } from './scenes/Tutorial.js';
import { Scene13 } from './scenes/Option_Controls.js';
const gameConfig =
{
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent:'phaser-game',
    pixelArt:true,
    scale: 
    {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: 
        {
            gravity: { y: 0 },
            debug:false,
        }
    },
    scene: 
    [ 
        Scene2,Scene1,FatherScene,Scene3,Scene4,Scene5,Scene6,Scene7,Scene8,Scene9,Scene10,Scene11,Scene12,Scene13,Prompt1
    ],
}
export default new Phaser.Game(gameConfig)
