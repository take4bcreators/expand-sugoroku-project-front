"use strict";

import { SugorokuConnection } from './SugorokuConnection.js';
// すごろくモードにする場合：末尾に ?mode=sugoroku&key=hogehoge

let score = 0;  // スコア
let prob = 0.96;   // 落下確率
let basketX = 0;  // カゴX座標
let timerId = NaN;  // タイマーID
let eggs = [];  // タマゴの配列
const field = document.getElementById("field");
const ctx = field.getContext("2d");
ctx.font = "32px 'Times New Roman'";
ctx.fillStyle = "green";
const basket = document.getElementById("basket");
const chick = document.getElementById("chick");
const egg1 = document.getElementById("egg1");
const egg2 = document.getElementById("egg2");
const back = document.getElementById("back");
const bodyElem = document.querySelector('body');
const canvasWidth = 1250;
const canvasHeight = 600;

// すごろくコネクション
const sgcon = new SugorokuConnection();
// ページ読み込み時のチェック処理を実行
sgcon.checkSugorokuMode();

// 画面リサイズ
// const canvas =  document.querySelector('canvas');
// console.log(canvas.height, canvas.clientHeight, window.innerHeight);
// canvas.width = canvas.clientWidth;
// canvas.height = canvas.clientHeight;

// ゲームスタート用
function gameStart() {
  timerId = setInterval(tick, 50);
  window.addEventListener('mousemove', (e) => {
    basketX = e.clientX;  // マウスX座標をカゴの座標に反映
  })
  field.addEventListener('touchstart', (e) => {
    basketX = e.changedTouches[0].clientX;
  });
  bodyElem.removeEventListener('click', gameStart, false);
}

// 初期の画面表示
ctx.drawImage(back, 0, 0); // 背景画像を描画

// タイトル画面用テキスト
const titleText = "タマゴキャッチゲーム";
const textWidth = ctx.measureText(titleText).width;
ctx.fillText(titleText, canvasWidth / 2 - (textWidth / 2), 250);
// ctx.fillText(titleText, canvas.width / 2 - (textWidth / 2), 300);

const ruleText = "カゴを左右に動かしてタマゴを拾ってあげよう！";
const ruleTextWidth = ctx.measureText(ruleText).width;
ctx.fillText(ruleText, canvasWidth / 2 - (ruleTextWidth / 2), 300);


const clickText = "クリックしてスタート";
const clickTextWidth = ctx.measureText(clickText).width;
ctx.fillText(clickText, canvasWidth / 2 - (clickTextWidth / 2), 400);
// ctx.fillText(clickText, canvas.width / 2 - (clickTextWidth / 2), 400);

bodyElem.addEventListener('click', gameStart, false);


function tick() {
  ctx.drawImage(back, 0, 0); // 背景画像を描画
  ctx.drawImage(basket, basketX - 50, 500); // カゴ描画
  if (Math.random() > prob) {
    eggs.push({ x: Math.random() * 1000, y: 1 });  // タマゴ追加
  }
  let prev = eggs.length; // 現在のタマゴの数
  eggs = eggs.filter((e) => {
    return (          // キャッチしていないタマゴのみを返す
      e.y < 400 || e.y > 600 || e.x < basketX - 50 || e.x > basketX + 50
    );
  });
  if (prev != eggs.length) {  // タマゴの数が変化＝キャッチした
    score++;
    prob -= 0.002;
  }

  ctx.fillText("スコア:" + score, 1100, 250);
  eggs.forEach((e) => {
    e.y += e.y * 0.05; // タマゴのY座標を増加
    if (e.y < 50) {
      ctx.drawImage(chick, e.x, 10);  // 0～50 : ニワトリ
    } else {
      ctx.drawImage(egg1, e.x, e.y);  // 50～  : タマゴ
    }

    if (e.y > 550) {
      clearInterval(timerId); // タマゴ落下＝ゲームオーバー
      //ctx.fillText("GAME OVER", 550, 300);
      const gameOverText = "GAME OVER";
      const gameOverTextWidth = ctx.measureText(gameOverText).width;
      ctx.fillText(gameOverText, canvasWidth / 2 - (gameOverTextWidth / 2), 350);
      ctx.drawImage(egg2, e.x - 50, 500);

      // ランク文字列を識別
      let rank = '';
      if (score >= 10) {
        rank = 'S';
      } else if (score >= 7 || score >= 5) {
        rank = 'A';
      } else if (score >= 4 || score >= 1) {
        rank = 'B';
      } else {
        rank = 'C';
      }
      //      ctx.fillText("ランク" + rank, 580, 350);
      const rankText = "ランク" + rank;
      const renkTextWidth = ctx.measureText(rankText).width;
      ctx.fillText(rankText, canvasWidth / 2 - (renkTextWidth / 2), 300);

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
  });
}

