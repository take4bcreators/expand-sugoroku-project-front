



export class FinishScene extends Phaser.Scene {
    
    // コンストラクタ（このクラスが召喚される時に実行される）
    constructor() {
        super({ key: 'FinishScene', active: false });
        this.titleText;
        this.point;
    }
    
    init(data) {
        this.point = data['point'];
    }
    
    preload() {
        // 画像の読み込み（まだ表示はしない）
        this.load.image('sky', 'assets/879604.jpg');
    }
    
    create() {
        // this.add.image(400, 300, 'sky');
        const skyImage = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'sky');
        skyImage.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);
        
        // this.titleText = this.add.text(400, 300, this.point + ' pt');
        this.titleText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.point + ' pt');
        this.titleText.setFontSize(50); // フォントサイズを指定
        this.titleText.setOrigin(0.5, 0.5);
        this.titleText.setFontFamily("Arial");
        this.titleText.setColor('#7F0000');     // 文字の色を指定
        
        this.time.delayedCall(2000, () => {
            this.scene.transition({
                target: 'ResultScene',           // 遷移先のシーンの名前
                data: {
                    point: this.point,
                },                              // シーンに送るデータを指定
                duration: 50,                   // シーンに遷移する時間（1000→1秒）
                onUpdate: (_progress) => {},    // 遷移中に行う処理
            });
        });
        
    }
    
    update() {
        
    }
    
}




