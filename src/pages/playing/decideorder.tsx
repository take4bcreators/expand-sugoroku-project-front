import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import '../../sass/style.scss';

import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';

import type { PlayerInfo } from '../../ts/type/PlayerInfo';
import type { PlayingStateIO } from '../../ts/type/PlayingStateIO';




export default function DecideOrder(props: PlayingStateIO): JSX.Element {
  
  // 情報保持用ステート
  const [numPlayers, setNumPlayers] = useState('');
  const [playerInfoJSON, setPlayerInfoJSON] = useState('');
  const [resultElem, setResultElem] = useState<JSX.Element | undefined>(undefined);
  
  // ローカルストレージ取得用
  useEffect(() => {
    // プレイヤーの数を取得
    setNumPlayers(localStorage.getItem(StorageKeys.playingNumPlayers) ?? '');
    // ユーザー情報を取得
    setPlayerInfoJSON(localStorage.getItem(StorageKeys.playingPlayers) ?? '');
  }, []);
  console.log('[load] ' + StorageKeys.playingNumPlayers + ' : ' + numPlayers);
  console.log('[load] ' + StorageKeys.playingPlayers + ' : ' + playerInfoJSON);
  
  
  // 順番決めボタンが押された時の処理
  function decideOrder(): void {
    // 連番をランダムにした配列を生成
    const numPlayersInt = parseInt(numPlayers);
    console.log('numPlayersInt : ' + numPlayersInt);
    if (Number.isNaN(numPlayersInt)) {
      console.error('numPlayersInt is NaN');
      console.error(numPlayersInt);
      // @remind ここにエラー時にトップへ戻る処理を追加する
      return;
    }
    const numberArr = [...Array(numPlayersInt).keys()];
    numberArr.sort(() => Math.random() - 0.5);
    
    // ストレージから取得したユーザー情報をJSON→オブジェクトに戻す
    if (playerInfoJSON === '') {
      console.error('playerInfoJSON is ' + playerInfoJSON);
      // @remind ここにエラー時にトップへ戻る処理を追加する
      return;
    }
    let playerInfoArr: PlayerInfo[];
    try {
      playerInfoArr = JSON.parse(playerInfoJSON);
    } catch (error) {
      console.error('playerInfoJSON JSON.parse Error');
      // @remind ここにエラー時にトップへ戻る処理を追加する
      return;
    }
    
    // ランダム配列を用いて各プレイヤーの順番を決定して連想配列で保持
    const resultMap = new Map();
    numberArr.forEach((value, index) => {
        playerInfoArr[index]['order'] = value;
        resultMap.set(value, playerInfoArr[index]['name']);
    });
    
    // 順番決め結果画面の要素の組み立て
    let playerNameElem: JSX.Element[] = [];
    for (let index = 0; index < resultMap.size; index++) {
        const orderNumber = index + 1;
        const playerName = resultMap.get(index);
        playerNameElem.push((
          <p
            key={orderNumber}
          >
            {orderNumber} : {playerName} さん
          </p>
        ))
    }
    const displayRetultElem = (
      <>
        <h1>-- 順番結果 --</h1>
        {
          playerNameElem.map((elem) => elem)
        }
        <Link
          to='/playing/'
          onClick={() => {
            localStorage.setItem(StorageKeys.playingState, PlayingStates.standy);
            props.setPlayingState(PlayingStates.standy);
          }}
        >
          → 次に進む
        </Link>
      </>
    );
    
    // ストレージと情報保持用ステートにプレイヤー情報と結果表示用要素を戻す
    const newPlayerInfoJSON = JSON.stringify(playerInfoArr);
    localStorage.setItem(StorageKeys.playingPlayers, newPlayerInfoJSON);
    setPlayerInfoJSON(newPlayerInfoJSON);
    setResultElem(displayRetultElem);
    return;
  }
  
  
  // 順番決めのボタンを押す前後で表示を変える
  let buttonElem = (<div onClick={decideOrder}>→→ ここをクリックしてください ←←</div>);
  if (resultElem !== undefined) {
    buttonElem = resultElem;
  }
  
  return (
    <>
      <main>
        <section>
          <h1>順番決め</h1>
          {buttonElem}
        </section>
        <section>
          <div>
          </div>
        </section>
      </main>
    </>
  );
}

export function Head() {
  return (
    <>
      <title>順番決め | すごろくツール</title>
    </>
  );
}

