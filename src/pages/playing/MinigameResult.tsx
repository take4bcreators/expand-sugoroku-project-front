import React from 'react';
import { useState, useEffect } from 'react';
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
  // const [playBoard, setPlayBoard] = useState<number | undefined>(undefined);
  const [minigameRank, setMinigameRank] = useState('');
  const [doEffect, setDoEffect] = useState(false);
  
  useEffect(() => {
    // プレイヤーの数を取得
    const stio = new SgpjStorageIO(localStorage);
    setPlayer(stio.getCurrentPlayer());
    // setPlayBoard(stio.getPlayingBoardID());
    setMinigameRank(localStorage.getItem(StorageKeys.playingLastMinigameRank) ?? '');
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  console.log('[SGPJ] [load] player : ' + player);
  
  // ランクに対するポイント
  // @remind 設定ファイルで管理したい
  const rankPointMap = new Map([
    ['s', 50],
    ['a', 30],
    ['b', 10],
    ['c', 0]
  ]);
  
  // ランクに応じたポイントをセット
  const getPoint = rankPointMap.get('minigameRank') ?? 0
  
  // 画面移動のアクションをクリック時用に定義
  function moveScreenTo(screen: string): void {
    localStorage.setItem(StorageKeys.playingState, screen);
    props.setPlayingState(screen);
    return;
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
  
  
  
  return (
    <>
      <main>
        <section>
          <h1>ミニゲーム結果！</h1>
          <p>ランク：{minigameRank.toUpperCase()}</p>
          <p>付与ポイント：{getPoint}</p>
          <Link to='/playing/' onClick={() => {
            const nextPlayer = Object.assign({}, player);
            nextPlayer.point = nextPlayer.point + getPoint;
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


