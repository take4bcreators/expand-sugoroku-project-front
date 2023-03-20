import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import '../../sass/style.scss';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';
import SgpjSugorokuManager from '../../ts/module/SgpjSugorokuManager';

import { PlayingStates } from '../../ts/config/PlayingStates';

import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (props: PlayingPageChildProps): JSX.Element => {
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
  
  // 表示用要素
  let innerElem = (
    <Link to='/playing/' onClick={() => {sgmgr.moveScreenTo(PlayingStates.Dice)}}>
      → さいころをふる
    </Link>
  );
  
  // 現在のプレイヤーを取得
  const player = stio.getCurrentPlayer();
  if (player === undefined) {
    console.error('[SGPJ] stio.getCurrentPlayer is undefined');
    return (<></>);
  }
  
  // 終了している場合は専用の表示を返す
  if (player.isfinish) {
    innerElem = (
      <>
        <p>〜〜 ゴール済みです 〜〜</p>
        <Link to='/playing/' onClick={() => {
          stio.updateNextOrderNum();
          sgmgr.moveScreenTo(PlayingStates.Standby);
        }}>
          → 次の人へ進む
        </Link>
      </>
    );
  }
  
  // 終了している場合は専用の表示を返す
  if (player.skipcnt > 0) {
    innerElem = (
      <>
        <p>〜〜 このターンおやすみ中 〜〜</p>
        <p>おやすみターン数：{player.skipcnt}</p>
        <Link to='/playing/' onClick={() => {
          stio.updateNextOrderNum();
          stio.decrementCurPlayerSkipCnt();
          sgmgr.moveScreenTo(PlayingStates.Standby);
        }}>
          → 次の人へ進む
        </Link>
      </>
    );
  }
  
  // // 現在の場所の名前を取得
  // let curLocationName = '';
  // const playBoard = stio.getPlayingBoardID();
  // const playerLocation = player.location;
  // if (playBoard !== undefined && playerLocation !== undefined) {
  //   curLocationName = props.data.allBoardsJson.edges[playBoard].node.square[playerLocation].store.name;
  // }
  // 現在の場所の名前を取得
  let curLocationName = '';
  const board = stio.getPlayingBoard();
  const playerLocation = player.location;
  if (typeof board !== 'undefined' && typeof playerLocation !== 'undefined') {
    curLocationName = board.square[playerLocation].store.name;
  }
  
  return (
    <>
      <main>
        <section>
          <h1>{player?.name ?? ''} さんのターン</h1>
          <p>現在地：[{playerLocation}] {curLocationName}</p>
          <p>現在のポイント： {player?.point ?? ''}</p>
          {innerElem}
        </section>
      </main>
    </>
  )
}
