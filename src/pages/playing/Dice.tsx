import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import '../../sass/style.scss';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';
import SgpjSugorokuManager from '../../ts/module/SgpjSugorokuManager';
import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';

import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (props : PlayingPageChildProps): JSX.Element => {
  const [diceNumber, setDiceNumber] = useState<number | undefined>(undefined);
  const [stio, setStio] = useState<SgpjStorageIO | undefined>(undefined);
  const [sgmgr, setSgmgr] = useState<SgpjSugorokuManager | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStio(new SgpjStorageIO(localStorage));
    setSgmgr(new SgpjSugorokuManager(props.setPlayingState, localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (stio === undefined) {
    console.error('[SGPJ] SgpjStorageIO is undefined');
    return (<></>);
  }
  if (sgmgr === undefined) {
    console.error('[SGPJ] SgpjGameManager is undefined');
    return (<></>);
  }
  
  
  // ボード情報取得
  type BoardNodeType = typeof props.data.allBoardsJson.edges[0]['node'];
  let playBoard: BoardNodeType | undefined = undefined;
  // 今回止まるのマスの情報格納用オブジェクトの初期化（拡張性を考慮してオブジェクトを使用）
  const curLocationData = {
    number: 0,
    name: '',
  };
  // 情報取得
  const player = stio.getCurrentPlayer();
  const playBoardNum = stio.getPlayingBoardID();
  if (playBoardNum !== undefined) {
    playBoard = props.data.allBoardsJson.edges[playBoardNum].node;
    const playerLocation = player?.location;
    if (playerLocation !== undefined) {
      curLocationData.name = playBoard.square[playerLocation].store.name;
      curLocationData.number = playerLocation;
    }
  }
  
  // 表示する要素の初期化
  let displayElem = (
    <>
      <p onClick={() => {setDiceNumber(sgmgr.rollDice())}}>
        →→ クリックでサイコロをふる ←←
      </p>
      <Link to='/playing/' onClick={() => {sgmgr.moveScreenTo(PlayingStates.standby)}}>
        ← 戻る
      </Link>
    </>
  );
  
  // サイコロを振った後の表示と処理
  if (typeof diceNumber !== 'undefined') {
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
    if (typeof playBoard !== 'undefined') {
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
    if (nextLocationData.dataReady && typeof player !== 'undefined') {
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
                const updateResult = stio.updateCurrentPlayer(nextPlayer);
                // ユーザー情報UPDATEが問題ない場合は、シーンを更新する
                if (updateResult) {
                  sgmgr.moveScreenTo(PlayingStates.squareEvent)
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
          <Link to='/playing/' onClick={() => {sgmgr.moveScreenTo(PlayingStates.standby)}}>
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
          <p>現在地：[{curLocationData.number}] {curLocationData.name}</p>
          {displayElem}
        </section>
      </main>
    </>
  )
}
