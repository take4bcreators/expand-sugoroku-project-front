import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import '../../sass/style.scss';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';

import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';

import type { PlayerInfo } from '../../ts/type/PlayerInfo';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (props : PlayingPageChildProps): JSX.Element => {
  console.log(props);
  
  // インスタンス変数
  const [player, setPlayer] = useState<PlayerInfo | undefined>(undefined);
  const [playBoardNum, setPlayBoardNum] = useState<number | undefined>(undefined);
  const [diceNumber, setDiceNumber] = useState<number | undefined>(undefined);
  
  // ストレージからの取得
  useEffect(() => {
    // プレイヤーの数を取得
    const stio = new SgpjStorageIO(localStorage);
    setPlayer(stio.getCurrentPlayer());
    setPlayBoardNum(stio.getPlayingBoardID());
  }, []);
  console.log('[SGPJ] [load] player : ' + player);
  
  // ボード情報取得
  type BoardNodeType = typeof props.data.allBoardsJson.edges[0]['node'];
  let playBoard: BoardNodeType | undefined = undefined;
  // 今回止まるのマスの情報格納用オブジェクトの初期化（拡張性を考慮してオブジェクトを使用）
  const curLocationData = {
    name: '',
  };
  if (playBoardNum !== undefined) {
    playBoard = props.data.allBoardsJson.edges[playBoardNum].node;
    const curLocation = player?.location;
    if (curLocation !== undefined) {
      curLocationData.name = playBoard.square[curLocation].store.name;
    }
  }
  
  // サイコロを振る（クリックされた際に使用）
  function rollDice(): void {
    const DICE_VALUE_COUNT = 6;
    const randomValue = Math.floor(Math.random() * DICE_VALUE_COUNT);
    const diceResult = randomValue + 1;
    setDiceNumber(diceResult);
    return;
  }
  
  // 待機画面に戻るアクション（クリックされた際に使用）
  function backToStandbyScreen(): void {
    localStorage.setItem(StorageKeys.playingState, PlayingStates.standby);
    props.setPlayingState(PlayingStates.standby);
    return;
  }
  
  // 表示する要素の初期化
  let displayElem = (
    <>
      <p onClick={rollDice}>
        →→ クリックでサイコロをふる ←←
      </p>
      <Link to='/playing/' onClick={backToStandbyScreen}>
        ← 戻る
      </Link>
    </>
  );
  
  // サイコロを振った後の表示と処理
  if (diceNumber !== undefined) {
    // 次のマス情報格納用オブジェクトの初期化
    const nextLocationData = {
      dataReady: false,
      location: 0,
      isfinish: false,
      eventflag: false,
      point: 0,
      skip: 0,
    };
    // 次のマスの情報を取得する
    if (playBoard !== undefined) {
      const curLocation = player?.location ?? NaN;
      let nextLocation = curLocation + diceNumber;
      const goalIndex = playBoard.board.goal;
      // 移動先がゴールを超えていればゴールにする
      if (!isNaN(nextLocation) && nextLocation >= goalIndex) {
        nextLocation = goalIndex;
        nextLocationData.isfinish = true;
      }
      // 移動先のマスの情報を取得
      if (!isNaN(nextLocation)) {
        nextLocationData.location = nextLocation;
        nextLocationData.eventflag = playBoard.square[nextLocation].event.flag;
        if (nextLocationData.eventflag) {
          nextLocationData.point = playBoard.square[nextLocation].event.point;
          nextLocationData.skip = playBoard.square[nextLocation].event.skip;
          if (nextLocationData.skip < 0) {
            nextLocationData.skip = 0;
          }
        }
        nextLocationData.dataReady = true;
      }
    }
    
    // データの状態が問題なければマスに進むボタンを設置
    if (nextLocationData.dataReady && player !== undefined) {
      displayElem = (
        <>
          <p>「 {diceNumber} 」</p>
          <Link
              to='/playing/'
              onClick={() => {
                // サイコロの出目をストレージに保存
                localStorage.setItem(StorageKeys.playingLastDiceNum, diceNumber.toString());
                
                // 移動した後のプレイヤーの状態をストレージに保存
                const nextPlayer = Object.assign({}, player);
                nextPlayer.point += nextLocationData.point;
                nextPlayer.skipcnt += nextLocationData.skip;
                nextPlayer.isfinish = nextLocationData.isfinish;
                nextPlayer.location = nextLocationData.location;
                const stio = new SgpjStorageIO(localStorage);
                const updateResult = stio.updateCurrentPlayer(nextPlayer);
                
                // ユーザー情報UPDATEが問題ない場合は、シーンを更新する
                if (updateResult) {
                  localStorage.setItem(StorageKeys.playingState, PlayingStates.squareEvent);
                  props.setPlayingState(PlayingStates.squareEvent);
                } else {
                  console.error('[SGPJ] Failed to update user information.');
                }
              }}
          >
            マスに進む →→→
          </Link>
        </>
      );
    } else {
      displayElem = (
        <>
          <p>エラーが発生しました</p>
          <Link to='/playing/' onClick={backToStandbyScreen}>
            ← 戻る
          </Link>
        </>
      );
    }
  }
  
  
  return (
    <>
      <main>
        <section>
          <h1>{player?.name ?? ''} さんのターン</h1>
          <p>現在地：{curLocationData.name}</p>
          {displayElem}
        </section>
      </main>
    </>
  )
}

// export function Head() {
//   return (
//     <>
//       <title>スタンバイ画面</title>
//     </>
//   );
// }


