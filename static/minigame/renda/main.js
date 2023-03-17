'use strict';

import { SugorokuConnection } from './SugorokuConnection.js';



const body = document.querySelector("body");
const background = document.querySelector(".background");
const countDisplay = document.querySelector(".countDisplay");
const result = document.querySelector(".result");

let count = 0;

const S_RANK_LIMIT = 40;
const A_RANK_LIMIT = 35;
const B_RANK_LIMIT = 30;
const sgcon = new SugorokuConnection();
sgcon.checkSugorokuMode();


// パソコンかスマートフォンか判定
const eventType = window.ontouchstart !== null ? "click" : "touchstart";
const addCount = function (e) {
    // クリックをカウント・表示
    count++;
    countDisplay.textContent = count;
    // クリック時のアニメーション
    let x = e.pageX;
    let y = e.pageY;
    const mash = document.createElement("div");
    mash.style.top = y + "px";
    mash.style.left = x + "px";
    document.body.appendChild(mash);
    mash.className = "mash";
    mash.addEventListener("animationend", () => {
        mash.parentNode.removeChild(mash);
    });
};
// 背景を縮めるアニメーション
const shrinkAnim = function () {
    countDisplay.classList.remove("blink");
    body.removeEventListener(eventType, shrinkAnim);
    body.addEventListener(eventType, addCount);
    background
    .animate(
        {
            width: ["500px", "0px"],
            height: ["500px", "0px"],
            opacity: [1, 0.5, 1],
            offset: [0, 0.9],
        },
        { duration: 5000, fill: "forwards" }
        // { duration: 10000, fill: "forwards" } // 10秒かけて背景のまるを縮める
    )
    .finished // ゲーム終了後の処理
    .then(() => {
        body.removeEventListener(eventType, addCount);
        result.textContent = "クリックでもう1回プレイする";
        
        
        let rank = 'c';
        if (count >= S_RANK_LIMIT) {
            rank = 's';
            alert('クリア！Sランク！！');
        } else if (count >= A_RANK_LIMIT) {
            rank = 'a';
            alert('クリア！Aランク！');
        } else if (count >= B_RANK_LIMIT) {
            rank = 'b';
            alert('クリア！Bランク！');
        } else {
            rank = 'c';
            alert('失敗…');
        }
        
        // @note すごろくモードの場合はランクの値を格納
        if (sgcon.isSugorokuMode) {
            sgcon.setRankValue(rank);
            result.textContent = "タップですごろくに戻る";
        }
        
        result.classList.add("blink");
        result.addEventListener("click", () => {
            // @note すごろくモードの場合は戻る
            if (sgcon.isSugorokuMode) {
                sgcon.returnToSugoroku();
                return;
            }
            location.reload();
            return;
        });
    });
};
body.addEventListener(eventType, shrinkAnim);
