import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import SugorokuManager from '../../ts/module/SugorokuManager';
import { AppConst } from '../../ts/config/const';
import { PlayingStates } from '../../ts/config/PlayingStates';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import '../../sass/style.scss';



export default (props: PlayingPageChildProps): JSX.Element => {
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
  
  // 表示用要素
  let innerElem = (
    <Link to='/playing/' onClick={() => {sgmgr.moveScreenTo(PlayingStates.Dice)}}>
      → さいころをふる
    </Link>
  );
  
  // 現在のプレイヤーを取得
  const player = stdao.getCurrentPlayer();
  if (typeof player === 'undefined') {
    console.error('[SGPJ] player is undefined');
    return (<></>);
  }
  
  // 終了している場合は専用の表示を返す
  if (player.isfinish) {
    innerElem = (
      <>
        <p>〜〜 ゴール済みです 〜〜</p>
        <Link to='/playing/' onClick={() => {
          stdao.updateNextOrderNum();
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
          stdao.updateNextOrderNum();
          stdao.decrementCurPlayerSkipCnt();
          sgmgr.moveScreenTo(PlayingStates.Standby);
        }}>
          → 次の人へ進む
        </Link>
      </>
    );
  }
  
  // 現在の場所の情報を取得
  const curLocationData = {
    name: '',
    photo: '',
  };
  const board = stdao.getPlayingBoard();
  const playerLocation = player.location;
  if (typeof board !== 'undefined' && typeof playerLocation !== 'undefined') {
    curLocationData.name = board.square[playerLocation].store.name;
    curLocationData.photo = board.square[playerLocation].store.photo;
  }
  
  // プレイヤーアイコン情報の組み立て
  let playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + player.icon;
  if (player.icon === '' || typeof player.icon === 'undefined') {
    playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + AppConst.DEFAULT_PLAYER_ICON_FILE;
  }
  
  // 店画像表示のための要素の組み立て
  let storeImage = (<img src={curLocationData.photo} alt="店舗の画像" />);
  if (curLocationData.photo === '') {
    storeImage = (<></>);
  }
  
  return (
    <>
      <main>
        <section>
          <h1>{player.name ?? ''} さんのターン</h1>
          <div>
            <img
              src={playerIconSrc}
              alt="プレイヤーアイコン"
              width="50"
              height="50"
            />
          </div>
          <p>現在地：[{playerLocation}] {curLocationData.name}</p>
          <div>
            {storeImage}
          </div>
          <p>現在のポイント： {player.point ?? ''}</p>
          {innerElem}
        </section>
      </main>
    </>
  )
}
