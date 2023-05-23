import { SugorokuConnection } from "./SugorokuConnection.js";


// 実際に描画するシーン（一番メインのところ）
export class TitleScene extends Phaser.Scene {
    
    // コンストラクタ（このクラスが召喚される時に実行される）
    constructor() {
        super({ key: 'TitleScene', active: true });
        this.titleText;
        // すごろくモードであるかを判定する
        this.sgcon = new SugorokuConnection();
        this.sgcon.checkSugorokuMode();
    }
    
    preload() {
        // 画像の読み込み（まだ表示はしない）
        this.load.image('sky', 'assets/879604.jpg');
    }
    
    create() {
        // this.add.image(400, 300, 'sky');
        // const skyImage = this.add.image(1000, 1000, 'sky');
        // skyImage.setDisplaySize(500, 500);
        // const skyImage = this.add.image(0, 0, 'sky');
        const skyImage = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'sky');
        skyImage.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);
        
        // this.titleText = this.add.text(400, 300, '的あてゲーム');
        this.titleText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, '的あてゲーム');
        this.titleText.setFontSize(50); // フォントサイズを指定
        this.titleText.setOrigin(0.5, 0.5);
        this.titleText.setFontFamily("Arial");
        this.titleText.setColor('#7F0000');     // 文字の色を指定
        
        // 画面クリックされたらシーンを移動する
        this.input.on('pointerdown', (_pointer) => {
            this.scene.transition({
                target: 'ExplanationScene',            // 遷移先のシーンの名前
                data: {},                       // シーンに送るデータを指定
                duration: 50,                   // シーンに遷移する時間（1000→1秒）
                onUpdate: (_progress) => {},    // 遷移中に行う処理
            });
        });
        
        
    }
    
    update() {
        
    }
    
}




