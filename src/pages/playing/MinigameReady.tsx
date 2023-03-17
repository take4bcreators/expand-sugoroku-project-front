import React from 'react';
import { useState, useEffect } from 'react';
// import { useLocation } from '@reach/router';
import { Link } from 'gatsby';

import '../../sass/style.scss';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';

import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';

import type { PlayerInfo } from '../../ts/type/PlayerInfo';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (props: PlayingPageChildProps): JSX.Element => {
  console.log(props);
  
  // インスタンス変数
  const [player, setPlayer] = useState<PlayerInfo | undefined>(undefined);
  const [playBoard, setPlayBoard] = useState<number | undefined>(undefined);
  const [minigameKey, setMinigameKey] = useState('');
  
  const [doEffect, setDoEffect] = useState(false);
  
  useEffect(() => {
    // プレイヤーの数を取得
    const stio = new SgpjStorageIO(localStorage);
    setPlayer(stio.getCurrentPlayer());
    setPlayBoard(stio.getPlayingBoardID());
    setMinigameKey(localStorage.getItem(StorageKeys.playingLastMinigameKey) ?? '');
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  console.log('[SGPJ] [load] player : ' + player);
  
  
  // ミニゲームから返ってきたらミニゲーム結果画面へ進む
  const locat = props.location;
  const params = new URLSearchParams(locat.search);
  const paramState = params.get('state') ?? '';
  if (paramState === 'minigame' && minigameKey !== '') {
    const paramKey = params.get('key') ?? '';
    if (paramKey === minigameKey) {
      const paramRank = params.get('rank') ?? 'c';
      localStorage.setItem(StorageKeys.playingLastMinigameRank, paramRank);
      localStorage.setItem(StorageKeys.playingState, PlayingStates.minigameResult);
      props.setPlayingState(PlayingStates.minigameResult);
    }
  }
  
  
  // ミニゲームフォルダのパス（ビルド後のパスを指定）
  const MINIGAME_DIR: string = '../minigame';
  
  // 今回止まったマスの情報格納用オブジェクトの初期化
  const curLocationData = {
    minigameName: '',
    minigameDesc: '',
    minigameId: '',
    minigamePath: '',
  };
  // マスの情報取得
  if (playBoard !== undefined) {
    const loc = player?.location;
    if (loc !== undefined) {
      const curLocation = props.data.allBoardsJson.edges[playBoard].node.square[loc];
      curLocationData.minigameName = curLocation.minigame.name;
      curLocationData.minigameDesc = curLocation.minigame.desc;
      curLocationData.minigameId = curLocation.minigame.id;
      curLocationData.minigamePath = MINIGAME_DIR + '/' + curLocation.minigame.id + '/';
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
  
  
  // ミニゲームキー用ランダム文字列生成
  function createRandomString(length: number) {
    const S = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const L = length;
    let rnd = '';
    for (var i = 0; i < L; i++) {
      rnd += S.charAt(Math.floor(Math.random() * S.length));
    }
    return rnd;
  }
  
  
  return (
    <>
      <main>
        <section>
          <h1>{curLocationData.minigameName}</h1>
          <p>{curLocationData.minigameDesc}</p>
          <p>
            <a onClick={() => {
              const keyStr = createRandomString(8);
              localStorage.setItem(StorageKeys.playingLastMinigameKey, keyStr);
              location.href = curLocationData.minigamePath + '?mode=sugoroku&key=' + keyStr;
            }}>
              →→ ミニゲームをはじめる ←←
            </a>
          </p>
          <Link to='/playing/' onClick={() => {
            localStorage.setItem(StorageKeys.playingLastMinigameRank, 'c');
            moveScreenTo(PlayingStates.minigameResult);
          }}>
            ミニゲームをやらずに次へ進める
          </Link>
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


