import { TitleScene } from './TitleScene.js';
import { ExplanationScene } from './ExplanationScene.js';
import { GameScene } from './GameScene.js';
import { ResultScene } from './ResultScene.js'
import { FinishScene } from './FinishScene.js'



const config = {
    type: Phaser.AUTO,
    parent: 'canvas',
    // width: 800,
    // height: 600,
    width: window.innerWidth,
    height: window.innerHeight,
    // width: window.innerWidth * window.devicePixelRatio, // iPhone 対策
    // height: window.innerHeight * window.devicePixelRatio, // iPhone 対策
    // zoom: 1 / window.devicePixelRatio, // iPhone 対策
    // scale: {
    //     mode: Phaser.Scale.FIT, // レスポンシブ表示用
    //     autoCenter: Phaser.Scale.CENTER_HORIZONTALLY // PC用左右中央揃え
    // },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            // debug: true,
            gravity: { y: 0 }
        }
    },
    scene: [TitleScene, ExplanationScene, GameScene, FinishScene, ResultScene]
};

let game = new Phaser.Game(config);
