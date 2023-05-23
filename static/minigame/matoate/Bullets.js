

// 「Phaser.Physics.Arcade.Sprite」を継承した「弾」クラス
// https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Sprite.html
export class Bullet extends Phaser.Physics.Arcade.Sprite {
    // コンストラクタ（このクラスが召喚される時に実行される）
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
    }
    
    // 発射
    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-300);
    }
    
    // プリアップデート（？）
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.y <= -32) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}


// 「Phaser.Physics.Arcade.Group」を継承した「弾グループ」クラス
// https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Group.html
export class Bullets extends Phaser.Physics.Arcade.Group {
    // コンストラクタ（このクラスが召喚される時に実行される）
    constructor (scene) {
        super(scene.physics.world, scene);
        
        // 継承元にある「createMultiple」メソッド
        // いくつかのゲーム オブジェクトを作成し、それらをこのグループに追加する。
        // https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Group.html#:~:text=Array.%3Cany%3E-,createMultiple,-(config)
        this.createMultiple({
            frameQuantity: 1,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }
    
    // 弾発射
    fireBullet(x, y) {
        // 継承元にある「getFirstDead」メソッド
        // Phaser.GameObjects.GameObject#active 状態が false に設定されている最初のメンバーのグループをスキャンし、x と y を割り当て、メンバーを返する。
        // https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Group.html#:~:text=any-,getFirstDead,-(%20%5BcreateIfNull%5D%20%5B%2C%20x%5D%20%5B%2C%20y
        let bullet = this.getFirstDead(false);
        if (bullet) {
            bullet.fire(x, y);
        }
    }
}
