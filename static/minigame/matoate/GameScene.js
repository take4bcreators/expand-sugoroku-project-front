import { Bullets } from './Bullets.js';



// 実際に描画するシーン（一番メインのところ）
export class GameScene extends Phaser.Scene {
    
    // ターゲットが動く速度と折返し地点
    // 数値は横幅以内に抑める
    // 0 -------- 300 ----------------- 500 ---------
    RIGHT_EDGE = 700;
    LEFT_EDGE = 100;
    MOVING_SPEED = 300;
    MOVING_SPEED2 = 200;
    MOVING_SPEED3 = 400;
    MOVING_SPEED4 = 700;
    MOVING_SPEED5 = 750;
    MOVING_SPEED6 = 800;
    MOVING_SPEED7 = 500;
    MOVING_SPEED8 = 600;
    MOVING_SPEED9 = 150;
    MOVING_SPEED10 = 250;
    
    
    // コンストラクタ（このクラスが召喚される時に実行される）
    constructor() {
        super({ key: 'GameScene', active: false });
        
        // 「弾」と「シップ」をステータスとして登録
        this.bullets;
        this.dog;
        this.platforms;
        this.movingTarget;
        this.movingTarget2;
        this.movingTarget3;
        this.movingTarget4;
        this.movingTarget5;
        this.movingTarget6;
        this.movingTarget7;
        this.movingTarget8;
        this.movingTarget9;
        this.movingTarget10;
        
        // 得点用プロパティ
        this.point;
        // 得点表示用プロパティ
        this.pointText;
        // タイマー用プロパティ
        this.timer;
        // タイマー表示用プロパティ
        this.timerText;
    }
    
    // シーンの流れ preload → create → update の 「preload」
    preload() {
        // 画像の読み込み（まだ表示はしない）
        this.load.image('sky', 'assets/879604.jpg');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('bullet', 'assets/arrow.png');
        this.load.image('dog', 'assets/dog.png');
        this.load.image('target', 'assets/symbol042.png');
    }
    
    // シーンの流れ preload → create → update の 「create」
    create() {
        // this.add.image(400, 300, 'sky');
        const skyImage = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'sky');
        skyImage.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);
        
        this.RIGHT_EDGE = this.sys.canvas.width / 8 * (this.RIGHT_EDGE / 100);
        this.LEFT_EDGE = this.sys.canvas.width / 8 * (this.LEFT_EDGE / 100);
        this.MOVING_SPEED = this.sys.canvas.width / 8 * (this.MOVING_SPEED / 100);
        this.MOVING_SPEED2 = this.sys.canvas.width / 8 * (this.MOVING_SPEED2 / 100);
        this.MOVING_SPEED3 = this.sys.canvas.width / 8 * (this.MOVING_SPEED3 / 100);
        this.MOVING_SPEED4 = this.sys.canvas.width / 8 * (this.MOVING_SPEED4 / 100);
        this.MOVING_SPEED5 = this.sys.canvas.width / 8 * (this.MOVING_SPEED5 / 100);
        this.MOVING_SPEED6 = this.sys.canvas.width / 8 * (this.MOVING_SPEED6 / 100);
        this.MOVING_SPEED7 = this.sys.canvas.width / 8 * (this.MOVING_SPEED7 / 100);
        this.MOVING_SPEED8 = this.sys.canvas.width / 8 * (this.MOVING_SPEED8 / 100);
        this.MOVING_SPEED9 = this.sys.canvas.width / 8 * (this.MOVING_SPEED9 / 100);
        this.MOVING_SPEED10 = this.sys.canvas.width / 8 * (this.MOVING_SPEED10 / 100);
        
        
        this.platforms = this.physics.add.staticGroup();
        // this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(this.sys.canvas.width / 2, this.sys.canvas.height * 0.9, 'ground').refreshBody();
        // this.platforms.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height / 4);
        // this.platforms.scaleXY(2, 2);
        this.platforms.scaleXY(this.sys.canvas.width / 400, this.sys.canvas.width / 400);
        this.platforms.setOrigin(0.5, 0);
        
        
        // this.sys.canvas.width が 400 の時は 1倍   400 / 400 = 1
        // this.sys.canvas.width が 800 の時は 2倍   800 / 400 = 2
        
        
        
        // 動く床の設定
        // this.movingTarget = this.physics.add.image(400, 50, 'target');
        this.movingTarget = this.physics.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 12 * 1, 'target');
        this.movingTarget.setScale(0.1, 0.1); // 大きさを○倍に変える
        this.movingTarget.setImmovable(true);
        this.movingTarget.body.allowGravity = false;
        this.movingTarget.setVelocityX(this.MOVING_SPEED); // 最初の動く方向を決める
        
        // this.movingTarget2 = this.physics.add.image(400, 100, 'target');
        this.movingTarget2 = this.physics.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 12 * 2, 'target');
        this.movingTarget2.setScale(0.1, 0.1); // 大きさを○倍に変える
        this.movingTarget2.setImmovable(true);
        this.movingTarget2.body.allowGravity = false;
        this.movingTarget2.setVelocityX(this.MOVING_SPEED2 * -1); // 最初の動く方向を決める
        
        // this.movingTarget3 = this.physics.add.image(400, 150, 'target');
        this.movingTarget3 = this.physics.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 12 * 3, 'target');
        this.movingTarget3.setScale(0.1, 0.1); // 大きさを○倍に変える
        this.movingTarget3.setImmovable(true);
        this.movingTarget3.body.allowGravity = false;
        this.movingTarget3.setVelocityX(this.MOVING_SPEED3);  // 最初の動く方向を決める
        
        // this.movingTarget4 = this.physics.add.image(400, 200, 'target');
        this.movingTarget4 = this.physics.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 12 * 4, 'target');
        this.movingTarget4.setScale(0.1, 0.1); // 大きさを○倍に変える
        this.movingTarget4.setImmovable(true);
        this.movingTarget4.body.allowGravity = false;
        this.movingTarget4.setVelocityX(this.MOVING_SPEED4);  // 最初の動く方向を決める
        
        // this.movingTarget5 = this.physics.add.image(400, 250, 'target');
        this.movingTarget5 = this.physics.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 12 * 5, 'target');
        this.movingTarget5.setScale(0.1, 0.1); // 大きさを○倍に変える
        this.movingTarget5.setImmovable(true);
        this.movingTarget5.body.allowGravity = false;
        this.movingTarget5.setVelocityX(this.MOVING_SPEED5);  // 最初の動く方向を決める
        
        // this.movingTarget6 = this.physics.add.image(400, 200, 'target');
        this.movingTarget6 = this.physics.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 12 * 4, 'target');
        this.movingTarget6.setScale(0.1, 0.1); // 大きさを○倍に変える
        this.movingTarget6.setImmovable(true);
        this.movingTarget6.body.allowGravity = false;
        this.movingTarget6.setVelocityX(this.MOVING_SPEED6);  // 最初の動く方向を決める
        
        // this.movingTarget7 = this.physics.add.image(400, 250, 'target');
        this.movingTarget7 = this.physics.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 12 * 5, 'target');
        this.movingTarget7.setScale(0.1, 0.1); // 大きさを○倍に変える
        this.movingTarget7.setImmovable(true);
        this.movingTarget7.body.allowGravity = false;
        this.movingTarget7.setVelocityX(this.MOVING_SPEED7);  // 最初の動く方向を決める
        
        // this.movingTarget8 = this.physics.add.image(400, 150, 'target');
        this.movingTarget8 = this.physics.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 12 * 3, 'target');
        this.movingTarget8.setScale(0.1, 0.1); // 大きさを○倍に変える
        this.movingTarget8.setImmovable(true);
        this.movingTarget8.body.allowGravity = false;
        this.movingTarget8.setVelocityX(this.MOVING_SPEED8);  // 最初の動く方向を決める
        
        // this.movingTarget9 = this.physics.add.image(400, 100, 'target');
        this.movingTarget9 = this.physics.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 12 * 2, 'target');
        this.movingTarget9.setScale(0.1, 0.1); // 大きさを○倍に変える
        this.movingTarget9.setImmovable(true);
        this.movingTarget9.body.allowGravity = false;
        this.movingTarget9.setVelocityX(this.MOVING_SPEED9);  // 最初の動く方向を決める
        
        // this.movingTarget10 = this.physics.add.image(400, 250, 'target');
        this.movingTarget10 = this.physics.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 12 * 5, 'target');
        this.movingTarget10.setScale(0.1, 0.1); // 大きさを○倍に変える
        this.movingTarget10.setImmovable(true);
        this.movingTarget10.body.allowGravity = false;
        this.movingTarget10.setVelocityX(this.MOVING_SPEED10);  // 最初の動く方向を決める
        
        // 点数用テキストの設定
        this.point = 0;
        // this.pointText = this.add.text(100, 500, this.point + 'pt.');
        this.pointText = this.add.text(this.sys.canvas.width / 8, this.sys.canvas.height / 6 * 5, this.point + 'pt.');
        this.pointText.setFontSize(30);
        this.pointText.setOrigin(0.5, 0.5);
        this.pointText.setFontFamily("Arial");
        this.pointText.setColor('#7F0000');     // 文字の色を指定
        
        this.timer = 12;
        // this.timerText = this.add.text(700, 500, this.timer);
        this.timerText = this.add.text(this.sys.canvas.width / 8 * 7, this.sys.canvas.height / 6 * 5, this.timer);
        this.timerText.setFontSize(30);
        this.timerText.setOrigin(0.5, 0.5);
        this.timerText.setFontFamily("Arial");
        this.timerText.setColor('#7F0000');     // 文字の色を指定
        
        // ・的をすべて打ち終わるまでの時間勝負
        // ・制限時間以内に何個打てるか
        // ・打てる回数が決まっていて、何個打てるか
        
        
        
        // 弾グループの召喚
        this.bullets = new Bullets(this);
        
        // 「犬」に画像を当てはめる
        // this.dog = this.add.image(400, 500, 'dog');
        this.dog = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 6 * 5, 'dog');
        this.dog.setScale(0.09, 0.09);
        
        // ポインターダウン（クリック） されたら
        this.input.on('pointerdown', (pointer) => {
            // 「弾グループ」の技「弾発射」を行う
            // （引数として「シップ」の X位置 と Y位置 を送る）
            this.bullets.fireBullet(this.dog.x, this.dog.y);
        });
        
        // 当たったら的が消える
        this.physics.add.overlap(this.movingTarget, this.bullets, this.hitTarget, null, this);
        this.physics.add.overlap(this.movingTarget2, this.bullets, this.hitTarget, null, this);
        this.physics.add.overlap(this.movingTarget3, this.bullets, this.hitTarget, null, this);
        this.physics.add.overlap(this.movingTarget4, this.bullets, this.hitTarget, null, this);
        this.physics.add.overlap(this.movingTarget5, this.bullets, this.hitTarget, null, this);
        this.physics.add.overlap(this.movingTarget6, this.bullets, this.hitTarget, null, this);
        this.physics.add.overlap(this.movingTarget7, this.bullets, this.hitTarget, null, this);
        this.physics.add.overlap(this.movingTarget8, this.bullets, this.hitTarget, null, this);
        this.physics.add.overlap(this.movingTarget9, this.bullets, this.hitTarget, null, this);
        this.physics.add.overlap(this.movingTarget10, this.bullets, this.hitTarget, null, this);
        
        
        this.time.addEvent({
            delay: 1000,                            // 単位：msec
            repeat: 11,      // 指定した数値+1回分を実行
            callback: () => {
                // タイマーカウントダウン
                this.timer = this.timer - 1;
                this.timerText.setText(this.timer);
                this.timerText.updateText();
                
                if (this.timer === 0) {
                    this.scene.transition({
                        target: 'FinishScene',            // 遷移先のシーンの名前
                        data: {
                            point: this.point,
                        },                              // シーンに送るデータを指定
                        duration: 50,                   // シーンに遷移する時間（1000→1秒）
                        onUpdate: (_progress) => {},    // 遷移中に行う処理
                    });
                }
            },
        });
        
    }
    
    
    update() {
        
        // 0 -------- 300 ----------------- 500 ---------
        if (this.movingTarget.x >= this.RIGHT_EDGE) {
            this.movingTarget.setVelocityX(this.MOVING_SPEED * -1);
        } else if (this.movingTarget.x <= this.LEFT_EDGE) {
            this.movingTarget.setVelocityX(this.MOVING_SPEED);
        }
        
        if (this.movingTarget2.x >= this.RIGHT_EDGE) {
            this.movingTarget2.setVelocityX(this.MOVING_SPEED2 * -1);
        } else if (this.movingTarget2.x <= this.LEFT_EDGE) {
            this.movingTarget2.setVelocityX(this.MOVING_SPEED2);
        }
        
        if (this.movingTarget3.x >= this.RIGHT_EDGE) {
            this.movingTarget3.setVelocityX(this.MOVING_SPEED3 * -1);
        } else if (this.movingTarget3.x <= this.LEFT_EDGE) {
            this.movingTarget3.setVelocityX(this.MOVING_SPEED3);
        }
        
        if (this.movingTarget4.x >= this.RIGHT_EDGE) {
            this.movingTarget4.setVelocityX(this.MOVING_SPEED4 * -1);
        } else if (this.movingTarget4.x <= this.LEFT_EDGE) {
            this.movingTarget4.setVelocityX(this.MOVING_SPEED4);
        }
        if (this.movingTarget5.x >= this.RIGHT_EDGE) {
            this.movingTarget5.setVelocityX(this.MOVING_SPEED5 * -1);
        } else if (this.movingTarget5.x <= this.LEFT_EDGE) {
            this.movingTarget5.setVelocityX(this.MOVING_SPEED5);
        }
        if (this.movingTarget6.x >= this.RIGHT_EDGE) {
            this.movingTarget6.setVelocityX(this.MOVING_SPEED6 * -1);
        } else if (this.movingTarget6.x <= this.LEFT_EDGE) {
            this.movingTarget6.setVelocityX(this.MOVING_SPEED6);
        }
        if (this.movingTarget7.x >= this.RIGHT_EDGE) {
            this.movingTarget7.setVelocityX(this.MOVING_SPEED7 * -1);
        } else if (this.movingTarget7.x <= this.LEFT_EDGE) {
            this.movingTarget7.setVelocityX(this.MOVING_SPEED7);
        }
        if (this.movingTarget8.x >= this.RIGHT_EDGE) {
            this.movingTarget8.setVelocityX(this.MOVING_SPEED8 * -1);
        } else if (this.movingTarget8.x <= this.LEFT_EDGE) {
            this.movingTarget8.setVelocityX(this.MOVING_SPEED8);
        }
        if (this.movingTarget9.x >= this.RIGHT_EDGE) {
            this.movingTarget9.setVelocityX(this.MOVING_SPEED9 * -1);
        } else if (this.movingTarget9.x <= this.LEFT_EDGE) {
            this.movingTarget9.setVelocityX(this.MOVING_SPEED9);
        }
        if (this.movingTarget10.x >= this.RIGHT_EDGE) {
            this.movingTarget10.setVelocityX(this.MOVING_SPEED10 * -1);
        } else if (this.movingTarget10.x <= this.LEFT_EDGE) {
            this.movingTarget10.setVelocityX(this.MOVING_SPEED10);
        }
    }
    
    
    // 弾（矢）と的が当たった時の処理
    hitTarget(movingTarget, bullets) {
        // 弾（矢）と的は消える
        movingTarget.disableBody(true, true);
        //bullets.disableBody(true, true);
        
        bullets.setActive(false);       // active 状態を false にして「死」の状態にする
        bullets.setVisible(false);      // 見えなくする
        bullets.setVelocityY(0);        // 動かなくする
        bullets.setPosition(-100, -100);    // 位置を移動する (-100, -100) →画面外
        
        // 得点が上がる
        this.point = this.point + 10;
        this.pointText.setText(this.point + 'pt.');
    }
    
}




