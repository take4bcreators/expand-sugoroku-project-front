import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import SugorokuManager from '../../ts/module/SugorokuManager';
import { PlayingStates } from '../../ts/config/PlayingStates';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import '../../sass/style.scss';



export default (props : PlayingPageChildProps): JSX.Element => {
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [sgmgr, setSgmgr] = useState<SugorokuManager | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setSgmgr(new SugorokuManager(props.setPlayingState, localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] stdao is undefined');
    return (<></>);
  }
  if (typeof sgmgr === 'undefined') {
    console.error('[SGPJ] sgmgr is undefined');
    return (<></>);
  }
  
  // 今回止まったマスの情報を取得
  const curLocationData = {
    name: '',
    name_kana: '',
    catch: '',
    genre_catch: '',
    open: '',
    access: '',
    address: '',
    photo: '',
    eventFlag: false,
    eventName: '',
    eventDetail: '',
    minigame: false,
    eventMove: 0,
  };
  const player = stdao.getCurrentPlayer();
  const board = stdao.getPlayingBoard();
  if (typeof board !== 'undefined') {
    const playerLocation = player?.location;
    if (typeof playerLocation !== 'undefined') {
      const curLocation = board.square[playerLocation];
      curLocationData.name = curLocation.store.name;
      curLocationData.name_kana = curLocation.store.name_kana;
      curLocationData.catch = curLocation.store.catch;
      curLocationData.genre_catch = curLocation.store.genre_catch;
      curLocationData.open = curLocation.store.open;
      curLocationData.access = curLocation.store.access;
      curLocationData.address = curLocation.store.address;
      curLocationData.photo = curLocation.store.photo;
      curLocationData.eventFlag = curLocation.event.flag;
      curLocationData.eventName = curLocation.event.name;
      curLocationData.eventDetail = curLocation.event.detail;
      curLocationData.minigame = curLocation.event.minigame;
      curLocationData.eventMove = curLocation.event.move;
    }
  }
  
  // ゴール済みの場合はゴールボーナスを詳細として表示
  if (player?.isfinish) {
    const goalPlayerCount = stdao.getGoalPlayerCount();
    const goalPoint = sgmgr.getGoalPoint(goalPlayerCount);
    curLocationData.catch = `ゴールボーナス： ${goalPoint} pt.`;
  }
  
  // すべてのプレイヤーがゴール済みであるかを確認
  const isAllPlayersGoal = stdao.checkAllPlayersGoalReached() ?? false;
  
  // 現在のストレージの状態によりページ内容の表示を変える
  let usePageElem: JSX.Element;
  if (isAllPlayersGoal) {
    // 全員ゴールした場合は、エンディング画面へのリンクを貼る
    usePageElem = (
      <>
        <Link to='/playing/' onClick={() => {
          stdao.updateNextOrderNum();
          sgmgr.moveScreenTo(PlayingStates.Ending);
        }}>
          →→ 最終結果画面へ進む
        </Link>
      </>
    );
  } else if (!curLocationData.eventFlag) {
    // イベントがない場合はその旨を表示
    usePageElem = (
      <>
        <p>イベントはありません</p>
        <Link to='/playing/' onClick={() => {
          stdao.updateNextOrderNum();
          sgmgr.moveScreenTo(PlayingStates.Standby);
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
        <p>{curLocationData.eventDetail}</p>
        <Link to='/playing/' onClick={() => {
          sgmgr.moveScreenTo(PlayingStates.MinigameReady);
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
        <p>{curLocationData.eventDetail}</p>
        <Link to='/playing/' onClick={() => {
          // 移動した後のプレイヤーの状態をストレージに保存
          const nextPlayer = Object.assign({}, player);
          nextPlayer.location = nextPlayer.location + curLocationData.eventMove;
          stdao.updateCurrentPlayer(nextPlayer);
          stdao.updateNextOrderNum();
          sgmgr.moveScreenTo(PlayingStates.Standby);
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
        <p>{curLocationData.eventDetail}</p>
        <Link to='/playing/' onClick={() => {
          stdao.updateNextOrderNum();
          sgmgr.moveScreenTo(PlayingStates.Standby);
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
          <img src={curLocationData.photo} alt="店舗の画像" />
          <ul>
            <li>{curLocationData.name_kana}</li>
            <li>{curLocationData.catch}</li>
            <li>{curLocationData.genre_catch}</li>
            <li>{curLocationData.open}</li>
            <li>{curLocationData.access}</li>
            <li>{curLocationData.address}</li>
          </ul>
          {usePageElem}
        </section>
      </main>
    </>
  )
}
