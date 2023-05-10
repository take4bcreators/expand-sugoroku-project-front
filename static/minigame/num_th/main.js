"use strict";

// すごろく連携モジュール
import { SugorokuConnection } from './SugorokuConnection.js';

// 設定
const FINISH_NUMBER = 15; // 終わる回数
const S_RANK = '011.999'; // Sランクの秒数
const A_RANK = '014.499'; // Aランクの秒数
const B_RANK = '019.999'; // Bランクの秒数

// すごろく連携モジュールをインスタンス化（召喚する）
const sgcon = new SugorokuConnection();
sgcon.checkSugorokuMode();

// ポップ画面の非表示処理
const click = document.querySelector('.popbox'); 
click.addEventListener('click', () => {
    click.style.opacity = "0";
    setTimeout(() => {
    // ポップアップ画面(クラス popbox)を非表示
    click.style.display ="none";
    click.style.opacity = "1";
    },500);
});

// 点滅アニメーション一時停止
const commentfls = document.querySelector('.comment');
commentfls.style.animationPlayState = 'paused';

// クリックかタップ判定処理
const eventType = window.ontouchstart !== null ? 'click' : 'touchstart';
const numbersArr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
];
const number = document.querySelectorAll('.number');
const startBtn = document.querySelector('.startBtn');
startBtn.addEventListener(eventType, start);
const time = document.getElementById('time');

let count = 1;
let startTime;
let timeoutId;
let rank = '';

// 数字をシャッフル
function shuffle(array) {
    let a = array.length;
    while (a) {
        let j = Math.floor(Math.random() * a);
        let t = array[--a];
        array[a] = array[j];
        array[j] = t;
    }
    return array;
}

// ストップウォッチ
function timer() {
    const d = new Date(Date.now() - startTime);
    const s = String(d.getSeconds()).padStart(3, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    time.textContent = `${s}.${ms}`;
    timeoutId = setTimeout(() => {
        timer();
    }, 10);
}

// スタートボタンが押された時の処理
function start() {
    // ポップアップが表示されている間は、ゲームを開始しない
    if (click.style.display !== "none") {
        return;
    }
    // すごろくモード且つ、ランクが格納されてたらすごろくに戻る
    if (sgcon.isSugorokuMode && rank !== '') {
        sgcon.returnToSugoroku();
        return;
    }
    reset();
    startBtn.removeEventListener(eventType, start);
    startBtn.className = 'next';
    startBtn.textContent = '';
    startTime = Date.now();
    timer();
    const shuffleNumber = shuffle(numbersArr);
    number.forEach((value, index) => {
        value.textContent = shuffleNumber[index];
        value.addEventListener(eventType, clickNumber);
    });
    let commentElem = document.querySelector('.comment');
    commentElem.textContent = '';
}

// 数字がタッチされた時の処理
function clickNumber(e) {
    // タッチした数字の背景色
    const colors = ['#FD8A8A', '#B6E2A1', '#AEE1E1', '#D9ACF5', '#FFD4B2', '#86C8BC', '#FCD1D1']; 
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // タッチした数字の背景色をランダムな色に変更
    e.target.style.backgroundColor = randomColor;

    if (Number(e.target.textContent) === count) {
        // 一度すべてタッチしていない状態にする
        number.forEach((value) => {
            value.className = 'number';
        });
        // 今タッチした数字だけタッチ状態にする
        e.target.className = 'touched';
        // カウント増加
        count++;
        startBtn.textContent = '';
        
        if (count > FINISH_NUMBER) {
            end();
            return;
        }
    } else {
        // 間違ったボタンを押した時の処理
        reset();
        // 点滅アニメーションを実行
        commentfls.style.animationPlayState = 'running'; 
        let commentElem = document.querySelector('.comment');
        // comment要素に文字をセットする
        commentElem.textContent = 'やり直し!';
        // 3秒後に点滅アニメーション一時停止:・文字を消す
        // setTimeout(指定した時間後に行う処理, 指定時間msec)
        setTimeout(() => {
            commentElem.textContent = '';
            commentfls.style.animationPlayState = 'paused';
        }, 2000);
    }
    return;
}

function reset() {
    // カウントを 1 にリセットする
    count = 1;
    // 一度すべての数字カウント・数字の背景色をリセットする
    number.forEach((value) => {
        value.className = 'number';
        value.style.backgroundColor = '';
        commentfls.style.animationPlayState = 'paused';
        let commentElem = document.querySelector('.comment');
        commentElem.classList.remove('s-rank');
        commentElem.classList.remove('a-rank');
        commentElem.classList.remove('b-rank');
    });
}

// ゲーム終了
function end() {
    startBtn.textContent = 'RESTART';
    startBtn.className = 'startBtn';
    startBtn.addEventListener(eventType, start);
    clearTimeout(timeoutId);

    // 点滅アニメーション実行
    commentfls.style.animationPlayState = 'running';
    // comment要素を取得して変数に入れる
    let commentElem = document.querySelector('.comment');
    if (time.textContent < S_RANK) {
        commentElem.textContent = 'Sランク';
        commentElem.classList.add('s-rank'); // CSSの.s-rankを表示
        rank = 's';
    }
    else if (time.textContent < A_RANK) {
        commentElem.textContent = 'Aランク';
        commentElem.classList.add('a-rank'); // CSSの.a-rankを表示
        rank = 'a';
    }
    else if (time.textContent < B_RANK) {
        commentElem.textContent = 'Bランク';
        commentElem.classList.add('b-rank'); // CSSの.b-rankを表示
        rank = 'b';
    }
    else {
        commentElem.textContent = 'Cランク';
        rank = 'c';
    }
    number.forEach((value, index) => {
        value.removeEventListener(eventType, clickNumber);
    });
    
    if (sgcon.isSugorokuMode) {
        sgcon.setRankValue(rank);
        startBtn.textContent = 'すごろく画面へ';
    }
}
