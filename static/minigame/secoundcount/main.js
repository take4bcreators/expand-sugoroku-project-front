'use strict';

import { SugorokuConnection } from './SugorokuConnection.js';


// HTMLの要素を取得して変数に入れる
const timeElem = document.getElementById('time'); // 時間表示の要素
const tapButton = document.getElementById('tap'); // タップしてはじめるの要素
const startButton = document.getElementById('start'); // スタートボタンの要素
const stopButton = document.getElementById('stop'); // ストップボタンの要素
const sugorokuBotton = document.getElementById('sugoroku'); // すごろくにもどるの要素
const titleElem = document.getElementById('title'); // 目標タイム兼タイトル（大）の要素
const targetElem = document.getElementById('target'); // 目標タイム兼タイトル（小）の要素
const result = document.getElementById('result'); // 結果表示の要素
const rankElem = document.getElementById('rank'); // ランク表示の要素


// すごろくコネクションの召喚
const sgcon = new SugorokuConnection();
// ページ読み込み時のチェック処理を実行
sgcon.checkSugorokuMode();


// 開始時間
let startTime;
// タイムアウトID
let timeoutID;
// 現在時間の情報
let currentTime;
let targetTime = 1;

const minTime = 5;    // 出る数字の最小値
const maxTime = 15;   // 出る数字の最大値
const digitNum = 10;


// 
// ■要素に対するなにかのイベント（クリックとか）を検知して処理をしたいときの基本形
// 対象の要素.addEventListener(イベント名, やる処理);
// 
// （例）
// tapButton.addEventListener('click', () => {
//     ※やる処理
// });
// 
// 


// タップしてはじめるボタンが押されたときの処理
tapButton.addEventListener('click', () => {
    // 「スタート」ボタンを表示させる
    //  → 「hide」クラスをはずす
    startButton.classList.remove('hide');
    
    // 「タップして始める」ボタンを非表示にする
    //  → 「hide」クラスをつける
    tapButton.classList.add('hide');
    
    // 「時間表示」の要素を表示する
    timeElem.classList.remove('hide');

    // 目標兼タイトル（大）を非表示にする
    titleElem.classList.add('hide');

    // 目標兼タイトル（小）を表示する
    targetElem.classList.remove('hide');
});



// 0 〜 1未満のランダムな数字を生成
const randomNum = Math.random();
const randomNum2 = (Math.floor(randomNum * (maxTime + 1 - minTime) * 10) / 10) + minTime;
targetTime = randomNum2;
titleElem.textContent = targetTime + '秒でとめろ！';
targetElem.textContent = targetTime + '秒でとめろ！';

// 時間を表示する関数
function displayTime() {
    // currentTime = new Date(Date.now() - startTime + stopTime);
    currentTime = new Date(Date.now() - startTime);
    const s = String(currentTime.getSeconds()).padStart(2, '0');
    const ms = String(currentTime.getMilliseconds()).padStart(3, '0');
    timeElem.textContent = `${s}.${ms}`;
    timeoutID = setTimeout(displayTime, 10);
}


// スタートボタンがクリックされたら時間を進める
startButton.addEventListener('click', () => {
    // 「スタート」ボタンを非表示にする
    startButton.classList.add('hide');
    
    // 「ストップ」ボタンを表示する
    stopButton.classList.remove('hide');
    
    // 「時間」の表示を非表示にする
    timeElem.classList.add('hide');
    
    // スタートタイムに現在の時刻をセット
    startTime = Date.now();
    
    // 時間を表示する関数を実行
    displayTime();
});


// ストップボタンがクリックされたら時間を止める
stopButton.addEventListener('click', () => {
    // タイムアウトをクリアする
    clearTimeout(timeoutID);
    
    // 「時間」の表示を表示にする
    timeElem.classList.remove('hide');
    
    // 「ストップ」ボタンを非表示にする
    stopButton.classList.add('hide');
    
    // 目標タイムとの差の時間
    const resultTime = targetTime - (currentTime.getSeconds() + (currentTime.getMilliseconds() / 1000));
    // 桁を絞った数字を変数に入れる（resultTimeFloor）
    const resultTimeFloor = Math.floor(resultTime * 1000) / 1000;
    // プラス表示のみにする
    result.textContent = Math.abs(resultTimeFloor);
    
    // 結果の秒数を表示する
    const resultSec = Math.abs(resultTimeFloor);
    result.textContent = resultSec;
    
    // 結果を元にランクを判定して変数に格納
    let rank = '';
    if (resultSec <= 0.3) {
        rank = 's';
    } else if (resultSec <= 0.5){
        rank = 'a';
    } else if (resultSec <= 0.8) {
        rank = 'b';
    } else {
        rank = 'c';
    }
    
    // ランク情報を保持してすごろくモードであるかどうかで表示を変える
    if (sgcon.isSugorokuMode) {
        sgcon.setRankValue(rank);
        sugorokuBotton.textContent = 'タップですごろくに戻る';
    } else {
        sugorokuBotton.textContent = 'もう1回はじめる';
    }
    
    // ランクを表示する
    rankElem.textContent = rank.toUpperCase();

    // 結果表示の要素を表示
    result.classList.remove('hide');
    // ランク表示の要素を非表示
    rankElem.classList.add('hide');
    
    
    // setTimeout(時間が経ったあとにやる処理, 時間ミリ秒);
    setTimeout(() => {
        // タイトル(大)を消す
        titleElem.classList.add('hide');
        // タイトル（小）を消す
        targetElem.classList.add('hide');
        // 秒数表示を消す
        timeElem.classList.add('hide');
        // 結果秒数を消す
        result.classList.add('hide');
        // ランクを表示する
        rankElem.classList.remove('hide');
        // もう1回ボタンを表示する
        sugorokuBotton.classList.remove('hide');
    }, 2500);
});

// 「すごろくに戻る／もう1回はじめる」ボタンが押されたとき
sugorokuBotton.addEventListener('click', () => {
    
    // すごろくモードの場合はすごろくに戻る
    if (sgcon.isSugorokuMode) {
        sgcon.returnToSugoroku();
        return;
    }
    
    // 「すごろくに戻る／もう1回はじめる」ボタンを非表示にする
    sugorokuBotton.classList.add('hide');
    
    // スタートボタンを表示する
    startButton.classList.remove('hide');
    
    time.textContent = '00.000';

    // 0 〜 1未満のランダムな数字を生成
    const randomNum = Math.random();
    const randomNum2 = (Math.floor(randomNum * (maxTime + 1 - minTime) * 10) / 10) + minTime;
    targetTime = randomNum2;
    titleElem.textContent = targetTime + '秒でとめろ！';
    targetElem.textContent = targetTime + '秒でとめろ！';

    // 結果表示の要素を非表示
    result.classList.add('hide');
    
    // ランク表示の要素を非表示
    rankElem.classList.add('hide');
    
    // タイトルを表示
    titleElem.classList.remove('hide');
    
    // 秒数表示を表示
    timeElem.classList.remove('hide');

     // タイトル（大）を非表示
     titleElem.classList.add('hide');

     // タイトル（小）を表示
     targetElem.classList.remove('hide');
});

