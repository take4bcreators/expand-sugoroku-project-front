
import { TitleScene } from './TitleScene.js';


export class ResultScene extends Phaser.Scene {
    
    // コンストラクタ（このクラスが召喚される時に実行される）
    constructor() {
        super({ key: 'ResultScene', active: false });
        this.pointText;
        this.rankText;
        this.buttonText;
        this.point;
    }
    
    init(data) {
        this.point =  data['point'];
     }
     
    preload() {
        // 画像の読み込み（まだ表示はしない）
        this.load.image('sky', 'assets/879604.jpg');
    }
    
    create() {
        const skyImage = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'sky');
        skyImage.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);
        
        // ランク判定
        let rank = 'C';
        if (this.point >= 70) {
            rank = 'S';
        } else if (this.point >= 50) {
            rank = 'A';
        } else if (this.point >= 30) {
            rank = 'B';
        } else {
            rank = 'C';
        }
        
        // ポイント表示
        // this.pointText = this.add.text(400, 200, this.point + ' pt');
        this.pointText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 3, this.point + ' pt');
        this.pointText.setFontSize(50); // フォントサイズを指定
        this.pointText.setOrigin(0.5, 0.5);
        this.pointText.setFontFamily("Arial");
        this.pointText.setColor('#7F0000');     // 文字の色を指定
        
        // ランク表示
        this.rankText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'ランク：' + rank);
        this.rankText.setFontSize(50); // フォントサイズを指定
        this.rankText.setOrigin(0.5, 0.5);
        this.rankText.setFontFamily("Arial");
        this.rankText.setColor('#7F0000');     // 文字の色を指定
        
        // タイトルシーンを取得
        const titleScene = this.scene.get('TitleScene');
        
        // すごろくモードの場合は、ボタンの文言を変える
        if (titleScene.sgcon.isSugorokuMode) {
            titleScene.sgcon.setRankValue(rank.toLowerCase());
            this.buttonText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 6 * 5, 'タップですごろくに戻る');
        } else {
            this.buttonText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 6 * 5, 'もう1度はじめる');
        }
        this.buttonText.setFontSize(20); // フォントサイズを指定
        this.buttonText.setOrigin(0.5, 0.5);
        this.buttonText.setFontFamily("Arial");
        this.buttonText.setColor('#7F0000');     // 文字の色を指定
        this.buttonText.setInteractive();
        this.buttonText.on('pointerdown', () => {
            // すごろくモードの場合はすごろくに戻る
            if (titleScene.sgcon.isSugorokuMode) {
                titleScene.sgcon.returnToSugoroku();
            } else {
                location.reload();
            }
        })
        
    }
    
    update() {
    }
    
}




