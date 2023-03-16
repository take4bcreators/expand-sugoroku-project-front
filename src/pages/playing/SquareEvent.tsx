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
  // インスタンス変数
  const [player, setPlayer] = useState<PlayerInfo | undefined>(undefined);
  const [playBoard, setPlayBoard] = useState<number | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  
  useEffect(() => {
    const stio = new SgpjStorageIO(localStorage);
    setPlayer(stio.getCurrentPlayer());
    setPlayBoard(stio.getPlayingBoardID());
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  console.log('[SGPJ] [load] player : ' + player);
  
  // 今回止まったマスの情報格納用オブジェクトの初期化
  const curLocationData = {
    name: '',
    desc: '',
    eventFlag: false,
    eventName: '',
    eventDesc: '',
    minigame: false,
    eventMove: 0,
  };
  // マスの情報取得
  if (playBoard !== undefined) {
    const loc = player?.location;
    if (loc !== undefined) {
      const curLocation = props.data.allBoardsJson.edges[playBoard].node.square[loc]
      curLocationData.name = curLocation.store.name;
      curLocationData.desc = curLocation.store.desc;
      curLocationData.eventFlag = curLocation.event.flag;
      curLocationData.eventName = curLocation.event.name;
      curLocationData.eventDesc = curLocation.event.desc;
      curLocationData.minigame = curLocation.event.minigame;
      curLocationData.eventMove = curLocation.event.move;
    }
  }
  
  
  // 次の順番にする処理をクリック時用に定義
  function setNextOrderNum(): void {
    const stio = new SgpjStorageIO(localStorage);
    const updateResult = stio.updateNextOrderNum();
    if (!updateResult) {
      console.error('[SGPJ] Failed to update user information.');
    }
    return;
  }
  
  // 画面移動のアクションをクリック時用に定義
  function moveScreenTo(screen: string): void {
    localStorage.setItem(StorageKeys.playingState, screen);
    props.setPlayingState(screen);
    return;
  }
  
  // 現在のストレージの状態によりページ内容の表示を変える
  let usePageElem: JSX.Element = (<section></section>);
  if (!curLocationData.eventFlag) {
    // イベントがない場合はその旨を表示
    usePageElem = (
      <>
        <p>イベントはありません</p>
        <Link to='/playing/' onClick={() => {
          setNextOrderNum();
          moveScreenTo(PlayingStates.standby);
        }}>
          →→ 次の人の番へすすむ ←←
        </Link>
      </>
    );
  } else if (curLocationData.minigame) {
    // ミニゲームがある場合はミニゲーム画面へのリンクをつける
    usePageElem = (
      <>
        <p>{curLocationData.eventName}</p>
        <p>{curLocationData.eventDesc}</p>
        <Link to='/playing/' onClick={() => {
          // @todo ミニゲーム待機画面への画面遷移を入れる
          
        }}>
          →→ ミニゲームへ進む
        </Link>
      </>
    );
  } else if (curLocationData.eventMove !== 0) {
    // 移動イベントが発生している場合は、次へ進む時に移動実施
    usePageElem = (
      <>
        <p>{curLocationData.eventName}</p>
        <p>{curLocationData.eventDesc}</p>
        <Link to='/playing/' onClick={() => {
          // 移動した後のプレイヤーの状態をストレージに保存
          const nextPlayer = Object.assign({}, player);
          nextPlayer.location = nextPlayer.location + curLocationData.eventMove;
          const stio = new SgpjStorageIO(localStorage);
          const updateResult = stio.updateCurrentPlayer(nextPlayer);
          // ユーザー情報UPDATEが問題合った場合は、エラーを出力
          if (!updateResult) {
            console.error('[SGPJ] Failed to update user information.');
            // @remind ユーザーへの情報表示をいれる（ゲームは続行でOK？）
          }
          setNextOrderNum();
          moveScreenTo(PlayingStates.standby);
        }}>
          →→ 次の人の番へすすむ
        </Link>
      </>
    );
  } else {
    // 移動イベント以外のイベントは表示のみ
    usePageElem = (
      <>
        <p>{curLocationData.eventName}</p>
        <p>{curLocationData.eventDesc}</p>
        <Link to='/playing/' onClick={() => {
          setNextOrderNum();
          moveScreenTo(PlayingStates.standby);
        }}>
          →→ 次の人の番へすすむ
        </Link>
      </>
    );
  }
  
  
  return (
    <>
      <main>
        <section>
          <p>{player?.name ?? ''} さん</p>
          <h1>{curLocationData.name}</h1>
          <p>{curLocationData.desc}</p>
          {usePageElem}
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


