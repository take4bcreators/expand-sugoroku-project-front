


// 実際に描画するシーン（一番メインのところ）
export class ExplanationScene extends Phaser.Scene {
    
    // コンストラクタ（このクラスが召喚される時に実行される）
    constructor() {
        super({ key: 'ExplanationScene', active: false });
        this.titleText;
        this.DetailText;
    }
    
    preload() {
        // 画像の読み込み（まだ表示はしない）
        this.load.image('sky', 'assets/879604.jpg');
    }
    
    create() {
        // this.add.image(400, 300, 'sky');
        const skyImage = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'sky');
        skyImage.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);
        
        // this.titleText = this.add.text(400, 150, '~遊び方~');
        this.titleText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 4, '~遊び方~');
        this.titleText.setFontSize(50);         // 文字の大きさを指定
        this.titleText.setOrigin(0.5, 0.5);
        this.titleText.setFontFamily("Arial");
        this.titleText.setColor('#7F0000');     // 文字の色を指定
        
        // this.DetailText = this.add.text(400, 300, '動く的にタイミングよくクリックして矢を当てよう！');
        this.DetailText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, '動く的にタイミングよくクリックして矢を当てよう！');
        this.DetailText.setFontSize(30);        // 文字の大きさを指定
        this.DetailText.setOrigin(0.5, 0.5);
        this.DetailText.setFontFamily("Arial");
        this.DetailText.setColor('#7F0000');    // 文字の色を指定
        
        
        
        // 画面クリックされたらシーンを移動する
        this.input.on('pointerdown', (_pointer) => {
            this.scene.transition({
                target: 'GameScene',            // 遷移先のシーンの名前
                data: {},                       // シーンに送るデータを指定
                duration: 50,                   // シーンに遷移する時間（1000→1秒）
                onUpdate: (_progress) => {},    // 遷移中に行う処理
            });
        });
        
        
    }
    
    update() {
        
    }
    
}




