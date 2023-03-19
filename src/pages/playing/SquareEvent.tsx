import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import '../../sass/style.scss';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';
import SgpjSugorokuManager from '../../ts/module/SgpjSugorokuManager';
import { PlayingStates } from '../../ts/module/PlayingStates';

import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (props : PlayingPageChildProps): JSX.Element => {
  const [stio, setStio] = useState<SgpjStorageIO | undefined>(undefined);
  const [sgmgr, setSgmgr] = useState<SgpjSugorokuManager | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStio(new SgpjStorageIO(localStorage));
    setSgmgr(new SgpjSugorokuManager(props.setPlayingState, localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stio === 'undefined') {
    console.error('[SGPJ] SgpjStorageIO is undefined');
    return (<></>);
  }
  if (typeof sgmgr === 'undefined') {
    console.error('[SGPJ] SgpjGameManager is undefined');
    return (<></>);
  }
  
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
  const board = stio.getPlayingBoardID();
  const player = stio.getCurrentPlayer();
  if (board !== undefined) {
    const playerLocation = player?.location;
    if (playerLocation !== undefined) {
      const curLocation = props.data.allBoardsJson.edges[board].node.square[playerLocation];
      curLocationData.name = curLocation.store.name;
      curLocationData.desc = curLocation.store.desc;
      curLocationData.eventFlag = curLocation.event.flag;
      curLocationData.eventName = curLocation.event.name;
      curLocationData.eventDesc = curLocation.event.desc;
      curLocationData.minigame = curLocation.event.minigame;
      curLocationData.eventMove = curLocation.event.move;
    }
  }
  
  // 現在のストレージの状態によりページ内容の表示を変える
  let usePageElem: JSX.Element;
  if (!curLocationData.eventFlag) {
    // イベントがない場合はその旨を表示
    usePageElem = (
      <>
        <p>イベントはありません</p>
        <Link to='/playing/' onClick={() => {
          stio.updateNextOrderNum();
          sgmgr.moveScreenTo(PlayingStates.standby);
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
          sgmgr.moveScreenTo(PlayingStates.minigameReady);
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
          stio.updateCurrentPlayer(nextPlayer);
          stio.updateNextOrderNum();
          sgmgr.moveScreenTo(PlayingStates.standby);
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
          stio.updateNextOrderNum();
          sgmgr.moveScreenTo(PlayingStates.standby);
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
