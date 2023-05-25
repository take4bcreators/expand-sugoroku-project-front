"use strict";

import { SugorokuConnection } from './SugorokuConnection.js';

// すごろくコネクション
const sgcon = new SugorokuConnection();
// ページ読み込み時のチェック処理を実行
sgcon.checkSugorokuMode();

class Sprite {
  constructor(x, y, r) {
    this.x = x; // x座標
    this.y = y; // y座標
    this.sx = 0; // x方向速度
    this.sy = 0; // y方向速度
    this.r = r; // 半径
    this.count = 0; // カウンタ
  }
  draw() {
    this.count += 0.5;
    let t = Math.sin(this.count) * 0.5;
    let d = Math.atan2(this.sy, this.sx);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.r, d + t, d + Math.PI * 2 - t);
    ctx.closePath();
    ctx.fill();
  }
}

class Eat extends Sprite {
  tick() {
    this.sx += (mouse.x - this.x) / 50; // マウスとの距離に応じて速度を加減
    this.sy += (mouse.y - this.y) / 50;
    this.sx *= 0.80; // 徐々に減速
    this.sy *= 0.80;
    this.x += this.sx; // 速度を座標に反映
    this.y += this.sy;
    this.draw();
  }
}

class Dot extends Sprite {
  constructor() {
    super(Math.random() * 1100 + 50, Math.random() * 500 + 50, 10);
    this.sx = Math.random() * 10 - 5;
    this.sy = Math.random() * 10 - 5;
  }

  tick() {
    this.x = (this.x + this.sx + 1250) % 1250;
    this.y = (this.y + this.sy + 600) % 600;
    this.draw();
  }
}

// let ctx; // 描画コンテキスト
let dots = []; // 餌の配列
let life = 1200; // 残り時間
let timerId = NaN; // タイマー
let back; // 背景画像
let backStart; // 背景画像
const mouse = { x: 0, y: 0 }; // マウスの座標
const eat = new Eat(300, 300, 30); // 自分
const canvasWidth = 1250;
const canvasHeight = 600;


const bodyElem = document.querySelector('body');


// 初期化
const field = document.getElementById("field");
const ctx = field.getContext("2d"); // 描画コンテキスト
ctx.font = "32px 'Times New Roman'";
ctx.fillStyle = "#aa0";
backStart = document.getElementById("backStart");
ctx.drawImage(backStart, 0, 0); // 背景画像を描画

const titleText = "パクパクゲーム";
const textWidth = ctx.measureText(titleText).width;
ctx.fillText(titleText, canvasWidth / 2 - (textWidth / 2), 250);

const ruleText = "制限時間以内にエサを食べつくそう！";
const ruleTextWidth = ctx.measureText(ruleText).width;
ctx.fillText(ruleText, canvasWidth / 2 - (ruleTextWidth / 2), 300);

const clickText = "クリックしてスタート";
const clickTextWidth = ctx.measureText(clickText).width;
ctx.fillText(clickText, canvasWidth / 2 - (clickTextWidth / 2), 400);


bodyElem.addEventListener('click', gameStart, false);
// bodyElem.addEventListener('touchstart', gameStart, false);


// ゲームスタート用
function gameStart() {
  timerId = setInterval(tick, 50);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }); // マウス移動ハンドラ
  field.addEventListener('touchstart', (e) => {
    mouse.x = e.changedTouches[0].clientX;
    mouse.y = e.changedTouches[0].clientY;
  });
  for (let i = 0; i < 10; i++) {
    dots.push(new Dot(Math.random() * 600, Math.random() * 600, 10));
  }
  back = document.getElementById("back");
  bodyElem.removeEventListener('click', gameStart, false);
}

function tick() {
  // メインルーチン
  ctx.drawImage(back, 0, 0); // 背景画像を描画
  ctx.fillStyle = "#aa0";
  eat.tick(); // 自分 移動と描画

  dots.forEach((d) => {
    d.tick(); // 餌 移動と描画
  });

  // 衝突判定：xとyの距離の差が30以上の餌のみ残す
  dots = dots.filter((d) => {
    return Math.abs(eat.x - d.x) > 30 || Math.abs(eat.y - d.y) > 30;
  });

  life -= 3;
  let rank = '';
  ctx.fillRect(0, 0, life, 5);
  if (life < 0) {
    clearInterval(timerId); // ゲームオーバー

    const gameOverText = "FINISHED";
    const gameOverTextWidth = ctx.measureText(gameOverText).width;
    ctx.fillText(gameOverText, canvasWidth / 2 - (gameOverTextWidth / 2), 300);

    const resultText = " 残り " + dots.length + "個";
    const resultTextWidth = ctx.measureText(resultText).width;
    ctx.fillText(resultText, canvasWidth / 2 - (resultTextWidth / 2), 350);

    if (dots.length <= 3) {
      rank = 'A';
    } else if (dots.length <= 8) {
      rank = 'B';
    } else if (dots.length <= 10) {
      rank = 'C';
    }

    const rankText = "ランク" + rank;
    const renkTextWidth = ctx.measureText(rankText).width;
    ctx.fillText(rankText, canvasWidth / 2 - (renkTextWidth / 2), 250);


    // ランク情報を保持してすごろくモードであるかどうかで表示を変える
    if (sgcon.isSugorokuMode) {
      sgcon.setRankValue(rank.toLowerCase());
      const sugorokuBackText = "クリックしてすごろくに戻る";
      const sugorokuBackTextWidth = ctx.measureText(sugorokuBackText).width;
      ctx.fillText(sugorokuBackText, canvasWidth / 2 - (sugorokuBackTextWidth / 2), 500);
      bodyElem.addEventListener('click', () => {
        sgcon.returnToSugoroku();
      }, false);
    } else {
      //ctx.fillText("クリックしてもう一回あそぶ", 550, 500);
      const reloadText = "クリックしてもう一回あそぶ";
      const reloadTextWidth = ctx.measureText(reloadText).width;
      ctx.fillText(reloadText, canvasWidth / 2 - (reloadTextWidth / 2), 500);
      bodyElem.addEventListener('click', () => {
        location.reload();
      }, false);
    }

  }

  if (dots.length == 0) {
    clearInterval(timerId);
    const resultText = "PERFECT !!!";
    const resultTextWidth = ctx.measureText(resultText).width;
    ctx.fillText(resultText, canvasWidth / 2 - (resultTextWidth / 2), 300);
    rank = 'S';

    const rankText = "ランク" + rank;
    const renkTextWidth = ctx.measureText(rankText).width;
    ctx.fillText(rankText, canvasWidth / 2 - (renkTextWidth / 2), 250);


    // ランク情報を保持してすごろくモードであるかどうかで表示を変える
    if (sgcon.isSugorokuMode) {
      sgcon.setRankValue(rank.toLowerCase());
      const sugorokuBackText = "クリックしてすごろくに戻る";
      const sugorokuBackTextWidth = ctx.measureText(sugorokuBackText).width;
      ctx.fillText(sugorokuBackText, canvasWidth / 2 - (sugorokuBackTextWidth / 2), 500);
      bodyElem.addEventListener('click', () => {
        sgcon.returnToSugoroku();
      }, false);
    } else {
      const reloadText = "クリックしてもう一回あそぶ";
      const reloadTextWidth = ctx.measureText(reloadText).width;
      ctx.fillText(reloadText, canvasWidth / 2 - (reloadTextWidth / 2), 500);
      bodyElem.addEventListener('click', () => {
        location.reload();
      }, false);
    }

  }

}
