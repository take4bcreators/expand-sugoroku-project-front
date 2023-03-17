import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "gatsby"
import '../../sass/style.scss'

import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';

import type { PlayerInfo } from '../../ts/type/PlayerInfo';


export default function SetupConfirmation() {
  // インスタンス変数
  const [boardName, setBoardName] = useState('');
  const [playerList, setPlayerList] = useState(['']);
  
  // ローカルストレージから現在の値を取得
  useEffect(() => {
    setBoardName(localStorage.getItem(StorageKeys.setupBoard) ?? '');
    const playerListJSON = localStorage.getItem(StorageKeys.setupPlayer) ?? '[""]';
    setPlayerList(JSON.parse(playerListJSON) ?? ['']);
  }, []);
  
  
  function saveNewGameData(): void {
    // プレイヤー配列から空要素を除去
    const cleanPlayerList = playerList.filter(Boolean);
    // プレイヤー数は 1000 人以下に限定する
    if (cleanPlayerList.length > 1000) {
      // @remind エラー表示処理を追加したい（画面上部にエラー表示→トップに自動遷移）
      console.error('cleanPlayerList.length is ' + cleanPlayerList.length);
      return;
    }
    // プレイヤー情報配列の生成
    const playersInfoArr = [];
    for (const index in cleanPlayerList) {
        const playerID = index.padStart(3, '0');
        const onePlayerObj: PlayerInfo = {
            id: playerID,
            name: cleanPlayerList[index],
            icon: '0',
            order: null,
            point: 0,
            location: 0,
            skipcnt: 0,
            isfinish: false,
        };
        playersInfoArr.push(onePlayerObj);
    }
    const playersInfoJSON = JSON.stringify(playersInfoArr);
    console.log('playersInfoJSON : ' + playersInfoJSON);
    
    // @todo JSONファイルからボードの情報を読み込む処理を追加する
    const boardDataJSON = '[{}]';
    const boardDataArr = JSON.parse(boardDataJSON);
    const goalIndex = boardDataArr.length - 1;
    
    // ゲーム実施用ストレージをセット
    localStorage.setItem(StorageKeys.playingNumPlayers, cleanPlayerList.length.toString()); // プレイヤー人数
    localStorage.setItem(StorageKeys.playingBoard, boardName); // ボード名
    localStorage.setItem(StorageKeys.playingBoardID, '0'); // ボードID    @remind ボードIDを動的にする
    localStorage.setItem(StorageKeys.playingPlayers, playersInfoJSON); // プレイヤー情報のオブジェクト配列
    localStorage.setItem(StorageKeys.playingState, PlayingStates.decideOrder); // 状態ID
    localStorage.setItem(StorageKeys.playingCurrentOrderNum, '0'); // 現在の順番番号
    localStorage.setItem(StorageKeys.playingLastDiceNum, '-1'); // サイコロの出目
    localStorage.setItem(StorageKeys.playingBoardData, boardDataJSON); // ボードの内容情報
    localStorage.setItem(StorageKeys.playingIsEnd, 'false'); // 終了フラグ
    localStorage.setItem(StorageKeys.playingGoalIndex, goalIndex.toString()); // ゴールのマス番号
    localStorage.setItem(StorageKeys.playingLastMinigameRank, ''); // ミニゲームの結果（ランク文字列）
    localStorage.setItem(StorageKeys.playingLastMinigameKey, ''); // ミニゲームの結果を保存するためのキー
  }
  
  function removeSetupData(): void {
    localStorage.removeItem(StorageKeys.setupBoard);
    localStorage.removeItem(StorageKeys.setupPlayer);
  }
  
  
  return (
    <>
      <main>
        <div>
          <div>1.ボード選択</div>
          <div>2.プレイヤー情報入力</div>
          <div><em>3.確認</em></div>
        </div>
        <section>
          <h1>確認</h1>
          <h2>ボード</h2>
          <p>{boardName}</p>
          <h2>プレイヤー</h2>
          {
            playerList.map(playerName => {
              return (
                <p
                  className='player'
                  key={playerName}
                >
                  {playerName}
                </p>
              )
            })
          }
        </section>
        <form name="userForm">
          <button type="button" name="prevbtn" className="c-button">
            <Link to='./?state=player'>戻る</Link>
          </button>
          <button type="button" name="nextbtn" className="c-button">
            <Link
              to='/playing/'
              onClick={() => {
                saveNewGameData();
                removeSetupData();
              }}
            >
                ゲームスタート！
            </Link>
          </button>
        </form>
      </main>
    </>
  )
}
